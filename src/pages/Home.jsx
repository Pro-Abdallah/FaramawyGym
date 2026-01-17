import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import About from '../components/layout/About';
import StoryOverlay from '../components/layout/StoryOverlay';
import CoachingPlans from '../components/layout/CoachingPlans';
import CinematicTraining from '../components/layout/CinematicTraining';
import Contact from '../components/layout/Contact';
import Footer from '../components/layout/Footer';
import RealResults from '../components/layout/RealResults';
import Store from '../components/layout/Store';

// Global3DScene removed

const Home = () => {
    const [storyOpen, setStoryOpen] = useState(false);

    return (
        <div className="home-container" style={{ position: 'relative' }}>
            <Navbar />
            <Hero />
            <About onOpenStory={() => setStoryOpen(true)} />
            <CinematicTraining />
            <RealResults />
            <CoachingPlans />
            <Store />
            <Contact />
            <Footer />
            <AnimatePresence>
                {storyOpen && <StoryOverlay onClose={() => setStoryOpen(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default Home;
