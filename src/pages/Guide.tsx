import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '@/contexts/gameContext';
import { PixelButton } from '@/components/PixelButton';

export default function Guide() {
  const { gameState } = useGame();
  const { player } = gameState;
  
  // 切换章节状态
  const [activeSection, setActiveSection] = useState<string>('basics');
  
  // 指南章节
  const guideSections = [
    { id: 'basics', title: '游戏基础', icon: 'fas fa-gamepad' },
    { id: 'battle', title: '战斗系统', icon: 'fas fa-sword' },
    { id: 'collection', title: '图鉴系统', icon: 'fas fa-book' },
    { id: 'training', title: '角色养成', icon: 'fas fa-dumbbell' },
    { id: 'shop', title: '商店系统', icon: 'fas fa-shopping-bag' },
    { id: 'equipment', title: '装备系统', icon: 'fas fa-shield-alt' },
    { id: 'enhancement', title: '装备强化', icon: 'fas fa-wrench' },
    { id: 'crafting', title: '装备打造', icon: 'fas fa-hammer' },
    { id: 'storehouse', title: '仓库系统', icon: 'fas fa-box' },
  ];
  
  // 指南内容
  const guideContent: Record<string, React.ReactNode> = {
    basics: (
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-md border-2 border-blue-300 dark:border-blue-700">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">游戏简介</h3>
          <p className="text-gray-700 dark:text-gray-300">
            《像素冒险》是一款复古风格的角色扮演游戏。作为一名勇敢的冒险者，你将踏上一段充满挑战的旅程，通过不断战斗、训练和收集资源来提升自己的实力，最终成长为这个像素世界中最强大的勇士！
          </p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-md border-2 border-green-300 dark:border-green-700">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-3">基本操作</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>点击主界面的功能按钮进入相应系统</li>
            <li>通过战斗获取经验值和金币，提升角色等级</li>
            <li>使用金币进行训练，强化角色各项属性</li>
            <li>收集各类材料，打造和强化专属装备</li>
            <li>合理使用药水等消耗品应对各种挑战</li>
          </ul>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-5 rounded-md border-2 border-yellow-300 dark:border-yellow-700">
          <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-3">角色属性详解</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
            <div className="flex items-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <i className="fas fa-fist-raised mr-3 text-red-500 w-6 text-center"></i>
              <div>
                <div className="font-medium">攻击</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">影响角色造成的伤害值</div>
              </div>
            </div>
            <div className="flex items-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <i className="fas fa-shield-alt mr-3 text-blue-500 w-6 text-center"></i>
              <div>
                <div className="font-medium">防御</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">减少角色受到的伤害值</div>
              </div>
            </div>
            <div className="flex items-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <i className="fas fa-heart mr-3 text-red-500 w-6 text-center"></i>
              <div>
                <div className="font-medium">生命</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">角色的生命值上限</div>
              </div>
            </div>
                <div className="flex items-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
                  <i className="fas fa-shield-alt mr-3 text-blue-500 w-6 text-center"></i>
                  <div>
                    <div className="font-medium">防御</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">减少角色受到的伤害值</div>
                  </div>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/30 p-5 rounded-md border-2 border-purple-300 dark:border-purple-700">
          <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3">游戏目标</h3>
          <p className="text-gray-700 dark:text-gray-300">
            不断提升角色等级和各项属性，收集稀有装备和材料，挑战强大的敌人，完成各种成就，最终成为像素世界中最强大的冒险者！在你的旅程中，你将探索多样化的场景，遇到各种有趣的角色，并解锁游戏的深层内容。
          </p>
        </div>
      </div>
    ),
    
 battle: (
      <div className="space-y-6">
        <div className="bg-red-50 dark:bg-red-900/30 p-5 rounded-md border-2 border-red-300 dark:border-red-700">
          <h3 className="font-bold text-red-800 dark:text-red-300 mb-3">战斗系统简介</h3>
          <p className="text-gray-700 dark:text-gray-300">
            战斗是《像素冒险》中核心的成长方式，通过与敌人的对决，你将获取宝贵的经验值、金币和珍稀材料。游戏设计了多样化的战斗模式，从新手训练到高难度挑战，满足不同阶段玩家的成长需求。
          </p>
        </div>
        
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-md border-2 border-blue-300 dark:border-blue-700 h-full flex flex-col">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
              <i className="fas fa-dumbbell mr-2"></i>训练营
            </h4>
            <p className="text-gray-700 dark:text-gray-300 flex-grow">
              为冒险者量身打造的训练场所，敌人为不会攻击的稻草人木桩，无防御力且拥有无限生命值。这里是新手熟悉战斗机制、练习技能释放节奏的理想选择，让你在无压力的环境中提升战斗技巧。
            </p>
            <div className="mt-3 px-3 py-2 bg-blue-100/80 dark:bg-blue-800/50 rounded-md">
              <div className="flex items-center text-sm text-blue-800 dark:text-blue-300">
                <i className="fas fa-check-circle mr-2 text-green-600 dark:text-green-400"></i>
                <span>已开放</span>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/30 p-5 rounded-md border-2 border-red-300 dark:border-red-700 h-full flex flex-col">
            <h4 className="font-bold text-red-800 dark:text-red-300 mb-3 flex items-center">
              <i className="fas fa-dragon mr-2"></i>首领挑战
            </h4>
            <p className="text-gray-700 dark:text-gray-300 flex-grow">
              面对游戏中最强大的单体敌人，每个首领都拥有独特的技能和战斗机制。挑战成功后将获得极其丰厚的奖励，包括稀有装备和高级材料，但失败则会损失一定资源。
            </p>
            <div className="mt-3 px-3 py-2 bg-gray-100/80 dark:bg-gray-800/50 rounded-md">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <i className="fas fa-hourglass-half mr-2 text-amber-500"></i>
                <span>即将开放</span>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/30 p-5 rounded-md border-2 border-purple-300 dark:border-purple-700 h-full flex flex-col">
            <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3 flex items-center">
              <i className="fas fa-tower-broadcast mr-2"></i>爬塔闯关
            </h4>
             <p className="text-gray-700 dark:text-gray-300 flex-grow">
               挑战性极强的多层关卡，每层都有一只随机生成的怪物。前10层怪物全属性降低10%，从第11层开始，每通过一层，下一层怪物全属性会增加0.5%。随着层数攀升，敌人会变得更加强大，但通关奖励也会更加丰厚，是验证你综合实力的最佳试炼场。
             </p>
             <div className="mt-3 px-3 py-2 bg-green-100/80 dark:bg-green-800/50 rounded-md">
               <div className="flex items-center text-sm text-green-800 dark:text-green-300">
                 <i className="fas fa-check-circle mr-2 text-green-600 dark:text-green-400"></i>
                 <span>已开放</span>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-5 rounded-md border-2 border-yellow-300 dark:border-yellow-700 h-full flex flex-col">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center">
              <i className="fas fa-gem mr-2"></i>素材副本
            </h4>
            <p className="text-gray-700 dark:text-gray-300 flex-grow">
              针对装备打造和强化需求设计的专题副本，不同类型的副本将产出特定种类的材料资源。根据你当前的装备成长计划，选择相应的副本进行挑战，高效收集所需资源。
            </p>
            <div className="mt-3 px-3 py-2 bg-gray-100/80 dark:bg-gray-800/50 rounded-md">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <i className="fas fa-hourglass-half mr-2 text-amber-500"></i>
                <span>即将开放</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-md border-2 border-gray-300 dark:border-gray-600">
          <div className="flex items-start">
            <i className="fas fa-info-circle text-blue-500 mt-1 mr-3 text-lg"></i>
            <p className="text-gray-700 dark:text-gray-300">
                   系统提示：训练营和爬塔闯关已正式开放！在训练营中可以与稻草人木桩进行无风险战斗练习；在爬塔闯关中，你将面对层层递增的挑战，每层的怪物都会变得更加强大！首领挑战和素材副本等更多精彩战斗模式正在开发中，敬请期待！
            </p>
          </div>
        </div>
      </div>
    ),
    
    collection: (
      <div className="space-y-6">
        <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-md border-2 border-green-300 dark:border-green-700">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-3">图鉴系统简介</h3>
          <p className="text-gray-700 dark:text-gray-300">
            图鉴系统是记录你游戏历程的重要功能，它会自动记录你在冒险中遇到的所有怪物和获得的所有装备。通过收集图鉴，你可以回顾自己的游戏成就，同时也能查看各种怪物和装备的详细信息。
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-md border-2 border-blue-300 dark:border-blue-700">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">怪物图鉴</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            在战斗中每次遇到新的怪物，该怪物的信息就会自动添加到怪物图鉴中。图鉴记录了怪物的名称、描述、属性类型和稀有度等详细信息，帮助你更好地了解游戏中的各种生物。
          </p>
          <div className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
            <div className="text-sm text-gray-600 dark:text-gray-400 italic">
              提示：某些稀有怪物只会在特定条件下出现，探索更多区域，完成特殊任务，增加遇到稀有怪物的机会！
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/30 p-5 rounded-md border-2 border-purple-300 dark:border-purple-700">
          <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3">装备图鉴</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            当你获得新的装备时，该装备会自动收录到装备图鉴中。图鉴中包含了装备的名称、描述、属性加成、品质等级和装备部位等完整信息，方便你查阅和比较不同装备的效果。
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center justify-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <i className="fas fa-sword mr-2 text-gray-500"></i>
              <span>武器</span>
            </div>
            <div className="flex items-center justify-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <i className="fas fa-shield-alt mr-2 text-gray-500"></i>
              <span>盾牌</span>
            </div>
            <div className="flex items-center justify-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <i className="fas fa-hard-hat mr-2 text-gray-500"></i>
              <span>头盔</span>
            </div>
            <div className="flex items-center justify-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <i className="fas fa-user-shield mr-2 text-gray-500"></i>
              <span>铠甲</span>
            </div>
            <div className="flex items-center justify-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <i className="fas fa-shoe-prints mr-2 text-gray-500"></i>
              <span>靴子</span>
            </div>
            <div className="flex items-center justify-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <i className="fas fa-gem mr-2 text-gray-500"></i>
              <span>饰品</span>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-900/30 p-5 rounded-md border-2 border-amber-300 dark:border-amber-700">
          <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3">收集进度</h3>
          <p className="text-gray-700 dark:text-gray-300">
            图鉴页面会实时显示你的收集进度百分比，包括怪物收集率和装备收集率。不断探索游戏世界的各个角落，挑战各种难度的内容，收集更多的怪物和装备，提升你的收集完成度，解锁更多隐藏内容和成就！
          </p>
        </div>
      </div>
    ),
    
    training: (
      <div className="space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-5 rounded-md border-2 border-yellow-300 dark:border-yellow-700">
          <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-3">角色养成系统</h3>
          <p className="text-gray-700 dark:text-gray-300">
            养成系统是提升角色基础能力的关键途径。通过消耗金币进行针对性训练，你可以全面提升角色的各项属性，打造属于自己的强力角色。训练系统提供了多种训练类型，满足不同的属性提升需求。
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md border-2 border-red-300 dark:border-red-700">
            <h4 className="font-bold text-red-800 dark:text-red-300 mb-3 flex items-center">
              <i className="fas fa-dumbbell mr-2"></i>力量训练
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              专注于提升角色的物理攻击力，每次训练可获得+0.5的攻击属性加成。
            </p>
            <div className="bg-white/70 dark:bg-gray-800/70 p-2 rounded-md text-xs text-gray-600 dark:text-gray-400">
              适合喜欢高输出、快速击败敌人的玩家
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md border-2 border-blue-300 dark:border-blue-700">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center">
              <i className="fas fa-shield-alt mr-2"></i>防御训练
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              着重增强角色的防御力，每次训练可获得+0.2的防御属性加成。
            </p>
            <div className="bg-white/70 dark:bg-gray-800/70 p-2 rounded-md text-xs text-gray-600 dark:text-gray-400">
              适合喜欢稳扎稳打、持久战斗的玩家
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-md border-2 border-green-300 dark:border-green-700">
            <h4 className="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center">
              <i className="fas fa-heart mr-2"></i>生命训练
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              增加角色的生命值上限，每次训练可获得+1的生命值加成。
            </p>
            <div className="bg-white/70 dark:bg-gray-800/70 p-2 rounded-md text-xs text-gray-600 dark:text-gray-400">
              适合喜欢承受更多伤害、进行长时间战斗的玩家
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-md border-2 border-green-300 dark:border-green-700">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-3">训练规则与奖励</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>初次训练消耗50金币，之后每次训练费用递增50金币（第二次100，第三次150，依此类推）</li>
            <li>不同类型的训练费用独立计算，互不影响</li>
            <li>完成训练后可获得30点经验值</li>
            <li>训练结束后有一定几率获得额外的材料奖励</li>
            <li>训练过程中可随时查看各项训练的已训练次数</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-md border-2 border-blue-300 dark:border-blue-700">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">训练策略建议</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            为了最大化角色的战斗效能，建议根据你的战斗风格和偏好制定合理的训练计划：
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>均衡发展各项属性，避免过于偏重单一属性导致角色能力失衡</li>
            <li>根据当前装备的属性加成，有针对性地提升相应属性</li>
            <li>在挑战高难度内容前，确保角色拥有足够的生命值和防御力</li>
            <li>合理规划金币使用，优先提升对当前游戏阶段帮助最大的属性</li>
          </ul>
        </div>
      </div>
    ),
    
    shop: (
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-md border-2 border-blue-300 dark:border-blue-700">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">商店系统</h3>
          <p className="text-gray-700 dark:text-gray-300">
            商店是游戏中获取各类物品和资源的重要渠道。通过消耗金币，你可以购买恢复药水、属性增益药水以及装备打造所需的各类材料，为你的冒险之旅提供有力支持。
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-red-50 dark:bg-red-900/30 p-5 rounded-md border-2 border-red-300 dark:border-red-700">
            <h4 className="font-bold text-red-800 dark:text-red-300 mb-3 flex items-center">
              <i className="fas fa-flask mr-2"></i>药水类物品
            </h4>
            <ul className="space-y-3">
              <li className="flex justify-between items-center bg-white/70 dark:bg-gray-800/70 p-3 rounded-md">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-300">回复药水</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">恢复20点生命值</div>
                </div>
                <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
                  <i className="fas fa-coins mr-1"></i>
                  <span>20</span>
                </div>
              </li>
              <li className="flex justify-between items-center bg-white/70 dark:bg-gray-800/70 p-3 rounded-md">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-300">超级回复药水</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">恢复50点生命值</div>
                </div>
                <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
                  <i className="fas fa-coins mr-1"></i>
                  <span>50</span>
                </div>
              </li>
              <li className="flex justify-between items-center bg-white/70 dark:bg-gray-800/70 p-3 rounded-md">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-300">力量药水</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">临时提升攻击力10点</div>
                </div>
                <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
                  <i className="fas fa-coins mr-1"></i>
                  <span>30</span>
                </div>
              </li>
              <li className="flex justify-between items-center bg-white/70 dark:bg-gray-800/70 p-3 rounded-md">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-300">防御药水</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">临时提升防御力10点</div>
                </div>
                <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
                  <i className="fas fa-coins mr-1"></i>
                  <span>30</span>
                </div>
              </li>
              <li className="flex justify-between items-center bg-white/70 dark:bg-gray-800/70 p-3 rounded-md">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-300">速度药水</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">临时提升速度5点</div>
                </div>
                <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
                  <i className="fas fa-coins mr-1"></i>
                  <span>30</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/30 p-5 rounded-md border-2 border-amber-300 dark:border-amber-700">
            <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center">
              <i className="fas fa-cubes mr-2"></i>打造材料
            </h4>
            <ul className="space-y-3">
              <li className="flex justify-between items-center bg-white/70 dark:bg-gray-800/70 p-3 rounded-md">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-300">木材</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">基础的打造材料</div>
                </div>
                <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
                  <i className="fas fa-coins mr-1"></i>
                  <span>5</span>
                </div>
              </li>
              <li className="flex justify-between items-center bg-white/70 dark:bg-gray-800/70 p-3 rounded-md">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-300">铜矿</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">用于打造普通装备的材料</div>
                </div>
                <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-bold">
                  <i className="fas fa-coins mr-1"></i>
                  <span>10</span>
                </div>
              </li>
              <li className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-700/50 rounded-md mt-2">
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center italic">
                  更多高级材料将在后续游戏版本中陆续开放
                </p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-5 rounded-md border-2 border-yellow-300 dark:border-yellow-700">
          <div className="flex items-start">
            <i className="fas fa-lightbulb text-yellow-500 mt-1 mr-3 text-lg"></i>
            <p className="text-gray-700 dark:text-gray-300">
              购物小贴士：在购买物品时，请根据你的当前需求和金币数量做出合理选择。药水在战斗中能提供即时的帮助，而材料则是打造强大装备的基础。建议保持一定的金币储备，以便在需要时能够购买必要的物品。
            </p>
          </div>
        </div>
      </div>
    ),
    
    equipment: (
      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-md border-2 border-gray-300 dark:border-gray-600">
          <h3 className="font-bold text-gray-800 dark:text-gray-300 mb-3">装备系统简介</h3>
          <p className="text-gray-700 dark:text-gray-300">
            装备系统是提升角色战斗力的重要组成部分。通过装备不同的武器、防具和饰品，你可以大幅提升角色的各项属性，适应不同的战斗场景和敌人类型。游戏提供了丰富多样的装备类型和品质，满足各种游戏策略需求。
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-md border-2 border-blue-300 dark:border-blue-700">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">装备部位</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
            <div className="flex flex-col items-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-12 h-12 flex items-center justify-center mb-2 text-xl text-gray-600 dark:text-gray-400">
                <i className="fas fa-hard-hat"></i>
              </div>
              <div className="font-medium text-center">头盔</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">主要提升防御和生命值</div></div>
            <div className="flex flex-col items-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-12 h-12 flex items-center justify-center mb-2 text-xl text-gray-600 dark:text-gray-400">
                <i className="fas fa-sword"></i>
              </div>
              <div className="font-medium text-center">武器</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">主要提升攻击力</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-12 h-12 flex items-center justify-center mb-2 text-xl text-gray-600 dark:text-gray-400">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="font-medium text-center">盾牌</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">主要提升防御力</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-12 h-12 flex items-center justify-center mb-2 text-xl text-gray-600 dark:text-gray-400">
                <i className="fas fa-user-shield"></i>
              </div>
              <div className="font-medium text-center">胸甲</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">主要提升防御和生命值</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-12 h-12 flex items-center justify-center mb-2 text-xl text-gray-600 dark:text-gray-400">
                <i className="fas fa-shoe-prints"></i>
              </div>
              <div className="font-medium text-center">鞋子</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">主要提升速度</div>
            </div>
            <div className="flex flex-col items-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-12 h-12 flex items-center justify-center mb-2 text-xl text-gray-600 dark:text-gray-400">
                <i className="fas fa-gem"></i>
              </div>
              <div className="font-medium text-center">饰品</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">可能提升多种属性</div>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/30 p-5 rounded-md border-2 border-purple-300 dark:border-purple-700">
          <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3">装备品质</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            游戏中的装备按照品质从低到高分为六个等级，品质越高的装备提供的属性加成越多，也越难获取：
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
              <span className="text-gray-700 dark:text-gray-300">普通</span>
            </div>
            <div className="flex items-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
              <span className="text-gray-700 dark:text-gray-300">高级</span>
            </div>
            <div className="flex items-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
              <span className="text-gray-700 dark:text-gray-300">稀有</span>
            </div>
            <div className="flex items-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <span className="inline-block w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
              <span className="text-gray-700 dark:text-gray-300">史诗</span>
            </div>
            <div className="flex items-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <span className="inline-block w-3 h-3 bg-orange-400 rounded-full mr-2"></span>
              <span className="text-gray-700 dark:text-gray-300">传说</span>
            </div>
            <div className="flex items-center p-2 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <span className="inline-block w-3 h-3 bg-pink-400 rounded-full mr-2"></span>
              <span className="text-gray-700 dark:text-gray-300">神话</span>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-900/30 p-5 rounded-md border-2 border-amber-300 dark:border-amber-700">
          <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3">装备获取途径</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-8 h-8 flex items-center justify-center mr-3 text-amber-600 dark:text-amber-400">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-300">商店购买</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">使用金币直接购买装备</div>
              </div>
            </div>
            <div className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-8 h-8 flex items-center justify-center mr-3 text-amber-600 dark:text-amber-400">
                <i className="fas fa-hammer"></i>
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-300">装备打造</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">收集材料自行打造装备</div>
              </div>
            </div>
            <div className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-8 h-8 flex items-center justify-center mr-3 text-amber-600 dark:text-amber-400">
                <i className="fas fa-sword"></i>
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-300">战斗奖励</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">击败敌人有几率获得装备</div>
              </div>
            </div>
            <div className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-8 h-8 flex items-center justify-center mr-3 text-amber-600 dark:text-amber-400">
                <i className="fas fa-gift"></i>
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-300">活动奖励</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">参与游戏活动获得限定装备</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    
    enhancement: (
      <div className="space-y-6">
        <div className="bg-cyan-50 dark:bg-cyan-900/30 p-5 rounded-md border-2 border-cyan-300 dark:border-cyan-700">
          <h3 className="font-bold text-cyan-800 dark:text-cyan-300 mb-3">装备强化系统</h3>
          <p className="text-gray-700 dark:text-gray-300">
            强化系统可以进一步提升已装备武器和防具的属性，使你的角色更加强大。通过消耗金币进行强化，你可以逐步提升装备的等级，但需要注意的是，强化等级越高，所需的金币越多，同时成功率也会相应降低。
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-md border-2 border-blue-300 dark:border-blue-700">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">强化规则</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300">1</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">只能强化已穿戴在角色身上的装备</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300">2</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">每次成功强化都会提升装备的属性值</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300">3</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">强化等级越高，所需金币越多，成功率越低</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300">4</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">每件装备都有固定的最大强化等级限制</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/30 p-5 rounded-md border-2 border-red-300 dark:border-red-700">
          <h3 className="font-bold text-red-800 dark:text-red-300 mb-3">强化风险</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            强化过程中存在一定的失败几率，需要玩家权衡风险与收益：
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>强化失败不会损坏装备，但会消耗掉强化所需的金币</li>
            <li>随着强化等级的提升，失败的概率会逐渐增加</li>
            <li>高级强化失败可能会导致较大的金币损失</li>
          </ul>
          <div className="mt-4 p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
            <div className="flex items-start">
              <i className="fas fa-exclamation-triangle text-red-500 mr-2 mt-1"></i>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                特别提醒：进行高等级强化前，请确保你有足够的金币储备，避免因连续失败而造成过大的经济损失。
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-md border-2 border-green-300 dark:border-green-700">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-3">强化策略建议</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            为了最大化强化的效率和效益，建议采取以下策略：
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>优先强化高品质、高基础属性的装备，这类装备的强化收益更大</li>
            <li>根据角色的战斗风格和属性短板，有针对性地选择强化重点</li>
            <li>合理分配金币资源，不要在低等级或即将更换的装备上投入过多</li>
            <li>在强化高等级装备前，可以先进行一些低等级强化"热身"，提升整体成功率感知</li>
            <li>密切关注游戏中的强化活动，在活动期间进行强化可能会获得额外的成功率加成</li>
          </ul>
        </div>
      </div>
    ),
    
    crafting: (
      <div className="space-y-6">
        <div className="bg-amber-50 dark:bg-amber-900/30 p-5 rounded-md border-2 border-amber-300 dark:border-amber-700">
          <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3">装备打造系统</h3>
          <p className="text-gray-700 dark:text-gray-300">
            打造系统是游戏中获取高级装备的重要途径。通过收集各种材料并消耗一定数量的金币，你可以打造出商店中无法直接购买的稀有和高级装备。打造系统为玩家提供了更多的游戏目标和成就感。
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-md border-2 border-blue-300 dark:border-blue-700">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">打造条件</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                <i className="fas fa-cubes text-blue-800 dark:text-blue-300"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-300 mb-1">材料需求</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  每件装备都需要特定类型和数量的材料才能打造，材料的种类和数量会根据装备的品质和类型而变化。
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                <i className="fas fa-coins text-blue-800 dark:text-blue-300"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-300 mb-1">金币消耗</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  打造装备需要消耗一定数量的金币，装备品质越高，所需的金币数量越多。
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                <i className="fas fa-gem text-blue-800 dark:text-blue-300"></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-300 mb-1">品质对应</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  不同品质的装备需要不同稀有度的材料，高品质装备通常需要更难获取的稀有材料。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-md border-2 border-green-300 dark:border-green-700">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-3">材料需求明细</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/70 dark:bg-gray-800/70">
                  <th className="p-3 border-b-2 border-gray-300 dark:border-gray-700 text-sm font-bold">装备品质</th>
                  <th className="p-3 border-b-2 border-gray-300 dark:border-gray-700 text-sm font-bold">材料需求</th>
                  <th className="p-3 border-b-2 border-gray-300 dark:border-gray-700 text-sm font-bold">金币消耗</th>
                </tr>
              </thead>
                <tbody>
                <tr className="bg-white/50 dark:bg-gray-800/50">
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">普通装备</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">20木材 + 10铜矿</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">20-50金币</td>
                </tr>
                <tr className="bg-white/50 dark:bg-gray-800/50">
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">高级装备</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">50木材 + 20铜矿 + 10铁矿</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">80-200金币</td>
                </tr>
                <tr className="bg-white/50 dark:bg-gray-800/50">
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">稀有装备</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">200木材 + 50铜矿 + 20铁矿 + 10银矿</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">350金币</td>
                </tr>
                <tr className="bg-white/50 dark:bg-gray-800/50">
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">史诗装备</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">1000木材 + 100铜矿 + 50铁矿 + 20银矿 + 10金矿</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">500金币</td>
                </tr>
                <tr className="bg-white/50 dark:bg-gray-800/50">
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">传说装备</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">5000木材 + 200铜矿 + 100铁矿 + 50银矿 + 20金矿 + 10钻石矿</td>
                  <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-sm">1500金币</td>
                </tr>
                <tr className="bg-white/50 dark:bg-gray-800/50">
                 <td className="p-3 text-sm">神话装备</td>
                <td className="p-3 text-sm">10000木材 + 1000铜矿 + 500铁矿 + 200银矿 + 100金矿 + 50钻石矿 + 20陨石矿</td>
                <td className="p-3 text-sm">2500金币</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/30 p-5 rounded-md border-2 border-purple-300 dark:border-purple-700">
          <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3">材料获取途径</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            游戏中的材料可以通过多种途径获取，不同稀有度的材料获取难度也不同：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-8 h-8 flex items-center justify-center mr-3 text-purple-600 dark:text-purple-400">
                <i className="fas fa-sword"></i>
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-300">战斗奖励</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">击败敌人有几率掉落材料</div>
              </div>
            </div>
            <div className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-8 h-8 flex items-center justify-center mr-3 text-purple-600 dark:text-purple-400">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-300">商店购买</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">使用金币直接购买基础材料</div>
              </div>
            </div>
            <div className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-8 h-8 flex items-center justify-center mr-3 text-purple-600 dark:text-purple-400">
                <i className="fas fa-gift"></i>
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-300">活动奖励</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">参与游戏活动获取稀有材料</div>
              </div>
            </div>
            <div className="flex items-start p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="w-8 h-8 flex items-center justify-center mr-3 text-purple-600 dark:text-purple-400">
                <i className="fas fa-tower-broadcast"></i>
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-300">爬塔奖励</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">通关高难度爬塔获得高级材料</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    
    storehouse: (
      <div className="space-y-6">
        <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-md border-2 border-green-300 dark:border-green-700">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-3">仓库系统简介</h3>
          <p className="text-gray-700 dark:text-gray-300">
            仓库系统是管理你游戏资源的中心，用于存放所有获得的消耗品和打造材料。当你通过战斗、任务或商店购买获得新物品时，它们会自动添加到仓库中，并实时更新数量。合理管理仓库资源是提升游戏效率的关键。
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-red-50 dark:bg-red-900/30 p-5 rounded-md border-2 border-red-300 dark:border-red-700">
            <h4 className="font-bold text-red-800 dark:text-red-300 mb-3 flex items-center">
              <i className="fas fa-flask mr-2"></i>消耗品管理
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              消耗品包括各种药水和卷轴等一次性使用的物品。当你使用这些物品时，仓库中的数量会自动减少，直到消耗完毕。
            </p>
            <div className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="flex items-start">
                <i className="fas fa-info-circle text-blue-500 mt-1 mr-2"></i>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  消耗品使用后会立即产生效果，如恢复生命值、提升属性等，但使用后会从仓库中移除。建议根据实际需求合理使用消耗品，避免浪费。
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/30 p-5 rounded-md border-2 border-amber-300 dark:border-amber-700">
            <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center">
              <i className="fas fa-cubes mr-2"></i>材料管理
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              材料是用于装备打造和强化的重要资源，包括各种矿石、木材和特殊物品。仓库会记录每种材料的当前数量，并在你收集或使用材料时自动更新。
            </p>
            <div className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-md">
              <div className="flex items-start">
                <i className="fas fa-info-circle text-blue-500 mt-1 mr-2"></i>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  高级装备的打造通常需要大量稀有材料，建议有计划地收集和存储材料，为打造强力装备做好准备。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-md border-2 border-blue-300 dark:border-blue-700">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">仓库功能特点</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <i className="fas fa-plus text-blue-800 dark:text-blue-300 text-xs"></i>
              </div>
              <p className="text-gray-700 dark:text-gray-300">自动更新：获得新道具或材料时，会自动添加到仓库并更新数量</p>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <i className="fas fa-minus text-blue-800 dark:text-blue-300 text-xs"></i>
              </div>
              <p className="text-gray-700 dark:text-gray-300">动态管理：使用道具或消耗材料后，仓库中的数量会相应减少</p>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <i className="fas fa-eye text-blue-800 dark:text-blue-300 text-xs"></i>
              </div>
              <p className="text-gray-700 dark:text-gray-300">实时查看：随时可以查看当前拥有的所有物品和材料的详细信息</p>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <i className="fas fa-box-open text-blue-800 dark:text-blue-300 text-xs"></i>
              </div>
              <p className="text-gray-700 dark:text-gray-300">分类存储：消耗品和材料分类存放，便于查找和管理</p>
            </li>
          </ul>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-5 rounded-md border-2 border-yellow-300 dark:border-yellow-700">
          <div className="flex items-start">
            <i className="fas fa-lightbulb text-yellow-500 mt-1mr-3 text-lg"></i>
            <p className="text-gray-700 dark:text-gray-300">
              仓库管理小贴士：定期检查你的仓库，了解自己拥有的资源情况，这样可以更好地规划游戏策略。对于常用的消耗品，建议保持一定的储备量；对于打造材料，则可以根据当前的装备打造计划有针对性地收集和存储。
            </p>
          </div>
        </div>
      </div>
    ),
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-blue-900 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link to="/">
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回
            </PixelButton>
          </Link>
        </div>
        
        {/* 指南标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800 dark:text-blue-300 font-['Press_Start_2P',_cursive]">
          游戏指南
        </h1>
        
        {/* 指南章节列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border-4 border-blue-800 dark:border-blue-900 overflow-x-auto">
          <div className="flex flex-wrap gap-2">
            {guideSections.map((section) => (
              <button
                key={section.id}
                className={`px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors flex items-center ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 font-medium'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/50'
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <i className={`${section.icon} mr-1 text-xs`}></i>
                {section.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* 指南内容区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-4 border-blue-800 dark:border-blue-900 min-h-[400px]">
          {guideContent[activeSection]}
        </div>
        
        {/* 底部提示 */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>如果有任何问题或建议，请随时通过设置界面联系我们！</p>
        </div>
      </div>
    </div>
  );
}