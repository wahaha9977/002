import { Routes, Route } from "react-router-dom";
import GameHome from "@/pages/GameHome";
import Battle, { BattlePage } from "@/pages/Battle";
import Collection from "@/pages/Collection";
import Training from "@/pages/Training";
import Shop from "@/pages/Shop";
import Equipment from "@/pages/Equipment";
import Enhancement from "@/pages/Enhancement";
import Crafting from "@/pages/Crafting";
import TrainingCampBattle from "@/pages/TrainingCampBattle";
import Settings from "@/pages/Settings";
import Storehouse from "@/pages/Storehouse";
import TowerClimb from "@/pages/TowerClimb";
import Guide from "@/pages/Guide";
import MonsterDetail from "@/pages/MonsterDetail";
import MainStory from "@/pages/MainStory";
import MaterialDungeon from "@/pages/MaterialDungeon";
import { GameProvider } from "@/contexts/gameContext";

export default function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<GameHome />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/training" element={<Training />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/enhancement" element={<Enhancement />} />
        <Route path="/crafting" element={<Crafting />} />
        <Route path="/storehouse" element={<Storehouse />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/training-camp" element={<TrainingCampBattle />} />
        <Route path="/tower-climb" element={<TowerClimb />} />
        <Route path="/material-dungeon" element={<MaterialDungeon />} />
        <Route path="/monster-detail/:id" element={<MonsterDetail />} />
        <Route path="/main-story" element={<MainStory />} />
        <Route path="/battle/:mapId/:sectionId" element={<BattlePage />} />
      </Routes>
    </GameProvider>
  );
}
