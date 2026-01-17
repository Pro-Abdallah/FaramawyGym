import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../ui/Section';
import css from './TrainingGround.module.css';

const categories = [
    { id: 'gyms', label: 'Where I Train' },
    { id: 'types', label: 'Training Types' },
    { id: 'supplements', label: 'Supplements' },
    { id: 'lifestyle', label: 'Lifestyle' }
];

const items = [
    { id: 1, category: 'gyms', title: 'Iron Paradise', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop', desc: 'My main HQ.' },
    { id: 2, category: 'gyms', title: 'Metroflex', image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop', desc: 'Old school bodybuilding.' },
    { id: 3, category: 'types', title: 'Hypertrophy', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop', desc: 'Maximizing muscle growth.' },
    { id: 4, category: 'types', title: 'Strength', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop', desc: 'Raw power lifting.' },
    { id: 5, category: 'supplements', title: 'Essential Stack', image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=1470&auto=format&fit=crop', desc: 'What I actually use.' },
    { id: 6, category: 'lifestyle', title: 'Recovery', image: 'https://images.unsplash.com/photo-1544367563-121910aa662f?q=80&w=1587&auto=format&fit=crop', desc: 'Sleep & Mobility.' }
];

const TrainingGround = () => {
    const [activeTab, setActiveTab] = useState('gyms');

    const activeItems = items.filter(item => item.category === activeTab);

    return (
        <Section id="training" className={css.section}>
            <div className={css.container}>
                <h2 className={css.title}>Training Ground</h2>

                <div className={css.tabs}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`${css.tab} ${activeTab === cat.id ? css.active : ''}`}
                            onClick={() => setActiveTab(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <motion.div layout className={css.grid}>
                    <AnimatePresence mode="popLayout">
                        {activeItems.map(item => (
                            <motion.div
                                key={item.id}
                                className={css.card}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={item.image} alt={item.title} className={css.image} />
                                <div className={css.overlay}>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </Section>
    );
};

export default TrainingGround;
