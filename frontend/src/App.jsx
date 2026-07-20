import React, { useEffect, useState } from 'react';

import api from './api/client.js';
import { FALLBACK_BRAND } from './api/fallbackData.js';

import useScrollPhysics from './hooks/useScrollPhysics.js';
import useReveal from './hooks/useReveal.js';

import Navbar from './components/common/Navbar.jsx';
import Instruments from './components/common/Instruments.jsx';
import SnapDots from './components/common/SnapDots.jsx';
import Footer from './components/common/Footer.jsx';

import Hot from './components/sections/Hot.jsx';
import Dry from './components/sections/Dry.jsx';
import Turn from './components/sections/Turn.jsx';
import Relief from './components/sections/Relief.jsx';
import Manifesto from './components/sections/Manifesto.jsx';
import WhyOxyra from './components/sections/WhyOxyra.jsx';
import Products from './components/sections/Products.jsx';
import Club from './components/sections/Club.jsx';
import Testimonials from './components/sections/Testimonials.jsx';
import LabReport from './components/sections/LabReport.jsx';
import Delivery from './components/sections/Delivery.jsx';
import Closing from './components/sections/Closing.jsx';

export default function App() {
  const [brand, setBrand] = useState(FALLBACK_BRAND);
  const { temperature, gaugePercent, activeSection, crystallized, dotsVisible } = useScrollPhysics();

  useEffect(() => {
    let active = true;
    api.getBrand().then((data) => {
      if (active) setBrand(data);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    document.title = `${brand.name} — ${brand.tagline}`;
  }, [brand]);

  // Re-run the reveal-on-scroll observer once the static (non-fetched)
  // sections have mounted.
  useReveal([]);

  return (
    <>
      <Navbar brand={brand} />
      <Instruments temperature={temperature} gaugePercent={gaugePercent} />
      <SnapDots activeSection={activeSection} visible={dotsVisible} />

      <main>
        <Hot />
        <Dry />
        <Turn />
        <Relief crystallized={crystallized} />
        <Manifesto />
        <WhyOxyra />
        <Products />
        <Club />
        <Testimonials />
        <LabReport />
        <Delivery brand={brand} />
        <Closing />
      </main>

      <Footer brand={brand} />
    </>
  );
}
