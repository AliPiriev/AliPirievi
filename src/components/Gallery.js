import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function Gallery(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const {slides, altText} = props;
  const slidesList = slides ? (slides.map(function(slide){
        return (
            <SwiperSlide key={slide}>
                <img src={slide} alt={altText}/>
            </SwiperSlide>
        )
    })) : '';
  return (
    <div className="gallery-wrap">
        <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={34}
            slidesPerView={3}
            navigation={true}
            direction={'vertical'}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="gallery-thumbs"
        >
           {slidesList}
        </Swiper>
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
