import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';
import { toast } from 'sonner';
import { Character } from '@/lib/gameTypes';
import { useSoundEffects } from '@/hooks/useSoundEffects';

// 定义材料副本地图类型
interface MaterialMap {
  id: string;
  name: string;
  description: string;
  material: string;
  materialIconUrl: string;
  monsterType: string;
  monsterSpriteUrl: string;
  difficulty: number;
  baseMaterialReward: number;
  hasLevels?: boolean; // 是否有等级系统
}

export default function MaterialDungeon() {
  const { gameState, addMaterial } = useGame();
  const { player } = gameState;
  const navigate = useNavigate();
  const { playSound } = useSoundEffects();
  
  // 战斗状态
  const [currentMap, setCurrentMap] = useState<MaterialMap | null>(null);
  const [currentEnemy, setCurrentEnemy] = useState<Character | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [battleStarted, setBattleStarted] = useState(false);
  const [currentPlayerHp, setCurrentPlayerHp] = useState(player.characters[0].stats.hp);
  const [battleResult, setBattleResult] = useState<'victory' | 'defeat' | null>(null);
  const [heavyStrikeCounter, setHeavyStrikeCounter] = useState(0);
  // 关卡系统
  const [mapLevels, setMapLevels] = useState<Record<string, number>>(() => {
    // 从localStorage加载地图等级数据
    const savedLevels = localStorage.getItem('materialMapLevels');
    return savedLevels ? JSON.parse(savedLevels) : {};
  });
  const [currentLevel, setCurrentLevel] = useState(1);
  // 自动战斗状态
  const [autoBattle, setAutoBattle] = useState(false);
  const [autoBattleInterval, setAutoBattleInterval] = useState<number | null>(null);
  
  // 角色技能
  const playerSkills = player.characters[0].skills;
  
  // 自动战斗效果
  useEffect(() => {
    let interval: number | undefined;
    
    // 当开启自动战斗且当前是玩家回合时，自动选择技能
    if (autoBattle && playerTurn && !battleResult) {
      interval = window.setInterval(() => {
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
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoBattle, playerTurn, battleResult, heavyStrikeCounter]);
  
  // 战斗失败时关闭自动战斗
  useEffect(() => {
    if (battleResult === 'defeat') {
      setAutoBattle(false);
    }
  }, [battleResult]);
  
  // 处理自动战斗开关
  const toggleAutoBattle = () => {
    if (autoBattle) {
      setAutoBattle(false);
    } else {
      setAutoBattle(true);
    }
  };
  
  // 定义七个材料副本地图
  const materialMaps: MaterialMap[] = [
  {
      id: 'wood_map',
      name: '森林采伐场',
      description: '茂密的森林中生长着大量木材，击败守卫森林的怪物来收集木材吧！每通关一关，获得的木材数量将增加！',
      material: '木材',
      materialIconUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5',
      monsterType: '森林精灵',
      monsterSpriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20forest%20spirit%20monster%208bit&sign=b9a5c1da5e527fb8bced2a593982c57f',
      difficulty: 1,
      baseMaterialReward: 5,
      hasLevels: true // 森林采伐场有等级系统
    },
    {
      id: 'copper_map',
      name: '铜矿洞穴',
      description: '潮湿的洞穴中蕴藏着丰富的铜矿，小心里面的爬虫类怪物！每通关一关，获得的铜矿数量将增加！',
      material: '铜矿',
      materialIconUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e',
      monsterType: '洞穴爬虫',
      monsterSpriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20cave%20crawler%20monster%208bit&sign=d5e49431960a3f51dce64bb10082405a',
      difficulty: 2,
      baseMaterialReward: 4,
      hasLevels: true // 铜矿洞穴有等级系统
    },
    {
      id: 'iron_map',
      name: '钢铁矿脉',
      description: '高温的火山地带中有丰富的铁矿，击败耐热的怪物来获取铁矿！每通关一关，获得的铁矿数量将增加！',
      material: '铁矿',
      materialIconUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84',
      monsterType: '火山魔怪',
      monsterSpriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20fire%20monster%208bit%20volcano&sign=2e3fd2456f01c9df8d81bf01447495a6',
      difficulty: 3,
      baseMaterialReward: 3,
      hasLevels: true // 钢铁矿脉有等级系统
    },
    {
      id: 'silver_map',
      name: '月光银矿',
      description: '只有在月光下才会显现的神秘银矿，由夜行怪物守护着。每通关一关，获得的银矿数量将增加！',
      material: '银矿',
      materialIconUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1',
      monsterType: '夜影生物',
      monsterSpriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20shadow%20monster%208bit%20night&sign=59fcecce69dcb4f5b44a2a9ef7b13db7',
      difficulty: 4,
      baseMaterialReward: 2,
      hasLevels: true // 月光银矿有等级系统
    },
    {
      id: 'gold_map',
      name: '黄金矿洞',
      description: '深藏地下的黄金矿洞，里面的守卫非常强大！每通关一关，获得的金矿数量将增加！',
      material: '金矿',
      materialIconUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac',
      monsterType: '黄金守卫',
      monsterSpriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20golem%20monster%208bit&sign=4f8127cb2e22ba34f882f7c17e68dff1',
      difficulty: 5,
      baseMaterialReward: 2,
      hasLevels: true // 黄金矿洞有等级系统
    },
    {
      id: 'diamond_map',
      name: '钻石矿坑',
      description: '极寒地带的钻石矿坑，里面有冰属性的强大怪物在守护。每通关一关，获得的钻石矿数量将增加！',
      material: '钻石矿',
      materialIconUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20diamond%20ore%208bit&sign=8a6e58354d057cc5a11ab956436ceddd',
      monsterType: '冰晶巨人',
      monsterSpriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20giant%20monster%208bit&sign=3d6e938959f858b58f6b9ed0df2ab41d',
      difficulty: 6,
      baseMaterialReward: 1,
      hasLevels: true // 钻石矿坑有等级系统
    },
    {
      id: 'meteor_map',
      name: '陨石坠落点',
      description: '天外陨石坠落的神秘区域，蕴含着强大的陨石能量。每通关一关，获得的陨石矿数量将增加！',
      material: '陨石矿',
      materialIconUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20meteorite%20ore%208bit%20glowing&sign=f9832543d18a824d5837c65b09e99892',
      monsterType: '星空使者',
      monsterSpriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20space%20entity%20monster%208bit%20meteorite&sign=2950bc661095eb43cd5b036d524b7f86',
      difficulty: 7,
      baseMaterialReward: 1,
      hasLevels: true // 陨石坠落点有等级系统
    }
  ];

  // 定义怪物接口
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
    };
    skills?: {
      name: string;
      description: string;
      damage: number;
    }[];
  }

  // 获取所有怪物数据
  const getAllMonsters = (): Monster[] => {
    return [
      {
        id: "corrupted_slime",
        name: "腐化史莱姆",
        description: "绿色粘液生物，缓慢移动，腐蚀武器。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20corrupted%20green%20slime%20monster%208bit&sign=a64959841c2b65e080665a7df610b3fb",
        type: "毒属性",
        rarity: "普通",
        stats: { hp: 60, attack: 6, defense: 3 },
        skills: [
          { name: "腐蚀攻击", description: "用带有腐蚀性的粘液攻击敌人", damage: 6 }
        ]
      },
      {
        id: "stray_dog",
        name: "流浪野狗",
        description: "饥饿的野兽，主动攻击但脆弱。",
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
        description: "成群出现，吸血但怕火。",
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
        description: "喷射蛛网和毒液，移动迅速。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20venomous%20spider%20monster%208bit%20poison%20fangs&sign=b8f6863611d2fc118874018785a812e2",
        type: "毒属性",
        rarity: "高级",
        stats: { hp: 120, attack: 12, defense: 5 },
        skills: [
          { name: "毒液喷射", description: "从毒牙中喷射出致命毒液", damage: 12 },
          { name: "蛛网束缚", description: "喷射粘性蛛网，降低敌人的移动速度", damage: 0 }
        ]
      },
      {
        id: "armored_skeleton",
        name: "铠甲骷髅",
        description: "持剑盾的不死生物，格挡攻击。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20armored%20skeleton%20monster%208bit%20sword%20shield&sign=57499136fab675785f01b653a7c9f46e",
        type: "暗属性",
        rarity: "高级",
        stats: { hp: 150, attack: 14, defense: 18 },
        skills: [
          { name: "剑盾连击", description: "用盾牌撞击后迅速挥剑攻击", damage: 14 },
          { name: "钢铁壁垒", description: "举起盾牌形成坚固防御", damage: 0 }
        ]
      },
      {
        id: "swamp_murloc",
        name: "沼泽鱼人",
        description: "群体行动，投掷鱼叉。",
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
        description: "两个头分别施法和攻击，混乱仇恨。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20two-headed%20ogre%20monster%208bit%20chaos%20magical&sign=c38d810374bab831908d8c943a9be587",
        type: "地属性",
        rarity: "稀有",
        stats: { hp: 200, attack: 18, defense: 12 },
        skills: [
          { name: "双脑连击", description: "两个脑袋同时发动攻击", damage: 18 },
          { name: "混乱践踏", description: "愤怒地践踏地面，造成范围伤害", damage: 15 }
        ]
      },
      {
        id: "shadow_panther",
        name: "暗影猎豹",
        description: "隐身突袭，暴击率高。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20shadow%20panther%20monster%208bit%20stealth%20critical&sign=fe59101d66bb7f4c0f8ed32af9e1cfa5",
        type: "暗属性",
        rarity: "稀有",
        stats: { hp: 140, attack: 24, defense: 6 },
        skills: [
          { name: "暗影突袭", description: "隐身接近敌人后发动猛烈攻击", damage: 24 },
          { name: "黑暗遮蔽", description: "释放黑暗能量，降低敌人的命中和速度", damage: 0 }
        ]
      },
      {
        id: "ice_lich",
        name: "寒冰巫妖",
        description: "释放冰环冻结，免疫冰伤。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20lich%20monster%208bit%20frost%20immune&sign=5a799a31c6d3fb6ae829a53c3521c23b",
        type: "冰属性",
        rarity: "稀有",
        stats: { hp: 180, attack: 20, defense: 10 },
        skills: [
          { name: "冰霜新星", description: "释放冰环冻结周围敌人", damage: 20 },
          { name: "永恒寒冬", description: "召唤暴风雪，对敌人造成持续冰属性伤害", damage: 12 }
        ]
      },
      // 史诗怪物
      {
        id: "cerberus",
        name: "地狱三头犬",
        description: "三个头分别喷火/毒/暗影，范围攻击。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20cerberus%20monster%208bit%20three%20heads%20fire%20poison%20shadow&sign=9f85348c11d6d0e4a5831355af24f564",
        type: "暗属性",
        rarity: "史诗",
        stats: { hp: 250, attack: 22, defense: 15 },
        skills: [
          { name: "地狱吐息", description: "三个头同时喷吐三种元素", damage: 22 },
          { name: "地狱束缚", description: "释放黑暗锁链束缚敌人", damage: 0 }
        ]
      },
      {
        id: "undead_dragon_rider",
        name: "死灵龙骑",
        description: "骷髅龙骑士，冲锋+亡灵召唤。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20undead%20dragon%20rider%20monster%208bit%20skeleton%20mount%20summon&sign=053bfae277fc954de7439eb629fa1d83",
        type: "暗属性",
        rarity: "史诗",
        stats: { hp: 220, attack: 25, defense: 18 },
        skills: [
          { name: "死亡冲锋", description: "驾驭骨龙向前冲锋", damage: 25 },
          { name: "亡灵召唤", description: "召唤两名骷髅士兵为其战斗", damage: 0 }
        ]
      },
      {
        id: "fire_demon_lord",
        name: "炎魔领主",
        description: "点燃地面，持续火焰伤害。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20fire%20demon%20lord%20monster%208bit%20lava%20ground%20burning&sign=89bb2a50cacd7cf0c253aadf3c78f75e",
        type: "火属性",
        rarity: "史诗",
        stats: { hp: 280, attack: 26, defense: 12 },
        skills: [
          { name: "熔岩喷发", description: "从地面召唤熔岩喷发", damage: 26 },
          { name: "火焰领域", description: "点燃周围地面，造成持续伤害", damage: 10 }
        ]
      },
      // 传说怪物
      {
        id: "nine_tailed_fox",
        name: "九尾妖狐",
        description: "魅惑控制，幻术制造迷宫。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20nine-tailed%20fox%20monster%208bit%20illusions%20maze&sign=1b44774db511e31dd10455b669838cb7",
        type: "火属性",
        rarity: "传说",
        stats: { hp: 300, attack: 35, defense: 15 },
        skills: [
          { name: "魅惑术", description: "魅惑敌人，使其无法行动", damage: 0 },
          { name: "幻术迷宫", description: "制造幻术迷宫，造成持续伤害", damage: 15 },
          { name: "九尾连击", description: "九条尾巴同时发动攻击", damage: 35 }
        ]
      },
      {
        id: "ice_phoenix",
        name: "冰霜凤凰",
        description: "死亡后涅槃重生，强化冰系技能。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20phoenix%20monster%208bit%20rebirth%20frost&sign=e03639c376dcc8913bf756335002c682",
        type: "冰属性",
        rarity: "传说",
        stats: { hp: 350, attack: 30, defense: 20 },
        skills: [
          { name: "冰风暴", description: "召唤强烈的冰风暴", damage: 30 },
          { name: "冰之守护", description: "创造冰之护盾", damage: 0 },
          { name: "涅槃重生", description: "死亡后立即复活", damage: 0 }
        ]
      },
      {
        id: "abyssal_worm",
        name: "深渊蠕虫",
        description: "钻地突袭，吞噬玩家并消化。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20abyssal%20worm%20monster%208bit%20burrowing%20swallow&sign=fa0410899e297bcaf3d5d928a71e460e",
        type: "地属性",
        rarity: "传说",
        stats: { hp: 400, attack: 40, defense: 18 },
        skills: [
          { name: "钻地突袭", description: "潜入地下，然后突然钻出地面攻击", damage: 40 },
          { name: "深渊吞噬", description: "张开血盆大口吞噬敌人", damage: 20 },
          { name: "地动山摇", description: "震动地面，造成范围伤害", damage: 25 }
        ]
      }
    ];
  };

  // 获取当前拥有的材料数量
  const getPlayerMaterialCount = (materialName: string): number => {
    return player.craftingMaterials?.[materialName] || 0;
  };
  
  // 获取地图的当前等级
  const getMapCurrentLevel = (mapId: string): number => {
    return mapLevels[mapId] || 1;
  };

  // 生成当前地图的敌人
  const generateMapEnemy = (map: MaterialMap) => {
    // 根据地图难度和关卡调整敌人属性
    const baseHp = 100 + map.difficulty * 50;
    const baseAttack = 10 + map.difficulty * 3;
    const baseDefense = 5 + map.difficulty * 2;
    
    // 如果地图有等级系统，根据当前等级增加敌人属性
    let hpMultiplier = 1;
    let attackMultiplier = 1;
    let defenseMultiplier = 1;
    
    if (map.hasLevels) {
      const level = getMapCurrentLevel(map.id);
      hpMultiplier = 1 + (level - 1) * 0.2; // 每级增加20%生命值
      attackMultiplier = 1 + (level - 1) * 0.15; // 每级增加15%攻击力
      defenseMultiplier = 1 + (level - 1) * 0.1; // 每级增加10%防御力
    }
    
     // 针对有等级系统的地图，实现怪物品质递增系统
    if ((map.id === 'wood_map' || map.id === 'copper_map' || map.id === 'iron_map' || map.id === 'silver_map' || map.id === 'gold_map' || map.id === 'diamond_map' || map.id === 'meteor_map') && map.hasLevels) {
      const level = getMapCurrentLevel(map.id);
      // 获取所有怪物数据
      const allMonsters = getAllMonsters();
      
        // 根据当前关卡确定应该出现的怪物品质
      const getRequiredRarity = (floor: number): string => {
        // 陨石坠落点特殊规则 - 每10关为一轮
        if (map.id === 'meteor_map') {
          const floorInRound = (floor - 1) % 10 + 1;
          if (floorInRound <= 6) {
            return "传说";
          } else {
            return "神话";
          }
        }
        // 钻石矿坑特殊规则
        else if (map.id === 'diamond_map') {
          // 每20关为一轮，计算在当前轮中的层数
          const floorInRound = (floor - 1) % 20 + 1;
          if (floorInRound <= 5) {
            return "高级";
          } else if (floorInRound <= 10) {
            return "稀有";
          } else if (floorInRound <= 13) {
            return "史诗";
          } else if (floorInRound <= 17) {
            return "传说";
          } else {
            return "神话";
          }
        }
         // 月光银矿和黄金矿洞特殊规则
        else if (map.id === 'silver_map' || map.id === 'gold_map') {
          // 每20关为一轮，计算在当前轮中的层数
          const floorInRound = (floor - 1) % 20 + 1;
          if (floorInRound <= 5) {
            return "普通";
          } else if (floorInRound <= 10) {
            return "高级";
          } else if (floorInRound <= 13) {
            return "稀有";
          } else if (floorInRound <= 17) {
            return "史诗";
          } else if (floorInRound <= 19) {
            return "传说";
          } else {
            return "神话";
          }
        }
         // 其他地图的原有规则
        else {
          // 每20关为一轮，计算在当前轮中的层数
          const floorInRound = (floor - 1) % 20 + 1;
          if (floorInRound <= 8) {
            return "普通";
          } else if (floorInRound <= 13) {
            return "高级";
          } else if (floorInRound <= 16) {
            return "稀有";
          } else if (floorInRound <= 19) {
            return "史诗";
          } else {
            return "传说";
          }
        }
      };
      
      const requiredRarity = getRequiredRarity(level);
      
      // 筛选出符合品质要求的怪物
      const eligibleMonsters = allMonsters.filter(monster => monster.rarity === requiredRarity);
      
      if (eligibleMonsters.length > 0) {
        // 从符合条件的怪物中随机选择一个
        const randomMonster = eligibleMonsters[Math.floor(Math.random() * eligibleMonsters.length)];
        
        // 转换怪物数据为Character类型
        const enemy: Character = {
          id: `${randomMonster.id}_${Date.now()}`,
          name: randomMonster.name,
          description: randomMonster.description,
          spriteUrl: randomMonster.spriteUrl,
          level: level, // 使用关卡数作为怪物等级
          exp: 0,
          maxExp: 100,
          stats: {
            hp: Math.floor((randomMonster.stats?.hp || baseHp) * hpMultiplier),
            attack: Math.floor((randomMonster.stats?.attack || baseAttack) * attackMultiplier),
            defense: Math.floor((randomMonster.stats?.defense || baseDefense) * defenseMultiplier)
          },
          skills: randomMonster.skills ? randomMonster.skills.map(skill => ({
            id: skill.name.toLowerCase().replace(/\s+/g, '_'),
            name: skill.name,
            description: skill.description,
            damage: skill.damage,
            cost: 0,
            element: "earth",
            isPercentage: true
          })) : [
            {
              id: "basic_attack",
              name: "基础攻击",
              description: "普通的物理攻击",
              damage: 1.0,
              cost: 0,
              element: "earth",
              isPercentage: true
            }
          ]
        };
        
        return enemy;
      }
    }
    
    // 默认敌人生成逻辑（其他地图使用）
    const enemy: Character = {
      id: `${map.monsterType}_${Date.now()}`,
      name: map.monsterType,
      description: `守护${map.name}的强大怪物`,
      spriteUrl: map.monsterSpriteUrl,
      level: 1 + Math.floor((map.difficulty - 1) / 2),
      exp: 0,
      maxExp: 100,
      stats: {
        hp: Math.floor(baseHp * hpMultiplier),
        attack: Math.floor(baseAttack * attackMultiplier),
        defense: Math.floor(baseDefense * defenseMultiplier)
      },
      skills: [
        {
          id: "basic_attack",
          name: "基础攻击",
          description: "普通的物理攻击",
          damage: 1.0,
          cost: 0,
          element: "earth",
          isPercentage: true
        }
      ]
    };
    
    return enemy;
  };
  
  // 开始挑战地图
  const startMapChallenge = (map: MaterialMap) => {
    setCurrentMap(map);
    const enemy = generateMapEnemy(map);
    setCurrentEnemy(enemy);
    
    // 设置当前关卡
    if (map.hasLevels) {
      setCurrentLevel(getMapCurrentLevel(map.id));
    } else {
      setCurrentLevel(1);
    }
    
    // 初始化战斗状态
    const levelText = map.hasLevels ? `第${currentLevel}关` : '';
    setBattleLog([`进入了${map.name}${levelText}，遭遇了${enemy.name}！`]);
    setPlayerTurn(true);
    setBattleStarted(true);
    setCurrentPlayerHp(player.characters[0].stats.hp);
    setBattleResult(null);
    setHeavyStrikeCounter(0);
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
        return;
      }
    }
    
    // 敌人回合结束，回到玩家回合
    setPlayerTurn(true);
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
  
   // 处理战斗胜利
  const handleBattleVictory = () => {
    if (!currentMap) return;
    
    // 播放胜利音效
    playSound('victory');
    
    // 计算材料奖励数量
    let materialReward;
    
     // 如果地图有等级系统，根据当前等级计算奖励
    if (currentMap.hasLevels) {
      // 基础奖励 + 等级奖励（等级越高，奖励越多）
                 let levelBonusMultiplier = 1.5; // 默认木材每关增加1.5个
              if (currentMap.id === 'copper_map') levelBonusMultiplier = 1.2; // 铜矿每关增加1.2个
              if (currentMap.id === 'iron_map') levelBonusMultiplier = 1.0; // 铁矿每关增加1.0个
              if (currentMap.id === 'silver_map') levelBonusMultiplier = 0.8; // 银矿每关增加0.8个
              if (currentMap.id === 'gold_map') levelBonusMultiplier = 0.6; // 金矿每关增加0.6个
              if (currentMap.id === 'diamond_map') levelBonusMultiplier = 0.5; // 钻石矿每关增加0.5个
              if (currentMap.id === 'meteor_map') levelBonusMultiplier = 0.4; // 陨石矿每关增加0.4个
              const levelBonus = Math.floor(currentLevel * levelBonusMultiplier);
      const bonusFactor = 0.9 + Math.random() * 0.2; // 90% - 110% 之间的随机系数
      materialReward = Math.floor((currentMap.baseMaterialReward + levelBonus) * bonusFactor);
      
      // 升级当前地图的等级
      const newLevel = currentLevel + 1;
      const updatedLevels = {
        ...mapLevels,
        [currentMap.id]: newLevel
      };
      setMapLevels(updatedLevels);
      
      // 保存到localStorage
      localStorage.setItem('materialMapLevels', JSON.stringify(updatedLevels));
      
                    // 显示奖励信息
                  toast.success(`挑战成功！获得了 ${materialReward} 个${currentMap.material}！`);
                  toast.info(`已通过第${currentLevel}关，即将进入第${newLevel}关！`);
                  
                      // 如果开启了自动战斗，并且是有等级系统的地图，自动进入下一关
                  if (autoBattle) {
                    setTimeout(() => {
          startMapChallenge(currentMap);
        }, 1000);
      }
    } else {
      // 普通地图的奖励计算
      const bonusFactor = 0.8 + Math.random() * 0.4; // 80% - 120% 之间的随机系数
      materialReward = Math.floor(currentMap.baseMaterialReward * bonusFactor);
      
      // 显示奖励信息
      toast.success(`挑战成功！获得了 ${materialReward} 个${currentMap.material}！`);
    }
    
    // 添加材料奖励
    addMaterial(currentMap.material, materialReward);
    
    // 重置冷却计数器，准备下一次战斗
    setHeavyStrikeCounter(0);
  };
  
  // 处理战斗失败
   const handleBattleDefeat = () => {
    // 播放失败音效
    playSound('defeat');
    
    // 显示失败信息
    toast.error('挑战失败！再接再厉！');
    // 停止自动战斗
    setAutoBattle(false);
  };
  
  // 返回地图选择
  const returnToMapSelect = () => {
    setCurrentMap(null);
    setCurrentEnemy(null);
    setBattleLog([]);
    setBattleStarted(false);
    setBattleResult(null);
  };
  
  // 返回战斗模式选择
  const returnToBattle = () => {
    navigate("/battle");
  };
  
  // 获取难度对应的颜色
  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 2: return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 3: return 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/30';
      case 4: return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      case 5: return 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30';
      case 6: return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30';
      case 7: return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 dark:from-gray-900 dark:to-yellow-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4 flex justify-between">
          <button onClick={returnToBattle}>
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回战斗模式选择
            </PixelButton>
          </button>
          
          {currentMap && (
            <button onClick={returnToMapSelect}>
              <PixelButton className="text-sm py-2 px-4 bg-gray-600 hover:bg-gray-700 border-gray-800">
                <i className="fas fa-map mr-2"></i>返回地图选择
              </PixelButton>
            </button>
          )}
        </div>
        
        {/* 标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-yellow-800 dark:text-yellow-300 font-['Press_Start_2P',_cursive]">
          素材副本
        </h1>
        
        {/* 显示地图选择或战斗画面 */}
        {!currentMap ? (
          // 地图选择界面
          <>
            {/* 说明文字 */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md border-2 border-blue-300 dark:border-blue-700 mb-6">
              <div className="flex items-start">
                <i className="fas fa-info-circle text-blue-500 mt-1 mr-2"></i>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  素材副本是专门收集打造材料的地方。每个地图产出特定类型的材料，击败守卫的怪物即可获得材料奖励。根据你的装备打造需求，选择相应的地图进行挑战吧！
                </p>
              </div>
            </div>
            
            {/* 地图列表 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-yellow-800 dark:border-yellow-900 mb-6">
              <h2 className="text-xl font-bold mb-4 text-yellow-700 dark:text-yellow-400">
                选择副本
              </h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {materialMaps.map((map) => (
                  <div 
                    key={map.id}
                    className="flex p-3 bg-yellow-50 dark:bg-gray-700 rounded-md border-2 border-yellow-300 dark:border-yellow-700 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md relative overflow-hidden"
                    onClick={() => startMapChallenge(map)}
                  >
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden">
                      <img src={map.monsterSpriteUrl} alt={map.monsterType} className="w-full h-full object-contain" />
                    </div>
                       <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-yellow-800 dark:text-yellow-300">{map.name}</h3>
                        {map.hasLevels && (
                          <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full text-xs font-medium">
                            已通{getMapCurrentLevel(map.id) - 1}关
                          </div>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <div className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(map.difficulty)} inline-flex items-center mr-2`}>
                          <i className="fas fa-star mr-1"></i>
                          <span>难度 {map.difficulty}</span>
                        </div>
                        <div className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300 px-2 py-0.5 rounded-full">
                          {map.monsterType}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {map.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <img src={map.materialIconUrl} alt={map.material} className="w-4 h-4 mr-1" />
                          {map.hasLevels ? (
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {map.material} × {map.baseMaterialReward}+{Math.floor(getMapCurrentLevel(map.id) * 1.5)}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {map.material} × {map.baseMaterialReward}~{Math.floor(map.baseMaterialReward * 1.2)}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          持有: {getPlayerMaterialCount(map.material)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
             {/* 材料仓库提示 */}
          <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-md border-2 border-amber-300 dark:border-amber-700">
            <div className="flex items-start">
              <i className="fas fa-lightbulb text-amber-500 mt-1 mr-2"></i>
              <div>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  提示：收集到的材料会自动放入你的仓库。你可以在主界面的"仓库"中查看所有材料的数量。
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
                  副本中不会获得金币与经验，专注于收集你需要的材料吧！
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
                  森林采伐场、铜矿洞穴、钢铁矿脉、月光银矿、黄金矿洞、钻石矿坑和陨石坠落点已新增关卡系统和自动闯关功能！每20关为一轮，月光银矿和黄金矿洞的怪物分布为：1-5关普通怪物，6-10关高级怪物，11-13关稀有怪物，14-17关史诗怪物，18-19关传说怪物，20关神话怪物。钻石矿坑的怪物分布为：1-5关高级怪物，6-10关稀有怪物，11-13关史诗怪物，14-17关传说怪物，18-20关神话怪物。陨石坠落点的怪物分布为：每10关为一轮，1-6关传说怪物，7-10关神话怪物。所有怪物会根据图鉴中的怪物随机出现！所有地图均已支持自动闯关功能！
                </p>
              </div>
            </div>
          </div>
          </>
        ) : (
          // 战斗画面
          currentEnemy && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-yellow-800 dark:border-yellow-900 mb-6">
              {/* 战斗标题 */}
               <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-yellow-700 dark:text-yellow-400">
                  {currentMap.name}
                </h2>
                {currentMap.hasLevels && (
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium inline-block mb-2">
                    第{currentLevel}关
                  </div>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  目标：击败{currentEnemy.name}，收集{currentMap.material}
                </p>
              </div>
              
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
                  <h3 className="font-bold text-blue-800 dark:text-blue-300">{player.name}</h3>
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
                  <h3 className="font-bold text-red-800 dark:text-red-300">{currentEnemy.name}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    HP: {currentEnemy.stats.hp}
                  </div>
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 mx-auto">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${(currentEnemy.stats.hp / (100 + currentMap.difficulty * 50)) * 100}%` }}
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
              
               {/* 自动战斗开关 */}
              {battleResult === null && (
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-yellow-700 dark:text-yellow-400">选择技能</h3>
                  <div className="flex items-center">
                    <span className={`mr-2 text-sm ${autoBattle ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      自动闯关
                    </span>
                    <button 
                      className={`w-12 h-6 rounded-full flex items-center ${
                        autoBattle 
                          ? 'bg-green-500 justify-end' 
                          : 'bg-gray-300 dark:bg-gray-600 justify-start'
                      }`}
                      onClick={toggleAutoBattle}
                    >
                      <div className="w-4 h-4 bg-white rounded-full mr-1 ml-1"></div>
                    </button>
                  </div>
                </div>
              )}
              {/* 战斗控制 */}
              {battleResult === null ? (
                <div>
                  <h3 className="font-bold text-yellow-700 dark:text-yellow-400 mb-3">选择技能</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {playerSkills.map((skill, index) => (
                      <div key={index} className="relative">
                        <PixelButton 
                          key={index} 
                          className={`relative bg-yellow-600 hover:bg-yellow-700 border-yellow-800 ${
                            skill.id === 'heavy_strike' && heavyStrikeCounter > 0 
                              ? 'opacity-70' 
                              : ''
                          } ${autoBattle ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => !autoBattle && playerAttack(index)}
                          disabled={!playerTurn || (skill.id === 'heavy_strike' && heavyStrikeCounter > 0) || autoBattle}
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
                                  stroke="#f59e0b" 
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
                    获得了珍贵的{currentMap.material}！
                  </p>
                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {currentMap.hasLevels && (
                      <PixelButton 
                        className="bg-green-600 hover:bg-green-700 border-green-800"
                        onClick={() => startMapChallenge(currentMap)}
                      >
                        下一关
                      </PixelButton>
                    )}
                    <PixelButton 
                      className="bg-yellow-600 hover:bg-yellow-700 border-yellow-800"
                      onClick={() => startMapChallenge(currentMap)}
                    >
                      再次挑战
                    </PixelButton>
                    <PixelButton 
                      className="bg-gray-600 hover:bg-gray-700 border-gray-800"
                      onClick={returnToMapSelect}
                    >
                      返回地图选择
                    </PixelButton>
                  </div>
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
                    不要灰心，继续提升实力再来挑战吧！
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <PixelButton 
                      className="bg-yellow-600 hover:bg-yellow-700 border-yellow-800"
                      onClick={() => startMapChallenge(currentMap)}
                    >
                      重新挑战
                    </PixelButton>
                    <PixelButton 
                      className="bg-gray-600 hover:bg-gray-700 border-gray-800"
                      onClick={returnToMapSelect}
                    >
                      返回地图选择
                    </PixelButton>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}