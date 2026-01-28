import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Section from '../ui/Section';
import css from './TrainingGround.module.css';

const categories = [
    { id: 'ppl', label: 'PPL Method' },
    { id: 'arnold', label: 'Arnold Split' },
    { id: 'bro', label: 'Bro Split' },
    { id: 'upperlower', label: 'Upper / Lower' }
];

const items = [
    // PPL
    { id: 1, category: 'ppl', title: 'PUSH', type: 'text', desc: 'Chest, Shoulders & Triceps.' },
    { id: 2, category: 'ppl', title: 'PULL', type: 'text', desc: 'Back & Biceps specialty.' },
    { id: 3, category: 'ppl', title: 'LEG', type: 'text', desc: 'Quadriceps, Hamstrings & Calves.' },

    // Arnold
    { id: 4, category: 'arnold', title: 'CHEST / BACK', type: 'text', desc: 'The classic high-volume pump.' },
    { id: 5, category: 'arnold', title: 'ARMS / SHOULDER', type: 'text', desc: 'Focus on peak aesthetics.' },
    { id: 6, category: 'arnold', title: 'LEG / CORE', type: 'text', desc: 'Engine building session.' },

    // Bro Split
    { id: 7, category: 'bro', title: 'CHEST', type: 'text', desc: 'International Chest Day.' },
    { id: 8, category: 'bro', title: 'BACK', type: 'text', desc: 'Width and thickness focus.' },
    { id: 9, category: 'bro', title: 'ARMS', type: 'text', desc: 'Bicep peaks and tricep horseshoes.' },
    { id: 10, category: 'bro', title: 'SHOULDERS', type: 'text', desc: '3D delts work.' },
    { id: 11, category: 'bro', title: 'LEG', type: 'text', desc: 'Total lower body annihilation.' },

    // Upper / Lower
    { id: 12, category: 'upperlower', title: 'UPPER BODY', type: 'text', desc: 'Torso power and hypertrophy.' },
    { id: 13, category: 'upperlower', title: 'LOWER BODY', type: 'text', desc: 'Leg strength and stability.' }
];

const TrainingGround = () => {
    const [activeTab, setActiveTab] = useState('ppl');
    const navigate = useNavigate();

    const activeItems = items.filter(item => item.category === activeTab);

    const handleSelectSplit = (item) => {
        const splitData = {
            id: `split_${item.id}`,
            title: `${item.title} (${categories.find(c => c.id === item.category).label})`,
            type: 'Split Plan',
            price: 500 // Placeholder price for individual splits or the program
        };
        navigate('/plan-subscription', { state: { plan: splitData, mode: 'quick' } });
    };

    return (
        <Section id="splits" className={css.section}>
            <div className={css.container}>
                <h2 className={css.title}>Training Splits</h2>
                <p className={css.subtitle}>Choose your weapon. Styled for performance.</p>

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
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                transition={{ duration: 0.4 }}
                                whileHover={{ y: -10 }}
                                onClick={() => handleSelectSplit(item)}
                            >
                                <div className={css.textImage}>
                                    <span className={css.bigTitle}>{item.title}</span>
                                </div>
                                <div className={css.overlay}>
                                    <div className={css.content}>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className={css.actionWrapper}>
                    <button
                        className={css.getSplitBtnMain}
                        onClick={() => handleSelectSplit({
                            id: activeTab,
                            title: categories.find(c => c.id === activeTab).label,
                            category: activeTab
                        })}
                    >
                        Get The {categories.find(c => c.id === activeTab).label}
                    </button>
                </div>
            </div>
        </Section>
    );
};

export default TrainingGround;
