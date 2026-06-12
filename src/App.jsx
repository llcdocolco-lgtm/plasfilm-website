import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ui/ScrollToTop';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Ticker from './components/layout/Ticker';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import Contact from './components/sections/Contact';
import Reserva from './components/sections/Reserva';
import ScrollProgress from './components/ui/ScrollProgress';
import WhatsAppFAB from './components/ui/WhatsAppFAB';

import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import TerminosCondiciones from './pages/TerminosCondiciones';
import EnviosDevoluciones from './pages/EnviosDevoluciones';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Portfolio />
        <Contact />
        <Reserva />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

export default function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'DM Sans, sans-serif' } }} />
      <ScrollProgress />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
        <Route path="/envios-y-devoluciones" element={<EnviosDevoluciones />} />
      </Routes>
    </>
  );
}
