import { ItemQuality, ItemCategory, Item } from "./gameTypes";

  // 可打造的装备数据
  export const craftableItems: (Item & {
    requiredMaterials: {
      name: string;
      amount: number;
      spriteUrl: string;
    }[];
    goldCost: number;
    quality: ItemQuality;
    category: ItemCategory;
    isPremium?: boolean;
  })[] = [
    // 普通品质装备
    {
      id: "iron_dagger",
      name: "铁制短剑",
      description: "生锈的短剑，勉强能用来砍柴。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20rusty%20dagger%208bit&sign=fb39b91d1c3a6986c8dc9ad709b395a8",
      requiredMaterials: [
        { name: "木材", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" }
      ],
      goldCost: 50,
      quality: 'common',
      category: 'weapon',
      type: 'equipment',
      effect: 'attack:3',
      stats: { attack: 3 }
    },
    {
      id: "wooden_shield",
      name: "木制圆盾",
      description: "用普通木头做的轻便小盾，防御力有限。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wooden%20shield%208bit&sign=41efe1ea2039b7018e79d99239a96fbb",
      requiredMaterials: [
        { name: "木材", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" }
      ],
      goldCost: 40,
      quality: 'common',
      category: 'shield',
      type: 'equipment',
      effect: 'defense:2',
      stats: { defense: 2 }
    },
    {
      id: "leather_hat",
      name: "皮帽",
      description: "粗糙皮革制成的帽子，只能挡点灰尘。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20leather%20hat%208bit&sign=7516a05c5ed5de9f4bb743dbf344af37",
      requiredMaterials: [
        { name: "木材", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" }
      ],
      goldCost: 30,
      quality: 'common',
      category: 'helmet',
      type: 'equipment',
      effect: 'defense:1',
      stats: { defense: 1 }
    },
    {
      id: "cloth_armor",
      name: "布衣",
      description: "简陋的麻布衣服，几乎没什么防护。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20cloth%20armor%208bit&sign=3fbaa3e6ac577d6560da2f1d849e65c3",
      requiredMaterials: [
        { name: "木材", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" }
      ],
      goldCost: 35,
      quality: 'common',
      category: 'armor',
      type: 'equipment',
      effect: 'defense:2',
      stats: { defense: 2 }
    },
    {
      id: "straw_shoes",
      name: "草鞋",
      description: "用干草编织的鞋，容易磨脚。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20straw%20shoes%208bit&sign=6c3ef4e1e488a458f7d11f45da87bfcf",
      requiredMaterials: [
        { name: "木材", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" }
      ],
      goldCost: 25,
      quality: 'common',
      category: 'shoes',
      type: 'equipment',
      effect: 'defense:1',
      stats: { defense: 1 }
    },
    {
      id: "glass_bead_necklace",
      name: "玻璃珠项链",
      description: "彩色玻璃珠子串成的廉价饰品。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20glass%20bead%20necklace%208bit&sign=9d9eb9b131646454f03aefefc06d7aa2",
      requiredMaterials: [
        { name: "木材", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" }
      ],
      goldCost: 20,
      quality: 'common',
      category: 'accessory',
      type: 'equipment',
      effect: 'attack:1;defense:1',
      stats: { attack: 1, defense: 1 }
    },
    
    // 高级品质装备
    {
      id: "steel_sword",
      name: "钢纹长剑",
      description: "经过锻打的钢剑，刃口锋利。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20steel%20sword%208bit&sign=7e2bcdcccd5d465533bb6c179d78788b",
      requiredMaterials: [
        { name: "木材", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
        { name: "铁矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 200,
      quality: 'advanced',
      category: 'weapon',
      type: 'equipment',
      effect: 'attack:8',
      stats: { attack: 8 }
    },
    {
      id: "iron_edge_shield",
      name: "包铁盾",
      description: "木盾边缘包裹铁皮，更耐用。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20edge%20shield%208bit&sign=8d7a1b28b5743014230f6d7929ab66cd",
      requiredMaterials: [
        { name: "木材", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
        { name: "铁矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 150,
      quality: 'advanced',
      category: 'shield',
      type: 'equipment',
      effect: 'defense:6',
      stats: { defense: 6 }
    },
    {
      id: "iron_banded_helmet",
      name: "铁箍头盔",
      description: "带有铁箍的皮盔，能抵挡轻击。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20banded%20helmet%208bit&sign=b258a05b331d488a436ded82f149a0ee",
      requiredMaterials: [
        { name: "木材", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
        { name: "铁矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 100,
      quality: 'advanced',
      category: 'helmet',
      type: 'equipment',
      effect: 'defense:4',
      stats: { defense: 4 }
    },
    {
      id: "chain_mail",
      name: "链甲衫",
      description: "用铁环编织的轻甲，灵活且实用。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20chain%20mail%20armor%208bit&sign=edb8056ee852106dd81ea6d0348bedf1",
      requiredMaterials: [
        { name: "木材", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
        { name: "铁矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 180,
      quality: 'advanced',
      category: 'armor',
      type: 'equipment',
      effect: 'defense:7',
      stats: { defense: 7 }
    },
    {
      id: "hard_leather_boots",
      name: "硬皮靴",
      description: "鞣制皮革制成的靴子，适合长途行走。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20hard%20leather%20boots%208bit&sign=cc4be6d4423b897d563aa1dbe8e12589",
      requiredMaterials: [
        { name: "木材", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
        { name: "铁矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 90,
      quality: 'advanced',
      category: 'shoes',
      type: 'equipment',
      effect: 'defense:5',
      stats: { defense: 5 }
    },
    {
      id: "copper_amulet",
      name: "铜制护符",
      description: "刻有简单纹样的铜牌，据说能带来好运。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20amulet%208bit&sign=46a542518a33466c3a55e93a2ccb25f0",
      requiredMaterials: [
        { name: "木材", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
        { name: "铁矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 80,
      quality: 'advanced',
      category: 'accessory',
      type: 'equipment',
      effect: 'attack:3;defense:3',
      stats: { attack: 3, defense: 3 }
    },
    
    // 稀有品质装备
           {
            id: "icy_blade",
            name: "寒光刃",
            description: "剑身泛着蓝光，挥动时带有寒意。",
            spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20icy%20blue%20sword%208bit%20glowing&sign=b6d86efc4a0b92c364ebd218158ac0fa",
            requiredMaterials: [
              { name: "木材", amount: 200, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" }
            ],
            goldCost: 350,
            quality: 'rare',
            category: 'weapon',
            type: 'equipment',
            effect: 'attack:15',
            stats: { attack: 15 }
          },
          {
            id: "turtle_shield",
            name: "龟甲盾",
            description: "用巨型龟壳打磨而成的盾，轻便且坚硬。",
            spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20turtle%20shell%20shield%208bit&sign=aa59b9e2da4dc0dda39b8401d4781f82",
            requiredMaterials: [
              { name: "木材", amount: 200, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" }
            ],
            goldCost: 300,
            quality: 'rare',
      category: 'shield',
      type: 'equipment',
      effect: 'defense:12',
      stats: { defense: 12 }
    },
    {
      id: "eagle_helmet",
      name: "鹰喙盔",
      description: "顶部装饰鹰喙的银盔，能增强视野。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20eagle%20beak%20helmet%208bit&sign=845a86fa1ea8a39347467f7385e26912",
      requiredMaterials: [
        { name: "木材", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铁矿", amount: 4, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 250,
      quality: 'rare',
      category: 'helmet',
      type: 'equipment',
      effect: 'defense:8',
      stats: { defense: 8 }
    },
    {
      id: "shadow_cloak",
      name: "暗影披风",
      description: "深色织物编织的披风，能融入夜色。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20shadow%20cloak%208bit&sign=fd22fd93b833616be0d86174b7f25293",
      requiredMaterials: [
        { name: "木材", amount: 12, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铁矿", amount: 6, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 320,
      quality: 'rare',
      category: 'armor',
      type: 'equipment',
      effect: 'defense:12',
      stats: { defense: 12 }
    },
    {
      id: "wind_walker_boots",
      name: "风行者之靴",
      description: "附魔的靴子，小幅提升移动速度。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wind%20walker%20boots%208bit&sign=c100bcc8ee46769b38e32bc4c3a3b9ff",
      requiredMaterials: [
        { name: "木材", amount: 8, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铁矿", amount: 3, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 200,
      quality: 'rare',
      category: 'shoes',
      type: 'equipment',
      effect: 'defense:10',
      stats: { defense: 10 }
    },
    {
      id: "catseye_ring",
      name: "猫眼石戒指",
      description: "镶嵌猫眼石的银戒，能在黑暗中发光。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20catseye%20ring%208bit%20glowing&sign=b157ddd33338c7faa0637c14cff0fe41",
      requiredMaterials: [
        { name: "木材", amount: 5, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 5, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" }
      ],
      goldCost: 180,
      quality: 'rare',
      category: 'accessory',
      type: 'equipment',
      effect: 'attack:6;defense:6',
      stats: { attack: 6, defense: 6 }
    },
    
    // 史诗品质装备
           {
            id: "dragon_tooth_sword",
            name: "龙牙巨剑",
            description: "用火龙獠牙打造的巨剑，攻击时可能点燃目标。",
            spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20dragon%20tooth%20sword%208bit%20flaming&sign=4a0c228a0fb4fe476928f82f1b619c00",
            requiredMaterials: [
              { name: "木材", amount: 1000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 100, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" },
              { name: "金矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" }
            ],
            goldCost: 500,
            quality: 'epic',
            category: 'weapon',
            type: 'equipment',
            effect: 'attack:25',
            stats: { attack: 25 }
          },
          {
            id: "mountain_shield",
            name: "山岳壁垒",
            description: "镶嵌岩核的巨盾，能格挡时震退敌人。",
            spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20mountain%20shield%208bit%20rock%20core&sign=00c46ceac08a59c9642db3f30ca63df6",
            requiredMaterials: [
              { name: "木材", amount: 1000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 100, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" },
              { name: "金矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" }
            ],
            goldCost: 450,
            quality: 'epic',
            category: 'shield',
      type: 'equipment',
      effect: 'defense:20',
      stats: { defense: 20 }
    },
    {
      id: "lich_crown",
      name: "巫妖王冠",
      description: "诅咒金属制成的头冠，免疫精神攻击。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20lich%20crown%208bit%20cursed&sign=0addb56ed3868a1b56d570719645b27c",
      requiredMaterials: [
        { name: "木材", amount: 15, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铁矿", amount: 6, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 400,
      quality: 'epic',
      category: 'helmet',
      type: 'equipment',
      effect: 'defense:15',
      stats: { defense: 15 }
    },
    {
      id: "starlit_armor",
      name: "星穹战甲",
      description: "陨铁锻造的铠甲，表面如星空般闪烁。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20starlit%20armor%208bit%20meteorite%20shiny&sign=faee3823d1ad2d4be4d6e096708902f6",
      requiredMaterials: [
        { name: "木材", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铁矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 480,
      quality: 'epic',
      category: 'armor',
      type: 'equipment',
      effect: 'defense:18',
      stats: { defense: 18 }
    },
    {
      id: "blink_boots",
      name: "瞬步长靴",
      description: "镶嵌空间宝石的靴子，可短距离闪现。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20blink%20boots%208bit%20space%20gem&sign=6d79a5cf76f138cb5ff958ebf7545759",
      requiredMaterials: [
        { name: "木材", amount: 12, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铁矿", amount: 5, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" }
      ],
      goldCost: 350,
      quality: 'epic',
      category: 'shoes',
      type: 'equipment',
      effect: 'defense:16',
      stats: { defense: 16 }
    },
    {
      id: "time_sandglass",
      name: "时间沙漏",
      description: "小巧的金沙漏，佩戴者偶尔能预判危险。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20time%20sandglass%208bit%20golden&sign=c80d38b5b02b91cf03ca77c3490d4534",
      requiredMaterials: [
        { name: "木材", amount: 8, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "铜矿", amount: 8, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" }
      ],
      goldCost: 300,
      quality: 'epic',
      category: 'accessory',
      type: 'equipment',
      effect: 'attack:10;defense:10',
      stats: { attack: 10, defense: 10 }
    },
    // 传说品质装备
           {
            id: "divine_punishment",
            name: "神罚",
            description: "天使铸造的圣剑，对邪恶生物造成额外伤害。",
            spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20holy%20sword%208bit%20divine%20light&sign=b232fe72d86f64313a1d1ac7ea50c958",
            requiredMaterials: [
              { name: "木材", amount: 5000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 200, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 100, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" },
              { name: "金矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" },
              { name: "钻石矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20diamond%20ore%208bit&sign=8a6e58354d057cc5a11ab956436ceddd" }
            ],
            goldCost: 1500,
            quality: 'legendary',
            category: 'weapon',
            type: 'equipment',
            effect: 'attack:40',
            stats: { attack: 40 }
          },
          {
            id: "ragnarok_shield",
            name: "诸神黄昏",
            description: "用世界树碎片制成的盾牌，能吸收魔法伤害。",
            spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20world%20tree%20shield%208bit%20mythical&sign=611388075e0151ab41dd50f9420f508f",
            requiredMaterials: [
              { name: "木材", amount: 5000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 200, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 100, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" },
              { name: "金矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" },
              { name: "钻石矿", amount: 10, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20diamond%20ore%208bit&sign=8a6e58354d057cc5a11ab956436ceddd" }
            ],
            goldCost: 1400,
            quality: 'legendary',
            category: 'shield',
            type: 'equipment',
            effect: 'defense:35',
            stats: { defense: 35 }
    },
    {
      id: "odins_eye",
      name: "奥丁之视",
      description: "独眼造型的金盔，赋予佩戴者洞察弱点。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20one-eyed%20helmet%208bit%20golden%20viking&sign=ad3d70d85287f1769a0a5663ce6984a9",
      requiredMaterials: [
        { name: "木材", amount: 4000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "金矿", amount: 200, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" }
      ],
      goldCost: 1200,
      quality: 'legendary',
      category: 'helmet',
      type: 'equipment',
      effect: 'defense:25',
      stats: { defense: 25 }
    },
    {
      id: "titan_armor",
      name: "泰坦胸甲",
      description: "远古巨人心脏熔铸的铠甲，近乎无敌。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20titan%20armor%208bit%20ancient%20giant&sign=5ddd05b96e67f9bd29de7d75a3a9eb96",
      requiredMaterials: [
        { name: "木材", amount: 5500, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "钻石矿", amount: 300, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20diamond%20ore%208bit&sign=8a6e58354d057cc5a11ab956436ceddd" }
      ],
      goldCost: 1600,
      quality: 'legendary',
      category: 'armor',
      type: 'equipment',
      effect: 'defense:30',
      stats: { defense: 30 }
    },
    {
      id: "hermes_wings",
      name: "赫尔墨斯之翼",
      description: "带金色羽翼的靴子，大幅提升敏捷。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20hermes%20boots%208bit%20golden%20wings&sign=4c13c8663d4c61bc75b0a81f401897c4",
      requiredMaterials: [
        { name: "木材", amount: 3500, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "金矿", amount: 150, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" }
      ],
      goldCost: 1000,
      quality: 'legendary',
      category: 'shoes',
      type: 'equipment',
      effect: 'defense:28',
      stats: { defense: 28 }
    },
    {
      id: "pandora_box",
      name: "潘多拉魔盒",
      description: "微型魔盒，打开后随机触发一种效果。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20pandora%20box%208bit%20mysterious&sign=6c3a67194f24af6e88f868c42a464ac5",
      requiredMaterials: [
        { name: "木材", amount: 3000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
        { name: "金矿", amount: 100, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" }
      ],
      goldCost: 900,
      quality: 'legendary',
      category: 'accessory',
      type: 'equipment',
      effect: 'attack:15;defense:15',
      stats: { attack: 15, defense: 15 }
    },
    // 神话品质装备
    {
      id: "creation_blade",
      name: "创世之刃",
      description: "传说中开辟世界的刀刃，可斩断因果。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20creation%20sword%208bit%20cosmic%20power&sign=45a84c7bca2dcb84e8e42ae30b12de9d",
             requiredMaterials: [
              { name: "木材", amount: 10000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 1000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 500, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 200, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" },
              { name: "金矿", amount: 100, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" },
              { name: "钻石矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20diamond%20ore%208bit&sign=8a6e58354d057cc5a11ab956436ceddd" },
              { name: "陨石矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20meteorite%20ore%208bit%20glowing&sign=f9832543d18a824d5837c65b09e99892" }
            ],
      goldCost: 2500,
      quality: 'mythic',
      category: 'weapon',
      type: 'equipment',
      effect: 'attack:60',
      stats: { attack: 60 }
    },
    {
      id: "eternal_wall",
      name: "永恒之墙",
      description: "用时空碎片凝固的盾牌，绝对防御。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20eternal%20shield%208bit%20time%20space%20fragments&sign=0e51770ab54266e5a9df155ee47822bd",
             requiredMaterials: [
              { name: "木材", amount: 10000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 1000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 500, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 200, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" },
              { name: "金矿", amount: 100, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" },
              { name: "钻石矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20diamond%20ore%208bit&sign=8a6e58354d057cc5a11ab956436ceddd" },
              { name: "陨石矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20meteorite%20ore%208bit%20glowing&sign=f9832543d18a824d5837c65b09e99892" }
            ],
      goldCost: 2300,
      quality: 'mythic',
      category: 'shield',
      type: 'equipment',
      effect: 'defense:50',
      stats: { defense: 50 }
    },
    {
      id: "chaos_crown",
      name: "混沌冠冕",
      description: "蕴含原始混沌之力的头冠，扭曲现实。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20chaos%20crown%208bit%20primordial%20power&sign=3d0eaf148fd6cd1c7fdeefe8c778a4aa",
             requiredMaterials: [
              { name: "木材", amount: 10000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 1000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 500, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 200, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" },
              { name: "金矿", amount: 100, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" },
              { name: "钻石矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20diamond%20ore%208bit&sign=8a6e58354d057cc5a11ab956436ceddd" },
              { name: "陨石矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20meteorite%20ore%208bit%20glowing&sign=f9832543d18a824d5837c65b09e99892" }
            ],
      goldCost: 2000,
      quality: 'mythic',
      category: 'helmet',
      type: 'equipment',
      effect: 'defense:40',
      stats: { defense: 40 }
    },
    {
      id: "oracle_armor",
      name: "神谕战衣",
      description: "由命运纺织的轻甲，免疫即死效果。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20oracle%20armor%208bit%20fate%20woven&sign=608608e56cd8cccdea34830fe7a6eb97",
             requiredMaterials: [
              { name: "木材", amount: 10000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 1000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 500, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 200, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" },
              { name: "金矿", amount: 100, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" },
              { name: "钻石矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20diamond%20ore%208bit&sign=8a6e58354d057cc5a11ab956436ceddd" },
              { name: "陨石矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20meteorite%20ore%208bit%20glowing&sign=f9832543d18a824d5837c65b09e99892" }
            ],
      goldCost: 2400,
      quality: 'mythic',
      category: 'armor',
      type: 'equipment',
      effect: 'defense:45',
      stats: { defense: 45 }
    },
    {
      id: "cosmic_treads",
      name: "宇宙足迹",
      description: "踩过星空的靴子，一步跨越大陆。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20cosmic%20boots%208bit%20star%20stepping&sign=a1723918e34f557375ed518af2513a95",
             requiredMaterials: [
              { name: "木材", amount: 10000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 1000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 500, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 200, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" },
              { name: "金矿", amount: 100, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" },
              { name: "钻石矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20diamond%20ore%208bit&sign=8a6e58354d057cc5a11ab956436ceddd" },
              { name: "陨石矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20meteorite%20ore%208bit%20glowing&sign=f9832543d18a824d5837c65b09e99892" }
            ],
      goldCost: 1800,
      quality: 'mythic',
      category: 'shoes',
      type: 'equipment',
      effect: 'defense:45',
      stats: { defense: 45 }
    },
    {
      id: "root_seed",
      name: "根源之种",
      description: "世界起源的种子，佩戴者每秒恢复生命。",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20root%20seed%208bit%20world%20origin&sign=ffc9d7f1d9a30dbf725cea0614d28732",
             requiredMaterials: [
              { name: "木材", amount: 10000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5" },
              { name: "铜矿", amount: 1000, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e" },
              { name: "铁矿", amount: 500, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84" },
              { name: "银矿", amount: 200, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1" },
              { name: "金矿", amount: 100, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac" },
              { name: "钻石矿", amount: 50, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20diamond%20ore%208bit&sign=8a6e58354d057cc5a11ab956436ceddd" },
              { name: "陨石矿", amount: 20, spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20meteorite%20ore%208bit%20glowing&sign=f9832543d18a824d5837c65b09e99892" }
            ],
      goldCost: 1600,
      quality: 'mythic',
      category: 'accessory',
      type: 'equipment',
      effect: 'attack:25;defense:25',
      stats: { attack: 25, defense: 25 }
    }
  ];