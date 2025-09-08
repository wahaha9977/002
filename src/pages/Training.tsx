import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';
import { toast } from 'sonner';

export default function Training() {
  const { gameState, gainExp, spendGold, trainCharacter, addMaterial, updateGameState } = useGame();
  const { player } = gameState;
  const [trainingType, setTrainingType] = useState<'strength' | 'defense' | 'health'>('strength');
  const [trainingStarted, setTrainingStarted] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  const expGain = 30; // 训练获得的经验值

  // 获取当前训练类型的训练次数
  const getTrainingCount = (type: 'strength' | 'defense' | 'health'): number => {
    return player.trainingCounts?.[type] || 0;
  };

  // 计算训练费用（初次50，第二次100，第三次150，依此类推）
  const calculateTrainingCost = (type: 'strength' | 'defense' | 'health'): number => {
    const count = getTrainingCount(type);
    return 50 * (count + 1);
  };

  // 获取当前选中训练类型的费用
  const getCurrentTrainingCost = (): number => {
    return calculateTrainingCost(trainingType);
  };

  // 开始训练
  const startTraining = () => {
    const currentCost = getCurrentTrainingCost();
    if (player.gold >= currentCost && !trainingStarted) {
      // 扣除训练费用
      if (spendGold(currentCost)) {
        setTrainingStarted(true);
        setTrainingProgress(0);
        
        // 模拟训练进度
        const interval = setInterval(() => {
          setTrainingProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setTrainingStarted(false);
              completeTraining(); // 训练完成后增加属性和经验
              return 100;
            }
            return prev + 5;
          });
        }, 300);
      }
    }
  };

  // 完成训练，增加角色属性和经验
  const completeTraining = () => {
    const characterId = player.characters[0].id;
    const currentCount = getTrainingCount(trainingType);
    
    // 一次性更新所有状态，避免状态覆盖问题
    updateGameState(prevState => {
      // 复制当前状态以避免直接修改
      const updatedState = { ...prevState };
      const updatedPlayer = { ...updatedState.player };
      const updatedCharacters = [...updatedPlayer.characters];
      const characterIndex = updatedCharacters.findIndex(char => char.id === characterId);
      
      if (characterIndex !== -1) {
        // 创建角色副本
        const updatedCharacter = { ...updatedCharacters[characterIndex] };
        const updatedStats = { ...updatedCharacter.stats };
        
        // 根据训练类型增加对应的属性
        switch (trainingType) {
          case 'strength':
            updatedStats.attack = parseFloat((updatedStats.attack + 0.5).toFixed(1));
            toast.success('力量训练完成！攻击力+0.5');
            break;
          case 'defense':
            updatedStats.defense = parseFloat((updatedStats.defense + 0.2).toFixed(1));
            toast.success('防御训练完成！防御力+0.2');
            break;
          case 'health':
            updatedStats.hp = updatedStats.hp + 1;
            toast.success('生命训练完成！生命值+1');
            break;
        }
        
        // 应用更新后的属性
        updatedCharacter.stats = updatedStats;
        updatedCharacters[characterIndex] = updatedCharacter;
        updatedPlayer.characters = updatedCharacters;
      }
      
      // 增加训练次数
      updatedPlayer.trainingCounts = {
        ...updatedPlayer.trainingCounts,
        [trainingType]: currentCount + 1
      };
      
      // 更新状态
      updatedState.player = updatedPlayer;
      return updatedState;
    });
    
    // 增加经验值
    gainExp(expGain);
    toast.success(`获得${expGain}点经验值！`);
    
    // 训练结束后有几率获得材料奖励
    if (Math.random() > 0.7) {
      const randomMaterial = ['木材', '铜矿'][Math.floor(Math.random() * 2)];
      addMaterial(randomMaterial, 1);
      toast.success(`训练奖励：获得了1个${randomMaterial}！`);
    }
  };

  // 获取训练类型的中文名称
  const getTrainingTypeName = (type: string) => {
    switch (type) {
      case 'strength': return '力量训练';
      case 'defense': return '防御训练';
      case 'health': return '生命训练';
      default: return '训练';
    }
  };

  // 获取训练类型的描述
  const getTrainingTypeDescription = (type: string) => {
    switch (type) {
      case 'strength': return '提升攻击力和物理伤害（+0.5攻击）';
      case 'defense': return '提升防御力和生命值（+0.2防御）';
      case 'health': return '提升生命值上限（+1生命）';
      default: return '';
    }
  };

  // 获取训练类型的图标
  const getTrainingTypeIcon = (type: string) => {
    switch (type) {
      case 'strength': return 'fas fa-dumbbell';
      case 'defense': return 'fas fa-shield-alt';
      case 'health': return 'fas fa-heart';
      default: return 'fas fa-dumbbell';
    }
  };

   return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link to="/">
            <PixelButton className="text-sm py-2 px-4 shadow-md hover:shadow-lg transition-shadow duration-300">
              <i className="fas fa-arrow-left mr-2"></i>返回
            </PixelButton>
          </Link>
        </div>

        {/* 养成标题 */}
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-800 dark:text-purple-300 font-['Press_Start_2P',_cursive] drop-shadow-md">
          角色养成
        </h1>

        {/* 角色信息卡片 - 优化视觉效果 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border-4 border-purple-800 dark:border-purple-900 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center">
            {/* 角色头像 - 增加光泽效果 */}
            <div className="w-28 h-28 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-800 rounded-full overflow-hidden border-4 border-purple-800 dark:border-purple-700 shadow-lg relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent pointer-events-none"></div>
              <img 
                src={player.characters[0]?.spriteUrl || "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20hero%20knight%208bit&sign=b0767cc3fe0c9fae87832e322cd1d373"} 
                alt={player.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="ml-6 flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400">{player.name}</h2>
                <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <i className="fas fa-trophy mr-1 text-yellow-600 dark:text-yellow-400"></i>
                  Lv.{player.level}
                </div>
              </div>
              <div className="mt-2">
                 <div className="text-sm text-gray-600 dark:text-gray-400">
                   经验值: {player.exp}/{Math.floor(100 * Math.pow(1.2, player.level - 1))}
                 </div>
                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-1.5 shadow-inner overflow-hidden">
                   <div 
                     className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 ease-out" 
                     style={{ width: `${(player.exp / Math.floor(100 * Math.pow(1.2, player.level - 1))) * 100}%` }}
                   ></div>
                 </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg border border-red-100 dark:border-red-800/30">
                  <i className="fas fa-fist-raised mr-2 text-red-500 w-5 text-center"></i>
                  <span className="font-medium">攻击: {player.characters[0]?.stats.attack.toFixed(1)}</span>
                </div>
                <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border border-blue-100 dark:border-blue-800/30">
                  <i className="fas fa-shield-alt mr-2 text-blue-500 w-5 text-center"></i>
                  <span className="font-medium">防御: {player.characters[0]?.stats.defense.toFixed(1)}</span>
                </div>
                <div className="flex items-center bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-100 dark:border-green-800/30">
                  <i className="fas fa-heart mr-2 text-red-500 w-5 text-center"></i>
                  <span className="font-medium">生命: {player.characters[0]?.stats.hp}</span>
                </div>
                 <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-lg border border-yellow-100 dark:border-yellow-800/30">
                  <i className="fas fa-coins mr-2 text-yellow-500 w-5 text-center"></i>
                  <span className="font-medium">金币: {player.gold}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 训练类型选择 - 优化布局和视觉效果 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border-4 border-purple-800 dark:border-purple-900">
          <h2 className="text-xl font-bold mb-5 text-purple-700 dark:text-purple-400 flex items-center">
            <i className="fas fa-dumbbell mr-2"></i>选择训练类型
          </h2>
          <div className="grid grid-cols-3 gap-4">
              {(['strength', 'defense', 'health'] as const).map((type) => (
                <div 
                  key={type}
                  className={`cursor-pointer p-4 rounded-xl text-center transition-all duration-300 transform ${
                    trainingType === type 
                      ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-900 border-2 border-purple-500 dark:border-purple-400 shadow-lg scale-[1.05]' 
                      : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent hover:bg-purple-50 dark:hover:bg-purple-900/50 hover:shadow-md hover:scale-[1.02]'
                  }`}
                  onClick={() => !trainingStarted && setTrainingType(type)}
                >
                  <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 ${
                    trainingType === type 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'bg-purple-100 text-purple-600 dark:bg-gray-600 dark:text-purple-300'
                  }`}>
                    <i className={`${getTrainingTypeIcon(type)} text-xl`}></i>
                  </div>
                  <div className="font-medium text-base">{getTrainingTypeName(type)}</div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    已训练{getTrainingCount(type)}次
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 训练详情和控制 - 优化布局和视觉效果 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-4 border-purple-800 dark:border-purple-900">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 flex items-center mb-3 sm:mb-0">
              <i className={`${getTrainingTypeIcon(trainingType)} mr-2`}></i>
              {getTrainingTypeName(trainingType)}
            </h2>
            <div className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <i className="fas fa-coins mr-2 text-yellow-600 dark:text-yellow-400"></i>
              <span>费用: {getCurrentTrainingCost()}金币</span>
            </div>
          </div>

          <div className="mb-6 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border-2 border-purple-100 dark:border-purple-800/30">
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {getTrainingTypeDescription(trainingType)}
            </p>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-2 rounded-lg">
              <i className="fas fa-star text-yellow-500 mr-2"></i>
              <span>完成后获得 {expGain} 点经验值</span>
            </div>
          </div>

          {/* 训练进度条 - 优化视觉效果 */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-medium">训练进度</span>
              <span>{trainingProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 shadow-inner overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2 ${
                  trainingStarted ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}
                style={{ width: `${trainingProgress}%` }}
              >
                {trainingStarted && trainingProgress > 10 && (
                  <div className="flex items-center text-white text-xs font-medium">
                    <i className="fas fa-spinner fa-spin mr-1"></i>
                    {trainingProgress}%
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 训练按钮 - 优化视觉效果和交互 */}
          <div className="flex justify-center">
            <PixelButton 
              className={`w-full max-w-xs py-4 ${
                player.gold < getCurrentTrainingCost() ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                trainingStarted ? 'bg-green-600 hover:bg-green-700 border-green-800' : ''
              } shadow-md hover:shadow-lg transition-all duration-300`}
              onClick={startTraining}
            disabled={player.gold < getCurrentTrainingCost() || trainingStarted}
            >
              {trainingStarted ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2 text-xl"></i>
                  <span className="text-lg">训练中...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-play mr-2 text-xl"></i>
                  <span className="text-lg">开始训练</span>
                </>
              )}
            </PixelButton>
          </div>
        </div>

        {/* 金币不足提示 - 优化视觉效果 */}
        {player.gold < getCurrentTrainingCost() && (
          <div className="mt-4 bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border-2 border-red-300 dark:border-red-800 text-center">
            <div className="flex items-center justify-center mb-2">
              <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
              <span className="font-medium text-red-700 dark:text-red-400">金币不足</span>
            </div>
            <p className="text-sm text-red-600 dark:text-red-300">
              还需要 {getCurrentTrainingCost() - player.gold} 金币才能开始训练
            </p>
          </div>
        )}
      </div>
    </div>
  );
}