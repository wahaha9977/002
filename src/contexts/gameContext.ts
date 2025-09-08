import { createContext, useState, useContext } from "react";
import { GameState, Player, Character, Item, Skill } from "@/lib/gameTypes";

// 初始游戏数据 - 清空仓库内容
const initialPlayer: Player = {
  name: "勇者",
  level: 1,
  exp: 0,
  gold: 0,
  characters: [
      {
        id: "hero",
        name: "勇者",
        description: "游戏的主角，拥有平衡的能力",
        stats: { hp: 100, attack: 15, defense: 10 },
        skills: [
          {
            id: "slash",
            name: "横斩",
            description: "基础的物理攻击",
            damage: 1.5, // 攻击力的150%
            cost: 0,
            element: "earth",
            isPercentage: true // 标记为百分比伤害
          },
          {
            id: "heavy_strike",
            name: "重砍",
            description: "强力的物理攻击",
            damage: 4.0, // 攻击力的400%
            cost: 0,
            element: "earth",
            isPercentage: true // 标记为百分比伤害
          }
        ],
        spriteUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=pixel%20art%20hero%20knight%208bit%20glowing%20armor%20shiny%20sword%20heroic%20pose&sign=e5b1f56faed725c69d90626ea5944342",
        level: 1,
        exp: 0,
        maxExp: 100
      }
  ],
  items: [], // 清空初始物品
  craftingMaterials: {}, // 清空初始材料
  trainingCounts: {
    strength: 0,
    defense: 0,
    health: 0
  },
  towerProgress: {
    currentFloor: 1,
    highestFloor: 1,
    totalAttempts: 0,
    totalSuccesses: 0
  },
  encounteredMonsters: []
};

const initialGameState: GameState = {
  player: initialPlayer,
  isPlaying: true,
  activeMenu: "home"
};

type GameContextType = {
  gameState: GameState;
  updateGameState: (newState: Partial<GameState>) => void;
  addCharacter: (character: Character) => void;
  addItem: (item: Item) => void;
  consumeItem: (itemId: string) => boolean;
  spendGold: (amount: number) => boolean;
  gainExp: (amount: number) => void;
  startBattle: (enemy: Character) => void;
  endBattle: () => void;
  trainCharacter: (characterId: string, statType: 'attack' | 'defense' | 'speed', amount: number) => void;
  addMaterial: (materialName: string, amount: number) => void;
  removeMaterial: (materialName: string, amount: number) => boolean;
  updateTowerProgress: (progress: Partial<typeof initialPlayer.towerProgress>) => void;
  addEncounteredMonster: (monsterId: string) => void;
  resetGame: () => void;
};

