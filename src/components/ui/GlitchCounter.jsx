import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const chars = '0123456789';

const GlitchCounter = ({ end, duration = 2, suffix = '' }) => {
    const [display, setDisplay] = useState('0');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime;
        let animationFrame;
        const endVal = parseInt(end.replace(/\D/g, ''), 10); // Extract number

        const update = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                // Glitch phase: show random numbers/chars
                if (Math.random() > 0.5) {
                    // calculated "current" value based on progress
                    const current = Math.floor(progress * endVal);
                    // Mix real digits with glitched ones based on progress
                    // As progress -> 1, glitchiness -> 0
                    const glitchChance = 1 - progress;

                    let result = '';
                    const strCurrent = current.toString();

                    for (let i = 0; i < strCurrent.length; i++) {
                        if (Math.random() < glitchChance * 0.5) { // 50% max glitch chance
                            result += chars[Math.floor(Math.random() * chars.length)];
                        } else {
                            result += strCurrent[i];
                        }
                    }
                    setDisplay(result);
                }
                animationFrame = requestAnimationFrame(update);
            } else {
                setDisplay(end);
            }
        };

        animationFrame = requestAnimationFrame(update);

        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return <span ref={ref}>{display}{suffix}</span>;
};

export default GlitchCounter;
