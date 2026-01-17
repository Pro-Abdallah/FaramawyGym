import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import css from './StoryOverlay.module.css';

const timeline = [
    { year: '2012', title: 'The Beginning', text: 'Started with nothing but a dream and a single dumbbell.' },
    { year: '2015', title: 'The Struggle', text: 'Overcame injury and rebuilt my physique from scratch.' },
    { year: '2018', title: 'The Breakthrough', text: 'Won first national championship. Launched first program.' },
    { year: '2024', title: 'The Legacy', text: 'Helping thousands worldwide achieve elite performance.' },
];

const StoryOverlay = ({ onClose }) => {

    // Lock body scroll when overlay is open
    useEffect(() => {
        // Safe check for document presence
        if (typeof document !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.overflow = ''; // Re-enable scroll
            }
        };
    }, []);

    return (
        <motion.div
            className={css.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            data-lenis-prevent // Stops Lenis from hijacking scroll here
        >
            <button className={css.closeBtn} onClick={onClose}>
                <X size={32} color="#fff" />
            </button>

            <div className={css.container}>
                <h2 className={css.mainTitle}>My Journey</h2>
                <div className={css.timeline}>
                    {timeline.map((item, index) => (
                        <motion.div
                            key={index}
                            className={css.timelineItem}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className={css.year}>{item.year}</div>
                            <h3 className={css.itemTitle}>{item.title}</h3>
                            <p className={css.itemText}>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default StoryOverlay;
