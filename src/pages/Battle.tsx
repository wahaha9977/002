import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';
import { toast } from 'sonner';
import { Character } from '@/lib/gameTypes';

export default function Battle() {
  const { gameState } = useGame();
  const { currentBattle } = gameState;
  const navigate = useNavigate();

   // 战斗模式选项
  const battleModes = [
    {
      id: "training",
      name: "训练营",
      description: "训练你的战斗技巧，提升角色能力",
      icon: "fas fa-dumbbell",
      isAvailable: true,
      bgColor: "bg-blue-50 dark:bg-blue-900",
      borderColor: "border-blue-300 dark:border-blue-700",
      textColor: "text-blue-800 dark:text-blue-300"
    },
    {
      id: "main_story",
      name: "主线闯关",
      description: "跟随主线剧情，探索游戏世界，挑战强大敌人",
      icon: "fas fa-book",
      isAvailable: false,
      bgColor: "bg-orange-50 dark:bg-orange-900",
      borderColor: "border-orange-300 dark:border-orange-700",
      textColor: "text-orange-800 dark:text-orange-300"
    },
    {
      id: "boss",
      name: "首领挑战",
      description: "挑战强大的首领，获取稀有装备和丰厚奖励",
      icon: "fas fa-dragon",
      isAvailable: false,
      bgColor: "bg-red-50 dark:bg-red-900",
      borderColor: "border-red-300 dark:border-red-700",
      textColor: "text-red-800 dark:text-red-300"
    },
    {
      id: "tower",
      name: "爬塔闯关",
      description: "挑战层层难关，获取丰厚奖励",
      icon: "fas fa-tower-broadcast",
      isAvailable: true,
      bgColor: "bg-purple-50 dark:bg-purple-900",
      borderColor: "border-purple-300 dark:border-purple-700",
      textColor: "text-purple-800 dark:text-purple-300"
    },
    {
     id: "material",
     name: "素材副本",
     description: "收集各种材料，用于打造和强化装备",
     icon: "fas fa-gem",
     isAvailable: true,
     bgColor: "bg-yellow-50 dark:bg-yellow-900",
     borderColor: "border-yellow-300 dark:border-yellow-700",
     textColor: "text-yellow-800 dark:text-yellow-300"
   }
  ];

  // 处理模式选择
  const handleModeSelect = (mode: typeof battleModes[0]) => {
      if (mode.isAvailable) {
        if (mode.id === "training") {
          navigate("/training-camp");
        } else if (mode.id === "tower") {
          navigate("/tower-climb");
        } else if (mode.id === "main_story") {
          navigate("/main-story");
        } else if (mode.id === "material") {
          navigate("/material-dungeon");
      }
    } else {
      toast.info(`${mode.name}暂不开放，敬请期待！`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 dark:from-gray-900 dark:to-green-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link to="/">
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回
            </PixelButton>
          </Link>
        </div>

        {/* 战斗标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800 dark:text-green-300 font-['Press_Start_2P',_cursive]">
          战斗
        </h1>

        {!currentBattle ? (
          // 战斗模式选择界面
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-gray-800 dark:border-gray-200">
            <h2 className="text-xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
              选择战斗模式
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {battleModes.map((mode) => (
                <div 
                  key={mode.id} 
                  className={`flex items-center p-4 ${mode.bgColor} rounded-md border-2 ${mode.borderColor} cursor-pointer transition-transform hover:scale-[1.02] opacity-80`}
                  onClick={() => handleModeSelect(mode)}
                >
                  <div className="w-16 h-16 flex items-center justify-center text-3xl">
                    <i className={`${mode.icon} ${mode.textColor}`}></i>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className={`font-bold text-xl ${mode.textColor}`}>{mode.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{mode.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <PixelButton className={`text-sm py-1 px-3 ${mode.textColor.replace('text-', 'bg-').replace('-800', '-700').replace('-300', '-600')} hover:${mode.textColor.replace('text-', 'bg-').replace('-800', '-800').replace('-300', '-700')} border-${mode.textColor.replace('text-', '').replace('-800', '-800').replace('-300', '-700')}`}>
                      {mode.isAvailable ? '进入' : '未开放'}
                    </PixelButton>
                    {!mode.isAvailable && (
                      <span className="text-xs text-red-500 dark:text-red-400 mt-1">暂不开放</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
             {/* 系统提示 */}
            <div className="mt-8 bg-amber-50 dark:bg-amber-900/30 p-4 rounded-md border-2 border-amber-300 dark:border-amber-700">
             <div className="flex items-start">
              <i className="fas fa-info-circle text-amber-500 mt-1 mr-2"></i>
               <p className="text-sm text-amber-800 dark:text-amber-300">
                    系统提示：训练营、爬塔闯关和素材副本已开放！在训练营中，你可以与稻草人木桩进行战斗练习；在爬塔闯关中，挑战层层难关，每层都会变得更加困难；在素材副本中，你可以专门收集打造装备所需的各种材料！主线闯关和首领挑战等战斗模式正在开发中，即将开放！
              </p>
              </div>
            </div>
          </div>
        ) : (
           // 战斗界面 - 保留原来的战斗界面逻辑，以备后续开发使用
           <div className="space-y-6">
             <div className="bg-amber-50 dark:bg-gray-800 rounded-lg p-4 border-4 border-amber-800 dark:border-amber-900">
               <h3 className="text-center font-bold text-amber-800 dark:text-amber-300">
                 当前不在战斗中，请选择一个战斗模式！
               </h3>
             </div>
             
             <PixelButton className="w-full">
               <i className="fas fa-arrow-left mr-2"></i>返回战斗模式选择
             </PixelButton>
           </div>
        )}
      </div>
    </div>
  );
}

