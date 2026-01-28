import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Section from '../ui/Section';
import { Check } from 'lucide-react';
import css from './CoachingPlans.module.css';

const plans = [
    {
        id: 'silver',
        title: 'Silver Plan',
        months: 1,
        priceMonthly: 1500,
        features: ['custom_training', 'weekly_checkins', 'nutrition_guidelines']
    },
    {
        id: 'gold',
        title: 'Gold Plan',
        months: 3,
        priceMonthly: 2000,
        features: ['custom_training', 'daily_support', 'advanced_nutrition', 'form_analysis'],
        popular: true
    },
    {
        id: 'platinum',
        title: 'Platinum Plan',
        months: 6,
        priceMonthly: 2500,
        originalPrice: 3000,
        features: ['everything_3month', 'video_calls', 'supplement_protocol', 'travel_adjustments']
    }
];


const CoachingPlans = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedDuration, setSelectedDuration] = useState(1); // 1, 3, 6, or 12

    const tiers = [
        {
            id: 'silver',
            title: 'Silver',
            priceBase: 600,
            features: ['custom_training', 'weekly_checkins', 'nutrition_guidelines']
        },
        {
            id: 'gold',
            title: 'Gold',
            priceBase: 850,
            features: ['custom_training', 'daily_support', 'advanced_nutrition', 'form_analysis'],
            popular: true
        },
        {
            id: 'platinum',
            title: 'Platinum',
            priceBase: 1000,
            features: ['everything_gold', 'video_calls', 'supplement_protocol', 'travel_adjustments']
        }
    ];

    const durations = [1, 3, 6, 12];

    const getPrice = (base) => {
        // Applying a small discount for longer durations
        if (selectedDuration === 3) return Math.round(base * 0.9);
        if (selectedDuration === 6) return Math.round(base * 0.8);
        if (selectedDuration === 12) return Math.round(base * 0.7);
        return base;
    };

    const handleSelectPlan = (tier) => {
        const planData = {
            id: `${tier.id}_${selectedDuration}`,
            title: `${tier.title} - ${selectedDuration} Month${selectedDuration > 1 ? 's' : ''}`,
            type: 'Coaching Package',
            months: selectedDuration,
            priceMonthly: getPrice(tier.priceBase),
            totalPrice: getPrice(tier.priceBase) * selectedDuration,
            tier: tier.id
        };
        navigate('/plan-subscription', { state: { plan: planData } });
    };

    return (
        <Section id="plans" className={css.section}>
            <div className={css.header}>
                <h2 className={css.title}>{t('plans.title')}</h2>
                <p className={css.subtitle}>{t('plans.subtitle')}</p>
            </div>

            <div className={css.durationToggle}>
                {durations.map(d => (
                    <button
                        key={d}
                        className={`${css.durationBtn} ${selectedDuration === d ? css.activeDuration : ''}`}
                        onClick={() => setSelectedDuration(d)}
                    >
                        {d} {d > 1 ? t('plans.months') : t('plans.month')}
                    </button>
                ))}
            </div>

            <div className={css.grid}>
                {tiers.map((tier, index) => {
                    const monthlyPrice = getPrice(tier.priceBase);
                    return (
                        <motion.div
                            key={tier.id}
                            className={`${css.card} ${tier.popular ? css.popular : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {tier.popular && <div className={css.badge}>{t('plans.best_value')}</div>}
                            <h3 className={css.planTitle}>{tier.title}</h3>
                            <div className={css.duration}>
                                {selectedDuration} {selectedDuration > 1 ? t('plans.months') : t('plans.month')} {t('plans.commitment')}
                            </div>

                            <div className={css.price}>
                                <div className={css.currentPrice}>
                                    <span className={css.currency}>EGP</span>
                                    {monthlyPrice}
                                    <span className={css.period}>{t('plans.per_month')}</span>
                                </div>
                                {selectedDuration > 1 && (
                                    <div className={css.totalPrice}>
                                        Total: EGP {monthlyPrice * selectedDuration}
                                    </div>
                                )}
                            </div>

                            <ul className={css.features}>
                                {tier.features.map((f, i) => (
                                    <li key={i}>
                                        <Check size={14} className={css.icon} />
                                        {f === 'everything_gold' ? 'Everything in Gold' : t(`plans.features.${f}`)}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={tier.popular ? 'primary' : 'outline'}
                                className={css.btn}
                                onClick={() => handleSelectPlan(tier)}
                            >
                                {t('plans.select')}
                            </Button>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};

export default CoachingPlans;
