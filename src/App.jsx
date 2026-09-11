import PortfolioCanvas from './components/PortfolioCanvas'
import SceneOverlay from './components/SceneOverlay'

export default function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <PortfolioCanvas />
      <SceneOverlay />
    </div>
  )
}