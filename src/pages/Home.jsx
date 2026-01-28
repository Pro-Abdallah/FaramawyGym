import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import About from '../components/layout/About';
import StoryOverlay from '../components/layout/StoryOverlay';
import CoachingPlans from '../components/layout/CoachingPlans';
import RealResults from '../components/layout/RealResults';
import TrainingGround from '../components/layout/TrainingGround';
import MealPlans from '../components/layout/MealPlans';
import Partnership from '../components/layout/Partnership';
import Footer from '../components/layout/Footer';

const Home = () => {
    const [storyOpen, setStoryOpen] = useState(false);

    return (
        <div className="home-container" style={{ position: 'relative' }}>
            <Navbar />
            <Hero />
            <RealResults />
            <TrainingGround />
            <MealPlans />
            <CoachingPlans />
            <Partnership />
            <About onOpenStory={() => setStoryOpen(true)} />
            <Footer />
            <AnimatePresence>
                {storyOpen && <StoryOverlay onClose={() => setStoryOpen(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default Home;
