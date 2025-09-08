import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';
import { toast } from 'sonner';

// 定义怪物类型，与Collection.tsx中的保持一致
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

// 定义地图区域小图接口
interface MapSection {
  id: string;
  name: string;
  description: string;
  spriteUrl: string;
  isUnlocked: boolean;
  monsters: Monster[];
  isBoss?: boolean;
}

// 定义地图接口
interface Map {
  id: string;
  name: string;
  description: string;
  spriteUrl: string;
  isUnlocked: boolean;
  requiredFloor?: number; // 解锁所需的爬塔层数
  monstersCount: number;
  bossName?: string;
  monsters: Monster[];
  sections: MapSection[];
}

// 地图区域小图组件
const MapSectionComponent: React.FC<{
  section: MapSection;
  onEnter: (section: MapSection) => void;
  currentSectionIndex: number;
  sectionIndex: number;
}> = ({ section, onEnter, currentSectionIndex, sectionIndex }) => {
  const canEnter = section.isUnlocked && sectionIndex === currentSectionIndex;
  
  return (
    <div 
      className={`relative cursor-pointer transition-all duration-300 ${
        canEnter ? 'hover:scale-[1.05]' : 'opacity-70'
      }`}
      onClick={() => canEnter && onEnter(section)}
    >
      <div className={`w-full h-28 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 ${
        canEnter ? 'border-green-500 dark:border-green-400 shadow-md' : 
        section.isUnlocked ? 'border-blue-300 dark:border-blue-700' : 
        'border-gray-300 dark:border-gray-600 opacity-50'
      } mb-2`}>
        <img 
          src={section.spriteUrl} 
          alt={section.name} 
          className="w-full h-full object-cover"
        />
        {section.isBoss && (
          <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            <i className="fas fa-dragon mr-1"></i>首领战
          </div>
        )}
      </div>
      <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm text-center">{section.name}</h4>
      <p className="text-xs text-gray-600 dark:text-gray-400 text-center line-clamp-1">{section.description}</p>
      
      {/* 怪物图标显示 */}
      <div className="flex justify-center gap-1 mt-2">
        {section.monsters.slice(0, 3).map((monster, index) => (
          <div key={index} className="relative" title={monster.name}>
            <img 
              src={monster.spriteUrl} 
              alt={monster.name} 
              className="w-5 h-5 rounded-full border border-white dark:border-gray-800"
            />
          </div>
        ))}
        {section.monsters.length > 3 && (
          <div className="w-5 h-5 rounded-full border border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs">
            +{section.monsters.length - 3}
          </div>
        )}
      </div>
      
      {/* 锁或箭头指示器 */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white">
        {section.isUnlocked ? (
          canEnter ? (
            <i className="fas fa-arrow-right"></i>
          ) : (
            <i className="fas fa-check"></i>
          )
        ) : (
          <i className="fas fa-lock"></i>
        )}
      </div>
    </div>
  );
};

// 战斗页面组件已移除，替换为独立的BattlePage组件

// 地图详情页面组件
const MapDetailPage: React.FC<{
  map: Map;
  onBack: () => void;
  player: any;
}> = ({ map, onBack, player }) => {
  const navigate = useNavigate();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [showBattleModal, setShowBattleModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<MapSection | null>(null);
  
  // 处理进入区域
  const handleEnterSection = (section: MapSection) => {
    // 跳转到战斗页面
    navigate(`/battle/${map.id}/${section.id}`, { 
      state: { 
        map, 
        section,
        playerData: player
      } 
    });
  };
  
  // 处理战斗胜利
  const handleBattleVictory = () => {
    // 解锁下一个区域
    const nextIndex = currentSectionIndex + 1;
    if (nextIndex < map.sections.length) {
      setCurrentSectionIndex(nextIndex);
      
      // 在实际游戏中，这里应该更新游戏状态来永久保存进度
      toast.success(`成功通过${selectedSection?.name}！解锁了新区域！`);
      
      // 如果是最后一个区域，显示地图完成提示
      if (nextIndex === map.sections.length - 1 && selectedSection?.isBoss) {
        toast.success(`恭喜完成${map.name}的所有挑战！`);
      }
    }
  };
  
  return (
    <div className="w-full">
      {/* 返回按钮 */}
      <div className="mb-4">
        <PixelButton 
          className="text-sm py-2 px-4"
          onClick={onBack}
        >
          <i className="fas fa-arrow-left mr-2"></i>返回地图选择
        </PixelButton>
      </div>
      
      {/* 地图标题和信息 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-4 border-amber-800 dark:border-amber-900 mb-6">
        <div className="flex items-center">
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-gray-800 dark:border-gray-200 flex-shrink-0">
            <img 
              src={map.spriteUrl} 
              alt={map.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300">{map.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{map.description}</p>
            <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
              <i className="fas fa-dragon mr-1 text-red-500"></i>
              <span>首领: {map.bossName}</span>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
              <i className="fas fa-users mr-1 text-blue-500"></i>
              <span>怪物: {map.monstersCount}种</span>
            </div>
          </div>
        </div>
        
        {/* 进度条 */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>完成进度</span>
            <span>{Math.floor((currentSectionIndex / map.sections.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner overflow-hidden">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${(currentSectionIndex / map.sections.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            已完成 {currentSectionIndex} / {map.sections.length} 个区域
          </div>
        </div>
      </div>
      
      {/* 区域列表 */}
      <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-4">探索区域</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {map.sections.map((section, index) => (
          <MapSectionComponent 
            key={section.id}
            section={section}
            onEnter={handleEnterSection}
            currentSectionIndex={currentSectionIndex}
            sectionIndex={index}
          />
        ))}
      </div>
      
      {/* 战斗弹窗 */}
      {/* 战斗弹窗已移除，改为跳转到独立的战斗页面 */}
    </div>
  );
};

export default function MainStory() {
  const { gameState, updateGameState } = useGame();
  const { player } = gameState;
  const [selectedMap, setSelectedMap] = useState<Map | null>(null);
  const [unlockedMaps, setUnlockedMaps] = useState<string[]>(player.unlockedMaps || ['peaceful_village']);
  
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
        ],
        locations: ["宁静村庄-田野", "幽暗沼泽-泥潭", "起源之殿-腐朽回廊"]
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
        ],
        locations: ["宁静村庄-道路", "幽暗沼泽-枯木林", "虚无秘境-破碎岛屿"]
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
        ],
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
        stats: { hp: 120, attack: 12, defense: 5 },
        skills: [
           { name: "毒液喷射", description: "从毒牙中喷射出致命毒液，对敌人造成伤害，有50%概率使其中毒", damage: 12 },
          { name: "蛛网束缚", description: "喷射粘性蛛网，使敌人下回合有50%概率无法攻击", damage: 0 }
        ],
        locations: ["宁静村庄-森林深处", "幽暗沼泽-蛛网区", "熔火之心-阴影角落", "起源之殿-暗影角落"]
      },
      {
        id: "armored_skeleton",
        name: "铠甲骷髅",
        description: "持剑盾的不死生物，格挡攻击。曾经是古代王国的精锐士兵，即使死后依然坚守着战斗的本能，能够有效格挡大部分物理攻击。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20armored%20skeleton%20monster%208bit%20sword%20shield&sign=57499136fab675785f01b653a7c9f46e",
        type: "暗属性",
        rarity: "高级",
          stats: { hp: 150, attack: 7, defense: 18 },
        skills: [
          { name: "剑盾连击", description: "用盾牌撞击后迅速挥剑攻击", damage: 14 },
           { name: "钢铁壁垒", description: "举起盾牌形成坚固防御，大幅提高防御力持续两回合，但两回合内自身无法攻击。", damage: 0 }
        ],
        locations: ["幽暗沼泽-沉船", "凛冬山脉-雪山古堡", "虚无秘境-虚空堡垒"]
      },
      {
        id: "swamp_murloc",
        name: "沼泽鱼人",
        description: "群体行动，投掷鱼叉。生活在潮湿沼泽中的类人生物，通常以群体形式出现，擅长使用简易鱼叉进行远程攻击，弱点是怕火。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20swamp%20murloc%20monster%208bit%20spear%20group&sign=2dcc228805831d3ea3e8198423b01096",
        type: "水属性",
        rarity: "高级",
        stats: { hp: 100, attack: 13, defense: 6 },
        skills: [
          { name: "鱼叉投掷", description: "投掷锋利的鱼叉攻击远处的敌人", damage: 13 },
          { name: "群体增益", description: "发出特殊叫声，提升附近同伴的攻击力", damage: 0 }
        ],
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
        stats: { hp: 200, attack: 18, defense: 12 },
        skills: [
          { name: "双脑连击", description: "两个脑袋同时发动攻击，物理和魔法伤害并存", damage: 18 },
          { name: "混乱践踏", description: "愤怒地践踏地面，造成范围伤害并可能使敌人眩晕", damage: 15 }
        ],
        locations: ["宁静村庄-食人魔营地", "幽暗沼泽-部落营地", "凛冬山脉-部落", "虚无秘境-浮岛营地"]
      },
      {
        id: "shadow_panther",
        name: "暗影猎豹",
        description: "隐身突袭，暴击率高。能够融入黑暗中难以被发现，擅长出其不意的致命攻击，攻击时有很高几率造成暴击伤害。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20shadow%20panther%20monster%208bit%20stealth%20critical&sign=fe59101d66bb7f4c0f8ed32af9e1cfa5",
        type: "暗属性",
        rarity: "稀有",
        stats: { hp: 140, attack: 24, defense: 6 },
        skills: [
          { name: "暗影突袭", description: "隐身接近敌人后发动猛烈攻击，必定造成暴击", damage: 24 },
         { name: "黑暗遮蔽", description: "释放黑暗能量，使敌人下回合攻击无法命中", damage: 0 },
         { name: "影子分身", description: "制造一个影子分身，分担伤害并迷惑敌人，使敌人下回合造成的伤害减半", damage: 15 }
        ],
        locations: ["幽暗沼泽-迷雾林", "凛冬山脉-雪松林", "熔火之心-黑石林", "起源之殿-星光小径"]
      },
      {
        id: "ice_lich",
        name: "寒冰巫妖",
        description: "释放冰环冻结，免疫冰伤。掌握着强大的冰系魔法，能够冻结周围的敌人，对冰属性攻击完全免疫，弱点是火属性。",
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20lich%20monster%208bit%20frost%20immune&sign=5a799a31c6d3fb6ae829a53c3521c23b",
        type: "冰属性",
        rarity: "稀有",
        stats: { hp: 180, attack: 20, defense: 10 },
        skills: [
          { name: "冰霜新星", description: "释放冰环冻结周围敌人，造成伤害并有30%概率冻结敌人", damage: 20 },
         { name: "永恒寒冬", description: "召唤暴风雪，对敌人造成持续冰属性伤害，每回合额外造成少量伤害", damage: 12 }
        ],
        locations: ["凛冬山脉-冰窟", "熔火之心-冷却区", "虚无秘境-寒冰岛"]
      }
    ];
    
    return allMonsters;
  };
  
  // 获取所有怪物数据
  const allMonsters = getAllMonsters();
  
  // 定义六个地图的数据，包含每个地图的区域小图和怪物列表
  const maps: Map[] = [
    {
      id: 'peaceful_village',
      name: '宁静村庄',
      description: '和平的村庄，周边是田野、森林和小型洞穴。怪物强度低，适合新手。',
      spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20peaceful%20village%208bit%20map&sign=ac6a6b33d403a49b23a5666715e1b91f',
      isUnlocked: unlockedMaps.includes('peaceful_village'),
      monstersCount: 5,
      bossName: '时空守护者',
      monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('宁静村庄'))),
      sections: [
        {
          id: 'village_road',
          name: '道路',
          description: '贯穿村庄的主要道路，连接各个区域',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20village%20road%208bit%20map&sign=5a313c1cb3352ef4b6cb087566f5f078',
          isUnlocked: true,
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('宁静村庄-道路')))
        },
        {
          id: 'farm_field',
          name: '田野',
          description: '村庄周围的农田，种植着各种农作物',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20farm%20field%208bit%20map&sign=29c74c08fa0fd21f1842d76b66f22b5d',
          isUnlocked: true,
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('宁静村庄-田野')))
        },
        {
          id: 'deep_forest',
          name: '森林深处',
          description: '村庄东边的森林深处，树木茂密光线昏暗',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20deep%20forest%208bit%20map&sign=fb3ce9b7a3cf97ae04a8562ba8d08075',
          isUnlocked: true,
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('宁静村庄-森林深处')))
        },
        {
          id: 'ogre_camp',
          name: '食人魔营地',
          description: '村庄附近的废弃营地，被食人魔占据',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ogre%20camp%208bit%20map&sign=9d55c72d969d75d6626c9b73ada6098a',
          isUnlocked: true,
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('宁静村庄-食人魔营地')))
        },
        {
          id: 'sealed_altar',
          name: '被封印的祭坛',
          description: '村庄西边的古老祭坛，散发着神秘气息',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20sealed%20altar%208bit%20map&sign=bf1e4398c152cea37e8f0be4e290e9a8',
          isUnlocked: true,
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('宁静村庄-被封印的祭坛')))
        },
        {
          id: 'hidden_shrine',
          name: '隐藏神社',
          description: '森林中的神秘神社，只有少数村民知道位置',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20hidden%20shrine%208bit%20map&sign=4c88accac77ed8059bb95c88ebfd5266',
          isUnlocked: true,
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('宁静村庄-隐藏神社')))
        },
        {
          id: 'time_crack',
          name: '时空裂缝',
          description: '最近出现的神秘裂缝，通向未知的时空',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20time%20space%20crack%208bit%20map&sign=f457db0c1c338effe1c132632ec0cf84',
          isUnlocked: true,
          isBoss: true,
          monsters: [allMonsters.find(m => m.id === 'two_headed_ogre')!] // 时空裂缝中的首领
        }
      ]
    },
    {
      id: 'dark_swamp',
      name: '幽暗沼泽',
      description: '村庄东边的迷雾沼泽，传说中隐藏着古代文明的遗迹，但也栖息着各种剧毒生物和诡异的幽灵。只有真正的勇者才敢踏入这片危险之地。',spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20dark%20swamp%208bit%20map&sign=b7c298ce2e6410e014dedf4457cbce45',
      isUnlocked: unlockedMaps.includes('dark_swamp'),
      requiredFloor: 10, // 需要通关10层爬塔才能解锁
      monstersCount: 8,
      bossName: '沼泽女王',
      monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('幽暗沼泽'))),
      sections: [
        {
          id: 'swamp_edge',
          name: '沼泽边缘',
          description: '沼泽的边缘地带，相对安全一些',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20swamp%20edge%208bit%20map&sign=f6e669c6c5ab5da17f715ad63825cfc7',
          isUnlocked: unlockedMaps.includes('dark_swamp'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('幽暗沼泽-泥潭')))
        },
        {
          id: 'dead_woods',
          name: '枯木林',
          description: '沼泽中的枯木林，树干上缠绕着藤蔓',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20dead%20forest%208bit%20map&sign=9e99d1484bf6c033ae048853b09219ab',
          isUnlocked: unlockedMaps.includes('dark_swamp'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('幽暗沼泽-枯木林')))
        },
        {
          id: 'spider_nest',
          name: '蜘蛛巢穴',
          description: '毒蜘蛛的巢穴，到处都是蜘蛛网',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20spider%20nest%208bit%20map&sign=6d490da060eef90287cd26ace4c507da',
          isUnlocked: unlockedMaps.includes('dark_swamp'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('幽暗沼泽-蛛网区')))
        },
        {
          id: 'sunken_ship',
          name: '沉船遗址',
          description: '沼泽中的古代沉船，成为了骷髅兵的巢穴',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20sunken%20ship%208bit%20map&sign=2eab27955af971ef978c9ba632f2a197',
          isUnlocked: unlockedMaps.includes('dark_swamp'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('幽暗沼泽-沉船')))
        },
        {
          id: 'swamp_palace',
          name: '沼泽宫殿',
          description: '沼泽女王的宫殿，位于沼泽中心的小岛上',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20swamp%20palace%208bit%20map&sign=bfd087a059f1c665aeec593ed13179a3',
          isUnlocked: unlockedMaps.includes('dark_swamp'),
          isBoss: true,
          monsters: [allMonsters.find(m => m.id === 'ice_lich')!] // 沼泽女王由寒冰巫妖扮演
        }
      ]
    },
    {
      id: 'frost_mountain',
      name: '凛冬山脉',
      description: '北方边境的巨大山脉，常年被冰雪覆盖，气温极低。传说山顶上有一座被遗忘的冰雪城堡，里面封存着强大的古代魔法和宝藏。',
      spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20frost%20mountain%208bit%20map&sign=77a79fadaab0640eba8a8765452b1cc4',
      isUnlocked: unlockedMaps.includes('frost_mountain'),
      requiredFloor: 20, // 需要通关20层爬塔才能解锁
      monstersCount: 10,
      bossName: '雪山巨人',
      monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('凛冬山脉'))),
      sections: [
        {
          id: 'mountain_foot',
          name: '山脚村庄',
          description: '山脚下的小村子，村民靠打猎为生',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20mountain%20village%208bit%20map&sign=f5ab1ceb324d1a8c1aaee9a9d81c3e1f',
          isUnlocked: unlockedMaps.includes('frost_mountain'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('凛冬山脉-部落')))
        },
        {
          id: 'ice_cave',
          name: '冰洞',
          description: '山中的冰洞，里面有许多蝙蝠',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20cave%208bit%20map&sign=55fe74c94947d7e299f7ed91e3741a46',
          isUnlocked: unlockedMaps.includes('frost_mountain'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('凛冬山脉-冰洞')))
        },
        {
          id: 'frozen_lake',
          name: '冰湖',
          description: '结冰的湖面，可以看到下面有鱼人游动',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20frozen%20lake%208bit%20map&sign=f4fb00df977745bc6521fb475c3a4eaf',
          isUnlocked: unlockedMaps.includes('frost_mountain'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('凛冬山脉-冰湖')))
        },
        {
          id: 'snowy_forest',
          name: '雪松林',
          description: '被积雪覆盖的松林，有暗影猎豹出没',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20snowy%20forest%208bit%20map&sign=28e410a646b311a5852825d3a5859b39',
          isUnlocked: unlockedMaps.includes('frost_mountain'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('凛冬山脉-雪松林')))
        },
        {
          id: 'ice_castle',
          name: '冰雪城堡',
          description: '山顶上的冰雪城堡，雪山巨人的居所',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20castle%208bit%20map&sign=b57f5133e9d32998233e8702823b97f7',
          isUnlocked: unlockedMaps.includes('frost_mountain'),
          isBoss: true,
          monsters: [allMonsters.find(m => m.id === 'shadow_panther')!] // 雪山巨人由暗影猎豹扮演
        }
      ]
    },
    {
      id: 'fire_core',
      name: '熔火之心',
      description: '位于地下深处的火山核心，岩浆河流和地热蒸气充斥着整个区域。这里是火元素生物的家园，也是炎魔领主的盘踞之地。',
      spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20fire%20core%208bit%20map&sign=7c6b1b5333f81e6152a224f0bf5102fe',
      isUnlocked: unlockedMaps.includes('fire_core'),
      requiredFloor: 30, // 需要通关30层爬塔才能解锁
      monstersCount: 12,
      bossName: '炎魔领主',
      monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('熔火之心'))),
      sections: [
        {
          id: 'lava_tunnel',
          name: '熔岩隧道',
          description: '通向火山核心的隧道，墙壁上有岩浆流过',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20lava%20tunnel%208bit%20map&sign=d3b0f7e151f0d1e6ce7c8617a4f77f40',
          isUnlocked: unlockedMaps.includes('fire_core'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('熔火之心-熔岩隧道')))
        },
        {
          id: 'magma_river',
          name: '岩浆河',
          description: '滚烫的岩浆河流，必须小心通过',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20magma%20river%208bit%20map&sign=50e45fec20a290e2406594ea37131072',
          isUnlocked: unlockedMaps.includes('fire_core'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('熔火之心-岩浆河')))
        },
        {
          id: 'underground_lake',
          name: '地下湖',
          description: '火山中的地下湖泊，水温很高',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20underground%20lake%208bit%20map&sign=387305617a088dc2348bd3475c925738',
          isUnlocked: unlockedMaps.includes('fire_core'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('熔火之心-地下湖')))
        },
        {
          id: 'dark_stones',
          name: '黑石林',
          description: '由黑色石头组成的森林，暗影猎豹在此出没',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20black%20stone%20forest%208bit%20map&sign=f66adb6a615a19a106e3857fd7b179b3',
          isUnlocked: unlockedMaps.includes('fire_core'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('熔火之心-黑石林')))
        },
        {
          id: 'fire_throne',
          name: '火焰王座',
          description: '炎魔领主的王座所在，位于火山的最核心',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20fire%20throne%208bit%20map&sign=4cb302f5239f9ee617da1e7f5d816749',
          isUnlocked: unlockedMaps.includes('fire_core'),
          isBoss: true,
          monsters: [allMonsters.find(m => m.id === 'fire_demon_lord')!] // 炎魔领主自己
        }
      ]
    },
    {
      id: 'void_realm',
      name: '虚无秘境',
      description: '悬浮在时空裂隙中的神秘领域，重力、时间等物理法则在这里都变得扭曲异常。这里隐藏着宇宙的奥秘，也栖息着超越理解的奇异生物。',
      spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20void%20realm%208bit%20map&sign=b9aeedfcb308c971232a036bf0daf23c',
      isUnlocked: unlockedMaps.includes('void_realm'),
      requiredFloor: 40, // 需要通关40层爬塔才能解锁
      monstersCount: 15,
      bossName: '虚空守护者',
      monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('虚无秘境'))),
      sections: [
        {
          id: 'floating_islands',
          name: '浮岛群',
          description: '悬浮在虚空中的岛屿群',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20floating%20islands%208bit%20map&sign=681294459def6f27f8bff9e201eb6db8',
          isUnlocked: unlockedMaps.includes('void_realm'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('虚无秘境-破碎岛屿')))
        },
        {
          id: 'void_camp',
          name: '虚空营地',
          description: '虚无中的营地，有食人魔居住',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20void%20camp%208bit%20map&sign=d5d19967e5e3e17f5ad6d920a5299ac9',
          isUnlocked: unlockedMaps.includes('void_realm'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('虚无秘境-浮岛营地')))
        },
        {
          id: 'ice_island',
          name: '寒冰岛',
          description: '虚无中漂浮的冰岛',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20island%208bit%20map&sign=1e29685ee5840d3422ea22fdac815617',
          isUnlocked: unlockedMaps.includes('void_realm'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('虚无秘境-寒冰岛')))
        },
        {
          id: 'fire_island',
          name: '火焰岛',
          description: '虚无中漂浮的火焰岛',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20fire%20island%208bit%20map&sign=88d6dfe478dffe246ea8ee0ad117b4c1',
          isUnlocked: unlockedMaps.includes('void_realm'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('虚无秘境-火焰岛')))
        },
        {
          id: 'void_core',
          name: '虚空核心',
          description: '虚无秘境的核心，虚空守护者的所在',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20void%20core%208bit%20map&sign=06273f912ceb79bf54e0c6df1543a07d',
          isUnlocked: unlockedMaps.includes('void_realm'),
          isBoss: true,
          monsters: [allMonsters.find(m => m.id === 'undead_dragon_rider')!] // 虚空守护者由死灵龙骑扮演
        }
      ]
    },
    {
      id: 'origin_temple',
      name: '起源之殿',
      description: '传说中创世神创造世界的神圣殿堂，位于世界的中心。这里蕴含着创造万物的原始力量，也是最终试炼的所在地。只有通过前五大区域的勇者才能挑战这里。',
      spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20origin%20temple%208bit%20map&sign=b6853f695dfbbe74964839b9a4f60c0a',
      isUnlocked: unlockedMaps.includes('origin_temple'),
      requiredFloor: 50, // 需要通关50层爬塔才能解锁
      monstersCount: 20,
      bossName: '原初守护者',
      monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('起源之殿'))),
      sections: [
        {
          id: 'temple_entrance',
          name: '神殿入口',
          description: '起源之殿的宏伟入口',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20temple%20entrance%208bit%20map&sign=95a3bfe58ad4f6bd2a1883204f9841cc',
          isUnlocked: unlockedMaps.includes('origin_temple'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('起源之殿-腐朽回廊')))
        },
        {
          id: 'shadow_halls',
          name: '暗影厅',
          description: '充满阴影的殿堂',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20shadow%20hall%208bit%20map&sign=c44b6efdf8cc008b5ee7c7b5cb09443d',
          isUnlocked: unlockedMaps.includes('origin_temple'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('起源之殿-暗影角落')))
        },
        {
          id: 'fire_halls',
          name: '火焰厅',
          description: '燃烧着永恒之火的殿堂',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20fire%20hall%208bit%20map&sign=77529af115bb8b1eb020591d67b5728d',
          isUnlocked: unlockedMaps.includes('origin_temple'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('起源之殿-火焰厅')))
        },
        {
          id: 'ice_halls',
          name: '冰霜殿',
          description: '被永恒之冰覆盖的殿堂',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20hall%208bit%20map&sign=d0f61c6eadb1af5f20996551d16bbc01',
          isUnlocked: unlockedMaps.includes('origin_temple'),
          monsters: allMonsters.filter(monster => monster.locations?.some(location => location.includes('起源之殿-冰霜殿')))
        },
        {
          id: 'holy_sanctum',
          name: '神圣圣所',
          description: '原初守护者所在的最终圣所',
          spriteUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20holy%20sanctum%208bit%20map&sign=f671587566fca73644f70c7efb8dc4df',
          isUnlocked: unlockedMaps.includes('origin_temple'),
          isBoss: true,
          monsters: [allMonsters.find(m => m.id === 'cerberus')!] // 原初守护者由地狱三头犬扮演
        }
      ]
    }
  ];
  
  // 当爬塔进度更新时，检查是否解锁新地图
  useEffect(() => {
    const currentFloor = player.towerProgress?.highestFloor || 1;
    const newlyUnlockedMaps: string[] = [];
    
    // 检查每个地图是否满足解锁条件
    maps.forEach(map => {
      if (map.requiredFloor && currentFloor >= map.requiredFloor && !unlockedMaps.includes(map.id)) {
        newlyUnlockedMaps.push(map.id);
      }
    });
    
    // 如果有新解锁的地图，更新游戏状态
    if (newlyUnlockedMaps.length > 0) {
      const updatedUnlockedMaps = [...unlockedMaps, ...newlyUnlockedMaps];
      setUnlockedMaps(updatedUnlockedMaps);
      
      // 更新游戏状态
      updateGameState({
        player: {
          ...player,
          unlockedMaps: updatedUnlockedMaps
        }
      });
      
      // 显示解锁提示
      newlyUnlockedMaps.forEach(mapId => {
        const map = maps.find(m => m.id === mapId);
        if (map) {
          toast.success(`恭喜解锁新地图：${map.name}！`);
        }
      });
    }
  }, [player.towerProgress?.highestFloor]);
  
  // 进入地图
  const enterMap = (map: Map) => {
    if (map.isUnlocked) {
      setSelectedMap(map);
    } else {
      // 显示未解锁提示
      toast.info(`需要先完成前一个地图的冒险才能解锁此地图！继续努力吧，勇者！`);
    }
  };
  
  // 获取地图状态的样式
  const getMapStatusClass = (map: Map) => {
    if (map.isUnlocked) {
      return 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-800';
    } else {
      return 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-50 cursor-not-allowed';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-amber-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {!selectedMap ? (
          <>
            {/* 返回按钮 */}
            <div className="mb-4">
              <Link to="/battle">
                <PixelButton className="text-sm py-2 px-4">
                  <i className="fas fa-arrow-left mr-2"></i>返回战斗模式选择
                </PixelButton>
              </Link>
            </div>
            
            {/* 主线标题 */}
            <h1 className="text-3xl font-bold text-center mb-8 text-amber-800 dark:text-amber-300 font-['Press_Start_2P',_cursive]">
              主线闯关
            </h1>
            
            {/* 地图网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {maps.map((map, index) => (
                <div 
                  key={map.id}
                  className={`${getMapStatusClass(map)} rounded-xl shadow-lg p-4 border-4 transition-all duration-300 transform hover:scale-[1.02]`}
                  onClick={() => enterMap(map)}
                >
                  {/* 地图卡片内容 */}
                  <div className="flex items-center">
                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-gray-800 dark:border-gray-200 flex-shrink-0">
                      <img 
                        src={map.spriteUrl} 
                        alt={map.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 flex items-center">
                        <span>{index + 1}. {map.name}</span>
                        {!map.isUnlocked && (
                          <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                            神秘区域
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {map.description}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i className="fas fa-dragon mr-1 text-red-500"></i>
                        <span>首领: {map.bossName}</span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i className="fas fa-users mr-1 text-blue-500"></i>
                        <span>怪物: {map.monstersCount}种</span>
                      </div>
                      {!map.isUnlocked && map.requiredFloor && (
                        <div className="mt-2 flex items-center text-sm text-amber-600 dark:text-amber-400">
                          <i className="fas fa-lock mr-1"></i>
                          <span>需通关爬塔第{map.requiredFloor}层解锁</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* 地图中的怪物列表 */}
                  {map.isUnlocked && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">出现怪物:</h4>
                      <div className="flex flex-wrap gap-2">
                        {map.monsters.slice(0, 5).map((monster) => (
                          <div 
                            key={monster.id} 
                            className="flex items-center bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs border border-gray-300 dark:border-gray-700"
                          >
                            <img 
                              src={monster.spriteUrl} 
                              alt={monster.name} 
                              className="w-4 h-4 mr-1 object-contain"
                            />
                            <span>{monster.name}</span>
                            <span className={`ml-1 px-1 rounded bg-opacity-50 ${
                              monster.rarity === '普通' ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                              monster.rarity === '高级' ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              monster.rarity === '稀有' ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                              monster.rarity === '史诗' ? 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                              monster.rarity === '传说' ? 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                              'bg-pink-200 text-pink-800 dark:bg-pink-900 dark:text-pink-300'
                            }`}>
                              {monster.rarity}
                            </span>
                          </div>
                        ))}
                        {map.monsters.length > 5 && (
                          <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs text-gray-600 dark:text-gray-400">
                            等{map.monsters.length - 5}种
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* 操作按钮 */}
                  <div className="mt-4 flex justify-end">
                    <PixelButton 
                      className={`${map.isUnlocked 
                        ? 'bg-amber-600 hover:bg-amber-700 border-amber-800' 
                        : 'bg-gray-500 hover:bg-gray-600 border-gray-700 cursor-not-allowed'}`}
                      onClick={() => enterMap(map)}
                      disabled={!map.isUnlocked}
                    >
                      {map.isUnlocked ? '进入地图' : '未解锁'}
                    </PixelButton>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 主线说明 */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md border-2 border-blue-300 dark:border-blue-700 mb-6">
              <div className="flex items-start">
                <i className="fas fa-info-circle text-blue-500 mt-1 mr-2"></i>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  踏上史诗般的冒险之旅，探索六个风格迥异的区域，挑战强大的首领，收集珍贵的装备和材料。每个地图都有独特的生态系统和故事背景，只有完成前一个地图的挑战，才能解锁下一个更危险的区域。不断提升你的实力，揭开世界的奥秘，成为传说中的勇者！
                </p>
              </div>
            </div>
          </>
        ) : (
          <MapDetailPage 
            map={selectedMap}
            onBack={() => setSelectedMap(null)}
            player={player}
          />
        )}
      </div>
    </div>
  );
}