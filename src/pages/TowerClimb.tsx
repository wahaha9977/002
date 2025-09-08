import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';
import { toast } from 'sonner';
import { Character } from '@/lib/gameTypes';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function TowerClimb() {
  const { gameState, gainExp, spendGold, updateGameState, updateTowerProgress, addMaterial, addEncounteredMonster } = useGame();
  const { player } = gameState;
  const navigate = useNavigate();
  const { playSound } = useSoundEffects();
  
  // 当前状态 - 确保从游戏状态中正确读取当前层数
  const [currentFloor, setCurrentFloor] = useState(player.towerProgress?.currentFloor || 1);
  const [currentEnemy, setCurrentEnemy] = useState<Character | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [battleStarted, setBattleStarted] = useState(false);
  const [currentPlayerHp, setCurrentPlayerHp] = useState(player.characters[0].stats.hp);
  const [battleResult, setBattleResult] = useState<'victory' | 'defeat' | null>(null);
  const [heavyStrikeCounter, setHeavyStrikeCounter] = useState(0);
  const [autoBattle, setAutoBattle] = useState(false); // 自动战斗状态
  // 初始化爬塔统计信息，确保从游戏状态中正确加载最高记录
  const [towerStats, setTowerStats] = useState({
    highestFloor: player.towerProgress?.highestFloor || 1,
    totalAttempts: player.towerProgress?.totalAttempts || 0,
    totalSuccesses: player.towerProgress?.totalSuccesses || 0
  });
  
  // 组件挂载时，确保从游戏状态正确初始化所有爬塔数据
  useEffect(() => {
    // 从游戏状态加载爬塔数据
    if (player.towerProgress) {
      setCurrentFloor(player.towerProgress.currentFloor);
      setTowerStats({
        highestFloor: player.towerProgress.highestFloor || 1,
        totalAttempts: player.towerProgress.totalAttempts || 0,
        totalSuccesses: player.towerProgress.totalSuccesses || 0
      });
    }
  }, []);
  
  // 角色技能
  const playerSkills = player.characters[0].skills;
  
  // 自动战斗效果
  useEffect(() => {
    let autoBattleInterval: number;
    
    // 当开启自动战斗且当前是玩家回合时，自动选择技能
    if (autoBattle && playerTurn && !battleResult) {
      autoBattleInterval = setInterval(() => {
        // 优先使用重砍，如果可用的话
        if (heavyStrikeCounter === 0) {
          const heavyStrikeIndex = playerSkills.findIndex(skill => skill.id === 'heavy_strike');
          if (heavyStrikeIndex !== -1) {
            playerAttack(heavyStrikeIndex);
          }
        } else {
          // 否则使用横斩
          const slashIndex = playerSkills.findIndex(skill => skill.id === 'slash');
          if (slashIndex !== -1) {
            playerAttack(slashIndex);
          }
        }
      }, 1000); // 每1秒自动攻击一次
    }
    
    return () => {
      if (autoBattleInterval) {
        clearInterval(autoBattleInterval);
      }
    };
  }, [autoBattle, playerTurn, battleResult, heavyStrikeCounter]);
  
   // 预设的怪物模板 - 作为后备使用
  const monsterTemplates: Omit<Character, 'id' | 'spriteUrl'>[] = [
    {
      name: "史莱姆",
      description: "弱小的粘液生物",
       stats: { hp: 50, attack: 5, defense: 2 },
      skills: [
        {
          id: "slime_attack",
          name: "粘液喷射",
          description: "喷射酸性粘液攻击敌人",
          damage: 5,
          cost: 0,
          element: "water"
        }
      ],
      level: 1,
      exp: 0,
      maxExp: 100
    },
    {
      name: "哥布林",
      description: "狡猾的小型类人生物",
       stats: { hp: 80, attack: 8, defense: 3 },
      skills: [
        {
          id: "goblin_stab",
          name: "短刀刺击",
          description: "用短刀快速刺击",
          damage: 8,
          cost: 0,
          element: "earth"
        }
      ],
      level: 1,
      exp: 0,
      maxExp: 100
    },
    {
      name: "骷髅兵",
      description: "被魔法复活的不死生物",
       stats: { hp: 100, attack: 10, defense: 5 },
      skills: [
        {
          id: "skeleton_swing",
          name: "骨剑挥砍",
          description: "用骨剑猛烈挥砍",
          damage: 12,
          cost: 0,
          element: "earth"
        }
      ],
      level: 1,
      exp: 0,
      maxExp: 100
    }
  ];
  
   // 预设的怪物图片URL - 作为后备使用
  const monsterSpriteUrls: string[] = [
    "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20slime%20monster%208bit&sign=6f99fae6f059c10a408cc41c191f777f",
    "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20goblin%20monster%208bit&sign=24851aa5b2bb1efa19812e5281dfd368",
    "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20skeleton%20monster%208bit&sign=bfb34201924be8be1a9dfb4894b414bd"
  ];
  
   // 定义怪物接口，与MonsterDetail.tsx中的保持一致
  interface Monster {
    id: string;
    name: string;
    description: string;
    spriteUrl: string;
    type: string;
    rarity: string;
    stats?: {
      hp?: number;
      attack?: number;
      defense?: number;
      speed?: number;
    };
    skills?: {
      name: string;
      description: string;
      damage: number;
    }[];
    locations?: string[];
    weakness?: string[];
    resistance?: string[];
  }
  
  // 获取所有怪物数据（从图鉴中获取）
  const getAllMonsters = (): Monster[] => {
    // 直接从MonsterDetail.tsx复制的怪物数据
    const allMonsters: Monster[] = [
      {
        id: "corrupted_slime",
        name: "腐化史莱姆",
        description: "绿色粘液生物，缓慢移动，腐蚀武器。被它触碰的武器会暂时降低攻击力。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20corrupted%20green%20slime%20monster%208bit&sign=a64959841c2b65e080665a7df610b3fb",
        type: "毒属性",
        rarity: "普通",
         stats: { hp: 60, attack: 6, defense: 3 },
        skills: [
           { name: "腐蚀攻击", description: "用带有腐蚀性的粘液攻击敌人，有几率降低攻击力", damage: 6 }
        ]
      },
      {
        id: "stray_dog",
        name: "流浪野狗",
        description: "饥饿的野兽，主动攻击但脆弱。通常独自行动，但饥饿时会变得格外凶猛。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20stray%20dog%20monster%208bit&sign=ddfe720f0f332c00ca0d9d3180c4c143",
        type: "地属性",
        rarity: "普通",
         stats: { hp: 50, attack: 9, defense: 1 },
        skills: [
          { name: "狂吠撕咬", description: "发出凶猛的吠叫后扑向敌人撕咬", damage: 9 }
        ]
      },
      {
        id: "cave_bat",
        name: "洞穴蝙蝠",
        description: "成群出现，吸血但怕火。在黑暗环境中视力极佳，依靠回声定位系统导航。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20cave%20bat%20monster%208bit&sign=fcd341af6aae021a3dad8758bcbf7e2e",
        type: "暗属性",
        rarity: "普通",
         stats: { hp: 35, attack: 5, defense: 1 },
        skills: [
          { name: "吸血攻击", description: "快速扑向敌人并吸取血液恢复自身生命", damage: 5 }
        ]
      },
      // 高级怪物
      {
        id: "venom_spider",
        name: "毒牙蜘蛛",
        description: "喷射蛛网和毒液，移动迅速。八条细长的腿让它在各种地形都能快速移动。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20venomous%20spider%20monster%208bit%20poison%20fangs&sign=b8f6863611d2fc118874018785a812e2",
        type: "毒属性",
        rarity: "高级",
         stats: { hp: 120, attack: 12, defense: 5 },
        skills: [
           { name: "毒液喷射", description: "从毒牙中喷射出致命毒液，对敌人造成伤害，有50%概率使其中毒", damage: 12 },
          { name: "蛛网束缚", description: "喷射粘性蛛网，使敌人下回合有50%概率无法攻击", damage: 0 }
        ]
      },
      {
        id: "armored_skeleton",
        name: "铠甲骷髅",
        description: "持剑盾的不死生物，格挡攻击。曾经是古代王国的精锐士兵。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20armored%20skeleton%20monster%208bit%20sword%20shield&sign=57499136fab675785f01b653a7c9f46e",
        type: "暗属性",
        rarity: "高级",
          stats: { hp: 150, attack: 7, defense: 18 },
        skills: [
          { name: "剑盾连击", description: "用盾牌撞击后迅速挥剑攻击", damage: 14 },
           { name: "钢铁壁垒", description: "举起盾牌形成坚固防御，大幅提高防御力持续两回合，但两回合内自身无法攻击。", damage: 0 }
        ]
      },
      {
        id: "swamp_murloc",
        name: "沼泽鱼人",
        description: "群体行动，投掷鱼叉。生活在潮湿沼泽中的类人生物。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20swamp%20murloc%20monster%208bit%20spear%20group&sign=2dcc228805831d3ea3e8198423b01096",
        type: "水属性",
        rarity: "高级",
         stats: { hp: 100, attack: 13, defense: 6 },
        skills: [
          { name: "鱼叉投掷", description: "投掷锋利的鱼叉攻击远处的敌人", damage: 13 },
          { name: "群体增益", description: "发出特殊叫声，提升附近同伴的攻击力", damage: 0 }
        ]
      },
      // 稀有怪物
      {
        id: "two_headed_ogre",
        name: "双头食人魔",
        description: "两个头分别施法和攻击，混乱仇恨。一个头擅长物理攻击，另一个头可以释放简单的法术。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20two-headed%20ogre%20monster%208bit%20chaos%20magical&sign=c38d810374bab831908d8c943a9be587",
        type: "地属性",
        rarity: "稀有",
         stats: { hp: 200, attack: 18, defense: 12 },
        skills: [
          { name: "双脑连击", description: "两个脑袋同时发动攻击，物理和魔法伤害并存", damage: 18 },
          { name: "混乱践踏", description: "愤怒地践踏地面，造成范围伤害并可能使敌人眩晕", damage: 15 }
        ]
      },
      {
        id: "shadow_panther",
        name: "暗影猎豹",
        description: "隐身突袭，暴击率高。能够融入黑暗中难以被发现，擅长出其不意的致命攻击。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20shadow%20panther%20monster%208bit%20stealth%20critical&sign=fe59101d66bb7f4c0f8ed32af9e1cfa5",
        type: "暗属性",
        rarity: "稀有",
         stats: { hp: 140, attack: 24, defense: 6 },
        skills: [
          { name: "暗影突袭", description: "隐身接近敌人后发动猛烈攻击，必定造成暴击", damage: 24 },
          { name: "黑暗遮蔽", description: "释放黑暗能量，使敌人下回合攻击无法命中", damage: 0 },
          { name: "影子分身", description: "制造一个影子分身，分担伤害并迷惑敌人，使敌人下回合造成的伤害减半", damage: 15 }
        ]
      },
      {
        id: "ice_lich",
        name: "寒冰巫妖",
        description: "释放冰环冻结，免疫冰伤。掌握着强大的冰系魔法。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20lich%20monster%208bit%20frost%20immune&sign=5a799a31c6d3fb6ae829a53c3521c23b",
        type: "冰属性",
        rarity: "稀有",
         stats: { hp: 180, attack: 20, defense: 10 },
        skills: [
          { name: "冰霜新星", description: "释放冰环冻结周围敌人，造成伤害并有30%概率冻结敌人", damage: 20 },
         { name: "永恒寒冬", description: "召唤暴风雪，对敌人造成持续冰属性伤害，每回合额外造成少量伤害", damage: 12 },
         { name: "冰锥术", description: "从地面召唤锐利的冰锥刺向敌人，有30%概率冻结敌人", damage: 18 }
        ]
      },
      // 史诗怪物
      {
        id: "cerberus",
        name: "地狱三头犬",
        description: "三个头分别喷火/毒/暗影，范围攻击。来自地狱的看门犬。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20cerberus%20monster%208bit%20three%20heads%20fire%20poison%20shadow&sign=9f85348c11d6d0e4a5831355af24f564",
        type: "暗属性",
        rarity: "史诗",
         stats: { hp: 250, attack: 22, defense: 15 },
               skills: [
                { name: "地狱吐息", description: "三个头同时喷吐火、毒、暗影三种元素，对敌人造成多重伤害", damage: 22 },
                { name: "地狱束缚", description: "释放黑暗锁链束缚敌人，降低敌人防御力", damage: 0 },
                { name: "灵魂撕咬", description: "咬碎敌人的灵魂，造成持续伤害，使敌人每回合额外受到伤害", damage: 15 },
                { name: "地狱之门", description: "召唤地狱之力，提升自身攻击力与防御力", damage: 0 }
              ]
      },
      {
        id: "undead_dragon_rider",
        name: "死灵龙骑",
        description: "骷髅龙骑士，冲锋+亡灵召唤。古代骑士的灵魂与骨龙融合的产物。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20undead%20dragon%20rider%20monster%208bit%20skeleton%20mount%20summon&sign=053bfae277fc954de7439eb629fa1d83",
        type: "暗属性",
        rarity: "史诗",
         stats: { hp: 220, attack: 25, defense: 18 },
        skills: [
                 { name: "死亡冲锋", description: "驾驭骨龙向前冲锋，对路径上的敌人造成伤害", damage: 25 },
                { name: "亡灵召唤", description: "召唤两名骷髅士兵参与战斗，持续两回合（骷髅士兵属性：生命值50、攻击力6、防御力3，无技能）", damage: 0 },
                { name: "腐骨箭雨", description: "从骨龙口中喷出大量腐蚀箭枝，对敌人造成持续三回合的腐蚀伤害", damage: 20 },
                { name: "死亡契约", description: "牺牲部分生命值来提升攻击力和防御力", damage: 0 }
        ]
      },
      {
        id: "fire_demon_lord",
        name: "炎魔领主",
        description: "点燃地面，持续火焰伤害。火元素的统治者。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20fire%20demon%20lord%20monster%208bit%20lava%20ground%20burning&sign=89bb2a50cacd7cf0c253aadf3c78f75e",
        type: "火属性",
        rarity: "史诗",
         stats: { hp: 280, attack: 26, defense: 12 },
        skills: [
          { name: "熔岩喷发", description: "从地面召唤熔岩喷发，对范围内敌人造成高额伤害", damage: 26 },
          { name: "火焰领域", description: "点燃周围地面，对进入区域的敌人造成持续火焰伤害", damage: 10 }
        ]
      },
      // 传说怪物
      {
        id: "nine_tailed_fox",
        name: "九尾妖狐",
        description: "魅惑控制，幻术制造迷宫。拥有九条尾巴的神秘狐狸。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20nine-tailed%20fox%20monster%208bit%20illusions%20maze&sign=1b44774db511e31dd10455b669838cb7",
        type: "火属性",
        rarity: "传说",
         stats: { hp: 300, attack: 35, defense: 15 },
        skills: [
          { name: "魅惑术", description: "魅惑敌人，使其在一定时间内无法行动", damage: 0 },
          { name: "幻术迷宫", description: "制造幻术迷宫，对敌人造成持续伤害并降低速度", damage: 15 },
          { name: "九尾连击", description: "九条尾巴同时发动攻击，造成高额伤害", damage: 35 }
        ]
      },
      {
        id: "ice_phoenix",
        name: "冰霜凤凰",
        description: "死亡后涅槃重生，强化冰系技能。冰蓝色的凤凰。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20phoenix%20monster%208bit%20rebirth%20frost&sign=e03639c376dcc8913bf756335002c682",
        type: "冰属性",
        rarity: "传说",
         stats: { hp: 350, attack: 30, defense: 20 },
        skills: [
          { name: "冰风暴", description: "召唤强烈的冰风暴，对范围内敌人造成伤害并减速", damage: 30 },
          { name: "冰之守护", description: "创造冰之护盾，大幅提升防御力", damage: 0 },
          { name: "涅槃重生", description: "死亡后立即复活，恢复全部生命值并强化所有冰系技能", damage: 0 }
        ]
      },
      {
        id: "abyssal_worm",
        name: "深渊蠕虫",
        description: "钻地突袭，吞噬玩家并消化。生活在地下深处的巨大蠕虫。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20abyssal%20worm%20monster%208bit%20burrowing%20swallow&sign=fa0410899e297bcaf3d5d928a71e460e",
        type: "地属性",
        rarity: "传说",
         stats: { hp: 400, attack: 40, defense: 18 },
        skills: [
          { name: "钻地突袭", description: "潜入地下，然后突然钻出地面攻击敌人", damage: 40 },
          { name: "深渊吞噬", description: "张开血盆大口吞噬敌人，使其持续受到伤害", damage: 20 },
          { name: "地动山摇", description: "震动地面，造成范围伤害并使敌人眩晕", damage: 25 }
        ]
      }
    ];
    
    return allMonsters;
  };
  
  // 生成当前楼层的敌人
  useEffect(() => {
    generateFloorEnemy();
    
    // 清理函数，在组件卸载时确保战斗状态正确保存
    return () => {
      // 不需要在返回时做特殊处理，因为我们希望保留当前楼层
      // 只需要确保战斗状态被清除
      updateGameState({ currentBattle: undefined });
    };
  }, [currentFloor]);
  
  // 当爬塔统计数据变化时，更新游戏状态
  useEffect(() => {
    updateTowerProgress({
      highestFloor: towerStats.highestFloor,
      totalAttempts: towerStats.totalAttempts,
      totalSuccesses: towerStats.totalSuccesses
    });
  }, [towerStats]);
  
   // 生成当前楼层的敌人
  const generateFloorEnemy = () => {
    // 获取所有怪物数据
    const allMonsters = getAllMonsters();
    
     // 根据当前楼层确定应该出现的怪物品质
    const getRequiredRarity = (floor: number): string => {
      // 每10层为一轮，计算在当前轮中的层数
      const floorInRound = (floor - 1) % 10 + 1;
      
      if (floorInRound <= 3) {
        return "普通";
      } else if (floorInRound <= 5) {
        return "高级";
      } else if (floorInRound <= 7) {
        return "稀有";
      } else if (floorInRound <= 9) {
        return "史诗";
      } else {
        return "传说";
      }
    };
    
    const requiredRarity = getRequiredRarity(currentFloor);
    
    // 计算当前怪物等级：初始等级为1级，每通过10层所有怪物等级提升1级
    const calculateMonsterLevel = (floor: number): number => {
      return 1 + Math.floor((floor - 1) / 10);
    };
    
    const monsterLevel = calculateMonsterLevel(currentFloor);
    // 筛选出符合品质要求的怪物
    const eligibleMonsters = allMonsters.filter(monster => monster.rarity === requiredRarity);
    
    // 如果没有符合条件的怪物，使用默认模板（防止错误）
    if (eligibleMonsters.length === 0) {
      // 随机选择一个怪物模板
      const templateIndex = Math.floor(Math.random() * monsterTemplates.length);
      const baseMonster = monsterTemplates[templateIndex];
      
                // 根据怪物等级调整属性（只与等级相关，不再受层数影响）
              const levelMultiplier = 1 + (monsterLevel - 1) * 0.5; // 每级提升50%基础属性
              
              // 计算最终属性
              const finalStats = {
               hp: Math.floor(baseMonster.stats.hp * levelMultiplier),
               attack: Math.floor(baseMonster.stats.attack * levelMultiplier),
               defense: Math.floor(baseMonster.stats.defense * levelMultiplier)
             };
              
              // 创建完整的敌人对象
              const enemy: Character = {
                ...baseMonster,
                id: `${baseMonster.name}_${Date.now()}`,
                stats: finalStats,
                spriteUrl: monsterSpriteUrls[templateIndex],
                level: monsterLevel
              };
      
      setCurrentEnemy(enemy);
    } else {
      // 从符合条件的怪物中随机选择一个
      const randomMonster = eligibleMonsters[Math.floor(Math.random() * eligibleMonsters.length)];
      
            // 根据怪物等级调整属性（只与等级相关，不再受层数影响）
          const levelMultiplier = 1 + (monsterLevel - 1) * 0.5; // 每级提升50%基础属性
          
          // 转换怪物数据为Character类型
          const enemy: Character = {
            id: `${randomMonster.id}_${Date.now()}`,
            name: randomMonster.name,
            description: randomMonster.description,
            spriteUrl: randomMonster.spriteUrl,
            level: monsterLevel,
            exp: 0,
            maxExp: 100,
            stats: {
             hp: Math.floor((randomMonster.stats?.hp || 100) * levelMultiplier),
             attack: Math.floor((randomMonster.stats?.attack || 10) * levelMultiplier),
             defense: Math.floor((randomMonster.stats?.defense || 5) * levelMultiplier)
           },
           skills: randomMonster.skills || []
      };
      
      setCurrentEnemy(enemy);
    }
    
      // 玩家总是先攻击
    setPlayerTurn(true);
    
     // 设置战斗日志
    const floorInRound = (currentFloor - 1) % 10 + 1;
    const currentRound = Math.floor((currentFloor - 1) / 10) + 1;
      // 计算当前怪物等级：初始等级为1级，每通过10层所有怪物等级提升1级
    
    let battleStartLog = [`第${currentRound}轮 第${floorInRound}层（总第${currentFloor}层）：遭遇了强大的敌人！`];
    
     // 添加怪物等级信息
    battleStartLog.push(`敌人等级: Lv.${monsterLevel}`);
    
    // 固定玩家先攻击
    battleStartLog.push('你先发起攻击！');
    
    setBattleLog(battleStartLog);
    setCurrentPlayerHp(player.characters[0].stats.hp);
    setBattleResult(null);
    setBattleStarted(true);
    setHeavyStrikeCounter(0); // 重置冷却计数器，允许首次使用重砍
    
    // 移除速度相关代码
    if (currentEnemy) {
      setTimeout(() => {
        if (!battleResult) {
          enemyAttack();
        }
      }, 1500);
    }
     
     // 移除不再需要的条件检查
    
    // 记录尝试次数
    updateTowerProgress({
      totalAttempts: (player.towerProgress?.totalAttempts || 0) + 1
    });
  };
  
  // 计算伤害
  const calculateDamage = (skillDamage: number, attackerAttack: number, defenderDefense: number, isPercentage: boolean = false) => {
    // 如果是百分比伤害，使用攻击力的百分比
    if (isPercentage) {
      const baseDamage = Math.floor(attackerAttack * skillDamage);
      const damage = Math.max(1, baseDamage - defenderDefense / 2);
      return damage;
    }
    
    // 基本伤害公式：技能伤害 + 攻击者攻击力 - 防御者防御力
    const damage = Math.max(1, Math.floor(skillDamage + attackerAttack - defenderDefense / 2));
    return damage;
  };
  
   // 玩家攻击
  const playerAttack = (skillIndex: number) => {
    if (!playerTurn || battleResult || !currentEnemy) return;
    
    const skill = playerSkills[skillIndex];
    
     // 检查是否是重砍技能且处于冷却中
    if (skill.id === 'heavy_strike' && heavyStrikeCounter > 0) {
      setBattleLog(prev => [...prev, `${player.name} 重砍技能尚未冷却完毕！需要先使用两次横斩。`]);
      return;
    }
    
     const damage = calculateDamage(skill.damage, player.characters[0].stats.attack, currentEnemy.stats.defense, skill.isPercentage);
    
    // 添加战斗日志
    setBattleLog(prev => [...prev, `${player.name} 使用了 ${skill.name}，对 ${currentEnemy.name} 造成了 ${damage} 点伤害！`]);
    
    // 播放攻击音效
    playSound('playerAttack');
    
    // 播放敌人被击中音效
    playSound('enemyHit');
    if (skill.id === 'slash') {
      // 使用横斩，减少冷却需求
      setHeavyStrikeCounter(prev => Math.max(0, prev - 1));
    } else if (skill.id === 'heavy_strike') {
      // 使用重砍，设置冷却需求为2次横斩
      setHeavyStrikeCounter(2);
    }
    
    // 减少敌人生命值
    const updatedEnemyHp = currentEnemy.stats.hp - damage;
    
    if (updatedEnemyHp <= 0) {
      // 敌人被击败，战斗胜利
      setBattleResult('victory');
      handleBattleVictory();
    } else {
      // 更新敌人生命值
      const updatedEnemy = {
        ...currentEnemy,
        stats: {
          ...currentEnemy.stats,
          hp: updatedEnemyHp
        }
      };
      setCurrentEnemy(updatedEnemy);
      
      // 玩家回合结束，进入敌人回合
      setPlayerTurn(false);
      
      // 短暂延迟后敌人攻击
      setTimeout(enemyAttack, 1500);
    }
  };
  
   // 敌人攻击
  const enemyAttack = () => {
    if (battleResult || !currentEnemy) return;
    
      // 随机选择一个技能
      const randomIndex = Math.floor(Math.random() * currentEnemy.skills.length);
      const enemySkill = currentEnemy.skills[randomIndex];
    
    // 检查是否是无伤害技能
    if (enemySkill.damage === 0) {
      // 根据技能描述应用相应效果
      applyNonDamageSkillEffect(enemySkill);
    } else {
      // 普通伤害技能
       const damage = calculateDamage(enemySkill.damage, currentEnemy.stats.attack, player.characters[0].stats.defense);
      
      // 添加战斗日志
      setBattleLog(prev => [...prev, `${currentEnemy.name} 使用了 ${enemySkill.name}，对你造成了 ${damage} 点伤害！`]);
      
      // 播放敌人攻击音效
      playSound('enemyAttack');
      
      // 播放玩家被击中音效
      playSound('playerHit');
      const updatedPlayerHp = currentPlayerHp - damage;
      setCurrentPlayerHp(updatedPlayerHp);
      
      if (updatedPlayerHp <= 0) {
        // 玩家被击败，战斗失败
        setBattleResult('defeat');
        handleBattleDefeat();
      }
    }
    
    // 无论技能是否有伤害，战斗继续
    if (currentPlayerHp > 0) {
      // 敌人回合结束，回到玩家回合
      setPlayerTurn(true);
    }
  };
  
   // 处理战斗胜利
   const handleBattleVictory = () => {
    // 播放胜利音效
    playSound('victory');
    
    // 记录击败的怪物
    if (currentEnemy) {
      addEncounteredMonster(currentEnemy.id);
    }
    
    // 更新爬塔进度
    const newFloor = currentFloor + 1;
    setCurrentFloor(newFloor);
    
     // 更新最高楼层记录
    const newHighestFloor = Math.max(towerStats.highestFloor, currentFloor);
    setTowerStats(prev => ({
      ...prev,
      highestFloor: newHighestFloor,
      totalSuccesses: prev.totalSuccesses + 1
    }));
    
    // 更新游戏状态
    updateTowerProgress({
      currentFloor: newFloor,
      highestFloor: newHighestFloor,
      totalSuccesses: (player.towerProgress?.totalSuccesses || 0) + 1
    });
    
      // 计算当前处于第几轮
    const currentRound = Math.floor((currentFloor - 1) / 10) + 1;
    
    // 每通过一层都给予金币奖励：第一轮每层10金币，第二轮每层20金币，以此类推
    const goldReward = currentRound * 10;
    updateGameState({
      player: {
        ...player,
        gold: player.gold + goldReward
      }
    });
    
    // 显示奖励信息
    toast.success(`成功通过第${currentFloor}层！获得${goldReward}金币！`);
    
    // 如果是一轮的最后一层，额外显示轮次完成提示
    if (currentFloor % 10 === 0) {
      toast.info(`恭喜完成第${currentRound}轮挑战！下一轮每层奖励将增加到${(currentRound + 1) * 10}金币！`);
    }
    
     // 根据新规则，不再获得材料奖励
    
     // 重置冷却计数器，进入下一层可以再次使用重砍
    setHeavyStrikeCounter(0);
  };
  
  // 应用无伤害技能效果
 const applyNonDamageSkillEffect = (skill: any) => {
   let logMessage = `${currentEnemy.name} 使用了 ${skill.name}！`;
   
   // 根据技能描述判断效果类型
   if (skill.description.includes('无法命中')) {
     // 降低玩家命中
     logMessage += ' 你的下一次攻击可能无法命中！';
   } else if (skill.description.includes('伤害减半')) {
     // 降低玩家伤害
     logMessage += ' 你的下一次攻击伤害将减半！';
   } else if (skill.description.includes('降低防御力')) {
     // 降低玩家防御
     logMessage += ' 你的防御力暂时下降！';
   } else if (skill.description.includes('冻结')) {
     // 冻结效果，有概率使玩家无法行动
     if (Math.random() < 0.3) { // 30%概率
       logMessage += ' 你被冻结了，无法行动！';
       // 实际实现中这里应该添加状态标记
     } else {
       logMessage += ' 但你成功躲避了冻结效果！';
     }
   } else if (skill.description.includes('召唤')) {
     // 召唤效果
     logMessage += ' 召唤了帮手！';
   } else if (skill.description.includes('提升自身防御力')) {
     // 提升自身防御力效果 - 实际增加防御力
     const defenseIncrease = Math.floor(currentEnemy.stats.defense * 0.3); // 提升30%防御力
     const updatedEnemy = {
       ...currentEnemy,
       stats: {
         ...currentEnemy.stats,
         defense: currentEnemy.stats.defense + defenseIncrease
       }
     };
     setCurrentEnemy(updatedEnemy);
     logMessage += ` 防御力提升了 ${defenseIncrease} 点！`;
   } else if (skill.description.includes('提升自身攻击力')) {
     // 提升自身攻击力效果 - 实际增加攻击力
     const attackIncrease = Math.floor(currentEnemy.stats.attack * 0.2); // 提升20%攻击力
     const updatedEnemy = {
       ...currentEnemy,
       stats: {
         ...currentEnemy.stats,
         attack: currentEnemy.stats.attack + attackIncrease
       }
     };
     setCurrentEnemy(updatedEnemy);
     logMessage += ` 攻击力提升了 ${attackIncrease} 点！`;
   } else if (skill.description.includes('提升自身')) {
     // 提升自身属性
     logMessage += ' 提升了自身能力！';
   } else {
     // 默认效果
     logMessage += ' 产生了特殊效果！';
   }
   
   // 添加战斗日志
   setBattleLog(prev => [...prev, logMessage]);
 };
  
  // 处理战斗失败
   const handleBattleDefeat = () => {
    // 播放失败音效
    playSound('defeat');
    
    // 重置到第一层
    setCurrentFloor(1);
    setTowerStats(prev => ({
      ...prev,
      currentFloor: 1
    }));
    
    // 更新游戏状态
    updateTowerProgress({
      currentFloor: 1
    });
    
    // 显示失败信息
    toast.error(`挑战失败！你在第${currentFloor}层被击败了。回到第一层重新开始挑战吧！`);
  };
  
   // 重置爬塔（只重置当前楼层，不重置最高记录）
  const resetTower = () => {
    if (window.confirm('确定要重置爬塔进度吗？这将回到第一层，但不会影响你的最高记录。')) {
      setCurrentFloor(1);
      updateTowerProgress({
        currentFloor: 1
      });
      toast.info('爬塔进度已重置，回到第一层。最高记录仍然保留。');
    }
  };
  
    // 返回战斗模式选择
  const returnToBattle = () => {
    // 确保在返回前保存当前进度
    updateTowerProgress({
      currentFloor,
      highestFloor: towerStats.highestFloor,
      totalAttempts: towerStats.totalAttempts,
      totalSuccesses: towerStats.totalSuccesses
    });
    
    // 然后导航回战斗模式选择页面
    navigate("/battle");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
         {/* 返回按钮 */}
        <div className="mb-4 flex justify-between">
          <button onClick={returnToBattle}>
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回战斗模式选择
            </PixelButton>
          </button>
          
           <PixelButton 
            className="text-sm py-2 px-4 bg-red-600 hover:bg-red-700 border-red-800"
            onClick={resetTower}
            title="重置当前进度，但会保留最高记录">
            <i className="fas fa-redo-alt mr-2"></i>重置爬塔
          </PixelButton>
        </div>
        
        {/* 爬塔标题 */}
        <h1 className="text-3xl font-bold text-center mb-4 text-purple-800 dark:text-purple-300 font-['Press_Start_2P',_cursive]">
          爬塔闯关
        </h1>
        
        {/* 爬塔统计 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border-4 border-purple-800 dark:border-purple-900">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">当前楼层</div>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{currentFloor}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">最高记录</div>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{towerStats.highestFloor}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">总胜利次数</div>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{towerStats.totalSuccesses}</div>
            </div>
          </div>
          
           {/* 楼层提示 */}
          <div className="mt-4 bg-amber-50 dark:bg-amber-900/30 p-3 rounded-md border-2 border-amber-300 dark:border-amber-700">
            <div className="flex items-start">
              <i className="fas fa-info-circle text-amber-500 mt-1 mr-2"></i>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                 {(() => {
                  const floorInRound = (currentFloor - 1) % 10 + 1;
                  const currentRound = Math.floor((currentFloor - 1) / 10) + 1;
                  let rarity = "";
                  
                  if (floorInRound <= 3) {
                    rarity = "普通";
                  } else if (floorInRound <= 5) {
                    rarity = "高级";
                  } else if (floorInRound <= 7) {
                    rarity = "稀有";
                  } else if (floorInRound <= 9) {
                    rarity = "史诗";
                  } else {
                    rarity = "传说";
                  }
                  
                   // 计算当前怪物等级：初始等级为1级，每通过10层所有怪物等级提升1级
                   const monsterLevel = 1 + Math.floor((currentFloor - 1) / 10);
                  
                   // 构建提示文案
                   let promptText = `第${currentRound}轮 第${floorInRound}层（总第${currentFloor}层）：`;
                   
                   if (floorInRound === 10) {
                     promptText += "最终挑战！";
                   }
                   
                   promptText += `将遭遇${rarity}品质 Lv.${monsterLevel} 怪物！`;
                   
                   return promptText;
                })()}
              </p>
            </div>
          </div>
        </div>
        
        {/* 战斗区域 */}
        {currentEnemy && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-purple-800 dark:border-purple-900 mb-6">
            {/* 战斗角色 */}
            <div className="flex justify-between items-center mb-8">
              {/* 玩家 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-blue-500 dark:border-blue-400 mb-2 mx-auto">
                  <img 
                    src={player.characters[0].spriteUrl} 
                    alt={player.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-blue-800 dark:text-blue-300">{player.name} Lv.{player.level}</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  HP: {currentPlayerHp}/{player.characters[0].stats.hp}
                </div>
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 mx-auto">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(currentPlayerHp / player.characters[0].stats.hp) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* VS标记 */}
              <div className="text-2xl font-bold text-gray-500 dark:text-gray-400">
                VS
              </div>
              
              {/* 敌人 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-red-500 dark:border-red-400 mb-2 mx-auto">
                  <img 
                    src={currentEnemy.spriteUrl} 
                    alt={currentEnemy.name} 
                    className="w-full h-full object-contain"
                  />
                 </div>
                 <h3 className="font-bold text-red-800 dark:text-red-300">{currentEnemy.name} Lv.{currentEnemy.level}</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  HP: {currentEnemy.stats.hp}
                </div>
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 mx-auto">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* 战斗日志 */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 mb-6 h-32 overflow-y-auto">
              {battleLog.map((log, index) => (
                <p key={index} className="text-sm text-gray-800 dark:text-gray-300 mb-1">
                  {log}
                </p>
              ))}
            </div>
            
            {/* 战斗控制 */}
               {battleResult === null ? (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-purple-700 dark:text-purple-400">选择技能</h3>
                  {/* 自动战斗开关 */}
                  <div className="flex items-center">
                    <span className={`mr-2 text-sm ${autoBattle ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      自动战斗
                    </span>
                    <button 
                      className={`w-12 h-6 rounded-full flex items-center ${
                        autoBattle 
                          ? 'bg-green-500 justify-end' 
                          : 'bg-gray-300 dark:bg-gray-600 justify-start'
                      }`}
                      onClick={() => setAutoBattle(!autoBattle)}
                    >
                      <div className="w-4 h-4 bg-white rounded-full mr-1 ml-1"></div>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   {playerSkills.map((skill, index) => (
                        <div key={index} className="relative">
                          <PixelButton 
                           key={index} 
                           className={`relative bg-purple-600 hover:bg-purple-700 border-purple-800 ${
                             skill.id === 'heavy_strike' && heavyStrikeCounter > 0 
                               ? 'opacity-70' 
                               : ''
                           }`}
                            onClick={() => playerAttack(index)}
                            disabled={!playerTurn || (skill.id === 'heavy_strike' && heavyStrikeCounter > 0)}
                          >
                            <div className="flex items-center justify-center">
                              <i className="fas fa-magic mr-2"></i>
                              <div className="text-center">
                                <div>{skill.name}</div>
                                <div className="text-xs mt-1">
                                   {skill.id === 'heavy_strike' && heavyStrikeCounter > 0 
                                     ? (
                                       <span className="flex items-center justify-center">
                                         还需
                                         <span className="mx-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px]">
                                           {heavyStrikeCounter}
                                         </span>
                                         次横斩
                                       </span>
                                     ) 
                                     : `伤害: ${skill.damage}`
                                   }
                                </div>
                              </div>
                            </div>
                          </PixelButton>
                          
                          {/* 重砍技能冷却进度指示器 */}
                          {skill.id === 'heavy_strike' && heavyStrikeCounter > 0 && (
                            <div className="absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center">
                              <div className="relative w-8 h-8">
                                <svg className="w-8 h-8" viewBox="0 0 36 36">
                                  <circle 
                                    cx="18" 
                                    cy="18" 
                                    r="16" 
                                    fill="none" 
                                    stroke="#6b7280" 
                                    strokeWidth="2"
                                  />
                                  <circle 
                                    cx="18" 
                                    cy="18" 
                                    r="16" 
                                    fill="none" 
                                    stroke="#ec4899" 
                                    strokeWidth="2"
                                    strokeDasharray={`${2 * Math.PI * 16 * (1 - heavyStrikeCounter/2)} ${2 * Math.PI * 16}`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 18 18)"
                                    className="animate-pulse"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                                  {heavyStrikeCounter}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                   ))}
                </div>
              </div>
            ) : battleResult === 'victory' ? (
              <div className="text-center">
                <div className="text-4xl text-green-500 mb-4">
                  <i className="fas fa-trophy"></i>
                </div>
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                  挑战成功！
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  即将进入第{currentFloor}层...
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl text-red-500 mb-4">
                  <i className="fas fa-times-circle"></i>
                </div>
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
                  挑战失败！
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  回到第一层重新开始挑战
                </p>
              </div>
            )}
          </div>
        )}
        
         {/* 爬塔说明 */}
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md border-2 border-blue-300 dark:border-blue-700">
          <div className="flex items-start">
            <i className="fas fa-info-circle text-blue-500 mt-1 mr-2"></i>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                   爬塔闯关说明：每10层为一轮，每层将随机出现图鉴中的怪物。前3层只会出现普通品质怪物，第4-5层出现高级怪物，第6-7层出现稀有怪物，第8-9层出现史诗怪物，第10层出现传说怪物。所有怪物初始等级为1级，玩家每通过10层，所有怪物等级提升1级。怪物属性仅与等级相关，不再随层数提升而增强。金币奖励规则：玩家每通过一层即可获得金币奖励，第一轮每层10金币，第二轮每层20金币，依此类推！
            </p>
          </div>
          {/* 自动战斗说明 */}
          <div className="flex items-start mt-3">
            <i className="fas fa-robot text-blue-500 mt-1 mr-2"></i>
            <p className="text-sm text-blue-800 dark:text-blue-300">
                  自动战斗说明：开启自动战斗后，角色会自动选择技能进行攻击，优先使用重砍技能，在重砍冷却时使用横斩技能。自动战斗将持续直到击败敌人或关闭自动战斗开关。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}