import { useState, useEffect, useRef } from 'react';

export function useBackgroundMusic() {
  // 状态管理
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    const saved = localStorage.getItem('musicEnabled');
    return saved !== 'false'; // 默认开启
  });
  const [volume, setVolume] = useState<number>(() => {
    const saved = localStorage.getItem('musicVolume');
    return saved ? parseFloat(saved) : 0.3; // 默认音量30%
  });
  
  // 使用useRef替代useState来更好地管理音频元素
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // 初始化音频元素并处理用户交互播放
  useEffect(() => {
    // 创建音频元素 - 使用更适合作为背景音乐的游戏音乐
    const audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-8-bit-retro-funk-196.mp3');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;
    
    // 尝试播放音频
    if (isPlaying) {
      // 使用用户交互触发的延迟播放，避免浏览器自动播放限制
      const playAudio = () => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => {
            console.log('Audio play prevented:', e);
            // 如果播放失败，确保UI状态正确
            setIsPlaying(false);
          });
          document.removeEventListener('click', playAudio);
          document.removeEventListener('keydown', playAudio);
          document.removeEventListener('touchstart', playAudio);
        }
      };
      
      // 添加多种交互事件监听器以提高触发概率
      document.addEventListener('click', playAudio, { once: true });
      document.addEventListener('keydown', playAudio, { once: true });
      document.addEventListener('touchstart', playAudio, { once: true });
      
      // 清理函数
      return () => {
        document.removeEventListener('click', playAudio);
        document.removeEventListener('keydown', playAudio);
        document.removeEventListener('touchstart', playAudio);
      };
    }
    
    // 如果初始化时不应该播放，也设置为暂停状态
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // 更新播放状态
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log('Audio play prevented:', e);
          // 如果播放失败，确保UI状态正确
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
      localStorage.setItem('musicEnabled', isPlaying.toString());
    }
  }, [isPlaying]);
  
  // 更新音量
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      localStorage.setItem('musicVolume', volume.toString());
    }
  }, [volume]);
  
  // 清理函数 - 在组件卸载时彻底清理音频资源
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ''; // 清除资源
        audioRef.current = null;
      }
    };
  }, []);
  
  return {
    isPlaying,
    setIsPlaying,
    volume,
    setVolume
  };
}