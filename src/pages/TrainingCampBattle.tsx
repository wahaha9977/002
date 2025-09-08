import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';
import { toast } from 'sonner';
import { Character } from '@/lib/gameTypes';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function TrainingCampBattle() {
  const { gameState, gainExp, spendGold, updateGameState } = useGame();
  const { player } = gameState;
  const navigate = useNavigate();
  const { playSound } = useSoundEffects();
  
  // 创建稻草人木桩敌人
  const scarecrow: Character = {
    id: "scarecrow",
    name: "稻草人木桩",
    description: "用于训练的稻草人，不会攻击，没有防御力",
    stats: { 
    hp: 999999, // 无限生命值
    attack: 0, // 不攻击
    defense: 0 // 无防御力
  },
  skills: [],
    spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20scarecrow%20training%20dummy%208bit&sign=fd207df630e100cd167343ed58b90b77",
    level: 1,
    exp: 0,
    maxExp: 100
  };
  
  // 战斗状态
   const [battleLog, setBattleLog] = useState<string[]>([`遭遇了${scarecrow.name}！`]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [battleStarted, setBattleStarted] = useState(false);
  const [currentPlayerHp, setCurrentPlayerHp] = useState(player.characters[0].stats.hp);
  const [battleResult, setBattleResult] = useState<'victory' | 'defeat' | null>(null);
  const [heavyStrikeCounter, setHeavyStrikeCounter] = useState(0);
  
  // 角色技能
  const playerSkills = player.characters[0].skills;
  
   // 开始战斗
   useEffect(() => {
      if (!battleStarted) {
      // 玩家总是先攻击
      setPlayerTurn(true);
      
      // 设置战斗日志
      let battleStartLog = ['遭遇了稻草人木桩！这是一个训练用的目标，不会攻击你。'];
      battleStartLog.push('你先发起攻击！');
      
      setBattleLog(battleStartLog);
      setBattleStarted(true);
      setHeavyStrikeCounter(0); // 重置冷却计数器，允许首次使用重砍
        setTimeout(() => {
          if (!battleResult) {
            // 敌人回合（稻草人不攻击，但仍显示相关信息）
            setBattleLog(prev => [...prev, `${scarecrow.name} 不会攻击你，继续训练吧！`]);
            // 回合结束，回到玩家回合
            setPlayerTurn(true);
          }
        }, 1500);
      }
    }, []);
  
  // 计算伤害
  const calculateDamage = (skillDamage: number, attackerAttack: number, defenderDefense: number, isPercentage: boolean = false) => {
    // 如果是百分比伤害，使用攻击力的百分比
    if (isPercentage) {
      return Math.floor(attackerAttack * skillDamage);
    }
    
    // 由于稻草人无防御力，所以伤害直接等于技能伤害加上角色攻击力
    return skillDamage + attackerAttack;
  };
  
   // 玩家攻击
  const playerAttack = (skillIndex: number) => {
    if (!playerTurn || battleResult) return;
    
    const skill = playerSkills[skillIndex];
    
     // 检查是否是重砍技能且处于冷却中
    if (skill.id === 'heavy_strike' && heavyStrikeCounter > 0) {
      setBattleLog(prev => [...prev, `${player.name} 重砍技能尚未冷却完毕！需要先使用两次横斩。`]);
      return;
    }
    
     const damage = calculateDamage(skill.damage, player.characters[0].stats.attack, scarecrow.stats.defense, skill.isPercentage);
    
    // 添加战斗日志
    setBattleLog(prev => [...prev, `${player.name} 使用了 ${skill.name}，对 ${scarecrow.name} 造成了 ${damage} 点伤害！`]);
    
    // 播放攻击音效
    playSound('playerAttack');
    
    // 播放敌人被击中音效
    playSound('enemyHit');
    if (skill.id === 'slash') {
      // 使用横斩，减少冷却需求
      setHeavyStrikeCounter(prev => Math.max(0, prev - 1));
    } else if (skill.id === 'heavy_strike') {
      // 使用重砍，设置冷却需求为2次横斩
      setHeavyStrikeCounter(2);
    }
    
    // 由于稻草人生命值无限，不需要减少它的生命值
    
    // 玩家回合结束，进入敌人回合
    setPlayerTurn(false);
    
    // 短暂延迟后自动进入下一个回合（因为稻草人不会攻击）
    setTimeout(() => {
      // 敌人回合（稻草人不攻击）
      // 稻草人不会攻击，但我们仍然应用这个机制保持一致性
      setBattleLog(prev => [...prev, `${scarecrow.name} 不会攻击你，继续训练吧！`]);
       
       // 回合结束，回到玩家回合
       setPlayerTurn(true);
     }, 1500);
   };
  
  // 结束训练
  const endTraining = () => {
    // 根据新规则，不再给予任何奖励
    
    toast.success(`训练完成！继续努力提升你的战斗技巧吧！`);
    
    // 返回到战斗模式选择页面
    navigate("/battle");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 dark:from-gray-900 dark:to-green-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link to="/battle">
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回战斗模式选择
            </PixelButton>
          </Link>
        </div>
        
        {/* 战斗标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800 dark:text-green-300 font-['Press_Start_2P',_cursive]">
          训练营
        </h1>
        
        {/* 战斗区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-green-800 dark:border-green-900 mb-6">
          {/* 战斗角色 */}
          <div className="flex justify-between items-center mb-8">
            {/* 玩家 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-blue-500 dark:border-blue-400 mb-2 mx-auto">
                <img 
                  src={player.characters[0].spriteUrl} 
                  alt={player.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-blue-800 dark:text-blue-300">{player.name}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                HP: {currentPlayerHp}/{player.characters[0].stats.hp}
              </div>
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 mx-auto">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(currentPlayerHp / player.characters[0].stats.hp) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* VS标记 */}
            <div className="text-2xl font-bold text-gray-500 dark:text-gray-400">
              VS
            </div>
            
            {/* 敌人 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden border-2 border-red-500 dark:border-red-400 mb-2 mx-auto">
                <img 
                  src={scarecrow.spriteUrl} 
                  alt={scarecrow.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-red-800 dark:text-red-300">{scarecrow.name}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                HP: 无限
              </div>
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 mx-auto">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* 战斗日志 */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-4 mb-6 h-32 overflow-y-auto">
            {battleLog.map((log, index) => (
              <p key={index} className="text-sm text-gray-800 dark:text-gray-300 mb-1">
                {log}
              </p>
            ))}
          </div>
          
          {/* 战斗控制 */}
          <div>
            <h3 className="font-bold text-green-700 dark:text-green-400 mb-3">选择技能</h3>
            <div className="grid grid-cols-2 gap-3">
              {playerSkills.map((skill, index) => (
                  <div key={index} className="relative">
                    <PixelButton 
                     key={index} 
                     className={`relative bg-green-600 hover:bg-green-700 border-green-800 ${
                       skill.id === 'heavy_strike' && heavyStrikeCounter > 0 
                         ? 'opacity-70' 
                         : ''
                     }`}
                      onClick={() => playerAttack(index)}
                      disabled={!playerTurn || battleResult || (skill.id === 'heavy_strike' && heavyStrikeCounter > 0)}
                    >
                      <div className="flex items-center justify-center">
                        <i className="fas fa-magic mr-2"></i>
                        <div className="text-center">
                          <div>{skill.name}</div>
                          <div className="text-xs mt-1">
                             {skill.id === 'heavy_strike' && heavyStrikeCounter > 0 
                               ? (
                                 <span className="flex items-center justify-center">
                                   还需
                                   <span className="mx-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px]">
                                     {heavyStrikeCounter}
                                   </span>
                                   次横斩
                                 </span>
                               ) 
                               : `伤害: ${skill.damage}`
                             }
                          </div>
                        </div>
                      </div>
                    </PixelButton>
                    
                    {/* 重砍技能冷却进度指示器 */}
                    {skill.id === 'heavy_strike' && heavyStrikeCounter > 0 && (
                      <div className="absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center">
                        <div className="relative w-8 h-8">
                          <svg className="w-8 h-8" viewBox="0 0 36 36">
                            <circle 
                              cx="18" 
                              cy="18" 
                              r="16" 
                              fill="none" 
                              stroke="#6b7280" 
                              strokeWidth="2"
                            />
                            <circle 
                              cx="18" 
                              cy="18" 
                              r="16" 
                              fill="none" 
                              stroke="#10b981" 
                              strokeWidth="2"
                              strokeDasharray={`${2 * Math.PI * 16 * (1 - heavyStrikeCounter/2)} ${2 * Math.PI * 16}`}
                              strokeLinecap="round"
                              transform="rotate(-90 18 18)"
                              className="animate-pulse"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                            {heavyStrikeCounter}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
              ))}
            </div>
            
            {/* 结束训练按钮 */}
            <div className="mt-4 flex justify-center">
              <PixelButton 
                className="bg-amber-600 hover:bg-amber-700 border-amber-800"
                onClick={endTraining}
              >
                <i className="fas fa-flag-checkered mr-2"></i>结束训练
              </PixelButton>
            </div>
          </div>
        </div>
        
        {/* 训练说明 */}
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md border-2 border-blue-300 dark:border-blue-700">
          <div className="flex items-start">
            <i className="fas fa-info-circle text-blue-500 mt-1 mr-2"></i>
            <p className="text-sm text-blue-800 dark:text-blue-300">
               训练营说明：稻草人木桩不会攻击你，也没有防御力，是练习战斗技巧的绝佳场所。这里专注于提升你的战斗技巧，结束训练后不会获得任何奖励！
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}