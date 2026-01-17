import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import HeroScene from '../3d/HeroScene';
import css from './Hero.module.css';
import heroImage from '../../assets/images/download-removebg-preview.png';

const Hero = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    return (
        <div className={css.hero}>
            <div className={css.canvasContainer}>
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                    <Suspense fallback={null}>
                        <HeroScene />
                    </Suspense>
                </Canvas>
            </div>

            <div className={css.overlay}>
                <motion.div
                    className={css.content}
                    initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <motion.h2
                        className={css.subtitle}
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        {t('hero.subtitle')}
                    </motion.h2>
                    <h1 className={css.headline}>
                        {t('hero.headline_1')}<br />
                        <span className={css.stroke}>{t('hero.headline_2')}</span>
                    </h1>
                    <p className={css.description}>
                        {t('hero.description')}
                    </p>
                    <div className={css.actions}>
                        <Button variant="primary" onClick={() => {
                            const element = document.getElementById('results');
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            {t('hero.cta_primary')}
                        </Button>
                        <Button variant="outline" onClick={() => {
                            window.location.href = '/plans';
                        }}>
                            {t('hero.cta_secondary')}
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    className={css.imageContainer}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <img
                        src={heroImage}
                        alt="Abdelrahman Alfarmawy"
                        className={css.coachImage}
                    />
                </motion.div>
            </div>

            <div className={css.scrollIndicator}>
                <div className={css.mouse}>
                    <div className={css.wheel}></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
