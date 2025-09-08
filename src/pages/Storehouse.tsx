import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';
import { toast } from 'sonner';
import { Item } from '@/lib/gameTypes';

export default function Storehouse() {
  const { gameState, consumeItem } = useGame();
  const { player } = gameState;
  
  // 切换标签页状态
  const [activeTab, setActiveTab] = useState<'potions' | 'materials'>('potions');
  
  // 从玩家物品中过滤出药水类型的物品（不包含装备）
  const potionItems: (Item & { quantity?: number })[] = player.items.filter(item => item.type !== 'equipment');
  
  // 获取所有材料
  const craftingMaterials = player.craftingMaterials || {};
  
  // 获取材料列表（转换为数组）
  const materialsList = Object.entries(craftingMaterials).map(([name, amount]) => ({
    name,
    amount,
    spriteUrl: getMaterialSpriteUrl(name)
  }));
  
  // 根据材料名称获取对应的精灵图URL
  function getMaterialSpriteUrl(materialName: string): string {
    const materialUrls: Record<string, string> = {
      "木材": "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20wood%20log%208bit&sign=8f3403abb8a64bcd4b7441f8e60a90d5",
      "铜矿": "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20copper%20ore%208bit&sign=57a8edd0420d8128e871db2c3860d39e",
      "铁矿": "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20ore%208bit&sign=e581588b7c338485b4ef6e863ef1db84",
      "银矿": "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20silver%20ore%208bit&sign=06454ea1f07b3a49f96d10e9c50e58d1",
      "金矿": "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20gold%20ore%208bit&sign=3d7d6700bc75023be24a915b2a895eac",
      "钻石矿": "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20diamond%20ore%208bit&sign=8a6e58354d057cc5a11ab956436ceddd",
      "陨石矿": "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20meteorite%20ore%208bit%20glowing&sign=f9832543d18a824d5837c65b09e99892"
    };
    
    return materialUrls[materialName] || "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20mystery%20material%208bit&sign=3318b667726d8227ffa73e0dfa3be985";
  }
  
  // 获取物品类型的图标
  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'potion': return 'fas fa-flask';
      case 'scroll': return 'fas fa-scroll';
      default: return 'fas fa-box';
    }
  };
  
  // 获取物品类型的颜色
  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'potion': return 'text-red-500';
      case 'scroll': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };
  
  // 获取物品类型的中文名称
  const getItemTypeText = (type: string) => {
    switch (type) {
      case 'potion': return '药水';
      case 'scroll': return '卷轴';
      default: return '物品';
    }
  };
  
  // 使用药水
  const consumePotion = (item: Item) => {
    if (consumeItem(item.id)) {
      toast.success(`使用了 ${item.name}！`);
      // 这里可以添加药水效果的逻辑
      if (item.effect.includes('heal')) {
        // 模拟治疗效果
        const healAmount = parseInt(item.effect.split(':')[1]);
        toast.info(`恢复了 ${healAmount} 点生命值！`);
      } else if (item.effect.includes('speed')) {
        // 模拟速度提升效果
        const speedAmount = parseInt(item.effect.split(':')[1]);
        toast.info(`该效果已移除！`);
      }
    } else {
      toast.error('物品使用失败！');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-100 dark:from-gray-900 dark:to-green-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link to="/">
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回
            </PixelButton>
          </Link>
        </div>
        
        {/* 仓库标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800 dark:text-green-300 font-['Press_Start_2P',_cursive]">
          仓库
        </h1>
        
        {/* 标签页切换 */}
        <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border-4 border-green-800 dark:border-green-900">
          <button
            className={`flex-1 py-3 font-bold ${activeTab === 'potions' 
              ? 'text-green-800 dark:text-green-300 border-b-4 border-green-500' 
              : 'text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400'}`}
            onClick={() => setActiveTab('potions')}
          >
            消耗品
          </button>
          <button
            className={`flex-1 py-3 font-bold ${activeTab === 'materials' 
              ? 'text-green-800 dark:text-green-300 border-b-4 border-green-500' 
              : 'text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400'}`}
            onClick={() => setActiveTab('materials')}
          >
            打造材料
          </button>
        </div>
        
        {/* 内容区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-green-800 dark:border-green-900">
          {activeTab === 'potions' ? (
            // 消耗品列表
            <div>
              <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">
                消耗品
              </h2>
              {potionItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {potionItems.map((item) => (
                    <div key={item.id} className="flex p-3 bg-green-50 dark:bg-gray-700 rounded-md border-2 border-green-300 dark:border-green-700">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden">
                        <img src={item.spriteUrl} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-green-800 dark:text-green-300">{item.name}</h3>
                          <span className="text-xs bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                            x{item.quantity || 1}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center">
                          <i className={`${getItemTypeIcon(item.type)} ${getItemTypeColor(item.type)} mr-1 text-xs`}></i>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {getItemTypeText(item.type)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="mt-2">
                          <PixelButton 
                            className="w-full text-xs py-1"
                            onClick={() => consumePotion(item)}
                          >
                            使用
                          </PixelButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-700 rounded-md border-2 border-gray-300 dark:border-gray-600">
                  <i className="fas fa-box-open text-gray-400 text-4xl mb-4"></i>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    仓库中没有消耗品
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-center text-sm mt-2">
                    快去商店购买一些药水吧！
                  </p>
                </div>
              )}
            </div>
          ) : (
            // 材料列表
            <div>
              <h2 className="text-xl font-bold mb-4 text-green-700 dark:text-green-400">
                打造材料
              </h2>
              {materialsList.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {materialsList.map((material) => (
                    <div key={material.name} className="flex flex-col items-center p-3 bg-green-50 dark:bg-gray-700 rounded-md border-2 border-green-300 dark:border-green-700">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden mb-2">
                        <img src={material.spriteUrl} alt={material.name} className="w-full h-full object-contain" />
                      </div>
                      <h3 className="font-bold text-green-800 dark:text-green-300 text-sm">{material.name}</h3>
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                        数量: {material.amount}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-700 rounded-md border-2 border-gray-300 dark:border-gray-600">
                  <i className="fas fa-gem text-gray-400 text-4xl mb-4"></i>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    仓库中没有打造材料
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-center text-sm mt-2">
                    快去挑战副本收集材料吧！
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* 仓库说明 */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>仓库中存放着你的消耗品和打造材料，合理使用它们来提升你的冒险体验！</p>
        </div>
      </div>
    </div>
  );
}