// 导出战斗页面组件
export const BattlePage: React.FC = () => {
  const { gameState, gainExp, addMaterial } = useGame();
  const { player } = gameState;
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从路由状态中获取地图和区域信息
  const { map, section, playerData } = location.state || { 
    map: { name: '未知地图' }, 
    section: { name: '未知区域', isBoss: false, monsters: [] }, 
    playerData: null 
  };
  
  // 战斗状态
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleProgress, setBattleProgress] = useState(0);
  const [playerHp, setPlayerHp] = useState(player.characters[0].stats.hp);
  const [currentEnemyHp, setCurrentEnemyHp] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  
  // 模拟战斗过程
  useEffect(() => {
    if (battleStarted) {
      // 初始化战斗日志
      setBattleLog([`进入${section.name}，遭遇了怪物！`]);
      
      const interval = setInterval(() => {
        setBattleProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              handleBattleVictory();
            }, 1000);
            return 100;
          }
          
          // 模拟战斗进度中的事件
          if (prev === 30) {
            setBattleLog(prev => [...prev, `你对敌人造成了伤害！`]);
            setCurrentEnemyHp(70);
          } else if (prev === 60) {
            setBattleLog(prev => [...prev, `敌人对你造成了反击！`]);
            setPlayerHp(Math.max(0, playerHp - 15));
          } else if (prev === 90) {
            setBattleLog(prev => [...prev, `你发动了致命一击！`]);
            setCurrentEnemyHp(0);
          }
          
          return prev + 5;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [battleStarted, playerHp]);
  
  // 处理战斗胜利
  const handleBattleVictory = () => {
    // 在实际游戏中，这里应该更新游戏状态来永久保存进度
    toast.success(`成功通过${section.name}！解锁了新区域！`);
    
    // 如果是最后一个区域，显示地图完成提示
    if (section.isBoss) {
      toast.success(`恭喜完成${map.name}的所有挑战！`);
    }
    
    // 返回主线地图页面
    navigate("/main-story");
  };
  
  // 返回地图页面
  const returnToMap = () => {
    navigate("/main-story");
  };
  
  // 开始战斗
  const startBattle = () => {
    setBattleStarted(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-100 dark:from-gray-900 dark:to-red-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <button onClick={returnToMap}>
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回地图
            </PixelButton>
          </button>
        </div>
        
        {/* 战斗标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-red-800 dark:text-red-300 font-['Press_Start_2P',_cursive]">
          {section.isBoss ? '首领挑战' : '区域探索'}
        </h1>
        
        {/* 战斗区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-red-800 dark:border-red-900 mb-6">
          {/* 战斗信息 */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-gray-800 dark:border-gray-200 mb-4">
              <img 
                src={section.spriteUrl} 
                alt={section.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200">{section.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">{section.description}</p>
            {section.isBoss && (
              <div className="mt-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-3 py-1 rounded-full text-sm">
                <i className="fas fa-dragon mr-1"></i>首领战
              </div>
            )}
          </div>
          
          {/* 遭遇的怪物 */}
          <div className="mb-6">
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">遭遇怪物:</h5>
            <div className="flex flex-wrap gap-2">
              {section.monsters.map((monster: any) => (
                <div 
                  key={monster.id} 
                  className="flex items-center bg-white dark:bg-gray-700 px-2 py-1 rounded-full text-xs border border-gray-300 dark:border-gray-600"
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
            </div>
          </div>
          
          {/* 玩家和敌人状态 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* 玩家状态 */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md border-2 border-blue-300 dark:border-blue-700">
              <h5 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">你的状态:</h5>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-blue-500 dark:border-blue-400 mr-3">
                  <img 
                    src={player.characters[0].spriteUrl} 
                    alt={player.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-blue-800 dark:text-blue-300">{player.name} Lv.{player.level}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    HP: {playerHp}/{player.characters[0].stats.hp}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(playerHp / player.characters[0].stats.hp) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 敌人状态 */}
            <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-md border-2 border-red-300 dark:border-red-700">
              <h5 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">敌人状态:</h5>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-red-500 dark:border-red-400 mr-3">
                  <img 
                    src={section.monsters[0]?.spriteUrl || "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20monster%208bit&sign=3c365a738bd59d0965968f81d3d04d80"} 
                    alt="敌人" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-red-800 dark:text-red-300">{section.monsters[0]?.name || "未知敌人"}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    HP: {currentEnemyHp}/100
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${currentEnemyHp}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 战斗日志 */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 mb-6 h-24 overflow-y-auto">
            {battleLog.map((log, index) => (
              <p key={index} className="text-sm text-gray-800 dark:text-gray-300 mb-1">
                {log}
              </p>
            ))}
          </div>
          
          {/* 战斗进度 */}
          {battleStarted && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>战斗进度</span>
                <span>{battleProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner overflow-hidden">
                <div 
                  className="bg-red-500 h-3 rounded-full transition-all duration-300 ease-out" 
                  style={{ width: `${battleProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* 战斗控制按钮 */}
          <div className="flex gap-3">
            <PixelButton 
              className="flex-1 bg-gray-600 hover:bg-gray-700 border-gray-800"
              onClick={returnToMap}
              disabled={battleStarted}
            >
              返回地图
            </PixelButton>
            <PixelButton 
              className="flex-1 bg-red-600 hover:bg-red-700 border-red-800"
              onClick={startBattle}
              disabled={battleStarted}
            >
              {battleStarted ? '战斗中...' : '开始战斗'}
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// 战斗页面组件 - 用于主线闯关的独立战斗页面
export const MainStoryBattlePage: React.FC = () => {
  const { gameState, gainExp, addMaterial } = useGame();
  const { player } = gameState;
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从路由状态中获取地图和区域信息
  const { map, section, playerData } = location.state || { map: { name: '未知地图' }, section: { name: '未知区域', isBoss: false, monsters: [] }, playerData: null };
  
  // 战斗状态
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleProgress, setBattleProgress] = useState(0);
  const [playerHp, setPlayerHp] = useState(player.characters[0].stats.hp);
  
  // 模拟战斗过程
  useEffect(() => {
    if (battleStarted) {
      const interval = setInterval(() => {
        setBattleProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onVictory();
              onClose();
            }, 1000);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [battleStarted]);
  
  // 处理战斗胜利
  const onVictory = () => {
    // 在实际游戏中，这里应该更新游戏状态来永久保存进度
    toast.success(`成功通过${section.name}！解锁了新区域！`);
    
    // 如果是最后一个区域，显示地图完成提示
    if (section.isBoss) {
      toast.success(`恭喜完成${map.name}的所有挑战！`);
    }
    
    // 返回主线地图页面
    navigate("/main-story");
  };
  
  // 关闭战斗
  const onClose = () => {
    // 在实际游戏中，这里应该处理关闭战斗的逻辑
  };
  
  // 返回地图页面
  const returnToMap = () => {
    navigate("/main-story");
  };
  
  // 开始战斗
  const startBattle = () => {
    setBattleStarted(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-100 dark:from-gray-900 dark:to-red-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <button onClick={returnToMap}>
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回地图
            </PixelButton>
          </button>
        </div>
        
        {/* 战斗标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-red-800 dark:text-red-300 font-['Press_Start_2P',_cursive]">
          {section.isBoss ? '首领挑战' : '区域探索'}
        </h1>
        
        {/* 战斗区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-red-800 dark:border-red-900 mb-6">
          {/* 战斗信息 */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-gray-800 dark:border-gray-200 mb-4">
              <img 
                src={section.spriteUrl} 
                alt={section.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-bold text-gray-800 dark:text-gray-200">{section.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">{section.description}</p>
            {section.isBoss && (
              <div className="mt-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-3 py-1 rounded-full text-sm">
                <i className="fas fa-dragon mr-1"></i>首领战
              </div>
            )}
          </div>
          
          {/* 遭遇的怪物 */}
          <div className="mb-6">
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">遭遇怪物:</h5>
            <div className="flex flex-wrap gap-2">
              {section.monsters.map((monster: any) => (
                <div 
                  key={monster.id} 
                  className="flex items-center bg-white dark:bg-gray-700 px-2 py-1 rounded-full text-xs border border-gray-300 dark:border-gray-600"
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
            </div>
          </div>
          
          {/* 玩家状态 */}
          <div className="mb-6">
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">玩家状态:</h5>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-blue-500 dark:border-blue-400 mr-3">
                <img 
                  src={player.characters[0].spriteUrl} 
                  alt={player.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="font-bold text-blue-800 dark:text-blue-300">{player.name} Lv.{player.level}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  HP: {playerHp}/{player.characters[0].stats.hp}
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(playerHp / player.characters[0].stats.hp) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 战斗进度 */}
          {battleStarted && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>战斗进度</span>
                <span>{battleProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner overflow-hidden">
                <div 
                  className="bg-red-500 h-3 rounded-full transition-all duration-300 ease-out" 
                  style={{ width: `${battleProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* 战斗控制按钮 */}
          <div className="flex gap-3">
            <PixelButton 
              className="flex-1 bg-gray-600 hover:bg-gray-700 border-gray-800"
              onClick={returnToMap}
              disabled={battleStarted}
            >
              返回地图
            </PixelButton>
            <PixelButton 
              className="flex-1 bg-red-600 hover:bg-red-700 border-red-800"
              onClick={startBattle}
              disabled={battleStarted}
            >
              {battleStarted ? '战斗中...' : '开始战斗'}
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}