import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import PlansPage from './pages/PlansPage';
import PlanSubscription from './pages/PlanSubscription';
import AdminDashboard from './pages/AdminDashboard';
import Lenis from 'lenis';

import SocialSidebar from './components/layout/SocialSidebar';
import Loader from './components/ui/Loader';
import heroImage from './assets/images/download-removebg-preview.png'; // Preload target

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Asset Preloading & Min Load Time
    const loadAssets = async () => {
      const imagePromise = new Promise((resolve) => {
        const img = new Image();
        img.src = heroImage;
        img.onload = resolve;
        img.onerror = resolve; // Continue even if image fails
      });

      const minTimerPromise = new Promise((resolve) => setTimeout(resolve, 2500)); // Min 2.5s load time

      await Promise.all([imagePromise, minTimerPromise]);
      setIsLoading(false);
    };

    loadAssets();

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <SocialSidebar />
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/plan-subscription" element={<PlanSubscription />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
