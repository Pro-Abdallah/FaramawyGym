import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import Section from '../ui/Section';
import { Check } from 'lucide-react';
import css from './CoachingPlans.module.css';

const plans = [
    {
        months: 1,
        title: 'Kickstart',
        priceMonthly: 2500,
        features: ['Custom Training Plan', 'Weekly Check-ins', 'Nutrition Guidelines'],
    },
    {
        months: 3,
        title: 'Transformation',
        priceMonthly: 2000,
        features: ['Custom Training Plan', 'Daily Support', 'Advanced Nutrition', 'Form Analysis'],
        savenote: 'Save 20%'
    },
    {
        months: 6,
        title: 'Lifestyle',
        priceMonthly: 1500,
        features: ['Everything in 3 Month', 'Video Calls', 'Supplement Protocol', 'Travel Adjustments'],
        popular: true,
        savenote: 'Save 40%'
    },
    {
        months: 12,
        title: 'Elite Year',
        priceMonthly: 1200,
        features: ['Full VIP Access', 'Priority Response', 'Free Merch', 'Quarterly Meetups'],
        savenote: 'Save 50%'
    }
];

const CoachingPlans = () => {
    const { t } = useTranslation();

    return (
        <Section id="plans" className={css.section}>
            <div className={css.header}>
                <h2 className={css.title}>{t('plans.title')}</h2>
                <p className={css.subtitle}>Invest in yourself. Proven results.</p>
            </div>

            <div className={css.grid}>
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.months}
                        className={`${css.card} ${plan.popular ? css.popular : ''}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        {plan.popular && <div className={css.badge}>Best Value</div>}
                        <h3 className={css.planTitle}>{plan.title}</h3>
                        <div className={css.duration}>{plan.months} Month{plan.months > 1 ? 's' : ''}</div>

                        <div className={css.price}>
                            <span className={css.currency}>EGP</span>
                            {plan.priceMonthly}
                            <span className={css.period}>/mo</span>
                        </div>
                        {plan.savenote && <div className={css.save}>{plan.savenote}</div>}

                        <ul className={css.features}>
                            {plan.features.map((f, i) => (
                                <li key={i}><Check size={14} className={css.icon} /> {f}</li>
                            ))}
                        </ul>

                        <Button variant={plan.popular ? 'primary' : 'outline'} className={css.btn}>
                            select
                        </Button>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default CoachingPlans;
