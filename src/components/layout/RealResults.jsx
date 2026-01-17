import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import css from './RealResults.module.css';

const RealResults = () => {
    const { t } = useTranslation();

    return (
        <Section id="results" className={css.section}>
            <div className={css.container}>
                <motion.h2
                    className={css.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {t('results.title')}
                </motion.h2>

                <div className={css.showcase}>
                    <div className={css.card}>
                        <div className={css.imageContainer}>
                            <div className={css.beforeLabel}>Before</div>
                            <div className={css.afterLabel}>After</div>
                            <img src="https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1287&auto=format&fit=crop" alt="Before" className={css.img} />
                            <div className={css.swipeOverlay}></div>
                        </div>
                        <h3>James T.</h3>
                        <p className={css.quote}>"I didn't just lose weight. I found my discipline."</p>
                    </div>
                    <div className={css.card}>
                        <div className={css.imageContainer}>
                            <div className={css.beforeLabel}>Before</div>
                            <div className={css.afterLabel}>After</div>
                            <img src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop" alt="Before" className={css.img} />
                            <div className={css.swipeOverlay}></div>
                        </div>
                        <h3>Sarah L.</h3>
                        <p className={css.quote}>"6 months of coaching changed everything."</p>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default RealResults;
