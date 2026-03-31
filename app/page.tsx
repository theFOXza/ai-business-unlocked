import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import WhatYoullLearn from '@/components/WhatYoullLearn';
import Agenda from '@/components/Agenda';
import ValueStack from '@/components/ValueStack';
import HostBios from '@/components/HostBios';
import WhoItsFor from '@/components/WhoItsFor';
import FAQ from '@/components/FAQ';
import RegistrationForm from '@/components/RegistrationForm';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ScrollEffects from '@/components/ScrollEffects';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <WhatYoullLearn />
        <Agenda />
        <ValueStack />
        <HostBios />
        <WhoItsFor />
        <FAQ />
        <RegistrationForm />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollEffects />
    </div>
  );
}
