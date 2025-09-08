import React from 'react';
  import { Link } from 'react-router-dom';
  import { useGame } from '@/contexts/gameContext';
  import { PixelButton } from '@/components/PixelButton';
  import { Item } from '@/lib/gameTypes';
  import { toast } from 'sonner';

  export default function Shop() {
    const { gameState, spendGold, addItem, addMaterial } = useGame();
    const { player } = gameState;

    // 商店商品
    const shopItems: (Item & { isMaterial?: boolean })[] = [
      {
        id: "potion",
        name: "回复药水",
        description: "恢复20点生命值",
        type: "potion",
        effect: "heal:20",
        price: 20,
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20health%20potion%208bit&sign=a81d64e1f352b1dbea7d5948df0cd715"
      },
       {
        id: "superpotion",
        name: "超级回复药水",
        description: "恢复50点生命值",
        type: "potion",
        effect: "heal:50",
        price: 50,
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20super%20health%20potion%208bit&sign=f679b5500b11153be0451f13d6821c8e"
      },
      {
        id: "attackpotion",
        name: "力量药水",
        description: "临时提升攻击力10点",
        type: "potion",
        effect: "attack:10",
        price: 30,
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20strength%20potion%208bit&sign=a42d9e2d720d98bb0560e8c05679cf0d"
      },
      {
        id: "defensepotion",
        name: "防御药水",
        description: "临时提升防御力10点",
        type: "potion",
        effect: "defense:10",
        price: 30,
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20defense%20potion%208bit&sign=489fe6a637691a791032347a091db731"
      },
       {
        id: "defensepotion_plus",
        name: "高级防御药水",
        description: "临时提升防御力15点",
        type: "potion",
        effect: "defense:15",
        price: 45,
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20advanced%20defense%20potion%208bit&sign=e715521e9b72ede722c7cd76ce23b46e"
      }
    ];

  // 购买物品 - 现在所有物品都不可购买
  const buyItem = (item: (Item & { isMaterial?: boolean, materialName?: string })) => {
    toast.info('所有药水暂不可购买，敬请期待！');
  };

  // 获取物品类型的图标
  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'potion': return 'fas fa-flask';
      case 'scroll': return 'fas fa-scroll';
      case 'equipment': return 'fas fa-shield-alt';
      default: return 'fas fa-box';
    }
  };

  // 获取物品类型的颜色
  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'potion': return 'text-red-500';
      case 'scroll': return 'text-blue-500';
      case 'equipment': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-100 dark:from-gray-900 dark:to-orange-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link to="/">
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回
            </PixelButton>
          </Link>
        </div>

        {/* 商店标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-orange-800 dark:text-orange-300 font-['Press_Start_2P',_cursive]">
          商店
        </h1>

        {/* 玩家金币 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border-4 border-orange-800 dark:border-orange-900 flex justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400">
            你的金币
          </div>
          <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
            <i className="fas fa-coins mr-2"></i>
            {player.gold}
          </div>
        </div>

         {/* 系统提示 */}
        <div className="bg-amber-50 dark:bg-amber-900/30 p-4 mb-6 rounded-md border-2 border-amber-300 dark:border-amber-700">
          <div className="flex items-start">
            <i className="fas fa-info-circle text-amber-500 mt-1 mr-2"></i>
            <p className="text-sm text-amber-800 dark:text-amber-300">
              系统提示：所有药水暂不可购买，敬请期待！
            </p>
          </div>
        </div>

        {/* 商品列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-orange-800 dark:border-orange-900">
          <h2 className="text-xl font-bold mb-4 text-orange-700 dark:text-orange-400">
            商品列表
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {shopItems.map((item) => (
              <div key={item.id} className="flex p-3 bg-orange-50 dark:bg-gray-700 rounded-md border-2 border-orange-300 dark:border-orange-700 relative overflow-hidden">
                {/* 暂不可购买标记 */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-gray-500/80 dark:bg-gray-800/80 rotate-45 flex items-center justify-center">
                  <span className="text-white text-xs font-bold transform rotate-[-45deg]">暂不可购买</span>
                </div>
                
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden opacity-70">
                  <img src={item.spriteUrl} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-orange-800 dark:text-orange-300">{item.name}</h3>
                    <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold text-sm">
                      <i className="fas fa-coins mr-1"></i>
                      {item.price}
                    </div>
                  </div>
                  <div className="mt-1 flex items-center">
                    <i className={`${getItemTypeIcon(item.type)} ${getItemTypeColor(item.type)} mr-1 text-xs`}></i>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.type === 'potion' ? '药水' : item.type === 'scroll' ? '卷轴' : '装备'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-2">
                    <PixelButton 
                      className="w-full text-xs py-1 opacity-70 cursor-not-allowed"
                      onClick={() => buyItem(item)}
                      disabled
                    >
                      敬请期待
                    </PixelButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}