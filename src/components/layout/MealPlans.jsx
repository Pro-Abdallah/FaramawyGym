import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Zap, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Section from '../ui/Section';
import css from './MealPlans.module.css';

const categories = [
    { id: 'standard', label: 'Fuel & Mass', sub: 'Calculated Macros', icon: <Utensils size={24} /> },
    { id: 'recipes', label: 'Culinary Prep', sub: '50+ Chef Recipes', icon: <Zap size={24} /> }
];

const plans = {
    standard: [
        {
            id: 'diet_mass',
            title: 'Gain Mass',
            macros: 'High Carb / High Protein',
            desc: 'The definitive blueprint for size, focusing on calorie density and metabolic optimization.',
            features: ['Precise Macro Breakdown', 'Complete Shopping List', 'Optimum Meal Timing'],
            color: '#FF1E1E'
        },
        {
            id: 'diet_shred',
            title: 'Lean Shred',
            macros: 'High Protein / Low Carb',
            desc: 'Surgical precision for fat loss, designed to preserve muscle tissue while stripping body fat.',
            features: ['Fat Loss Protocols', 'Cravings Control Tactics', 'Elite Supplement Guide'],
            color: '#FF1E1E'
        },
        {
            id: 'diet_recomp',
            title: 'Body Composition',
            macros: 'Cycling Macros',
            desc: 'The holy grail of fitness: building muscle while losing fat simultaneously through strategic nutrient timing.',
            features: ['Macro Cycling Schedule', 'Recomp Meal Structure', 'Metabolic Flexibility'],
            bestSeller: true,
            color: '#FF1E1E'
        }
    ],
    recipes: [
        {
            id: 'diet_gourmet',
            title: 'Gourmet Muscle',
            macros: 'Balanced Macros',
            desc: 'High-performance cooking. Delicious, chef-inspired meals that fuel your gains without the boredom.',
            features: ['Step-by-Step Videos', 'Master Meal Prep', 'Calorie-Matched Portions'],
            color: '#FF1E1E'
        },
        {
            id: 'diet_plant',
            title: 'Plant Based Pro',
            macros: 'Vegan / High Protein',
            desc: 'High-octane plant-based nutrition. Proving you can build a world-class physique on a vegan diet.',
            features: ['Protein Bioavailability', 'Micronutrient Focus', 'Savory Flavor Profiles'],
            color: '#FF1E1E'
        }
    ]
};

const MealPlans = () => {
    const [activeTab, setActiveTab] = useState('standard');
    const navigate = useNavigate();

    const handleSelectDiet = (plan) => {
        const dietData = {
            ...plan,
            type: 'Diet Plan',
            price: 600 // Reflecting "Premium"
        };
        navigate('/plan-subscription', { state: { plan: dietData, mode: 'full' } });
    };

    return (
        <Section id="diet" className={css.section}>
            <div className={css.container}>
                <div className={css.header}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={css.badge}
                    >
                        Foundation
                    </motion.span>
                    <h2 className={css.title}>Elite Nutrition</h2>
                    <p className={css.subtitle}>Scientifically-backed nutrition programs designed for those who demand excellence in every meal.</p>
                </div>

                <div className={css.tabsLayout}>
                    <div className={css.tabsContainer}>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`${css.tab} ${activeTab === cat.id ? css.activeTab : ''}`}
                                onClick={() => setActiveTab(cat.id)}
                            >
                                <div className={css.tabIcon}>{cat.icon}</div>
                                <div className={css.tabText}>
                                    <span className={css.tabLabel}>{cat.label}</span>
                                    <span className={css.tabSub}>{cat.sub}</span>
                                </div>
                                {activeTab === cat.id && (
                                    <motion.div
                                        layoutId="tabBg"
                                        className={css.tabBg}
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={css.grid}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className={css.cardWrapper}
                        >
                            {plans[activeTab].map(plan => (
                                <div
                                    key={plan.id}
                                    className={`${css.card} ${plan.bestSeller ? css.bestSellerCard : ''}`}
                                    onClick={() => handleSelectDiet(plan)}
                                >
                                    {plan.bestSeller && <div className={css.bestSellerBadge}>Best Seller</div>}
                                    <div className={css.cardBody}>
                                        <div className={css.macros}>{plan.macros}</div>
                                        <h3 className={css.planTitle}>{plan.title}</h3>
                                        <p className={css.desc}>{plan.desc}</p>

                                        <div className={css.featureList}>
                                            {plan.features.map((f, i) => (
                                                <div key={i} className={css.featureItem}>
                                                    <Check size={16} className={css.check} />
                                                    <span>{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button className={css.getPlanBtn}>
                                        Get Program <ArrowRight size={18} />
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Section>
    );
};

export default MealPlans;
