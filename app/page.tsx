import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import WhatYoullLearn from '@/components/WhatYoullLearn';
import Agenda from '@/components/Agenda';
import ValueStack from '@/components/ValueStack';
import HostBios from '@/components/HostBios';
import WhoItsFor from '@/components/WhoItsFor';
import FAQ from '@/components/FAQ';
import UrgencyBanner from '@/components/UrgencyBanner';
import RegistrationForm from '@/components/RegistrationForm';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import Footer from '@/components/Footer';
import { ticketPrice } from '@/lib/site';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pb-24 md:pb-0">
        <Hero />
        <ProblemSection />
        <WhatYoullLearn />
        <Agenda />
        <ValueStack />
        <HostBios />
        <WhoItsFor />
        <FAQ />
        <RegistrationForm priceLabel={`$${ticketPrice}`} />
        <UrgencyBanner />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