export const GameContext = createContext<GameContextType>({
  gameState: initialGameState,
  updateGameState: () => {},
  addCharacter: () => {},
  addItem: () => {},
  consumeItem: () => false,
  spendGold: () => false,
  gainExp: () => {},
  startBattle: () => {},
  endBattle: () => {},
  trainCharacter: () => {},
  addMaterial: () => {},
  removeMaterial: () => false,
  updateTowerProgress: () => {},
  addEncounteredMonster: () => {},
  resetGame: () => {}
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...newState }));
  };

  const addCharacter = (character: Character) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        characters: [...prev.player.characters, character]
      }
    }));
  };

  // 修改addItem函数，使其能够处理物品数量
  const addItem = (item: Item) => {
    setGameState(prev => {
      // 检查是否已存在相同ID的物品
      const existingItemIndex = prev.player.items.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // 如果已存在，创建一个新对象并添加数量属性
        const existingItem = prev.player.items[existingItemIndex];
        const updatedItems = [...prev.player.items];
        
        // 如果物品已有数量属性，增加数量；否则设置数量为2
        if ('quantity' in existingItem) {
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: (existingItem.quantity as number) + 1
          };
        } else {
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: 2
          };
        }
        
        return {
          ...prev,
          player: {
            ...prev.player,
            items: updatedItems
          }
        };
      } else {
        // 如果不存在，添加新物品并设置数量为1
        return {
          ...prev,
          player: {
            ...prev.player,
            items: [...prev.player.items, { ...item, quantity: 1 }]
          }
        };
      }
    });
  };

  // 添加consumeItem函数，用于减少物品数量
  const consumeItem = (itemId: string): boolean => {
    setGameState(prev => {
      const existingItemIndex = prev.player.items.findIndex(item => item.id === itemId);
      
      if (existingItemIndex >= 0) {
        const existingItem = prev.player.items[existingItemIndex];
        const updatedItems = [...prev.player.items];
        
        // 如果物品有数量属性且数量大于1，减少数量
        if ('quantity' in existingItem && (existingItem.quantity as number) > 1) {
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: (existingItem.quantity as number) - 1
          };
        } else {
          // 否则从列表中移除该物品
          updatedItems.splice(existingItemIndex, 1);
        }
        
        return {
          ...prev,
          player: {
            ...prev.player,
            items: updatedItems
          }
        };
      }
      
      return prev;
    });
    
    // 检查物品是否存在
    return gameState.player.items.some(item => item.id === itemId);
  };

  const spendGold = (amount: number): boolean => {
    if (gameState.player.gold >= amount) {
      setGameState(prev => ({
        ...prev,
        player: {
          ...prev.player,
          gold: prev.player.gold - amount
        }
      }));
      return true;
    }
    return false;
  };

  const gainExp = (amount: number) => {
    setGameState(prev => {
      const newExp = prev.player.exp + amount;
      let newLevel = prev.player.level;
      let remainingExp = newExp;
      
      // 复制当前玩家角色的属性，以便在升级时进行修改
      let updatedCharacters = [...prev.player.characters];
      
      // 新的升级逻辑：首次升级需要100经验，之后每级所需经验增加20%
      while (true) {
        // 计算当前等级所需的升级经验值
        // 公式：100 * (1.2)^(newLevel - 1)
        const requiredExp = Math.floor(100 * Math.pow(1.2, newLevel - 1));
        
        if (remainingExp >= requiredExp) {
          // 如果经验值足够升级
          remainingExp -= requiredExp;
          newLevel++;
          
          // 升级时应用属性加成
          // 遍历所有角色（目前只有主角，但为了扩展性保留遍历）
          updatedCharacters = updatedCharacters.map(character => {
            // 计算新的属性值
            const newHp = Math.floor(character.stats.hp * 1.01); // 生命+1%
            const newAttack = parseFloat((character.stats.attack * 1.005).toFixed(1)); // 攻击+0.5%
            const newDefense = parseFloat((character.stats.defense * 1.003).toFixed(1)); // 防御+0.3%
            
            return {
              ...character,
              stats: {
                hp: newHp,
                attack: newAttack,
                defense: newDefense
              }
            };
          });
        } else {
          // 如果经验值不足，跳出循环
          break;
        }
      }
      
      return {
        ...prev,
        player: {
          ...prev.player,
          exp: remainingExp,
          level: newLevel,
          characters: updatedCharacters
        }
      };
    });
  };

  const startBattle = (enemy: Character) => {
    setGameState(prev => ({
      ...prev,
      currentBattle: {
        enemy: { ...enemy },
        turn: 'player',
        log: [`遭遇了${enemy.name}！`]
      }
    }));
  };

  const endBattle = () => {
    setGameState(prev => ({
      ...prev,
      currentBattle: undefined
    }));
  };

  // 训练角色，增加指定属性
  const trainCharacter = (characterId: string, statType: 'attack' | 'defense', amount: number) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        characters: prev.player.characters.map(character => {
          if (character.id === characterId) {
            return {
              ...character,
              stats: {
                ...character.stats,
                [statType]: character.stats[statType] + amount
              }
            };
          }
          return character;
        })
      }
    }));
  };

  // 添加材料
  const addMaterial = (materialName: string, amount: number) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        craftingMaterials: {
          ...prev.player.craftingMaterials,
          [materialName]: (prev.player.craftingMaterials?.[materialName] || 0) + amount
        }
      }
    }));
  };
  
  // 移除材料
   const removeMaterial = (materialName: string, amount: number): boolean => {
    const currentAmount = gameState.player.craftingMaterials?.[materialName] || 0;
    
    if (currentAmount >= amount) {
      setGameState(prev => ({
        ...prev,
        player: {
          ...prev.player,
          craftingMaterials: {
            ...prev.player.craftingMaterials,
            [materialName]: currentAmount - amount
          }
        }
      }));
      return true;
    }
    
    return false;
  };

   // 更新爬塔进度
  const updateTowerProgress = (progress: Partial<typeof initialPlayer.towerProgress>) => {
    setGameState(prev => {
      // 获取当前的爬塔进度或使用初始值
      const currentProgress = prev.player.towerProgress || initialPlayer.towerProgress;
      
      // 计算新的最高楼层，确保只会增加，不会减少
      const newHighestFloor = Math.max(
        currentProgress.highestFloor, 
        progress.highestFloor || currentProgress.highestFloor
      );
      
      // 计算新的总胜利次数，确保不会减少
      const newTotalSuccesses = progress.totalSuccesses !== undefined 
        ? Math.max(currentProgress.totalSuccesses, progress.totalSuccesses)
        : currentProgress.totalSuccesses;
      
      // 计算新的总尝试次数，确保不会减少
      const newTotalAttempts = progress.totalAttempts !== undefined 
        ? Math.max(currentProgress.totalAttempts, progress.totalAttempts)
        : currentProgress.totalAttempts;
      
      return {
        ...prev,
        player: {
          ...prev.player,
          towerProgress: {
            ...currentProgress,
            ...progress,
            // 确保最高楼层和统计数据只会增加或保持不变
            highestFloor: newHighestFloor,
            totalSuccesses: newTotalSuccesses,
            totalAttempts: newTotalAttempts
          }
        }
      };
    });
  };

  // 添加记录玩家击败的怪物的函数
  const addEncounteredMonster = (monsterId: string) => {
    setGameState(prev => {
      // 检查怪物是否已经在已击败列表中
      const encounteredMonsters = prev.player.encounteredMonsters || [];
      if (encounteredMonsters.includes(monsterId)) {
        return prev; // 如果已经存在，不做任何操作
      }
      
      return {
        ...prev,
        player: {
          ...prev.player,
          encounteredMonsters: [...encounteredMonsters, monsterId]
        }
      };
    });
  };

  const value = {
    gameState,
    updateGameState,
    addCharacter,
    addItem,
    consumeItem,
    spendGold,
    gainExp,
    startBattle,
    endBattle,
    trainCharacter,
    addMaterial,
    removeMaterial,
    updateTowerProgress,
    addEncounteredMonster,
    resetGame: () => setGameState(initialGameState)
  };

  return React.createElement(GameContext.Provider, { value }, children);
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};