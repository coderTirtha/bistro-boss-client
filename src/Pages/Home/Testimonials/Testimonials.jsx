import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import testimonial from '../../../assets/home/testimonial.svg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);
    return (
        <div>
            <SectionTitle heading={"Testimonials"} subHeading={"What Our Client Say"}></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className='mySwiper my-12 container mx-auto'>
                {
                    reviews.map(review => <SwiperSlide>
                        <div className='flex flex-col items-center text-center space-y-2 justify-center max-w-4xl mx-auto'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <img src={testimonial} alt="" />
                            <p>{review.details}</p>
                            <h1 className='text-2xl font-semibold text-[#CD9003]'>{review.name}</h1>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;