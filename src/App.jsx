import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import DiseaseCards from './components/DiseaseCards';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Arka plan resmi */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/src/assets/corn-header.png"
          alt="Arka Plan"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* İçerik */}
      <div className="relative z-10 flex flex-col">
        <Header />
        <MainContent />
        <DiseaseCards />
        <Footer />
      </div>
    </div>
  );
}

export default App;
