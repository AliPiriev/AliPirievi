import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


import { FreeMode, Navigation, Thumbs } from "swiper";

export default function Gallery(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { slides, altText } = props;
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);
    const slidesList = slides ? (slides.map(function (slide) {
        return (
            <SwiperSlide key={slide}>
                <img src={slide} alt={altText} />
            </SwiperSlide>
        )
    })) : '';
    return (
        <div className="gallery-wrap">
            <div className="gallery-thumbs-wrap">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={34}
                    slidesPerView={3}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = navigationPrevRef.current;
                        swiper.params.navigation.nextEl = navigationNextRef.current;
                    }}
                    direction={'vertical'}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="gallery-thumbs"
                >
                    {slidesList}
                </Swiper>
                <div ref={navigationPrevRef} className="swiper-btn prev" >
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066" stroke="white" />
                    </svg>

                </div>
                <div ref={navigationNextRef} className="swiper-btn next" >
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white" />
                    </svg>
                </div>
            </div>
            <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                className="gallery"
            >
                {slidesList}
            </Swiper>
        </div>
    );
}
