import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PixelButton } from '../components/PixelButton';
import { useTheme } from '../hooks/useTheme';

export default function Home() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleStartGame = () => {
    navigate('/game-home');
  };

  const handleViewCollection = () => {
    navigate('/collection');
  };

  const handleVisitShop = () => {
    navigate('/shop');
  };

  return (
    <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50'} flex flex-col items-center justify-between py-12 px-6`}>
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center mb-12">
        <div className="relative mb-8 transform transition-all duration-500 hover:scale-105 hover:rotate-1">
          <img 
            src="https://space.coze.cn/api/coze_space/gen_image?image_size=square_hd&prompt=Pixel%20art%20game%20character%20adventurous%20hero%20standing%20triumphant&sign=4784e61dacff2db003debf2a330fe29e" 
            alt="Game Hero" 
            className="w-64 h-64 object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg shadow-lg transform rotate-3 animate-bounce">
            2025 NEW
          </div>
        </div>
        
        <h1 className={`text-5xl md:text-6xl font-extrabold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600'}`}>
          像素冒险世界
        </h1>
        
        <p className={`text-xl text-center max-w-2xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          踏上充满未知的像素冒险！探索奇幻世界，挑战强大敌人，收集珍稀装备，成为传奇勇者！
        </p>
      </div>

      {/* Main Gameplay Buttons */}
      <div className="w-full max-w-md grid grid-cols-1 gap-6 mb-16">
        <PixelButton 
          onClick={handleStartGame}
          className="h-16 text-xl transform transition-all duration-300 hover:scale-105"
        >
          开始冒险
        </PixelButton>
        
        <PixelButton 
          onClick={handleViewCollection}
          className="h-16 text-xl bg-purple-600 hover:bg-purple-700 transform transition-all duration-300 hover:scale-105"
        >
          探索图鉴
        </PixelButton>
        
        <PixelButton 
          onClick={handleVisitShop}
          className="h-16 text-xl bg-yellow-500 hover:bg-yellow-600 text-gray-900 transform transition-all duration-300 hover:scale-105"
        >
          商店寻宝
        </PixelButton>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <img 
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Pixel%20art%20battle%20scene%20fight%20action&sign=4886cf48effc4a15c1afdb1476329d2a" 
              alt="Battle" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>⚔️ 策略战斗 ⚔️</h3>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            运用智慧与技巧，击败强大敌人，体验刺激的回合制战斗
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <img 
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Pixel%20art%20character%20collection%20fantasy&sign=023801a1f59d3d492e37ee4c0395f680" 
              alt="Collection" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>📚 图鉴收集 📚</h3>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            收集丰富多彩的角色和装备，解锁专属故事和奖励
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <img 
              src="https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Pixel%20art%20training%20practice%20skill&sign=d9283e33493e8b09badbd684b29f37f6" 
              alt="Training" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>💪 角色养成 💪</h3>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            通过训练和装备打造，培养独一无二的强力角色
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className={`w-full text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
        <p className="font-medium">像素冒险世界 &copy; 2025 | 开启你的勇者传奇</p>
        <div className="flex justify-center space-x-6 mt-2">
          <a href="/settings" className="hover:underline transition-all duration-300 hover:text-blue-500">游戏设置</a>
          <a href="#" className="hover:underline transition-all duration-300 hover:text-blue-500">关于我们</a>
          <a href="#" className="hover:underline transition-all duration-300 hover:text-blue-500">帮助中心</a>
        </div>
      </footer>
    </div>
  );
}