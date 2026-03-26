import { SpaceBackground } from './components/SpaceBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { SkillsOrbit } from './components/SkillsOrbit';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { ThemeProvider } from './context/ThemeContext';
import { GravityProvider } from './context/GravityContext';
import { SatelliteBeam } from './components/SatelliteBeam';

function App() {
  return (
    <ThemeProvider>
      <GravityProvider>
        <div className="min-h-screen text-white overflow-hidden bg-black font-sans selection:bg-cyan-500/30 selection:text-white">
          <SpaceBackground />
          <Navbar />
          
          <main className="relative z-10 w-full overflow-y-auto h-screen snap-y snap-mandatory scroll-smooth" id="scroll-container">
            <div className="snap-start min-h-screen"><Hero /></div>
            <div className="snap-start min-h-screen"><About /></div>
            <div className="snap-start min-h-screen"><SkillsOrbit /></div>
            <div className="snap-start min-h-screen"><Projects /></div>
            <div className="snap-start min-h-screen"><Contact /></div>
          </main>
          
          <SatelliteBeam />
        </div>
      </GravityProvider>
    </ThemeProvider>
  );
}

export default App;
