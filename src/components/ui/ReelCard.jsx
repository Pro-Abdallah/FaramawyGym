import React from 'react';
import { motion } from 'framer-motion';
import css from './ReelCard.module.css';

const ReelCard = ({ reel, index, onClick }) => {
    return (
        <motion.div
            className={css.reelCard}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={onClick}
        >
            <img
                src={reel.thumbnail}
                alt={reel.title}
                className={css.videoPlaceholder}
            />
            <div className={css.playIcon}>
                ▶
            </div>
            <div className={css.infoOverlay}>
                <div className={css.reelTitle}>{reel.title}</div>
                <div className={css.reelViews}>
                    👀 {reel.views}
                </div>
            </div>
        </motion.div>
    );
};

export default ReelCard;
