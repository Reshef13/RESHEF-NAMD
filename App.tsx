import React, { useState } from 'react';
import RetroTV from './components/RetroTV';
import ThreeParticleSystem from './components/ThreeParticleSystem';
import AlbumView from './components/AlbumView';
import { AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);

  const handleTVComplete = () => {
    setAppState(AppState.READY_TO_ENTER);
  };

  const handleEnter = () => {
    setAppState(AppState.ENTERED);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-red-500 selection:text-white">
      
      {/* Phase 1: Retro TV Loading */}
      {appState === AppState.LOADING && (
        <RetroTV onComplete={handleTVComplete} />
      )}

      {/* Main Container */}
      <div className={`transition-opacity duration-1000 ${appState === AppState.LOADING ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Header / Hero Section */}
        <header className={`relative w-full flex flex-col items-center justify-center transition-all duration-1000 overflow-hidden ${appState === AppState.ENTERED ? 'h-[80vh]' : 'h-screen'}`}>
            
            {/* New 3D Particle System Background */}
            <div className="absolute inset-0 z-0">
                <ThreeParticleSystem />
            </div>
            
            {/* Dark Overlay for better text readability if needed, though ThreeJS handles it */}
            <div className="absolute inset-0 z-0 bg-black/10 pointer-events-none"></div>

            {/* Enter Button (Only shows after TV and before Entering) */}
            {appState === AppState.READY_TO_ENTER && (
                <div className="absolute bottom-10 z-30 animate-fade-in-up">
                    <button 
                        onClick={handleEnter}
                        className="group relative px-12 py-4 bg-transparent border-2 border-white text-white font-black text-2xl tracking-[0.5em] overflow-hidden hover:text-black transition-colors duration-300"
                    >
                        <span className="relative z-10">ENTER</span>
                        <div className="absolute inset-0 bg-white transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                    </button>
                    <p className="mt-4 text-center font-mono text-xs text-gray-500 animate-pulse">
                        PRESS TO INITIATE PROTOCOL
                    </p>
                </div>
            )}
        </header>

        {/* Phase 2: Main Content (Scrolls into view or appears below) */}
        {appState === AppState.ENTERED && (
            <main className="relative z-20 bg-[#050505]">
                <AlbumView />
            </main>
        )}

      </div>
      
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}

export default App;