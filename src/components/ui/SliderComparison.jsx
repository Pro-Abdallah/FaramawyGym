import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import css from './SliderComparison.module.css';

const SliderComparison = ({ transformation, index }) => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = (clientX) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        let percentage = (x / rect.width) * 100;

        const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
        setSliderPosition(clampedPercentage);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleMove(e.clientX);
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX);
        }
    };

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        const handleGlobalMouseMove = (e) => {
            if (isDragging) {
                handleMove(e.clientX);
            }
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleGlobalMouseMove);
            window.addEventListener('mouseup', handleGlobalMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging]);

    return (
        <motion.div
            className={`${css.card} ${isRtl ? css.rtl : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
        >
            <div
                ref={containerRef}
                className={`${css.sliderContainer} swiper-no-swiping`}
                onMouseDown={handleMouseDown}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                onTouchMove={handleTouchMove}
            >
                {/* After Image (Background) */}
                <div className={css.afterImageLayer}>
                    <img
                        src={transformation.after}
                        alt="After transformation"
                        className={css.image}
                        draggable={false}
                    />
                    <div className={css.afterLabel}>{t('results.after')}</div>
                </div>

                {/* Before Image (Clipped overlay) */}
                <div
                    className={css.beforeImageLayer}
                    style={{
                        clipPath: isRtl
                            ? `inset(0 0 0 ${sliderPosition}%)`
                            : `inset(0 ${100 - sliderPosition}% 0 0)`
                    }}
                >
                    <img
                        src={transformation.before}
                        alt="Before transformation"
                        className={css.image}
                        draggable={false}
                    />
                    <div className={css.beforeLabel}>{t('results.before')}</div>
                </div>

                {/* Slider Handle */}
                <div
                    className={css.sliderLine}
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className={css.sliderHandle}>
                        <span className={css.sliderArrows}>&lt; &gt;</span>
                    </div>
                </div>

                {/* Instruction hint */}
                {sliderPosition === 50 && (
                    <motion.div
                        className={css.dragHint}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {t('results.drag_hint')}
                    </motion.div>
                )}
            </div>

            <h3 className={css.name}>{transformation.name}</h3>
            <p className={css.quote}>{transformation.quote}</p>
        </motion.div>
    );
};

export default SliderComparison;
