import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import Section from '../ui/Section';
import css from './About.module.css';

const About = ({ onOpenStory }) => {
    const { t } = useTranslation();

    const stats = [
        { label: t('stats.members'), value: '2000+' },
        { label: t('stats.experience'), value: '12' },
        { label: t('stats.programs'), value: '500+' },
        { label: t('stats.awards'), value: '15' },
    ];

    return (
        <Section id="about" className={css.section}>
            <div className={css.container}>
                <div className={css.content}>
                    <motion.h4
                        className={css.subtitle}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {t('about.subtitle')}
                    </motion.h4>
                    <motion.h2
                        className={css.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {t('about.title')}
                    </motion.h2>
                    <motion.p
                        className={css.text}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        {t('about.description')}
                    </motion.p>
                    <Button variant="outline" className={css.btn} onClick={onOpenStory}>
                        {t('about.story_btn')}
                    </Button>
                </div>

                <div className={css.stats}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className={css.statCard}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, borderColor: '#FF1E1E' }}
                        >
                            <h3 className={css.statValue}>{stat.value}</h3>
                            <p className={css.statLabel}>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default About;
