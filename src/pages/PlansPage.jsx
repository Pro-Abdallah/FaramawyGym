import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CoachingPlans from '../components/layout/CoachingPlans';
import { motion } from 'framer-motion';

const PlansPage = () => {
    return (
        <div style={{ paddingTop: '80px' }}>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
                    <h1>Choose Your Path</h1>
                    <p style={{ color: '#aaa', maxWidth: '600px', margin: '1rem auto' }}>
                        Every plan is designed to push you beyond your limits.
                    </p>
                </div>
                <CoachingPlans />
            </motion.div>
            <Footer />
        </div>
    );
};

export default PlansPage;
