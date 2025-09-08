import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';
import { toast } from 'sonner';

// 定义装备接口
interface Equipment {
  id: string;
  name: string;
  description: string;
  spriteUrl: string;
  currentLevel: number;
  maxLevel: number;
  attack?: number;
  defense?: number;
  enhancementCost: number;
  enhancementSuccessRate: number;
}

export default function Enhancement() {
  const { gameState, spendGold } = useGame();
  const { player } = gameState;
  
  // 模拟角色已穿戴的装备数据
  // 在实际游戏中，这应该从游戏状态中获取
  const equippedItems: Equipment[] = [
    // 这里保持为空数组，表示角色尚未穿戴任何装备
    // 如果要测试有装备的情况，可以取消下面的注释
    /*
    {
      id: "iron_sword",
      name: "铁剑",
      description: "基础武器，提升攻击力5点",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20iron%20sword%208bit&sign=da16b2178f13edaa94cb359cfede2ae2",
      currentLevel: 1,
      maxLevel: 10,
      attack: 5,
      enhancementCost: 100,
      enhancementSuccessRate: 80
    },
    {
      id: "leather_shield",
      name: "皮盾",
      description: "基础盾牌，提升防御力5点",
      spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20leather%20shield%208bit&sign=55637596d58cfd42e1db180b1b756b0d",
      currentLevel: 1,
      maxLevel: 10,
      defense: 5,
      enhancementCost: 80,
      enhancementSuccessRate: 85
    }
    */
  ];
  
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(equippedItems[0] || null);
  const [enhancing, setEnhancing] = useState(false);
  
  // 强化装备
  const enhanceEquipment = () => {
    if (!selectedEquipment) {
      toast.error('请选择要强化的装备！');
      return;
    }
    
    if (selectedEquipment.currentLevel >= selectedEquipment.maxLevel) {
      toast.error('装备已达到最高等级！');
      return;
    }
    
    if (player.gold < selectedEquipment.enhancementCost) {
      toast.error('金币不足！');
      return;
    }
    
    setEnhancing(true);
    
    // 模拟强化动画
    setTimeout(() => {
      // 扣除金币
      spendGold(selectedEquipment.enhancementCost);
      
      // 强化成功率判断
      const success = Math.random() * 100 < selectedEquipment.enhancementSuccessRate;
      
      if (success) {
        // 强化成功
        toast.success(`${selectedEquipment.name}强化成功！`);
        
        // 更新装备等级和属性
        // 注意：这里只是UI层面的更新，实际游戏中应该更新游戏状态
        const updatedEquipment = {
          ...selectedEquipment,
          currentLevel: selectedEquipment.currentLevel + 1,
          attack: selectedEquipment.attack ? Math.round((selectedEquipment.attack + 1.5) * 10) / 10 : undefined,
          defense: selectedEquipment.defense ? Math.round((selectedEquipment.defense + 1) * 10) / 10 : undefined,
          enhancementCost: Math.round(selectedEquipment.enhancementCost * 1.5),
          enhancementSuccessRate: Math.max(30, selectedEquipment.enhancementSuccessRate - 5)
        };
        
        setSelectedEquipment(updatedEquipment);
      } else {
        // 强化失败
        toast.error(`${selectedEquipment.name}强化失败！`);
      }
      
      setEnhancing(false);
    }, 1500);
  };
  
  // 获取装备属性的显示文本
  const getEquipmentStats = (equipment: Equipment) => {
    if (equipment.attack) {
      return `攻击 +${equipment.attack}`;
    }
    if (equipment.defense) {
      return `防御 +${equipment.defense}`;
    }
    return '';
  };
  
  // 渲染无装备时的提示界面
  const renderNoEquipmentView = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-4 border-cyan-800 dark:border-cyan-900 text-center">
      <i className="fas fa-shield-alt text-gray-300 dark:text-gray-600 text-6xl mb-4"></i>
      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">无可强化的装备</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        您还没有穿戴任何装备，请先前往装备界面穿戴装备
      </p>
      <Link to="/equipment">
        <PixelButton className="bg-cyan-600 hover:bg-cyan-700">
          <i className="fas fa-arrow-right mr-2"></i>前往装备界面
        </PixelButton>
      </Link>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link to="/">
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回
            </PixelButton>
          </Link>
        </div>
        
        {/* 强化标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-cyan-800 dark:text-cyan-300 font-['Press_Start_2P',_cursive]">
          装备强化
        </h1>
        
        {/* 玩家金币 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border-4 border-cyan-800 dark:border-cyan-900 flex justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400">
            你的金币
          </div>
          <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
            <i className="fas fa-coins mr-2"></i>
            {player.gold}
          </div>
        </div>
        
        {/* 主要内容区域 - 根据是否有穿戴装备显示不同内容 */}
        {equippedItems.length === 0 ? (
          renderNoEquipmentView()
        ) : (
          <>
            {/* 装备选择 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border-4 border-cyan-800 dark:border-cyan-900">
              <h2 className="text-xl font-bold mb-4 text-cyan-700 dark:text-cyan-400">
                已穿戴装备
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {equippedItems.map((equipment) => (
                  <div 
                    key={equipment.id}
                    className={`cursor-pointer p-3 rounded-md text-center transition-colors ${
                      selectedEquipment?.id === equipment.id 
                        ? 'bg-cyan-100 dark:bg-cyan-800 border-2 border-cyan-500 dark:border-cyan-400' 
                        : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent hover:bg-cyan-50 dark:hover:bg-cyan-900'
                    } ${enhancing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !enhancing && setSelectedEquipment(equipment)}
                  >
                    <div className="w-12 h-12 mx-auto bg-gray-200 dark:bg-gray-600 rounded-md overflow-hidden mb-2">
                      <img src={equipment.spriteUrl} alt={equipment.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="font-medium text-sm">{equipment.name}</div>
                    <div className="text-xs text-cyan-600 dark:text-cyan-400">
                      Lv.{equipment.currentLevel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 装备强化界面 */}
            {selectedEquipment && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-cyan-800 dark:border-cyan-900">
                <div className="flex flex-col items-center">
                  {/* 装备图标和名称 */}
                  <div className="mb-6 text-center">
                    <div className="w-32 h-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-4 border-cyan-500 dark:border-cyan-400 mb-3">
                      <img src={selectedEquipment.spriteUrl} alt={selectedEquipment.name} className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-xl font-bold text-cyan-700 dark:text-cyan-400">
                      {selectedEquipment.name}
                    </h2>
                    <div className="text-cyan-600 dark:text-cyan-400 font-bold">
                      Lv.{selectedEquipment.currentLevel} / {selectedEquipment.maxLevel}
                    </div>
                  </div>
                  
                  {/* 装备属性 */}
                  <div className="w-full mb-6">
                    <div className="bg-cyan-50 dark:bg-gray-700 p-3 rounded-md border-2 border-cyan-300 dark:border-cyan-800">
                      <div className="text-gray-800 dark:text-gray-200 font-medium mb-2">
                        属性
                      </div>
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <i className="fas fa-shield-alt mr-2 text-cyan-600 dark:text-cyan-400"></i>
                        {getEquipmentStats(selectedEquipment)}
                      </div>
                      <div className="flex items-center mt-1 text-gray-700 dark:text-gray-300">
                        <i className="fas fa-percentage mr-2 text-green-600 dark:text-green-400"></i>
                        成功率: {selectedEquipment.enhancementSuccessRate}%
                      </div>
                    </div>
                  </div>
                  
                  {/* 强化费用 */}
                  <div className="w-full mb-6">
                    <div className="bg-yellow-50 dark:bg-gray-700 p-3 rounded-md border-2 border-yellow-300 dark:border-yellow-800">
                      <div className="flex justify-between items-center">
                        <div className="text-gray-800 dark:text-gray-200 font-medium">
                          强化费用
                        </div>
                        <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
                          <i className="fas fa-coins mr-2"></i>
                          {selectedEquipment.enhancementCost}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 强化按钮 */}
                  <PixelButton 
                    className={`w-full max-w-xs ${
                      selectedEquipment.currentLevel >= selectedEquipment.maxLevel || player.gold < selectedEquipment.enhancementCost ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      enhancing ? 'bg-cyan-600 hover:bg-cyan-700 border-cyan-800' : ''
                    }`}
                    onClick={enhanceEquipment}
                    disabled={selectedEquipment.currentLevel >= selectedEquipment.maxLevel || player.gold < selectedEquipment.enhancementCost || enhancing}
                  >
                    {enhancing ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>强化中...
                      </>
                    ) : selectedEquipment.currentLevel >= selectedEquipment.maxLevel ? (
                      <>
                        <i className="fas fa-star mr-2"></i>已达最高级
                      </>
                    ) : (
                      <>
                        <i className="fas fa-wrench mr-2"></i>强化装备
                      </>
                    )}
                  </PixelButton>
                </div>
              </div>
            )}
          </>
        )}
        
        {/* 强化说明 */}
        {equippedItems.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>只能强化已穿戴的装备，强化可以提升装备属性，等级越高成功率越低，费用越高！</p>
          </div>
        )}
      </div>
    </div>
  );
}