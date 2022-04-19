import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Navigation } from "swiper";

export default function SmallGallery(props) {
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
            spaceBetween={10}
            slidesPerView={1}
            modules={[FreeMode, Navigation]}
            navigation={true}
            className="small-gallery"
        >
            {slidesList}
        </Swiper>
    </div>
  );
}
