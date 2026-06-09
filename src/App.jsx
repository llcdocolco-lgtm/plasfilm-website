import { Toaster } from 'react-hot-toast';
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

export default function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'DM Sans, sans-serif' } }} />
      <ScrollProgress />
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
