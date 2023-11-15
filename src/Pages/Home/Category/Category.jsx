import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

// images
import slide1 from '../../../assets/home/slide1.jpg';
import slide2 from '../../../assets/home/slide2.jpg';
import slide3 from '../../../assets/home/slide3.jpg';
import slide4 from '../../../assets/home/slide4.jpg';
import slide5 from '../../../assets/home/slide5.jpg';

const Category = () => {
    return (
        <div className='my-12 container mx-auto'>
            <div className='max-w-md mx-auto my-8'>
                <h3 className='text-[#D99904] text-center text-xl italic border-b-2 border-b-gray-200 py-4'>---From 11:00am to 10:00pm---</h3>
                <h1 className='text-center text-4xl font-bold border-b-2 border-b-gray-200 py-4'>Order Online</h1>
            </div>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={
                    {
                        clickable: true
                    }
                }
                modules={[Pagination]}
                className='mySwiper'
            >
                <SwiperSlide>
                    <img src={slide1} alt="" />
                    <p className='uppercase text-center text-white text-2xl transform -translate-y-10'>Salads</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="" />
                    <p className='uppercase text-center text-white text-2xl transform -translate-y-10'>Pizzas</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide3} alt="" />
                    <p className='uppercase text-center text-white text-2xl transform -translate-y-10'>Soups</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide4} alt="" />
                    <p className='uppercase text-center text-white text-2xl transform -translate-y-10'>Desserts</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt="" />
                    <p className='uppercase text-center text-white text-2xl transform -translate-y-10'>Salads</p>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Category;