import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import Section from '../ui/Section';
import css from './Store.module.css';

const products = [
    { id: 1, type: 'diet', title: 'Shredded in 30 Days', price: 'EGP 500', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1453&auto=format&fit=crop' },
    { id: 2, type: 'diet', title: 'Muscle Mass Meal Plan', price: 'EGP 600', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop' },
    { id: 3, type: 'program', title: 'Powerlifting 101', price: 'EGP 900', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop' },
    { id: 4, type: 'program', title: 'HIIT at Home', price: 'EGP 350', image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1470&auto=format&fit=crop' },
    { id: 5, type: 'book', title: 'The Mindset of a Champion', price: 'EGP 250', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop' },
    { id: 6, type: 'book', title: 'Nutrition Science', price: 'EGP 400', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop' },
];

const Store = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: t('store.tabs.all') },
        { id: 'diet', label: t('store.tabs.diet') },
        { id: 'program', label: t('store.tabs.program') },
        { id: 'book', label: t('store.tabs.book') },
    ];

    const filteredProducts = activeTab === 'all'
        ? products
        : products.filter(p => p.type === activeTab);

    return (
        <Section id="store" className={css.section}>
            <div className={css.container}>
                <h2 className={css.title}>{t('store.title')}</h2>

                <div className={css.tabs}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${css.tab} ${activeTab === tab.id ? css.activeTab : ''}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <motion.div layout className={css.grid}>
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                className={css.card}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <div className={css.imageWrapper}>
                                    <img src={product.image} alt={product.title} className={css.image} />
                                    <div className={css.priceTag}>{product.price}</div>
                                </div>
                                <div className={css.details}>
                                    <h3 className={css.productTitle}>{product.title}</h3>
                                    <Button variant="outline" className={css.btn}>{t('store.cart')}</Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </Section>
    );
};

export default Store;
