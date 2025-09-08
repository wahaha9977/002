import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';
import { Item } from '@/lib/gameTypes';
import { toast } from 'sonner';

export default function Equipment() {
  const { gameState } = useGame();
  const { player } = gameState;
  
  // 从玩家物品中过滤出装备类型的物品
  const equipmentItems: Item[] = player.items.filter(item => item.type === 'equipment');
  
  // 模拟已装备的物品
  const equippedItems: Record<string, string | null> = {
    head: null,
    chest: null,
    feet: null,
    weapon: null,
    shield: null,
    shoes: null,
    accessory: null
  };
  
  // 装备物品
  const equipItem = (itemId: string) => {
    const item = equipmentItems.find(item => item.id === itemId);
    if (item) {
      toast.success(`已装备 ${item.name}`);
    }
  };
  
  // 卸下物品
  const unequipItem = (slot: string) => {
    toast.success('已卸下装备');
  };
  
  // 获取装备类型的图标
  const getEquipmentTypeIcon = (type: string) => {
    switch (type) {
      case 'equipment': return 'fas fa-shield-alt';
      default: return 'fas fa-box';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link to="/">
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回
            </PixelButton>
          </Link>
        </div>
        
        {/* 装备标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-slate-300 font-['Press_Start_2P',_cursive]">
          装备管理
        </h1>
        
        {/* 角色装备预览 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border-4 border-slate-800 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-400">
            角色装备预览
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-slate-800 dark:border-slate-600 mb-4">
              <img 
                src={player.characters[0]?.spriteUrl || "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20hero%20knight%208bit&sign=b0767cc3fe0c9fae87832e322cd1d373"} 
                alt={player.name} 
                className="w-full h-full object-contain"
              />
            </div>
           <div className="grid grid-cols-3 gap-4 w-full max-w-md">
               <div className="text-center p-2 bg-slate-50 dark:bg-gray-700 rounded-md border-2 border-slate-300 dark:border-slate-600">
                 <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">头盔</div>
                 <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
                   {equippedItems.head ? equipmentItems.find(item => item.id === equippedItems.head)?.name : '未装备'}
                 </div>
               </div>
               <div className="text-center p-2 bg-slate-50 dark:bg-gray-700 rounded-md border-2 border-slate-300 dark:border-slate-600">
                 <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">武器</div>
                 <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
                   {equippedItems.weapon ? equipmentItems.find(item => item.id === equippedItems.weapon)?.name : '未装备'}
                 </div>
               </div>
               <div className="text-center p-2 bg-slate-50 dark:bg-gray-700 rounded-md border-2 border-slate-300 dark:border-slate-600">
                 <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">盾牌</div>
                 <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
                   {equippedItems.shield ? equipmentItems.find(item => item.id === equippedItems.shield)?.name : '未装备'}
                 </div>
               </div>
               <div className="text-center p-2 bg-slate-50 dark:bg-gray-700 rounded-md border-2 border-slate-300 dark:border-slate-600">
                 <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">胸甲</div>
                 <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
                   {equippedItems.chest ? equipmentItems.find(item => item.id === equippedItems.chest)?.name : '未装备'}
                 </div>
               </div>
               <div className="text-center p-2 bg-slate-50 dark:bg-gray-700 rounded-md border-2 border-slate-300 dark:border-slate-600">
                 <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">鞋子</div>
                 <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
                   {equippedItems.shoes ? equipmentItems.find(item => item.id === equippedItems.shoes)?.name : '未装备'}
                 </div>
               </div>
               <div className="text-center p-2 bg-slate-50 dark:bg-gray-700 rounded-md border-2 border-slate-300 dark:border-slate-600">
                 <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">饰品</div>
                 <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
                   {equippedItems.accessory ? equipmentItems.find(item => item.id === equippedItems.accessory)?.name : '未装备'}
                 </div>
               </div>
             </div>
          </div>
        </div>
        
        {/* 可用装备列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-slate-800 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-4 text-slate-700 dark:text-slate-400">
            可用装备
          </h2>
          {equipmentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {equipmentItems.map((item) => (
                <div key={item.id} className="flex p-3 bg-slate-50 dark:bg-gray-700 rounded-md border-2 border-slate-300 dark:border-slate-600">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden">
                    <img src={item.spriteUrl} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="font-bold text-slate-800 dark:text-slate-300">{item.name}</h3>
                    <div className="mt-1 flex items-center">
                      <i className={`${getEquipmentTypeIcon(item.type)} text-slate-500 mr-1 text-xs`}></i>
                      <span className="text-xs text-gray-500 dark:text-gray-400">装备</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-2">
                      <PixelButton 
                        className="w-full text-xs py-1"
                        onClick={() => equipItem(item.id)}
                      >
                        装备
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
                暂无可用装备
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-center text-sm mt-2">
                快去商店购买或通过其他方式获取装备吧！
              </p>
            </div>
          )}
        </div>
        
        {/* 装备提示 */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>装备可以提升角色的各项属性，快去商店购买更强的装备吧！</p>
        </div>
      </div>
    </div>
  );
}