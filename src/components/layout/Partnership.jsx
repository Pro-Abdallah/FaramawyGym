import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, Pill, Dumbbell, X } from 'lucide-react';
import Section from '../ui/Section';
import css from './Partnership.module.css';

const CATEGORIES = [
    { id: 'apparel', name: 'Apparel', icon: <Shirt size={32} /> },
    { id: 'supplements', name: 'Supplements', icon: <Pill size={32} /> },
    { id: 'equipment', name: 'Equipment', icon: <Dumbbell size={32} /> }
];

const BRANDS = {
    apparel: [
        { id: 'nike', name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', promo: 'NIKE_FARMA_10', desc: 'World leader in athletic footwear and apparel.' },
        { id: 'adidas', name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', promo: 'ADI_FARMA_15', desc: 'Premium sportswear and accessories.' },
        { id: 'gymshark', name: 'Gymshark', logo: 'https://images.squarespace-cdn.com/content/v1/5be92a3736099b21815802a8/1542171120092-2P8T9M5A0N1P4S4W9S4W/gymshark-logo-png-logo-png-900.png', promo: 'SHARK_FARMA_20', desc: 'Performance fitness apparel & accessories.' },
        { id: 'underarmour', name: 'Under Armour', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Under_Armour_logo.svg', promo: 'UA_FARMA_12', desc: 'Innovating performance gear for athletes.' }
    ],
    supplements: [
        { id: 'optimum', name: 'Optimum Nutrition', logo: 'https://logos-world.net/wp-content/uploads/2021/02/Optimum-Nutrition-Logo.png', promo: 'ON_FARMA_15', desc: 'The Gold Standard in sports nutrition.' },
        { id: 'muscletech', name: 'MuscleTech', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/MuscleTech_logo.svg/1200px-MuscleTech_logo.svg.png', promo: 'MT_FARMA_20', desc: 'Superior science, superior results.' },
        { id: 'myprotein', name: 'MyProtein', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Myprotein_logo.png', promo: 'MYP_FARMA_25', desc: 'Europe\'s No. 1 sports nutrition brand.' },
        { id: 'reign', name: 'Reign Energy', logo: 'https://reignbodyfuel.com/wp-content/uploads/2022/02/reign_logo_footer.png', promo: 'REIGN_FARMA_10', desc: 'Total body fuel for high performance.' }
    ],
    equipment: [
        { id: 'rogue', name: 'Rogue Fitness', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Rogue_Fitness_Logo.png', promo: 'ROGUE_FARMA_05', desc: 'Leading manufacturer of strength and conditioning equipment.' },
        { id: 'eleiko', name: 'Eleiko', logo: 'https://eleiko.com/build/img/eleiko-logo.svg', promo: 'ELI_FARMA_10', desc: 'The world\'s best bars and plates.' },
        { id: 'hammer', name: 'Hammer Strength', logo: 'https://lifefitness.com/resource/image/224216/portrait_ratio1x1/400/400/98b8b0e8f0a6d0c6d5b9b8b0e8f0a6d/hammer-strength-logo.png', promo: 'HAM_FARMA_15', desc: 'Built for champions.' }
    ]
};

const ScratchCard = ({ promoCode, onComplete }) => {
    const canvasRef = useRef(null);
    const [isScratched, setIsScratched] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = '#333';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#444';
        for (let i = 0; i < 20; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, 20, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.font = 'bold 16px Outfit';
        ctx.fillStyle = '#FF1E1E';
        ctx.textAlign = 'center';
        ctx.fillText('SCRATCH HERE', width / 2, height / 2 + 5);

        let isDrawing = false;

        const scratch = (e) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            if (!clientX || !clientY) return;

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();

            const imageData = ctx.getImageData(0, 0, width, height);
            const pixels = imageData.data;
            let cleared = 0;
            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] === 0) cleared++;
            }
            if (cleared > (pixels.length / 4) * 0.6) {
                setIsScratched(true);
                onComplete?.();
            }
        };

        const handleStart = (e) => { isDrawing = true; scratch(e); };
        const handleEnd = () => isDrawing = false;

        canvas.addEventListener('mousedown', handleStart);
        canvas.addEventListener('mousemove', scratch);
        window.addEventListener('mouseup', handleEnd);
        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleStart(e); });
        canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e); });
        canvas.addEventListener('touchend', handleEnd);

        return () => {
            canvas.removeEventListener('mousedown', handleStart);
            canvas.removeEventListener('mousemove', scratch);
            window.removeEventListener('mouseup', handleEnd);
            canvas.removeEventListener('touchstart', handleStart);
            canvas.removeEventListener('touchmove', scratch);
            canvas.removeEventListener('touchend', handleEnd);
        };
    }, [promoCode]);

    return (
        <div className={css.scratchContainer}>
            <div className={css.promoRevealed}>{promoCode}</div>
            <canvas
                ref={canvasRef}
                width={200}
                height={80}
                className={`${css.canvas} ${isScratched ? css.faded : ''}`}
            />
        </div>
    );
};

const Partnership = () => {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
    const [selectedBrand, setSelectedBrand] = useState(null);

    return (
        <Section id="partnership" className={css.section}>
            <div className={css.container}>
                <h2 className={css.title}>Partnership for Goals</h2>

                <div className={css.categoryTabs}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`${css.tab} ${activeCategory === cat.id ? css.activeTab : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <div className={css.tabIcon}>{cat.icon}</div>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                <div className={css.brandGrid}>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className={css.gridWrapper}
                        >
                            {BRANDS[activeCategory].map((brand, index) => (
                                <motion.div
                                    key={brand.id}
                                    className={css.brandCard}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedBrand(brand)}
                                >
                                    <div className={css.logoWrapper}>
                                        <img src={brand.logo} alt={brand.name} className={css.brandLogo} />
                                    </div>
                                    <h3 className={css.brandName}>{brand.name}</h3>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {selectedBrand && (
                    <motion.div
                        className={css.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedBrand(null)}
                    >
                        <motion.div
                            className={css.modal}
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 20 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className={css.close} onClick={() => setSelectedBrand(null)}><X /></button>
                            <div className={css.modalLogoBox}>
                                <img src={selectedBrand.logo} alt={selectedBrand.name} className={css.modalLogo} />
                            </div>
                            <h2>{selectedBrand.name}</h2>
                            <p>{selectedBrand.desc}</p>
                            <div className={css.scratchLabel}>Scratch to reveal your promo code:</div>
                            <ScratchCard promoCode={selectedBrand.promo} />
                            <p className={css.hint}>Use this at checkout on our partner's store.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Partnership;
