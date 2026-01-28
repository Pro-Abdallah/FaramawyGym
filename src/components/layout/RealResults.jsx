import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Section from '../ui/Section';
import SliderComparison from '../ui/SliderComparison';
import css from './RealResults.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const transformations = [
    {
        name: 'James T.',
        quote: '"I didn\'t just lose weight. I found my discipline."',
        before: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1470&auto=format&fit=crop'
    },
    {
        name: 'Sarah L.',
        quote: '"6 months of coaching changed everything."',
        before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=1287&auto=format&fit=crop'
    },
    {
        name: 'Michael R.',
        quote: '"From skinny to strong. Best decision ever."',
        before: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1470&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop'
    },
    {
        name: 'Emily W.',
        quote: '"Confidence restored. Thank you FarmFit!"',
        before: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1470&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1574680096141-1cddd32e01f5?q=80&w=1470&auto=format&fit=crop'
    },
    {
        name: 'David K.',
        quote: '"The plans are easy to follow and effective."',
        before: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1470&auto=format&fit=crop'
    }
];

const RealResults = () => {
    const { t } = useTranslation();

    return (
        <Section id="results" className={css.section}>
            <div className={css.container}>
                <motion.h2
                    className={css.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {t('results.title')}
                </motion.h2>

                <div className={css.swiperWrapper}>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                        }}
                        className={css.swiperContainer}
                    >
                        {transformations.map((transformation, index) => (
                            <SwiperSlide key={index} className={css.slide}>
                                <SliderComparison
                                    transformation={transformation}
                                    index={index}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </Section>
    );
};

export default RealResults;
