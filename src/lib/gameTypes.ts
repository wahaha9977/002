// 游戏类型定义
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 装备品质类型
export type ItemQuality = 'common' | 'advanced' | 'rare' | 'epic' | 'legendary' | 'mythic';

// 装备部位类型
export type ItemCategory = 'all' | 'weapon' | 'shield' | 'helmet' | 'armor' | 'shoes' | 'accessory';

   // 游戏类型定义
// 游戏类型定义
export type Stat = {
  hp: number;
  attack: number;
  defense: number;
};

export type Skill = {
  id: string;
  name: string;
  description: string;
  damage: number;
  cost: number;
  element: 'fire' | 'water' | 'earth' | 'air';
  isPercentage?: boolean; // 可选字段，标记是否为百分比伤害
};

export type Character = {
  id: string;
  name: string;
  description: string;
  stats: Stat;
  skills: Skill[];
  spriteUrl: string;
  level: number;
  exp: number;
  maxExp: number;
};

export type Item = {
  id: string;
  name: string;
  description: string;
  type: 'potion' | 'scroll' | 'equipment';
  effect: string;
  price: number;
  spriteUrl: string;
  quality?: ItemQuality;
  category?: ItemCategory;
  stats?: {
    attack?: number;
    defense?: number;
    hp?: number;
  };
};

export type Player = {
  name: string;
  level: number;
  exp: number;
  gold: number;
  characters: Character[];
  items: Item[];
  craftingMaterials?: Record<string, number>;
  trainingCounts?: {
    strength: number;
    defense: number;
    speed: number;
    health: number;
  };
  towerProgress?: {
    currentFloor: number;
    highestFloor: number;
    totalAttempts: number;
    totalSuccesses: number;
  };
  encounteredMonsters?: string[];
  unlockedMaps?: string[];
}

export type GameState = {
  player: Player;
  currentBattle?: {
    enemy: Character;
    turn: 'player' | 'enemy';
    log: string[];
  };
  isPlaying: boolean;
  activeMenu: string;
}