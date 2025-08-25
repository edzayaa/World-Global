import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import "./styles.css";
// import required modules
import { Navigation } from 'swiper/modules';
import { useViewportSize } from '@mantine/hooks';
import Image from 'next/image';
import Text from '../shared_components/Text/Text';
import ContactForm from './ContactForm/ContactForm';


const carouselImages = [
    "/images/products/1.png",
    "/images/products/2.png",
    "/images/products/3.png",
    "/images/products/1.png",
    "/images/products/2.png",
    "/images/products/3.png",
]

const Section5 = () => {

    const viewportSize = useViewportSize();
    const isMobile = viewportSize.width < 768;

    let slidesPerView = 2.5

    if (isMobile) {
        slidesPerView = 1
    }



    return (
        <section  className="section section5">
            <Swiper centeredSlides slidesPerView={slidesPerView} initialSlide={2} spaceBetween={30} grabCursor navigation={true} modules={[Navigation]} className="mySwiper mySwiper_section5">
                {carouselImages.map((item, index) => (
                   <SwiperSlide key={index}>
                    <img src={item}  alt='image product'  />
                   </SwiperSlide>
                ))}
            </Swiper>
            <img className='contact_banner' src={"/images/home.png"}  alt='our work'/>
            <div className="contact_container">
                <div className="text_box">
                    <div className="upper_text">
                    <Text fontSize='XXL' variant='h2'>
                        Get in touch<br/>with WorldGD
                    </Text>
                    <Text className='have_a_question' fontWeight='medium' >Have a question or need assistance? Contact us and our team at WorldGD will get back to you as soon as possible.</Text>
                    </div>
                   <a className='email' type="" target='_blank' rel="noopener noreferrer" href="mailto:hello@worldgd.com">
                        <Text fontWeight='medium' fontSize='S'>
                        hello@worldgd.com
                        </Text>

                    </a>
                   
                </div>
                <ContactForm/>
            </div>
        </section>
    );
};

export default Section5;