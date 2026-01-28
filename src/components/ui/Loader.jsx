import React from 'react';
import { motion } from 'framer-motion';
import css from './Loader.module.css';

const Loader = () => {
    return (
        <motion.div
            className={css.loaderContainer}
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
        >
            <div className={css.iconContainer}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={css.svgIcon}
                >
                    <motion.path
                        d="M6.5 6.5H3.5C2.9 6.5 2.5 6.9 2.5 7.5V16.5C2.5 17.1 2.9 17.5 3.5 17.5H6.5C7.1 17.5 7.5 17.1 7.5 16.5V7.5C7.5 6.9 7.1 6.5 6.5 6.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.path
                        d="M20.5 6.5H17.5C16.9 6.5 16.5 6.9 16.5 7.5V16.5C16.5 17.1 16.9 17.5 17.5 17.5H20.5C21.1 17.5 21.5 17.1 21.5 16.5V7.5C21.5 6.9 21.1 6.5 20.5 6.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                    />
                    <motion.path
                        d="M7.5 12H16.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
                    />
                </svg>
            </div>
            <motion.div
                className={css.text}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                BUILDING YOUR <span className={css.highlight}>LEGACY</span>
            </motion.div>
        </motion.div>
    );
};

export default Loader;
