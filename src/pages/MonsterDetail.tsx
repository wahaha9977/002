import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PixelButton } from '@/components/PixelButton';

// 定义怪物类型
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

export default function MonsterDetail() {
  const { id } = useParams();
  const [monster, setMonster] = useState<Monster | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟获取怪物数据
    const fetchMonsterData = async () => {
      // 在实际应用中，这里应该是API调用，但现在我们使用模拟数据
      setTimeout(() => {
        const monsterData: Monster = getMonsterById(id || '');
        setMonster(monsterData);
        setLoading(false);
      }, 500);
    };

    fetchMonsterData();
  }, [id]);

  // 根据ID获取怪物数据
  const getMonsterById = (monsterId: string): Monster => {
      // 模拟怪物数据库
     const allMonsters: Monster[] = [
       {
         id: "corrupted_slime",
         name: "腐化史莱姆",
         description: "绿色粘液生物，缓慢移动，腐蚀武器。被它触碰的武器会暂时降低攻击力。身体由粘性液体构成，喜欢栖息在潮湿阴暗的地方，身上的绿色粘液带有强烈的腐蚀性。虽然行动缓慢，但一旦被它包围就很难逃脱。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20corrupted%20green%20slime%20monster%208bit&sign=a64959841c2b65e080665a7df610b3fb",
         type: "毒属性",
         rarity: "普通",
         stats: { hp: 60, attack: 6, defense: 3, speed: 2 },
         skills: [
            { name: "腐蚀攻击", description: "用带有腐蚀性的粘液攻击敌人，有几率降低攻击力", damage: 6 }
         ],
         locations: ["宁静村庄-田野", "幽暗沼泽-泥潭", "起源之殿-腐朽回廊"],
         weakness: ["火属性", "风属性"],
         resistance: ["毒属性", "水属性"]
       },
       {
         id: "stray_dog",
         name: "流浪野狗",
         description: "饥饿的野兽，主动攻击但脆弱。通常独自行动，但饥饿时会变得格外凶猛。曾经是人类的宠物，但现在在荒野中独自生存，性格变得警惕而具有攻击性。敏锐的嗅觉可以追踪猎物的气味。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20stray%20dog%20monster%208bit&sign=ddfe720f0f332c00ca0d9d3180c4c143",
         type: "地属性",
         rarity: "普通",
         stats: { hp: 50, attack: 9, defense: 1, speed: 7 },
         skills: [
           { name: "狂吠撕咬", description: "发出凶猛的吠叫后扑向敌人撕咬", damage: 9 }
         ],
         locations: ["宁静村庄-道路", "幽暗沼泽-枯木林", "虚无秘境-破碎岛屿"],
         weakness: ["火属性", "光属性"],
         resistance: ["地属性"]
       },
       {
         id: "cave_bat",
         name: "洞穴蝙蝠",
         description: "成群出现，吸血但怕火。在黑暗环境中视力极佳，依靠回声定位系统导航。喜欢栖息在黑暗潮湿的洞穴中，夜晚出来活动寻找猎物。虽然单体战斗力不强，但一旦成群结队就会变得十分危险。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20cave%20bat%20monster%208bit&sign=fcd341af6aae021a3dad8758bcbf7e2e",
         type: "暗属性",
         rarity: "普通",
         stats: { hp: 35, attack: 5, defense: 1, speed: 15 },
         skills: [
           { name: "吸血攻击", description: "快速扑向敌人并吸取血液恢复自身生命", damage: 5 }
         ],
         locations: ["宁静村庄-洞穴", "凛冬山脉-冰洞", "熔火之心-熔岩洞"],
         weakness: ["光属性", "火属性"],
         resistance: ["暗属性", "风属性"]
       },
       // 高级怪物
       {
         id: "venom_spider",
         name: "毒牙蜘蛛",
         description: "喷射蛛网和毒液，移动迅速。八条细长的腿让它在各种地形都能快速移动，毒牙中蕴含的剧毒能使猎物在短时间内丧失行动能力。喜欢在阴暗的角落织网等待猎物上门，当猎物接近时会迅速出击。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20venomous%20spider%20monster%208bit%20poison%20fangs&sign=b8f6863611d2fc118874018785a812e2",
         type: "毒属性",
         rarity: "高级",
         stats: { hp: 120, attack: 12, defense: 5, speed: 12 },
         skills: [
            { name: "毒液喷射", description: "从毒牙中喷射出致命毒液，对敌人造成伤害，有50%概率使其中毒", damage: 12 },
          { name: "蛛网束缚", description: "喷射粘性蛛网，使敌人下回合有50%概率无法攻击", damage: 0 }
         ],
         locations: ["宁静村庄-森林深处", "幽暗沼泽-蛛网区", "熔火之心-阴影角落", "起源之殿-暗影角落"],
         weakness: ["火属性", "风属性"],
         resistance: ["毒属性", "水属性"]
       },
       {
         id: "armored_skeleton",
         name: "铠甲骷髅",
         description: "持剑盾的不死生物，格挡攻击。曾经是古代王国的精锐士兵，即使死后依然坚守着战斗的本能，能够有效格挡大部分物理攻击。身着生锈的铠甲，手持锋利的长剑和坚固的盾牌，在墓地和废墟中徘徊。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20armored%20skeleton%20monster%208bit%20sword%20shield&sign=57499136fab675785f01b653a7c9f46e",
         type: "暗属性",
         rarity: "高级",
          stats: { hp: 150, attack: 7, defense: 18, speed: 6 },
         skills: [
           { name: "剑盾连击", description: "用盾牌撞击后迅速挥剑攻击", damage: 14 },
           { name: "钢铁壁垒", description: "举起盾牌形成坚固防御，大幅提高防御力持续两回合，但两回合内自身无法攻击。", damage: 0 }
         ],
         locations: ["幽暗沼泽-沉船", "凛冬山脉-雪山古堡", "虚无秘境-虚空堡垒"],
         weakness: ["光属性", "火属性"],
         resistance: ["暗属性", "地属性"]
       },
       {
         id: "swamp_murloc",
         name: "沼泽鱼人",
         description: "群体行动，投掷鱼叉。生活在潮湿沼泽中的类人生物，通常以群体形式出现，擅长使用简易鱼叉进行远程攻击，弱点是怕火。皮肤覆盖着粘液，能够在水中自由呼吸，在沼泽环境中战斗力会大幅提升。",
         spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20swamp%20murloc%20monster%208bit%20spear%20group&sign=2dcc228805831d3ea3e8198423b01096",
         type: "水属性",
         rarity: "高级",
         stats: { hp: 100, attack: 13, defense: 6, speed: 9 },
         skills: [
           { name: "鱼叉投掷", description: "投掷锋利的鱼叉攻击远处的敌人", damage: 13 },
           { name: "群体增益", description: "发出特殊叫声，提升附近同伴的攻击力", damage: 0 }
         ],
         locations: ["幽暗沼泽-水域", "凛冬山脉-冰湖", "熔火之心-地下湖"],
         weakness: ["火属性", "雷属性"],
         resistance: ["水属性", "毒属性"]
       },
             // 稀有怪物
            {
              id: "two_headed_ogre",
              name: "双头食人魔",
              description: "两个头分别施法和攻击，混乱仇恨。一个头擅长物理攻击，另一个头可以释放简单的法术，常常因为意见不合而产生混乱。这种巨大的食人魔拥有惊人的力量，但是智商低下，两个脑袋经常为了小事争吵不休。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20two-headed%20ogre%20monster%208bit%20chaos%20magical&sign=c38d810374bab831908d8c943a9be587",
              type: "地属性",
              rarity: "稀有",
              stats: { hp: 200, attack: 18, defense: 12, speed: 4 },
              skills: [
                { name: "双脑连击", description: "两个脑袋同时发动攻击，物理和魔法伤害并存", damage: 18 },
                { name: "混乱践踏", description: "愤怒地践踏地面，造成范围伤害并可能使敌人眩晕", damage: 15 },
                { name: "震荡波", description: "双手锤击地面，释放出强大的震荡波", damage: 12 }
              ],
              locations: ["宁静村庄-食人魔营地", "幽暗沼泽-部落营地", "凛冬山脉-部落", "虚无秘境-浮岛营地"],
              weakness: ["雷属性", "光属性"],
              resistance: ["地属性", "暗属性"]
            },
            {
              id: "shadow_panther",
              name: "暗影猎豹",
              description: "隐身突袭，暴击率高。能够融入黑暗中难以被发现，擅长出其不意的致命攻击，攻击时有很高几率造成暴击伤害。这种神秘的生物只在深夜活动，很少有人能活着讲述与它相遇的经历。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20shadow%20panther%20monster%208bit%20stealth%20critical&sign=fe59101d66bb7f4c0f8ed32af9e1cfa5",
              type: "暗属性",
              rarity: "稀有",
              stats: { hp: 140, attack: 24, defense: 6, speed: 25 },
              skills: [
                   { name: "暗影突袭", description: "隐身接近敌人后发动猛烈攻击，必定造成暴击", damage: 24 },
                  { name: "黑暗遮蔽", description: "释放黑暗能量，使敌人下回合攻击无法命中", damage: 0 },
                  { name: "影子分身", description: "制造一个影子分身，分担伤害并迷惑敌人，使敌人下回合造成的伤害减半", damage: 15 }
              ],
              locations: ["幽暗沼泽-迷雾林", "凛冬山脉-雪松林", "熔火之心-黑石林", "起源之殿-星光小径"],
              weakness: ["光属性", "火属性"],
              resistance: ["暗属性", "风属性"]},
            {
              id: "ice_lich",
              name: "寒冰巫妖",
              description: "释放冰环冻结，免疫冰伤。掌握着强大的冰系魔法，能够冻结周围的敌人，对冰属性攻击完全免疫，弱点是火属性。曾经是人类的魔法师，为了追求永恒生命而堕入黑暗，现在成为了不死的冰系巫师。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20lich%20monster%208bit%20frost%20immune&sign=5a799a31c6d3fb6ae829a53c3521c23b",
              type: "冰属性",
              rarity: "稀有",
              stats: { hp: 180, attack: 20, defense: 10, speed: 8 },
              skills: [
                 { name: "冰霜新星", description: "释放冰环冻结周围敌人，造成伤害并有30%概率冻结敌人", damage: 20 },
                { name: "永恒寒冬", description: "召唤暴风雪，对敌人造成持续冰属性伤害，每回合额外造成少量伤害", damage: 12 },
                { name: "冰锥术", description: "从地面召唤锐利的冰锥刺向敌人，有30%概率冻结敌人", damage: 18 }
              ],
              locations: ["凛冬山脉-冰窟", "熔火之心-冷却区", "虚无秘境-寒冰岛"],
              weakness: ["火属性", "雷属性"],
              resistance: ["冰属性", "水属性"]
            },
             // 史诗怪物
            {
              id: "cerberus",
              name: "地狱三头犬",
              description: "三个头分别喷火/毒/暗影，范围攻击。来自地狱的看门犬，每个头都拥有不同的元素能力，能够同时发动三种不同属性的范围攻击。传说它曾守卫着地狱的入口，阻止生者进入死者的世界。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20cerberus%20monster%208bit%20three%20heads%20fire%20poison%20shadow&sign=9f85348c11d6d0e4a5831355af24f564",
              type: "暗属性",
              rarity: "史诗",
              stats: { hp: 250, attack: 22, defense: 15, speed: 6 },
               skills: [
                { name: "地狱吐息", description: "三个头同时喷吐火、毒、暗影三种元素，对敌人造成多重伤害", damage: 22 },
                { name: "地狱束缚", description: "释放黑暗锁链束缚敌人，降低敌人防御力", damage: 0 },
                { name: "灵魂撕咬", description: "咬碎敌人的灵魂，造成持续伤害，使敌人每回合额外受到伤害", damage: 15 },
                { name: "地狱之门", description: "召唤地狱之力，提升自身攻击力与防御力", damage: 0 }
              ],
              locations: ["宁静村庄-被封印的祭坛", "凛冬山脉-火焰洞", "熔火之心-岩浆河", "起源之殿-火焰厅"],
              weakness: ["光属性", "冰属性"],
              resistance: ["暗属性", "火属性", "毒属性"]
            },
            {
              id: "undead_dragon_rider",
              name: "死灵龙骑",
              description: "骷髅龙骑士，冲锋+亡灵召唤。古代骑士的灵魂与骨龙融合的产物，能够发动强力冲锋并召唤亡灵士兵助战。曾经是王国的守护者，但在死后被黑暗魔法复活，现在为邪恶势力效命。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20undead%20dragon%20rider%20monster%208bit%20skeleton%20mount%20summon&sign=053bfae277fc954de7439eb629fa1d83",
              type: "暗属性",
              rarity: "史诗",
              stats: { hp: 220, attack: 25, defense: 18, speed: 8 },
               skills: [
                { name: "死亡冲锋", description: "驾驭骨龙向前冲锋，对路径上的敌人造成伤害", damage: 25 },
                { name: "亡灵召唤", description: "召唤两名骷髅士兵参与战斗，持续两回合（骷髅士兵属性：生命值50、攻击力6、防御力3，无技能）", damage: 0 },
                { name: "腐骨箭雨", description: "从骨龙口中喷出大量腐蚀箭枝，对敌人造成持续三回合的腐蚀伤害", damage: 20 },
                { name: "死亡契约", description: "牺牲部分生命值来提升攻击力和防御力", damage: 0 }
              ],
              locations: ["幽暗沼泽-古战场遗迹", "凛冬山脉-龙巢", "熔火之心-王座", "虚无秘境-龙骨浮岛", "起源之殿-亡灵殿"],
              weakness: ["光属性", "火属性"],
              resistance: ["暗属性", "地属性"]
            },
            {
              id: "fire_demon_lord",
              name: "炎魔领主",
              description: "点燃地面，持续火焰伤害。火元素的统治者，能够点燃脚下的土地，对范围内的敌人造成持续的火焰伤害。居住在火山深处的熔岩宫中，掌控着毁灭一切的火焰力量。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20fire%20demon%20lord%20monster%208bit%20lava%20ground%20burning&sign=89bb2a50cacd7cf0c253aadf3c78f75e",
              type: "火属性",
              rarity: "史诗",
              stats: { hp: 280, attack: 26, defense: 12, speed: 5 },
              skills: [
                { name: "熔岩喷发", description: "从地面召唤熔岩喷发，对范围内敌人造成高额伤害", damage: 26 },
                { name: "火焰领域", description: "点燃周围地面，对进入区域的敌人造成持续火焰伤害", damage: 10 },
                { name: "火风暴", description: "召唤强烈的火风暴席卷敌人", damage: 22 },
                { name: "火元素护盾", description: "创造火元素护盾，反弹部分伤害", damage: 0 }
              ],
              locations: ["熔火之心-核心", "虚无秘境-火焰岛"],
              weakness: ["水属性", "冰属性"],
              resistance: ["火属性", "雷属性"]
            },
             // 传说怪物
            {
              id: "nine_tailed_fox",
              name: "九尾妖狐",
              description: "魅惑控制，幻术制造迷宫。拥有九条尾巴的神秘狐狸，能够控制人心，制造复杂的幻术迷宫让对手迷失其中。传说中它是森林的守护者，但也有人说它是喜欢捉弄人类的恶作剧者。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20nine-tailed%20fox%20monster%208bit%20illusions%20maze&sign=1b44774db511e31dd10455b669838cb7",
              type: "火属性",
              rarity: "传说",
              stats: { hp: 300, attack: 35, defense: 15, speed: 18 },
              skills: [
                { name: "魅惑术", description: "魅惑敌人，使其在一定时间内无法行动", damage: 0 },
                { name: "幻术迷宫", description: "制造幻术迷宫，对敌人造成持续伤害并降低速度", damage: 15 },
                { name: "九尾连击", description: "九条尾巴同时发动攻击，造成高额伤害", damage: 35 },
                { name: "妖狐火", description: "释放狐狸形状的火焰攻击敌人", damage: 25 },
                { name: "灵魂吞噬", description: "吞噬敌人的灵魂，恢复自身生命值", damage: 0 }
              ],
              locations: ["宁静村庄-隐藏神社", "凛冬山脉-雪隐神社", "虚无秘境-幻境", "起源之殿-幻梦厅"],
              weakness: ["光属性", "雷属性"],
              resistance: ["火属性", "暗属性"]
            },
            {
              id: "ice_phoenix",
              name: "冰霜凤凰",
              description: "死亡后涅槃重生，强化冰系技能。冰蓝色的凤凰，在死亡时会浴火重生，重生后所有冰系技能威力大幅提升。它是冰雪王国的守护者，只在极寒之地出现。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20ice%20phoenix%20monster%208bit%20rebirth%20frost&sign=e03639c376dcc8913bf756335002c682",
              type: "冰属性",
              rarity: "传说",
              stats: { hp: 350, attack: 30, defense: 20, speed: 22 },
              skills: [
                { name: "冰风暴", description: "召唤强烈的冰风暴，对范围内敌人造成伤害并减速", damage: 30 },
                { name: "冰之守护", description: "创造冰之护盾，大幅提升防御力", damage: 0 },
                { name: "涅槃重生", description: "死亡后立即复活，恢复全部生命值并强化所有冰系技能", damage: 0 },
                { name: "冰锥穿刺", description: "发射密集的冰锥穿透敌人", damage: 28 },
                { name: "绝对零度", description: "降低周围温度至绝对零度，冻结一切敌人", damage: 25 }
              ],
              locations: ["幽暗沼泽-冰封沼泽", "凛冬山脉-山顶", "熔火之心-冰火交界", "虚无秘境-极寒岛", "起源之殿-冰霜殿"],
              weakness: ["火属性", "雷属性"],
              resistance: ["冰属性", "水属性"]
            },
            {
              id: "abyssal_worm",
              name: "深渊蠕虫",
              description: "钻地突袭，吞噬玩家并消化。生活在地下深处的巨大蠕虫，能够在地下快速移动并突然钻出地面攻击，被吞噬的敌人会受到持续伤害。它的存在是地下世界的恐怖传说。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20abyssal%20worm%20monster%208bit%20burrowing%20swallow&sign=fa0410899e297bcaf3d5d928a71e460e",
              type: "地属性",
              rarity: "传说",
              stats: { hp: 400, attack: 40, defense: 18, speed: 10 },
              skills: [
                { name: "钻地突袭", description: "潜入地下，然后突然钻出地面攻击敌人", damage: 40 },
                { name: "深渊吞噬", description: "张开血盆大口吞噬敌人，使其持续受到伤害", damage: 20 },
                { name: "地动山摇", description: "震动地面，造成范围伤害并使敌人眩晕", damage: 25 },
                { name: "腐蚀酸液", description: "喷出具有强烈腐蚀性的酸液", damage: 30 },
                { name: "地刺攻击", description: "从地面召唤尖锐的地刺攻击敌人", damage: 22 }
              ],
              locations: ["熔火之心-熔岩隧道", "虚无秘境-虚空深渊", "起源之殿-虚空洞"],
              weakness: ["火属性", "雷属性"],
              resistance: ["地属性", "暗属性"]
            },
             // 神话怪物
            {
              id: "time_eater",
              name: "时空吞噬者",
              description: "扭曲时间，加速/减速/暂停技能。能够操控时间流逝的神秘生物，可以加速自身移动、减慢敌人动作，甚至短暂暂停时间。它存在于时间裂隙中，以吞噬时间能量为生，被它触碰的生物会迅速衰老或年轻。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20time%20eater%20monster%208bit%20space%20time%20distortion&sign=900faffd4676d96da66fe9ed3eee665f",
              type: "时间属性",
              rarity: "神话",
              stats: { hp: 500, attack: 45, defense: 25, speed: 35 },
               skills: [
                { name: "时间加速", description: "加速自身时间流动，使自身下次攻击时多攻击一次", damage: 0 },
                { name: "时间减速", description: "减慢敌人时间流动，使敌人下次攻击时无法造成伤害", damage: 0 },
                { name: "时间暂停", description: "短暂暂停时间，使敌人无法行动，同时自身回复生命值", damage: 0 },
                { name: "时空吞噬", description: "吞噬目标周围的时间能量，造成巨大伤害并吸取生命值", damage: 50 },
                { name: "时光倒流", description: "濒死时触发，使时间倒流，恢复自己的生命值至满状态（单次关卡仅限一次）", damage: 0 },
                { name: "时空断裂（专属）", description: "撕裂时空，对敌人造成无法闪避的伤害，并使其受到时间断裂效果影响", damage: 60 }
              ],
              locations: ["宁静村庄-时空裂缝", "熔火之心-混沌核心", "起源之殿-时钟回廊"],
              weakness: ["光属性", "秩序属性"],
              resistance: ["时间属性", "暗属性"]
            },
            {
              id: "world_tree_root",
              name: "世界树之根",
              description: "无限再生，根须缠绕全球。世界树的地下根须，拥有强大的再生能力，能够生长出无数根须攻击敌人，即使被切断也能迅速恢复。它是世界树生命力的源泉，连接着所有生物的生命能量。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20world%20tree%20root%20monster%208bit%20infinite%20regeneration&sign=47e3d7e95c81e1635663a3b5845a714e",
              type: "自然属性",
              rarity: "神话",
              stats: { hp: 600, attack: 40, defense: 30, speed: 15 },
              skills: [
                { name: "根须缠绕", description: "从地下伸出大量根须缠绕敌人，造成伤害并使其无法行动", damage: 35 },
                 { name: "生命汲取", description: "吸收敌人的生命能量，恢复自身生命值", damage: 0 },
                { name: "自然护盾", description: "创造强大的自然护盾，大幅提升防御力", damage: 0 },
                 { name: "无限再生", description: "在受到致命伤害时触发，瞬间恢复全部生命值并清除所有负面状态（单次关卡尽可发动一次）", damage: 0 },
                { name: "种子爆炸", description: "散播爆炸种子攻击敌人", damage: 30 },
                 { name: "生命洪流（专属）", description: "召唤世界树的生命能量，恢复大量生命值并强化所有技能效果（持续五回合）", damage: 0 }
              ],
              locations: ["幽暗沼泽-远古树洞", "虚无秘境-生命岛", "起源之殿-生命温室"],
              weakness: ["火属性", "雷属性"],
              resistance: ["自然属性", "水属性"]
            },
            {
              id: "primeval_demon",
              name: "原初恶魔",
              description: "宇宙负面能量凝聚，七宗罪技能轮换。由宇宙中所有负面能量凝聚而成的恶魔，能够释放七种不同的罪恶之力，每次战斗都会随机使用不同的罪业技能。它代表着傲慢、嫉妒、暴怒、懒惰、贪婪、暴食和色欲这七种人类的原罪。",
              spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20primeval%20demon%20monster%208bit%20seven%20sins%20rotating&sign=b726d6446df1bd0550833513e65efd84",
              type: "混沌属性",
              rarity: "神话",
              stats: { hp: 550, attack: 50, defense: 20, speed: 25 },
               skills: [
                { name: "傲慢冲击", description: "释放傲慢之力，对敌人造成巨大伤害并降低其攻击力", damage: 55 },
                { name: "嫉妒诅咒", description: "释放嫉妒之力，使敌人无法获得任何增益效果", damage: 0 },
                { name: "暴怒之焰", description: "释放暴怒之力，对范敌人造成持续火焰伤害，并使敌人进入灼烧状态", damage: 30 },
                { name: "懒惰光环", description: "释放懒惰之力，降低敌人的防御力", damage: 0 },
                { name: "贪婪吞噬", description: "释放贪婪之力，吞噬敌人的生命值并回复自身", damage: 40 },
                { name: "混沌领域（专属）", description: "创造混沌领域，使敌人陷入混乱状态并受到持续混沌伤害", damage: 45 }
              ],
              locations: ["凛冬山脉-雪山裂缝", "起源之殿-混沌核心"],
              weakness: ["光属性", "净化属性"],
              resistance: ["混沌属性", "暗属性", "毒属性"]
            }
     ];

    // 返回找到的怪物或默认怪物
    return allMonsters.find(m => m.id === monsterId) || allMonsters[0];
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
      case '冰属性': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300';
      case '时间属性': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case '自然属性': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case '混沌属性': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case '秩序属性': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case '净化属性': return 'bg-white text-gray-800 dark:bg-gray-700 dark:text-white';
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

   // 获取属性对应的图标
  const getStatIcon = (statName: string) => {
    switch (statName) {
      case 'hp': return 'fas fa-heart';
      case 'attack': return 'fas fa-fist-raised';
      case 'defense': return 'fas fa-shield-alt';
      default: return 'fas fa-question';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl text-center">
          <div className="animate-pulse">
            <i className="fas fa-spinner fa-spin text-4xl text-blue-600 dark:text-blue-400 mb-4"></i>
            <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300">加载怪物信息中...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link to="/collection">
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回图鉴
            </PixelButton>
          </Link>
        </div>

        {monster && (
          <>
            {/* 怪物名称和基本信息 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border-4 border-blue-800 dark:border-blue-900">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-4 border-blue-500 dark:border-blue-400 mb-4 md:mb-0 md:mr-6">
                  <img 
                    src={monster.spriteUrl} 
                    alt={monster.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-2">{monster.name}</h1>
                   <div className="flex justify-center md:justify-start space-x-2 mb-3">
                    <span className={`text-xs ${getMonsterRarityColor(monster.rarity)} px-2 py-1 rounded`}>
                      {monster.rarity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 怪物介绍 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border-4 border-blue-800 dark:border-blue-900">
              <h2 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-400">
                怪物介绍
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {monster.description}
              </p>
            </div>

           {/* 怪物属性 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border-4 border-blue-800 dark:border-blue-900">
            <h2 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-400">
              基本属性
            </h2>
            {monster.stats && (
              <div className="grid grid-cols-3 gap-4">
                 {/* 只显示前三个属性 */}
                {Object.entries(monster.stats).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="bg-blue-50 dark:bg-gray-700 rounded-md p-3 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
                      <i className={`${getStatIcon(key)} text-blue-600 dark:text-blue-400`}></i>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {key === 'hp' ? '生命值' : key === 'attack' ? '攻击力' : '防御力'}
                    </div>
                    <div className="font-bold text-gray-800 dark:text-gray-300 text-xl">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

            {/* 怪物技能 */}
            {monster.skills && monster.skills.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border-4 border-blue-800 dark:border-blue-900">
                <h2 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-400">
                  技能
                </h2>
                <div className="space-y-3">
                  {monster.skills.map((skill, index) => (
                    <div key={index} className="bg-purple-50 dark:bg-gray-700 rounded-md p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-purple-800 dark:text-purple-300">{skill.name}</h3>
                        <span className="text-sm font-bold text-red-600 dark:text-red-400">
                          伤害: {skill.damage}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 怪物分布地区 */}
            {monster.locations && monster.locations.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border-4 border-blue-800 dark:border-blue-900">
                <h2 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-400">
                  分布地区
                </h2>
                <div className="flex flex-wrap gap-2">
                  {monster.locations.map((location, index) => (
                    <span key={index} className="px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-sm">
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 怪物弱点和抗性 */}
            {(monster.weakness && monster.weakness.length > 0) || (monster.resistance && monster.resistance.length > 0) && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border-4 border-blue-800 dark:border-blue-900">
                {monster.weakness && monster.weakness.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xl font-bold mb-3 text-red-700 dark:text-red-400">
                      弱点
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {monster.weakness.map((weakness, index) => (
                        <span key={index} className="px-3 py-1.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full text-sm">
                          {weakness}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {monster.resistance && monster.resistance.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-3 text-green-700 dark:text-green-400">
                      抗性
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {monster.resistance.map((resistance, index) => (
                        <span key={index} className="px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-sm">
                          {resistance}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

             {/* 提示信息 */}
             <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-md border-2 border-amber-300 dark:border-amber-700 mb-6">
               <div className="flex items-start">
                 <i className="fas fa-info-circle text-amber-500 mt-1 mr-2"></i>
                   <p className="text-sm text-amber-800 dark:text-amber-300">
                    提示：这种怪物出没于<span className="font-bold">{monster.locations?.join('、') || '未知区域'}。</span>在冒险中击败这种怪物可以收集它们的素材，用于打造更强力的装备！根据其属性特点：<span className="font-bold">生命值</span>{monster.stats?.hp ? `${monster.stats.hp > 150 ? '较高' : monster.stats.hp > 80 ? '中等' : '较低'}` : '未知'}、<span className="font-bold">攻击力</span>{monster.stats?.attack ? `${monster.stats.attack > 20 ? '较高' : monster.stats.attack > 10 ? '中等' : '较低'}` : '未知'}、<span className="font-bold">防御力</span>{monster.stats?.defense ? `${monster.stats.defense > 15 ? '较高' : monster.stats.defense > 5 ? '中等' : '较低'}` : '未知'}，请选择合适的战斗策略！
                  </p>
                </div>
             </div>
          </>
        )}
      </div>
    </div>
  );
}