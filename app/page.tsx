import { Hero } from '@/components/hero/Hero';
import { News } from '@/components/news/News';
import { Awareness } from '@/components/awareness/Awareness';
import { Mission } from '@/components/mission/Mission';
import { Services } from '@/components/services/Services';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { About } from '@/components/about/About';
import { Origin } from '@/components/origin/Origin';
import { Timeline } from '@/components/timeline/Timeline';
import { Media } from '@/components/media/Media';
import { Organization } from '@/components/organization/Organization';
import { Contact } from '@/components/contact/Contact';
import { IntroOverlay } from '@/components/intro/IntroOverlay';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="content-container">
        <Hero />
        <div className="w-full max-w-6xl mx-auto px-4 border-b border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-pink via-brand-blue to-brand-yellow opacity-70"></div>
        </div>
        <News />
        <Awareness />
        <Mission />
        <Services />
        <Testimonials />
        <About />
        <Origin />
        <Timeline />
        <Media />
        <Organization />
        <Contact />
      </div>
      <IntroOverlay />
    </div>
  );
}