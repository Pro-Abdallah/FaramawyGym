
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useTranslation } from 'react-i18next';
import TrainingScene from '../3d/TrainingScene';
import css from './CinematicTraining.module.css';



const CinematicTraining = () => {
    const containerRef = useRef(null);
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const [activeSection, setActiveSection] = useState(0);

    const sections = [
        { id: 'gyms', key: 'gyms' },
        { id: 'methods', key: 'methods' },
        { id: 'supplements', key: 'supplements' },
        { id: 'lifestyle', key: 'lifestyle' }
    ];

    // Track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

    // Update active section based on scroll
    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            const index = Math.min(
                Math.floor(latest * sections.length),
                sections.length - 1
            );
            setActiveSection(index);
        });
    }, [scrollYProgress]);

    return (
        <div className={`${css.wrapper} ${isRtl ? css.rtl : ''}`} ref={containerRef}>
            <div className={css.stickyContainer}>

                {/* 3D Background */}
                <div className={css.canvasLayer}>
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <TrainingScene section={activeSection} />
                    </Canvas>
                </div>

                {/* Content Overlay */}
                <div className={css.contentLayer}>

                    {/* Left Indicators */}
                    <div className={css.indicators}>
                        {sections.map((_, i) => (
                            <div
                                key={i}
                                className={`${css.indicator} ${activeSection === i ? css.activeIndicator : ''} `}
                            />
                        ))}
                    </div>

                    {/* Dynamic Text Content */}
                    <div className={css.textContainer}>
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                className={css.sectionContent}
                                style={{
                                    opacity: activeSection === index ? 1 : 0,
                                    pointerEvents: activeSection === index ? 'auto' : 'none',
                                    transform: `translateY(${activeSection === index ? 0 : 20}px)`
                                }}
                            >
                                <h2 className={css.sectionTitle}>{t(`training.sections.${section.key}.title`)}</h2>

                                {/* Specific Content per Section */}
                                {index === 0 && (
                                    <div className={css.details}>
                                        <p>{t('training.sections.gyms.subtitle')}</p>
                                        <div className={css.grid}>
                                            <HoverCard title={t('training.sections.gyms.powerhouse')} image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" />
                                            <HoverCard title={t('training.sections.gyms.golds')} image="https://images.unsplash.com/photo-1540497077202-09f4139/29633?q=80&w=1470&auto=format&fit=crop" />
                                        </div>
                                    </div>
                                )}
                                {index === 1 && (
                                    <div className={css.details}>
                                        <ul className={css.list}>
                                            <li>{t('training.sections.methods.hypertrophy')}</li>
                                            <li>{t('training.sections.methods.strength')}</li>
                                            <li>{t('training.sections.methods.mobility')}</li>
                                        </ul>
                                    </div>
                                )}
                                {index === 2 && (
                                    <div className={css.details}>
                                        <p>{t('training.sections.supplements.subtitle')}</p>
                                        <div className={css.grid}>
                                            <HoverCard title={t('training.sections.supplements.whey')} image="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1470&auto=format&fit=crop" />
                                            <HoverCard title={t('training.sections.supplements.creatine')} image="https://images.unsplash.com/photo-1579722821273-0f9c2d6e3c5e?q=80&w=1470&auto=format&fit=crop" />
                                        </div>
                                    </div>
                                )}
                                {index === 3 && (
                                    <div className={css.details}>
                                        <p>{t('training.sections.lifestyle.subtitle')}</p>
                                        <div className={css.grid}>
                                            <HoverCard title={t('training.sections.lifestyle.mind')} image="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1374&auto=format&fit=crop" />
                                            <HoverCard title={t('training.sections.lifestyle.sleep')} image="https://images.unsplash.com/photo-1511296933631-18b1f0a0a50c?q=80&w=1374&auto=format&fit=crop" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const HoverCard = ({ title, image }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={css.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {title}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className={css.cardImageOverlay}
                        initial={{ opacity: 0, y: 0, scale: 0.9 }}
                        animate={{ opacity: 1, y: -10, scale: 1 }}
                        exit={{ opacity: 0, y: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <img src={image} alt={title} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CinematicTraining;
