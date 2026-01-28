import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import ReelCard from '../ui/ReelCard';
import css from './Reels.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reelsData = [
    {
        id: 1,
        titleKey: 'reel_1',
        views: '12K',
        videoId: 'jc_tHx9UZMo',
    },
    {
        id: 2,
        titleKey: 'reel_2',
        views: '8.5K',
        videoId: '79INBvGPxdw',
    },
    {
        id: 3,
        titleKey: 'reel_3',
        views: '15K',
        videoId: 'q1niWiF2Q9E',
    },
    {
        id: 4,
        titleKey: 'reel_4',
        views: '20K',
        videoId: 'tpks7Tcgcns',
    },
    {
        id: 5,
        titleKey: 'reel_5',
        views: '9K',
        videoId: '5Nj_7wdCJhI',
    },
    {
        id: 6,
        titleKey: 'reel_6',
        views: '18K',
        videoId: 'zfJL9FRikeM',
    },
    {
        id: 7,
        titleKey: 'reel_7',
        views: '11K',
        videoId: '77Qj6q8ffqk',
    },
    {
        id: 8,
        titleKey: 'reel_8',
        views: '22K',
        videoId: '3zFI3yAyktA',
    },
    {
        id: 9,
        titleKey: 'reel_9',
        views: '7K',
        videoId: 'WsTvwmbOGD0',
    },
    {
        id: 10,
        titleKey: 'reel_10',
        views: '10K',
        videoId: '9mDj7cfaZOw',
    },
];

const Reels = () => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const [selectedReel, setSelectedReel] = React.useState(null);
    const [swiperInstance, setSwiperInstance] = React.useState(null);

    React.useEffect(() => {
        if (swiperInstance && swiperInstance.autoplay) {
            if (selectedReel) {
                swiperInstance.autoplay.stop();
            } else {
                swiperInstance.autoplay.start();
            }
        }
    }, [selectedReel, swiperInstance]);

    const getThumbnail = (videoId) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <Section id="reels" className={css.section}>
            <div className={css.container}>
                <motion.h2
                    className={css.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {t('reels.title')}
                </motion.h2>

                <Swiper
                    key={i18n.language}
                    dir={isRtl ? 'rtl' : 'ltr'}
                    onSwiper={setSwiperInstance}
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    speed={8000} // Slower continuous speed
                    allowTouchMove={false} // Disable swiping
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1400: {
                            slidesPerView: 4,
                        },
                    }}
                    className={css.swiperContainer}
                >
                    {reelsData.map((reel, index) => (
                        <SwiperSlide key={reel.id}>
                            <ReelCard
                                reel={{
                                    ...reel,
                                    title: t(`reels.video_titles.${reel.titleKey}`),
                                    thumbnail: getThumbnail(reel.videoId)
                                }}
                                index={index}
                                onClick={() => setSelectedReel(reel)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedReel && (
                    <motion.div
                        className={css.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedReel(null)}
                    >
                        <motion.div
                            className={css.modalContent}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={css.closeButton}
                                onClick={() => setSelectedReel(null)}
                            >
                                ✕
                            </button>

                            <div className={css.iframeContainer}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedReel.videoId}?autoplay=1&rel=0`}
                                    title={t(`reels.video_titles.${selectedReel.titleKey}`)}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className={css.modalVideo}
                                ></iframe>
                            </div>

                            <div className={css.infoOverlay}>
                                <h2>{t(`reels.video_titles.${selectedReel.titleKey}`)}</h2>
                                <p>👀 {selectedReel.views}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Reels;
