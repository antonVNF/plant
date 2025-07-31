import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import img from '../assets/img/slide-plant.png';
import 'swiper/css';
import 'swiper/css/pagination';

const Slider = () => {
  return (
    <div className="slider">
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}>
        <SwiperSlide>
          <div className="slide">
            <div className="slide__info">
              <h5 className="slide__welcome">Welcome to GreenShop</h5>
              <h2 className="slide__title">
                Let’s Make a Better <span>Planet</span>
              </h2>
              <p className="slide__text">
                We are an online plant shop offering a wide range of cheap and trendy plants. Use
                our plants to create an unique Urban Jungle. Order your favorite plants!
              </p>
              <button className="slide__button button">SHOP NOW</button>
            </div>
            <img src={img} alt="" className="slide__img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
            <div className="slide__info">
              <h5 className="slide__welcome">Welcome to GreenShop</h5>
              <h2 className="slide__title">
                Let’s Make a Better <span>Planet</span>
              </h2>
              <p className="slide__text">
                We are an online plant shop offering a wide range of cheap and trendy plants. Use
                our plants to create an unique Urban Jungle. Order your favorite plants!
              </p>
              <button className="slide__button button">SHOP NOW</button>
            </div>
            <img src={img} alt="" className="slide__img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
            <div className="slide__info">
              <h5 className="slide__welcome">Welcome to GreenShop</h5>
              <h2 className="slide__title">
                Let’s Make a Better <span>Planet</span>
              </h2>
              <p className="slide__text">
                We are an online plant shop offering a wide range of cheap and trendy plants. Use
                our plants to create an unique Urban Jungle. Order your favorite plants!
              </p>
              <button className="slide__button button">SHOP NOW</button>
            </div>
            <img src={img} alt="" className="slide__img" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
