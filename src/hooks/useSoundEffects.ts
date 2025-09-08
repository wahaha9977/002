// 音效钩子
import { useState, useEffect, useRef } from 'react';

export function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== 'false'; // 默认开启
  });
  const [soundVolume, setSoundVolume] = useState<number>(() => {
    const saved = localStorage.getItem('soundVolume');
    return saved ? parseFloat(saved) : 0.5; // 默认音效音量50%
  });
  
  // 音效缓存池 - 用于存储常用音效
  const soundPool = useRef<Record<string, HTMLAudioElement[]>>({});
  
  // 初始化音效池
  useEffect(() => {
    // 创建常用音效
    const createSoundPool = (name: string, url: string, size: number = 3) => {
      soundPool.current[name] = [];
      for (let i = 0; i < size; i++) {
        const audio = new Audio(url);
        audio.volume = soundVolume;
        soundPool.current[name].push(audio);
      }
    };
    
    // 创建各种游戏音效
    createSoundPool('playerAttack', 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-mechanical-bling-210.mp3');
    createSoundPool('enemyAttack', 'https://assets.mixkit.co/sfx/preview/mixkit-metallic-sword-clash-2721.mp3');
    createSoundPool('playerHit', 'https://assets.mixkit.co/sfx/preview/mixkit-player-jump-in-a-game-2043.mp3');
    createSoundPool('enemyHit', 'https://assets.mixkit.co/sfx/preview/mixkit-impact-hit-757.mp3');
    createSoundPool('skillUse', 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3');
    createSoundPool('victory', 'https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
    createSoundPool('defeat', 'https://assets.mixkit.co/sfx/preview/mixkit-player-losing-or-failing-2042.mp3');
    
    // 保存设置到localStorage
    localStorage.setItem('soundEnabled', soundEnabled.toString());
    localStorage.setItem('soundVolume', soundVolume.toString());
    
    return () => {
      // 清理所有音效
      Object.values(soundPool.current).forEach(pool => {
        pool.forEach(audio => {
          audio.pause();
          audio.src = '';
        });
      });
    };
  }, []);
  
  // 更新音效音量
  useEffect(() => {
    Object.values(soundPool.current).forEach(pool => {
      pool.forEach(audio => {
        audio.volume = soundVolume;
      });
    });
    localStorage.setItem('soundVolume', soundVolume.toString());
  }, [soundVolume]);
  
  // 更新音效启用状态
  useEffect(() => {
    localStorage.setItem('soundEnabled', soundEnabled.toString());
  }, [soundEnabled]);
  
  // 播放音效函数
  const playSound = (name: string) => {
    if (!soundEnabled || !soundPool.current[name]) return;
    
    const pool = soundPool.current[name];
    // 找到一个空闲的音效元素
    for (const audio of pool) {
      if (audio.paused) {
        try {
          audio.currentTime = 0; // 重置到开始
          audio.play().catch(e => console.log('Sound play prevented:', e));
          return;
        } catch (e) {
          console.error('Error playing sound:', e);
        }
      }
    }
    
    // 如果所有音效都在播放中，创建一个新的临时音效
    const tempAudio = new Audio(soundPool.current[name][0].src);
    tempAudio.volume = soundVolume;
    tempAudio.play().catch(e => console.log('Temp sound play prevented:', e));
    
    // 播放完毕后清理
    tempAudio.addEventListener('ended', () => {
      tempAudio.src = '';
    });
  };
  
  return {
    soundEnabled,
    setSoundEnabled,
    soundVolume,
    setSoundVolume,
    playSound
  };
}