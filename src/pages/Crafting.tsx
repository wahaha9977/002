import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';
import { toast } from 'sonner';

// 导入类型
import { ItemQuality, ItemCategory } from "@/lib/gameTypes";
import { craftableItems } from "@/lib/craftableItems";

export default function Crafting() {
  const { gameState, spendGold, addItem } = useGame();
  const { player } = gameState;
  
  // 筛选状态
  const [selectedQuality, setSelectedQuality] = useState<ItemQuality>('all');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('all');
  
   // 使用游戏上下文中的玩家材料
  const playerMaterials = player.craftingMaterials || {};
  
  const [selectedItem, setSelectedItem] = useState(craftableItems[0]);
  const [crafting, setCrafting] = useState(false);
  
   // 获取所有品质类型
  const qualityOptions: { value: 'all' | ItemQuality; label: string; color: string }[] = [
    { value: 'all', label: '全部品质', color: 'bg-amber-100 text-amber-800' },
    { value: 'common', label: '普通', color: 'bg-gray-100 text-gray-800' },
    { value: 'advanced', label: '高级', color: 'bg-green-100 text-green-800' },
    { value: 'rare', label: '稀有', color: 'bg-blue-100 text-blue-800' },
    { value: 'epic', label: '史诗', color: 'bg-purple-100 text-purple-800' },
    { value: 'legendary', label: '传说', color: 'bg-orange-100 text-orange-800' },
    { value: 'mythic', label: '神话', color: 'bg-pink-100 text-pink-800' }
  ];
  
  // 获取所有装备部位类型
  const categoryOptions: { value: ItemCategory; label: string; icon: string }[] = [
    { value: 'all', label: '全部部位', icon: 'fas fa-cube' },
    { value: 'weapon', label: '武器', icon: 'fas fa-sword' },
    { value: 'shield', label: '盾牌', icon: 'fas fa-shield-alt' },
    { value: 'helmet', label: '头盔', icon: 'fas fa-hard-hat' },
    { value: 'armor', label: '铠甲', icon: 'fas fa-user-shield' },
    { value: 'shoes', label: '靴子', icon: 'fas fa-shoe-prints' },
    { value: 'accessory', label: '饰品', icon: 'fas fa-gem' }
  ];
  
  // 过滤物品列表
  const filteredItems = craftableItems.filter(item => {
    const qualityMatch = selectedQuality === 'all' || item.quality === selectedQuality;
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    return qualityMatch && categoryMatch;
  });
  
   // 获取品质对应的显示文本
  const getQualityText = (quality: 'all' | ItemQuality): string => {
    switch(quality) {
      case 'common': return '普通';
      case 'advanced': return '高级';
      case 'rare': return '稀有';
      case 'epic': return '史诗';
      case 'legendary': return '传说';
      case 'mythic': return '神话';
      default: return '全部品质';
    }
  };
  
  // 获取部位对应的显示文本
  const getCategoryText = (category: ItemCategory): string => {
    switch(category) {
      case 'weapon': return '武器';
      case 'shield': return '盾牌';
      case 'helmet': return '头盔';
      case 'armor': return '铠甲';
      case 'shoes': return '靴子';
      case 'accessory': return '饰品';
      default: return '全部部位';
    }
  };
  
  // 检查是否有足够的材料和金币
  const canCraft = (item: typeof selectedItem) => {
    // 检查金币
    if (player.gold < item.goldCost) {
      return false;
    }
    
    // 检查材料
    for (const material of item.requiredMaterials) {
      if (!(material.name in playerMaterials) || playerMaterials[material.name] < material.amount) {
        return false;
      }
    }
    
    return true;
  };
  
  // 打造物品
  const craftItem = () => {
    if (!canCraft(selectedItem) || crafting) {
      return;
    }
    
    setCrafting(true);
    
    // 模拟打造动画
    setTimeout(() => {
      // 扣除金币
      spendGold(selectedItem.goldCost);
      
      // 扣除材料并添加新物品到玩家物品栏
      // 这里添加新物品到玩家物品栏
      const newItem = {
        ...selectedItem,
        // 移除打造特定的属性
        requiredMaterials: undefined,
        goldCost: undefined,
        isPremium: undefined,
        quality: selectedItem.quality,
        category: selectedItem.category,
        type: 'equipment' as const,
        price: Math.floor(selectedItem.goldCost * 0.7) // 物品出售价格约为打造成本的70%
      };
      
      addItem(newItem);
      toast.success(`${selectedItem.name}打造成功！`);
      
      setCrafting(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-orange-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link to="/">
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回
            </PixelButton>
          </Link>
        </div>
        
        {/* 打造标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-amber-800 dark:text-amber-300 font-['Press_Start_2P',_cursive]">
          装备打造
        </h1>
        
        {/* 玩家金币 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border-4 border-amber-800 dark:border-amber-900 flex justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400">
            你的金币
          </div>
          <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
            <i className="fas fa-coins mr-2"></i>
            {player.gold}
          </div>
        </div>
        
        {/* 筛选条件显示 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border-4 border-amber-800 dark:border-amber-900">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">当前筛选:</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200`}>
                {getQualityText(selectedQuality)}
              </span>
              <span className="mx-1 text-gray-400">|</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200`}>
                {getCategoryText(selectedCategory)}
              </span>
            </div>
          </div>
        </div>
        
        {/* 品质筛选 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border-4 border-amber-800 dark:border-amber-900 overflow-x-auto">
          <h3 className="text-sm font-bold mb-3 text-amber-700 dark:text-amber-400">
            品质筛选
          </h3>
          <div className="flex space-x-2">
            {qualityOptions.map((option) => (
              <button
                key={option.value}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedQuality === option.value
                    ? `${option.color} dark:${option.color.replace('text-', 'text-').replace('-800', '-300')} dark:bg-${option.color.replace('bg-', '').replace('-100', '-800')} font-medium`
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedQuality(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* 部位筛选 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border-4 border-amber-800 dark:border-amber-900 overflow-x-auto">
          <h3 className="text-sm font-bold mb-3 text-amber-700 dark:text-amber-400">
            部位筛选
          </h3>
          <div className="flex space-x-2">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors flex items-center ${
                  selectedCategory === option.value
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-300 font-medium'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedCategory(option.value)}
              >
                <i className={`${option.icon} mr-1 text-xs`}></i>
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* 可打造物品列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border-4 border-amber-800 dark:border-amber-900">
          <h2 className="text-xl font-bold mb-4 text-amber-700 dark:text-amber-400">
            可打造物品
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className={`cursor-pointer p-3 rounded-md flex items-center transition-colors ${
                    selectedItem.id === item.id 
                      ? 'bg-amber-100 dark:bg-amber-800 border-2 border-amber-500 dark:border-amber-400' 
                      : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent hover:bg-amber-50 dark:hover:bg-amber-900'
                  } ${crafting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !crafting && setSelectedItem(item)}
                >
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden">
                    <img src={item.spriteUrl} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="ml-3 flex-1">
                     <div className="flex items-center">
                      <h3 className="font-bold text-amber-800 dark:text-amber-300">{item.name}</h3>
                      {item.quality === 'mythic' && (
                        <span className="ml-2 text-xs bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 px-2 py-0.5 rounded-full">
                          神话
                        </span>
                      )}
                      {item.quality === 'legendary' && (
                        <span className="ml-2 text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 px-2 py-0.5 rounded-full">
                          传说
                        </span>
                      )}
                      {item.quality === 'epic' && (
                        <span className="ml-2 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-0.5 rounded-full">
                          史诗
                        </span>
                      )}
                      {item.quality === 'rare' && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                          稀有
                        </span>
                      )}
                      {item.quality === 'advanced' && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">
                          高级
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      <i className={`${categoryOptions.find(opt => opt.value === item.category)?.icon || 'fas fa-cube'} text-gray-500 mr-1 text-xs`}></i>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getCategoryText(item.category)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold text-sm">
                    <i className="fas fa-coins mr-1"></i>
                    {item.goldCost}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-700 rounded-md border-2 border-gray-300 dark:border-gray-600">
                <i className="fas fa-search text-gray-400 text-4xl mb-4"></i>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  没有找到符合筛选条件的物品
                </p>
                <button
                  className="mt-4 text-sm text-amber-600 dark:text-amber-400 hover:underline"
                  onClick={() => {
                    setSelectedQuality('all');
                    setSelectedCategory('all');
                  }}
                >
                  清除筛选条件
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* 物品打造详情 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-amber-800 dark:border-amber-900">
          <div className="flex flex-col items-center">
            {/* 物品图标和名称 */}
               <div className="mb-6 text-center">
                <div className="w-32 h-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-4 border-amber-500 dark:border-amber-400 mb-3">
                  <img src={selectedItem.spriteUrl} alt={selectedItem.name} className="w-full h-full object-contain" />
                </div>
                <h2 className="text-xl font-bold text-amber-700 dark:text-amber-400">
                  {selectedItem.name}
                </h2>
                <div className="flex justify-center items-center mt-1 space-x-2">
                   <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                    selectedItem.quality === 'mythic' 
                      ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' 
                      : selectedItem.quality === 'legendary'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                      : selectedItem.quality === 'epic'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                      : selectedItem.quality === 'rare'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      : selectedItem.quality === 'advanced'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    {getQualityText(selectedItem.quality)}
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs flex items-center">
                    <i className={`${categoryOptions.find(opt => opt.value === selectedItem.category)?.icon || 'fas fa-cube'} mr-1 text-xs`}></i>
                    {getCategoryText(selectedItem.category)}
                  </span>
                </div>
              </div>
            
            {/* 物品描述 */}
            <div className="w-full mb-6">
              <div className="bg-amber-50 dark:bg-gray-700 p-3 rounded-md border-2 border-amber-300 dark:border-amber-800">
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedItem.description}
                </p>
              </div>
            </div>
            
            {/* 所需材料 */}
            <div className="w-full mb-6">
              <div className="bg-amber-50 dark:bg-gray-700 p-3 rounded-md border-2 border-amber-300 dark:border-amber-800">
                <div className="text-gray-800 dark:text-gray-200 font-medium mb-3">
                  所需材料
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedItem.requiredMaterials.map((material, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden mr-2">
                        <img src={material.spriteUrl} alt={material.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-800 dark:text-gray-200">{material.name}</div>
                      </div>
                      <div className={`text-sm font-bold ${
                        (material.name in playerMaterials && playerMaterials[material.name] >= material.amount) 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {material.name in playerMaterials ? playerMaterials[material.name] : 0} / {material.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 打造费用 */}
            <div className="w-full mb-6">
              <div className="bg-yellow-50 dark:bg-gray-700 p-3 rounded-md border-2 border-yellow-300 dark:border-yellow-800">
                <div className="flex justify-between items-center">
                  <div className="text-gray-800 dark:text-gray-200 font-medium">
                    打造费用
                  </div>
                  <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
                    <i className="fas fa-coins mr-2"></i>
                    {selectedItem.goldCost}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 打造按钮 */}
            <PixelButton 
              className={`w-full max-w-xs ${
                !canCraft(selectedItem) ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                crafting ? 'bg-amber-600 hover:bg-amber-700 border-amber-800' : ''
              }`}
              onClick={craftItem}
              disabled={!canCraft(selectedItem) || crafting}
            >
              {crafting ? (
                <>
                  <i className="fas fa-hammer fa-spin mr-2"></i>打造中...
                </>
              ) : (
                <>
                  <i className="fas fa-hammer mr-2"></i>打造物品
                </>
              )}
            </PixelButton>
          </div>
        </div>
        
        {/* 打造说明 */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>收集材料打造更强大的装备！特殊装备需要稀有材料才能打造。</p>
        </div>
      </div>
    </div>
  );
}