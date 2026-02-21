import React, { useState, lazy, Suspense } from 'react';
import { Background } from './components/visuals/Background';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { CaseStudies } from './components/CaseStudies';
import { Contact } from './components/Contact';

// Lazy load heavy modal components — only loaded when user clicks to open them
const ContactModal = lazy(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));
const ResumeManager = lazy(() => import('./components/ResumeManager').then(m => ({ default: m.ResumeManager })));

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isResumeManagerOpen, setIsResumeManagerOpen] = useState(false);

  const handleOpenContact = () => setIsContactModalOpen(true);
  const handleCloseContact = () => setIsContactModalOpen(false);

  const handleOpenResumeManager = () => setIsResumeManagerOpen(true);
  const handleCloseResumeManager = () => setIsResumeManagerOpen(false);

  return (
    <div className="min-h-screen text-slate-200 selection:bg-primary/30 selection:text-white">
      <Background />
      <Navbar onOpenContact={handleOpenContact} onOpenResumeManager={handleOpenResumeManager} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <CaseStudies />
        <Contact onOpenContact={handleOpenContact} />
      </main>

      <Suspense fallback={null}>
        {isContactModalOpen && (
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={handleCloseContact}
          />
        )}
        {isResumeManagerOpen && (
          <ResumeManager
            isOpen={isResumeManagerOpen}
            onClose={handleCloseResumeManager}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;