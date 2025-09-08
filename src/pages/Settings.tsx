import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';
import { PixelButton } from '@/components/PixelButton';
import { toast } from 'sonner';
import { useGame } from '@/contexts/gameContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const gameContext = useGame();
  const { soundEnabled, setSoundEnabled, soundVolume, setSoundVolume } = useSoundEffects();
  const { isPlaying: musicPlaying, setIsPlaying: setMusicPlaying, volume: musicVolume, setVolume: setMusicVolume } = useBackgroundMusic();

  // 震动设置状态（模拟）
  const [vibrationEnabled, setVibrationEnabled] = React.useState(true);
  // 语言设置状态（模拟）
  const [language, setLanguage] = React.useState<'zh' | 'en'>('zh');
  
  // 移除多余的音乐控制处理函数，直接使用setIsPlaying

  // 重置游戏
  const resetGame = () => {
    if (window.confirm('确定要重置游戏吗？这将删除所有进度，包括角色属性、等级、训练记录、装备、道具、材料和爬塔记录！')) {
      // 调用GameContext中的resetGame函数，重置所有游戏数据
      gameContext.resetGame();
      toast.success('游戏已完全重置，所有数据已清除！');
    }
  };

  // 切换音效已在上面的设置中直接实现，这里不需要重复定义

  // 切换震动
  const toggleVibration = () => {
    setVibrationEnabled(!vibrationEnabled);
    toast.success(vibrationEnabled ? '震动已关闭' : '震动已开启');
  };

  // 切换语言
  const changeLanguage = (lang: 'zh' | 'en') => {
    setLanguage(lang);
    toast.success(`语言已切换为${lang === 'zh' ? '中文' : '英文'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-start p-4 relative">
      <div className="w-full max-w-2xl">
        {/* 返回按钮 */}
        <div className="mb-4">
          <Link to="/">
            <PixelButton className="text-sm py-2 px-4">
              <i className="fas fa-arrow-left mr-2"></i>返回
            </PixelButton>
          </Link>
        </div>

        {/* 设置标题 */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-300 font-['Press_Start_2P',_cursive]">
          设置
        </h1>

        {/* 设置选项 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 border-4 border-gray-800 dark:border-gray-700">
           {/* 主题设置 */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md border-2 border-gray-300 dark:border-gray-600">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800 dark:text-gray-300 flex items-center">
                <i className="fas fa-moon mr-2 text-gray-600 dark:text-gray-400"></i>
                主题设置
              </h3>
              <div className="flex">
                <button 
                  className={`px-3 py-1 text-sm rounded-l-md ${
                    theme === 'light' 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => toggleTheme()}
                >
                  亮色
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-r-md ${
                    theme === 'dark' 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => toggleTheme()}
                >
                  暗色
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              切换游戏的显示主题，亮色主题适合明亮环境，暗色主题适合黑暗环境。
            </p>
          </div>
          
           {/* 背景音乐设置 */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md border-2 border-gray-300 dark:border-gray-600 mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800 dark:text-gray-300 flex items-center">
                <i className="fas fa-music mr-2 text-gray-600 dark:text-gray-400"></i>
                背景音乐
              </h3>
              <button 
                className={`w-12 h-6 rounded-full flex items-center ${
                  musicPlaying 
                    ? 'bg-green-500 justify-end' 
                    : 'bg-gray-300 dark:bg-gray-600 justify-start'
                }`}
                onClick={() => setMusicPlaying(!musicPlaying)}
              >
                <div className="w-4 h-4 bg-white rounded-full mr-1 ml-1"></div>
              </button>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">音量</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(musicVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              控制游戏背景音乐的播放状态和音量大小。
            </p>
          </div>
          
          {/* 音效设置 */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md border-2 border-gray-300 dark:border-gray-600 mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800 dark:text-gray-300 flex items-center">
                <i className="fas fa-volume-up mr-2 text-gray-600 dark:text-gray-400"></i>
                音效设置
              </h3>
              <button 
                className={`w-12 h-6 rounded-full flex items-center ${
                  soundEnabled 
                    ? 'bg-green-500 justify-end' 
                    : 'bg-gray-300 dark:bg-gray-600 justify-start'
                }`}
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                <div className="w-4 h-4 bg-white rounded-full mr-1 ml-1"></div>
              </button>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">音效音量</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={soundVolume}
                onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              控制游戏中音效的播放状态和音量大小，包括攻击、受伤等音效。
            </p>
          </div>

          {/* 震动设置 */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md border-2 border-gray-300 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-300 flex items-center mb-1">
                  <i className="fas fa-mobile-alt mr-2 text-gray-600 dark:text-gray-400"></i>
                  震动反馈
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  开启或关闭游戏中的震动反馈（仅移动设备）
                </p>
              </div>
              <button 
                className={`w-12 h-6 rounded-full flex items-center ${
                  vibrationEnabled 
                    ? 'bg-green-500 justify-end' 
                    : 'bg-gray-300 dark:bg-gray-600 justify-start'
                }`}
                onClick={toggleVibration}
              >
                <div className="w-4 h-4 bg-white rounded-full mr-1 ml-1"></div>
              </button>
            </div>
          </div>

          {/* 语言设置 */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md border-2 border-gray-300 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-300 flex items-center mb-1">
                  <i className="fas fa-language mr-2 text-gray-600 dark:text-gray-400"></i>
                  语言设置
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  选择游戏界面的显示语言
                </p>
              </div>
              <div className="flex">
                <button 
                  className={`px-3 py-1 text-sm ${
                    language === 'zh' 
                      ? 'bg-gray-800 text-white rounded-l-md' 
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-300 rounded-l-md'
                  }`}
                  onClick={() => changeLanguage('zh')}
                >
                  中文
                </button>
                <button 
                  className={`px-3 py-1 text-sm ${
                    language === 'en' 
                      ? 'bg-gray-800 text-white rounded-r-md' 
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-300 rounded-r-md'
                  }`}
                  onClick={() => changeLanguage('en')}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          {/* 重置游戏 */}
          <div className="mt-8">
            <PixelButton 
              className="w-full bg-red-600 hover:bg-red-700 border-red-800"
              onClick={resetGame}
            >
              <i className="fas fa-redo-alt mr-2"></i>重置游戏
            </PixelButton>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
           警告：此操作将删除所有游戏进度，包括角色属性、等级、训练记录、装备、道具、材料和爬塔记录，且无法恢复！
        </p>
          </div>
        </div>

        {/* 游戏信息 */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>像素冒险 © 2025</p>
          <p className="mt-1">版本 1.0.0</p>
        </div>
      </div>
    </div>
  );
}