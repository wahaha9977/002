import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import { useGame } from '@/contexts/gameContext';
  import { PixelButton } from '@/components/PixelButton';

  // 导入类型和数据
  import { ItemQuality, ItemCategory, Item } from '@/lib/gameTypes';
  import { craftableItems } from '@/lib/craftableItems';

  // 定义怪物类型
  interface Monster {
    id: string;
    name: string;
    description: string;
    spriteUrl: string;
    type: string;
    rarity: string;
    locations?: string[];
  }

  export default function Collection() {
    const { gameState } = useGame();
    const { player } = gameState;
    
  // 切换标签页状态
  const [activeTab, setActiveTab] = useState<'monsters' | 'equipment'>('monsters');
  // 装备筛选状态
  const [equipmentCategory, setEquipmentCategory] = useState<string>('all');
  const [equipmentQuality, setEquipmentQuality] = useState<string>('all');
  // 怪物筛选状态
  const [mapFilter, setMapFilter] = useState<string>('all');
  const [monsterRarityFilter, setMonsterRarityFilter] = useState<string>('all');

    // 获取部位对应的中文文本
    const getCategoryText = (category: ItemCategory): string => {
      switch(category) {
        case 'weapon': return '剑';
        case 'shield': return '盾牌';
        case 'helmet': return '头盔';
        case 'armor': return '铠甲';
        case 'shoes': return '靴子';
        case 'accessory': return '饰品';
        default: return '装备';
      }
    };

    // 获取品质对应的中文文本
    const getRarityText = (quality: ItemQuality): string => {
      switch(quality) {
        case 'common': return '普通';
        case 'advanced': return '高级';
        case 'rare': return '稀有';
        case 'epic': return '史诗';
        case 'legendary': return '传说';
        case 'mythic': return '神话';
        default: return '普通';
      }
    };

      // 所有可能的怪物数据
     const allMonsters: Monster[] = [
        {
         id: "corrupted_slime",
         name: "腐化史莱姆",
         description: "绿色粘液生物，缓慢移动，腐蚀武器。被它触碰的武器会暂时降低攻击力。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20corrupted%20green%20slime%20monster%208bit&sign=a64959841c2b65e080665a7df610b3fb",
         type: "毒属性",
         rarity: "普通",
         locations: ["宁静村庄-田野", "幽暗沼泽-泥潭", "起源之殿-腐朽回廊"],
         skills: [
           { name: "腐蚀攻击", description: "用带有腐蚀性的粘液攻击敌人，有几率降低攻击力" }
         ]
       },
       {
         id: "stray_dog",
         name: "流浪野狗",
         description: "饥饿的野兽，主动攻击但脆弱。通常独自行动，但饥饿时会变得格外凶猛。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20stray%20dog%20monster%208bit&sign=ddfe720f0f332c00ca0d9d3180c4c143",
         type: "地属性",
         rarity: "普通",
         locations: ["宁静村庄-道路", "幽暗沼泽-枯木林", "虚无秘境-破碎岛屿"]
       },
       {
         id: "cave_bat",
         name: "洞穴蝙蝠",
         description: "成群出现，吸血但怕火。在黑暗环境中视力极佳，依靠回声定位系统导航。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20cave%20bat%20monster%208bit&sign=fcd341af6aae021a3dad8758bcbf7e2e",
         type: "暗属性",
         rarity: "普通",
         locations: ["宁静村庄-洞穴", "凛冬山脉-冰洞", "熔火之心-熔岩洞"]
       },
       // 高级怪物
       {
         id: "venom_spider",
         name: "毒牙蜘蛛",
         description: "喷射蛛网和毒液，移动迅速。八条细长的腿让它在各种地形都能快速移动，毒牙中蕴含的剧毒能使猎物在短时间内丧失行动能力。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20venomous%20spider%20monster%208bit%20poison%20fangs&sign=b8f6863611d2fc118874018785a812e2",
         type: "毒属性",
        rarity: "高级",
        locations: ["宁静村庄-森林深处", "幽暗沼泽-蛛网区", "熔火之心-阴影角落", "起源之殿-暗影角落"],
        skills: [
          { name: "毒液喷射", description: "从毒牙中喷射出致命毒液，对敌人造成伤害，有50%概率使其中毒" },
          { name: "蛛网束缚", description: "喷射粘性蛛网，使敌人下回合有50%概率无法攻击" }
        ]
      },
       {
         id: "armored_skeleton",
         name: "铠甲骷髅",
         description: "持剑盾的不死生物，格挡攻击。曾经是古代王国的精锐士兵，即使死后依然坚守着战斗的本能，能够有效格挡大部分物理攻击。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20armored%20skeleton%20monster%208bit%20sword%20shield&sign=57499136fab675785f01b653a7c9f46e",
         type: "暗属性",
         rarity: "高级",
         locations: ["幽暗沼泽-沉船", "凛冬山脉-雪山古堡", "虚无秘境-虚空堡垒"]
       },
       {
         id: "swamp_murloc",
         name: "沼泽鱼人",
         description: "群体行动，投掷鱼叉。生活在潮湿沼泽中的类人生物，通常以群体形式出现，擅长使用简易鱼叉进行远程攻击，弱点是怕火。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20swamp%20murloc%20monster%208bit%20spear%20group&sign=2dcc228805831d3ea3e8198423b01096",
         type: "水属性",
         rarity: "高级",
         locations: ["幽暗沼泽-水域", "凛冬山脉-冰湖", "熔火之心-地下湖"]
       },
     // 稀有怪物
      {
        id: "two_headed_ogre",
        name: "双头食人魔",
        description: "两个头分别施法和攻击，混乱仇恨。一个头擅长物理攻击，另一个头可以释放简单的法术，常常因为意见不合而产生混乱。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20two-headed%20ogre%20monster%208bit%20chaos%20magical&sign=c38d810374bab831908d8c943a9be587",
        type: "地属性",
        rarity: "稀有",
        locations: ["宁静村庄-食人魔营地", "幽暗沼泽-部落营地", "凛冬山脉-部落", "虚无秘境-浮岛营地"]
      },
      {
        id: "shadow_panther",
        name: "暗影猎豹",
        description: "隐身突袭，暴击率高。能够融入黑暗中难以被发现，擅长出其不意的致命攻击，攻击时有很高几率造成暴击伤害。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20shadow%20panther%20monster%208bit%20stealth%20critical&sign=fe59101d66bb7f4c0f8ed32af9e1cfa5",
        type: "暗属性",
        rarity: "稀有",
         locations: ["幽暗沼泽-迷雾林", "凛冬山脉-雪松林", "熔火之心-黑石林", "起源之殿-星光小径"],
        skills: [
          { name: "暗影突袭", description: "隐身接近敌人后发动猛烈攻击，必定造成暴击" },
          { name: "黑暗遮蔽", description: "释放黑暗能量，使敌人下回合攻击无法命中" },
          { name: "影子分身", description: "制造一个影子分身，分担伤害并迷惑敌人，使敌人下回合造成的伤害减半" }
        ]
      },
      {
        id: "ice_lich",
        name: "寒冰巫妖",
        description: "释放冰环冻结，免疫冰伤。掌握着强大的冰系魔法，能够冻结周围的敌人，对冰属性攻击完全免疫，弱点是火属性。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20lich%20monster%208bit%20frost%20immune&sign=5a799a31c6d3fb6ae829a53c3521c23b",
        type: "冰属性",
        rarity: "稀有",
         locations: ["凛冬山脉-冰窟", "熔火之心-冷却区", "虚无秘境-寒冰岛"],
        skills: [
          { name: "冰霜新星", description: "释放冰环冻结周围敌人，造成伤害并有30%概率冻结敌人" },
          { name: "永恒寒冬", description: "召唤暴风雪，对敌人造成持续冰属性伤害，每回合额外造成少量伤害" },
          { name: "冰锥术", description: "从地面召唤锐利的冰锥刺向敌人，有30%概率冻结敌人" }
        ]
      },
     // 史诗怪物
      {
        id: "cerberus",
        name: "地狱三头犬",
        description: "三个头分别喷火/毒/暗影，范围攻击。来自地狱的看门犬，每个头都拥有不同的元素能力，能够同时发动三种不同属性的范围攻击。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20cerberus%20monster%208bit%20three%20heads%20fire%20poison%20shadow&sign=9f85348c11d6d0e4a5831355af24f564",
         type: "暗属性",
        rarity: "史诗",
        locations: ["宁静村庄-被封印的祭坛", "凛冬山脉-火焰洞", "熔火之心-岩浆河", "起源之殿-火焰厅"],
        skills: [
          { name: "地狱吐息", description: "三个头同时喷吐火、毒、暗影三种元素，对敌人造成多重伤害" },
          { name: "地狱束缚", description: "释放黑暗锁链束缚敌人，降低敌人防御力" },
          { name: "灵魂撕咬", description: "咬碎敌人的灵魂，造成持续伤害，使敌人每回合额外受到伤害" },
          { name: "地狱之门", description: "召唤地狱之力，提升自身攻击力与防御力" }
        ]
      },
      {
        id: "undead_dragon_rider",
        name: "死灵龙骑",
        description: "骷髅龙骑士，冲锋+亡灵召唤。古代骑士的灵魂与骨龙融合的产物，能够发动强力冲锋并召唤亡灵士兵助战。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20undead%20dragon%20rider%20monster%208bit%20skeleton%20mount%20summon&sign=053bfae277fc954de7439eb629fa1d83",
        type: "暗属性",
        rarity: "史诗",
         locations: ["幽暗沼泽-古战场遗迹", "凛冬山脉-龙巢", "熔火之心-王座", "虚无秘境-龙骨浮岛", "起源之殿-亡灵殿"],
        skills: [
          { name: "死亡冲锋", description: "驾驭骨龙向前冲锋，对路径上的敌人造成伤害" },
          { name: "亡灵召唤", description: "召唤两名骷髅士兵参与战斗，持续两回合（骷髅士兵属性：生命值50、攻击力6、防御力3，无技能）" },
          { name: "腐骨箭雨", description: "从骨龙口中喷出大量腐蚀箭枝，对敌人造成持续三回合的腐蚀伤害" },
          { name: "死亡契约", description: "牺牲部分生命值来提升攻击力和防御力" }
        ]
      },
      {
        id: "fire_demon_lord",
        name: "炎魔领主",
        description: "点燃地面，持续火焰伤害。火元素的统治者，能够点燃脚下的土地，对范围内的敌人造成持续的火焰伤害。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20fire%20demon%20lord%20monster%208bit%20lava%20ground%20burning&sign=89bb2a50cacd7cf0c253aadf3c78f75e",
        type: "火属性",
        rarity: "史诗",
        locations: ["熔火之心-核心", "虚无秘境-火焰岛"]
      },
     // 传说怪物
      {
        id: "nine_tailed_fox",
        name: "九尾妖狐",
        description: "魅惑控制，幻术制造迷宫。拥有九条尾巴的神秘狐狸，能够控制人心，制造复杂的幻术迷宫让对手迷失其中。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20nine-tailed%20fox%20monster%208bit%20illusions%20maze&sign=1b44774db511e31dd10455b669838cb7",
        type: "火属性",
        rarity: "传说",
        locations: ["宁静村庄-隐藏神社", "凛冬山脉-雪隐神社", "虚无秘境-幻境", "起源之殿-幻梦厅"]
      },
      {
        id: "ice_phoenix",
        name: "冰霜凤凰",
        description: "死亡后涅槃重生，强化冰系技能。冰蓝色的凤凰，在死亡时会浴火重生，重生后所有冰系技能威力大幅提升。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20phoenix%20monster%208bit%20rebirth%20frost&sign=e03639c376dcc8913bf756335002c682",
        type: "冰属性",
        rarity: "传说",
        locations: ["幽暗沼泽-冰封沼泽", "凛冬山脉-山顶", "熔火之心-冰火交界", "虚无秘境-极寒岛", "起源之殿-冰霜殿"]
      },
      {
        id: "abyssal_worm",
        name: "深渊蠕虫",
        description: "钻地突袭，吞噬玩家并消化。生活在地下深处的巨大蠕虫，能够在地下快速移动并突然钻出地面攻击，被吞噬的敌人会受到持续伤害。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20abyssal%20worm%20monster%208bit%20burrowing%20swallow&sign=fa0410899e297bcaf3d5d928a71e460e",
        type: "地属性",
        rarity: "传说",
        locations: ["熔火之心-熔岩隧道", "虚无秘境-虚空深渊", "起源之殿-虚空洞"]
      },
     // 神话怪物
      {
        id: "time_eater",
        name: "时空吞噬者",
         description: "扭曲时间，加速/减速/暂停技能。能够操控时间流逝的神秘生物，可以加速自身移动、减慢敌人动作，甚至短暂暂停时间。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20time%20eater%20monster%208bit%20space%20time%20distortion&sign=900faffd4676d96da66fe9ed3eee665f",
        type: "时间属性",
        rarity: "神话",
        locations: ["宁静村庄-时空裂缝", "熔火之心-混沌核心", "起源之殿-时钟回廊"],
        skills: [
          { name: "时间加速", description: "加速自身时间流动，使自身下次攻击时多攻击一次" },
          { name: "时间减速", description: "减慢敌人时间流动，使敌人下次攻击时无法造成伤害" },
          { name: "时间暂停", description: "短暂暂停时间，使敌人无法行动，同时自身回复生命值" },
          { name: "时空吞噬", description: "吞噬目标周围的时间能量，造成巨大伤害并吸取生命值" },
          { name: "时光倒流", description: "濒死时触发，使时间倒流，恢复自己的生命值至满状态（单次关卡仅限一次）" },
          { name: "时空断裂（专属）", description: "撕裂时空，对敌人造成无法闪避的伤害，并使其受到时间断裂效果影响" }
        ]
      },
      {
        id: "world_tree_root",
        name: "世界树之根",
         description: "无限再生，根须缠绕全球。世界树的地下根须，拥有强大的再生能力，能够生长出无数根须攻击敌人，即使被切断也能迅速恢复。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20world%20tree%20root%20monster%208bit%20infinite%20regeneration&sign=47e3d7e95c81e1635663a3b5845a714e",
        type: "自然属性",
        rarity: "神话",
        locations: ["幽暗沼泽-远古树洞", "虚无秘境-生命岛", "起源之殿-生命温室"],
        skills: [
          { name: "根须缠绕", description: "从地下伸出大量根须缠绕敌人，造成伤害并使其无法行动" },
           { name: "生命汲取", description: "吸收敌人的生命能量，恢复自身生命值" },
          { name: "自然护盾", description: "创造强大的自然护盾，大幅提升防御力" },
          { name: "无限再生", description: "在受到致命伤害时触发，瞬间恢复全部生命值并清除所有负面状态（单次关卡尽可发动一次）" },
          { name: "种子爆炸", description: "散播爆炸种子攻击敌人" },
           { name: "生命洪流（专属）", description: "召唤世界树的生命能量，恢复大量生命值并强化所有技能效果（持续五回合）" }
        ]
      },
      {
        id: "primeval_demon",
        name: "原初恶魔",
         description: "由宇宙中所有负面能量凝聚而成的恶魔，能够释放七种不同的罪恶之力，每次战斗都会随机使用不同的罪业技能。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20primeval%20demon%20monster%208bit%20seven%20sins%20rotating&sign=b726d6446df1bd0550833513e65efd84",
        type: "混沌属性",
        rarity: "神话",
        locations: ["凛冬山脉-雪山裂缝", "起源之殿-混沌核心"],
        skills: [
          { name: "傲慢冲击", description: "释放傲慢之力，对敌人造成巨大伤害并降低其攻击力" },
          { name: "嫉妒诅咒", description: "释放嫉妒之力，使敌人无法获得任何增益效果" },
          { name: "暴怒之焰", description: "释放暴怒之力，对范敌人造成持续火焰伤害，并使敌人进入灼烧状态" },
          { name: "懒惰光环", description: "释放懒惰之力，降低敌人的防御力" },
          { name: "贪婪吞噬", description: "释放贪婪之力，吞噬敌人的生命值并回复自身" },
          { name: "混沌领域（专属）", description: "创造混沌领域，使敌人陷入混乱状态并受到持续混沌伤害" }
        ]
      }
     ];

    // 获取所有怪物稀有度
    const allMonsterRarities = ['all', ...Array.from(new Set(allMonsters.map(monster => monster.rarity)))];

    // 获取所有地图
    const allMaps = ['all', '宁静村庄', '幽暗沼泽', '凛冬山脉', '熔火之心', '虚无秘境', '起源之殿'];
    
     // 过滤怪物列表
    const filterMonsters = (monsters: Monster[]) => {
      return monsters.filter(monster => {
        // 处理可能没有locations属性的情况
        const mapMatch = mapFilter === 'all' || 
                        (!monster.locations && mapFilter === 'all') || 
                        (monster.locations && monster.locations.some(location => 
                          location.includes(mapFilter)
                        ));
        const rarityMatch = monsterRarityFilter === 'all' || monster.rarity === monsterRarityFilter;
        return mapMatch && rarityMatch;
      });
    };

    // 转换可打造物品为图鉴所需格式并合并
    const allEquipment: (Item & { category: string; rarity: string })[] = craftableItems.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      spriteUrl: item.spriteUrl,
      type: item.type,
      effect: item.effect,
      price: item.price,
      stats: item.stats,
      quality: item.quality,
      category: getCategoryText(item.category), // 转换为中文
      rarity: getRarityText(item.quality) // 转换为中文
    }));

  // 获取所有装备分类
  const allEquipmentCategories = ['all', ...Array.from(new Set(allEquipment.map(item => item.category)))];
  
  // 获取所有装备品质
  const allEquipmentQualities = ['all', ...Array.from(new Set(allEquipment.map(item => item.rarity)))];
  
  // 过滤装备列表
  const filterEquipment = (equipment: (Item & { category: string; rarity: string })[]) => {
    return equipment.filter(item => {
      const categoryMatch = equipmentCategory === 'all' || item.category === equipmentCategory;
      const qualityMatch = equipmentQuality === 'all' || item.rarity === equipmentQuality;
      return categoryMatch && qualityMatch;
    });
  };

    // 获取属性文本
    const getStatsText = (stats?: { attack?: number; defense?: number; speed?: number; hp?: number }) => {
      if (!stats) return '';
      
      const statsArray: string[] = [];
      if (stats.attack) statsArray.push(`攻击 +${stats.attack}`);
      if (stats.defense) statsArray.push(`防御 +${stats.defense}`);
    if (stats.hp) statsArray.push(`生命 +${stats.hp}`);
    
    return statsArray.join(' | ');
    };

  // 获取装备类型对应的图标
    const getEquipmentTypeIcon = (type: string) => {
      switch (type) {
        case '剑': return 'fas fa-sword';
        case '盾牌': return 'fas fa-shield-alt';
        case '头盔': return 'fas fa-hard-hat';
        case '铠甲': return 'fas fa-user-shield';
        case '靴子': return 'fas fa-shoe-prints';
        case '饰品': return 'fas fa-gem';
        default: return 'fas fa-box';
      }
    };

  // 获取装备品质对应的颜色
  const getEquipmentQualityColor = (quality: string) => {
    switch (quality) {
      case '普通': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case '高级': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case '稀有': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case '史诗': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case '传说': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case '神话': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  // 获取怪物类型对应的颜色
  const getMonsterTypeColor = (type: string) => {
    switch (type) {
        case '水属性': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case '地属性': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case '风属性': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case '暗属性': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
        case '毒属性': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case '火属性': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        case '光属性': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      }
    };

    // 获取怪物稀有度对应的颜色
    const getMonsterRarityColor = (rarity: string) => {
      switch (rarity) {
        case '普通': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        case '高级': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case '稀有': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case '史诗': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case '传说': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case '神话': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex flex-col items-center justify-start p-4 relative">
        <div className="w-full max-w-2xl">
          {/* 返回按钮 */}
          <div className="mb-4">
            <Link to="/">
              <PixelButton className="text-sm py-2 px-4">
                <i className="fas fa-arrow-left mr-2"></i>返回
              </PixelButton>
            </Link>
          </div>

          {/* 图鉴标题 */}
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-800 dark:text-blue-300 font-['Press_Start_2P',_cursive]">
            游戏图鉴
          </h1>

          {/* 标签页切换 */}
          <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-4 border-blue-800 dark:border-blue-900">
            <button
              className={`flex-1 py-3 font-bold ${activeTab === 'monsters' 
                ? 'text-blue-800 dark:text-blue-300 border-b-4 border-blue-500' 
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400'}`}
              onClick={() => setActiveTab('monsters')}
            >
              怪物图鉴
            </button>
            <button
              className={`flex-1 py-3 font-bold ${activeTab === 'equipment' 
                ? 'text-blue-800 dark:text-blue-300 border-b-4 border-blue-500' 
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400'}`}
              onClick={() => setActiveTab('equipment')}
            >
              装备图鉴
            </button>
          </div>

           {/* 怪物筛选器 */}
          {activeTab === 'monsters' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border-4 border-blue-800 dark:border-blue-900 overflow-x-auto">
                <h3 className="text-sm font-bold mb-3 text-blue-700 dark:text-blue-400">
                  地图筛选
                </h3>
                <div className="flex space-x-2">
                  {allMaps.map(map => (
                    <button
                      key={map}
                      className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                        mapFilter === map 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 font-medium' 
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}
                      onClick={() => setMapFilter(map)}
                    >
                      {map === 'all' ? '全部地图' : map}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border-4 border-blue-800 dark:border-blue-900 overflow-x-auto">
                <h3 className="text-sm font-bold mb-3 text-blue-700 dark:text-blue-400">
                  稀有度筛选
                </h3>
                <div className="flex space-x-2">
                  {allMonsterRarities.map(rarity => (
                    <button
                      key={rarity}
                      className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                        monsterRarityFilter === rarity 
                          ? getMonsterRarityColor(rarity) + ' font-medium' 
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}
                      onClick={() => setMonsterRarityFilter(rarity)}
                    >
                      {rarity === 'all' ? '全部稀有度' : rarity}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

           {/* 装备品质筛选器 */}
          {activeTab === 'equipment' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border-4 border-blue-800 dark:border-blue-900 overflow-x-auto">
              <h3 className="text-sm font-bold mb-3 text-blue-700 dark:text-blue-400">
                品质筛选
              </h3>
              <div className="flex space-x-2">
                {allEquipmentQualities.map(quality => (
                  <button
                    key={quality}
                    className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                      equipmentQuality === quality 
                        ? getEquipmentQualityColor(quality) + ' font-medium' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                    onClick={() => setEquipmentQuality(quality)}
                  >
                    {quality === 'all' ? '全部品质' : quality}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* 装备分类筛选器 */}
          {activeTab === 'equipment' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border-4 border-blue-800 dark:border-blue-900 overflow-x-auto">
              <h3 className="text-sm font-bold mb-3 text-blue-700 dark:text-blue-400">
                部位筛选
              </h3>
              <div className="flex space-x-2">
                {allEquipmentCategories.map(category => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                      equipmentCategory === category 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 font-medium' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}
                    onClick={() => setEquipmentCategory(category)}
                  >
                    {category === 'all' ? '全部' : category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 怪物或装备列表 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-blue-800 dark:border-blue-900">
            {activeTab === 'monsters' ? (
              // 怪物列表
              <>
                <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">
                  怪物列表
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filterMonsters(allMonsters).length > 0 ? (
                    filterMonsters(allMonsters).map((monster) => (
                       <Link 
                        key={monster.id} 
                        to={`/monster-detail/${monster.id}`}
                        className="flex p-3 bg-blue-50 dark:bg-gray-700 rounded-md border-2 border-blue-300 dark:border-blue-700 transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden">
                          <img src={monster.spriteUrl} alt={monster.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="ml-3 flex-1">
                          <h3 className="font-bold text-blue-800 dark:text-blue-300">{monster.name}</h3>
                          <div className="flex items-center mt-1 flex-wrap gap-1">
                            <span className={`text-xs ${getMonsterRarityColor(monster.rarity)} px-2 py-1 rounded`}>
                              {monster.rarity}</span>
                            {monster.type && (
                              <span className={`text-xs ${getMonsterTypeColor(monster.type)} px-2 py-1 rounded`}>
                                {monster.type}</span>
                            )}</div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                             {monster.description}
                          </p>
                           {monster.stats && (
                            <div className="flex items-center mt-2 space-x-2 flex-wrap">
                              {/* 只显示前三个属性 */}
                              {monster.stats.hp && (
                                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                  <i className="fas fa-heart text-red-500 mr-1"></i>
                                  <span>HP: {monster.stats.hp}</span>
                                </div>
                              )}
                              {monster.stats.attack && (
                                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                  <i className="fas fa-fist-raised text-yellow-500 mr-1"></i>
                                  <span>攻击: {monster.stats.attack}</span>
                                </div>
                              )}
                              {monster.stats.defense && (
                                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                  <i className="fas fa-shield-alt text-blue-500 mr-1"></i>
                                  <span>防御: {monster.stats.defense}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-700 rounded-md border-2 border-gray-300 dark:border-gray-600">
                      <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
                      <p className="text-gray-500 dark:text-gray-400 text-center">
                        没有找到符合筛选条件的怪物
                      </p>
                      <button
                        className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                         onClick={() => {
                          setMapFilter('all');
                          setMonsterRarityFilter('all');
                        }}
                      >
                        清除筛选条件
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // 装备列表
              <>
                <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-400">
                  装备列表
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filterEquipment(allEquipment).length > 0 ? (
                    filterEquipment(allEquipment).map((equipment) => (
                      <div key={equipment.id} className="flex p-3 bg-blue-50 dark:bg-gray-700 rounded-md border-2 border-blue-300 dark:border-blue-700">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden">
                          <img src={equipment.spriteUrl} alt={equipment.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="ml-3 flex-1">
                          <h3 className="font-bold text-blue-800 dark:text-blue-300">{equipment.name}</h3>
                          <div className="flex items-center mt-1">
                            <i className={`${getEquipmentTypeIcon(equipment.type)} text-blue-600 dark:text-blue-400 mr-1 text-xs`}></i>
                             <span className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded mr-2">
                              {equipment.category}
                            </span>
                            <span className={`text-xs ${getEquipmentQualityColor(equipment.rarity)} px-2 py-1 rounded`}>
                              {equipment.rarity}
                            </span>
                          </div>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                            {getStatsText(equipment.stats)}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {equipment.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                       <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-700 rounded-md border-2 border-gray-300 dark:border-gray-600">
                          <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
                          <p className="text-gray-500 dark:text-gray-400 text-center">
                            没有找到符合筛选条件的装备
                          </p>
                          <button
                            className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            onClick={() => {
                              setEquipmentCategory('all');
                              setEquipmentQuality('all');
                            }}
                          >
                            清除筛选条件
                          </button>
                        </div>
                  )}
                </div>
              </>
            )}
          </div>
          
       {/* 系统提示 */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md border-2 border-blue-300 dark:border-blue-700">
            <div className="flex items-start">
              <i className="fas fa-info-circle text-blue-500 mt-1 mr-2"></i>
           <p className="text-sm text-blue-800 dark:text-blue-300">
             所有怪物和装备的信息都已完全解锁，你可以随时查看它们的详细数据！点击怪物卡片可查看更多详情。怪物们分布在宁静村庄、幽暗沼泽、凛冬山脉、熔火之心、虚无秘境和起源之殿六个地区，快去探索这些充满挑战的地方吧！
           </p>
         </div>
          </div>
        </div>
      </div>
    );
  }