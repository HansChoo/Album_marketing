import React from 'react';
import Hero from './components/Hero';
import ServiceLineup from './components/ServiceLineup';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Calculator from './components/Calculator';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ImageConfigurator from './components/ImageConfigurator';
import { ImageProvider } from './contexts/ImageContext';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-lime-400 selection:text-black">
      <ImageProvider>
        <main>
          <Hero />
          <ServiceLineup />
          <Features />
          <Pricing />
          <Calculator />
          <Reviews />
          <FAQ />
        </main>
        <Footer />
        <ImageConfigurator />
      </ImageProvider>
    </div>
  );
};

export default App;