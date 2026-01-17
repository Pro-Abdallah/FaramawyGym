import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Section = ({ children, className = '', id = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section
            ref={ref}
            id={id}
            className={className}
            style={{
                position: 'relative',
                padding: '5rem 2rem',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'none' : 'translateY(50px)',
                transition: 'all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
            }}
        >
            {children}
        </section>
    );
};

export default Section;
