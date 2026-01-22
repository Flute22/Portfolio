import React, { useState } from 'react';
import { Background } from './components/visuals/Background';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { CaseStudies } from './components/CaseStudies';
import { Contact } from './components/Contact';
import { ContactModal } from './components/ContactModal';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleOpenContact = () => setIsContactModalOpen(true);
  const handleCloseContact = () => setIsContactModalOpen(false);

  return (
    <div className="min-h-screen text-slate-200 selection:bg-primary/30 selection:text-white">
      <Background />
      <Navbar onOpenContact={handleOpenContact} />
      
      <main>
        <Hero onOpenContact={handleOpenContact} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <CaseStudies />
        <Contact onOpenContact={handleOpenContact} />
      </main>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={handleCloseContact} 
      />
    </div>
  );
}

export default App;