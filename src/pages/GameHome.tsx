import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';

export default function GameHome() {
  const { gameState } = useGame();
  const { player } = gameState;
  
  // 初始化背景音乐（在游戏主界面加载时启动音乐）
  useBackgroundMusic();

  // 主要功能按钮 - 放在显眼位置
  const primaryButtons = [
    { id: 'battle', label: '开始战斗', icon: 'fas fa-sword', color: 'bg-red-600 hover:bg-red-700 border-red-800', description: '挑战怪物，提升等级' },
    { id: 'training', label: '角色养成', icon: 'fas fa-dumbbell', color: 'bg-purple-600 hover:bg-purple-700 border-purple-800', description: '强化属性，突破极限' },
    { id: 'shop', label: '游戏商店', icon: 'fas fa-shopping-bag', color: 'bg-yellow-500 hover:bg-yellow-600 border-yellow-800 text-gray-900', description: '购买道具，备战冒险' },
  ];

  // 次级功能按钮 - 装备相关
  const equipmentButtons = [
    { id: 'equipment', label: '装备管理', icon: 'fas fa-shield-alt', color: 'bg-blue-600 hover:bg-blue-700 border-blue-800', description: '更换装备，提升战力' },
    { id: 'enhancement', label: '装备强化', icon: 'fas fa-wrench', color: 'bg-cyan-600 hover:bg-cyan-700 border-cyan-800', description: '强化装备，突破潜能' },
    { id: 'crafting', label: '装备打造', icon: 'fas fa-hammer', color: 'bg-amber-600 hover:bg-amber-700 border-amber-800', description: '收集材料，打造神装' },
  ];

  // 其他功能按钮
  const otherButtons = [
    { id: 'collection', label: '图鉴', icon: 'fas fa-book', color: 'bg-green-600 hover:bg-green-700 border-green-800' },
    { id: 'storehouse', label: '仓库', icon: 'fas fa-box', color: 'bg-gray-600 hover:bg-gray-700 border-gray-800' },
    { id: 'guide', label: '指南', icon: 'fas fa-lightbulb', color: 'bg-indigo-600 hover:bg-indigo-700 border-indigo-800' },
    { id: 'settings', label: '设置', icon: 'fas fa-cog', color: 'bg-pink-600 hover:bg-pink-700 border-pink-800' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-purple-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 像素风格背景装饰 */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute w-4 h-4 bg-gray-800 dark:bg-gray-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* 游戏标题 */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-amber-800 dark:text-amber-300 tracking-tighter mb-2 font-['Press_Start_2P',_cursive] animate-pulse">
          像素冒险
        </h1>
          <div className="text-lg text-amber-700 dark:text-amber-400 font-medium text-center">
           踏上未知的冒险之旅！现在可以收集怪物图鉴了！
      </div>
      </div>

       {/* 主角信息卡片 */}
       <div className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 w-full max-w-sm border-4 border-gray-800 dark:border-gray-200 transform transition-all duration-300 hover:scale-105">
         <div className="flex items-center">
           <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden border-4 border-gray-800 dark:border-gray-200 shadow-lg">
             <img 
               src={player.characters[0]?.spriteUrl || "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20hero%20knight%208bit&sign=b0767cc3fe0c9fae87832e322cd1d373"} 
               alt="主角" 
               className="w-full h-full object-contain"
             />
           </div>
           <div className="ml-6 flex-1">
             <div className="flex items-center justify-between">
               <div className="text-sm font-medium text-amber-600 dark:text-amber-400 font-bold">
                 勇者 Lv.{player.level}
               </div>
               <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                 生命值: {player.characters[0]?.stats.hp}/100
               </div>
             </div>
             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-1.5 shadow-inner">
               <div className="bg-red-500 h-3 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
             </div>
             <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
               <div className="flex items-center">
                 <i className="fas fa-fist-raised mr-1.5 text-red-500"></i>
                 <span className="font-medium">攻击: {player.characters[0]?.stats.attack}</span>
               </div>
               <div className="flex items-center">
                 <i className="fas fa-shield-alt mr-1.5 text-blue-500"></i>
                 <span className="font-medium">防御: {player.characters[0]?.stats.defense}</span>
               </div>
                <div className="flex items-center">
                  <i className="fas fa-coins mr-1.5 text-yellow-500"></i>
                  <span className="font-medium">金币: {player.gold}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-trophy mr-1.5 text-orange-500"></i>
                  <span className="font-medium">等级: {player.level}</span>
                </div>
             </div>
           </div>
         </div>
       </div>

      {/* 主要功能按钮区域 */}
      <div className="w-full max-w-md mb-8">
        <h2 className="text-xl font-bold text-center mb-4 text-amber-800 dark:text-amber-300 font-['Press_Start_2P',_cursive]">
          🔥 开始你的冒险 🔥
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {primaryButtons.map((item) => (
            <Link key={item.id} to={`/${item.id}`} className="block group" title={item.description}>
              <PixelButton className={`h-24 flex flex-col items-center justify-center ${item.color} transition-all duration-300 group-hover:scale-105`}>
                <i className={`${item.icon} text-2xl mb-2`}></i>
                <span className="text-sm font-bold">{item.label}</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity mt-1">{item.description}</span>
              </PixelButton>
            </Link>
          ))}
        </div>
      </div>

      {/* 装备系统按钮区域 */}
      <div className="w-full max-w-md mb-8">
        <h2 className="text-xl font-bold text-center mb-4 text-amber-800 dark:text-amber-300 font-['Press_Start_2P',_cursive]">
          ⚔️ 装备大师系统 ⚔️
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {equipmentButtons.map((item) => (
            <Link key={item.id} to={`/${item.id}`} className="block group" title={item.description}>
              <PixelButton className={`h-24 flex flex-col items-center justify-center ${item.color} transition-all duration-300 group-hover:scale-105`}>
                <i className={`${item.icon} text-2xl mb-2`}></i>
                <span className="text-sm font-bold">{item.label}</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity mt-1">{item.description}</span>
              </PixelButton>
            </Link>
          ))}
        </div>
      </div>

      {/* 其他功能按钮区域 */}
      <div className="w-full max-w-md mb-10">
        <h2 className="text-xl font-bold text-center mb-4 text-amber-800 dark:text-amber-300 font-['Press_Start_2P',_cursive]">
          🎮 更多功能 🎮
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {otherButtons.map((item) => (
            <Link key={item.id} to={`/${item.id}`} className="block">
              <PixelButton className={`h-20 flex flex-col items-center justify-center ${item.color} transition-all duration-300 hover:scale-105`}>
                <i className={`${item.icon} text-xl mb-1`}></i>
                <span className="text-xs font-bold">{item.label}</span>
              </PixelButton>
            </Link>
          ))}
        </div>
      </div>

      {/* 底部信息 */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>像素冒险 © 2025 | 踏上勇者之路，成为传奇英雄！</p>
      </div>
    </div>
  );
}