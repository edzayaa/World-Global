"use client"
import { MouseEvent, MouseEventHandler, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import { getPrevSection, getVerticalOffset } from '@/app/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import Text from '../shared_components/Text/Text';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import "./styles.css";
import { useViewportSize } from '@mantine/hooks';


gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
       name:"Sara Doe",
       url:"1",
       text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, corporis?",
       id:1
    },
        {
       name:"Jonh Doe",
       url:"2",
       text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, corporis?",
       id:2
    },
        {
       name:"Sasha Joe",
       url:"3",
       text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, corporis?",
       id:3
    },
        {
       name:"Jonh Doe",
       url:"4",
       text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, corporis?",
       id:4
    },
    {
       name:"Sara Doe",
       url:"1",
       text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, corporis?",
       id:5
    },
        {
       name:"Jonh Doe",
       url:"2",
       text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, corporis?",
       id:6
    },
        {
       name:"Sasha Joe",
       url:"3",
       text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, corporis?",
       id:7
    },
        {
       name:"Jonh Doe",
       url:"4",
       text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, corporis?",
       id:8
    },
]

const Section4 = () => {

    const containerRef = useRef(null);
    const swipperRef = useRef(null);
    const blackRef = useRef<HTMLDivElement>(null);

    const viewportSize = useViewportSize();
    const isMobile = viewportSize.width < 768;
    const isTablet = viewportSize.width < 1024 && viewportSize.width >= 768;

    let slidesPerView = 4

    if (isMobile) {
        slidesPerView = 1
    }

    if (isTablet) {
        slidesPerView = 2
    }

    useGSAP(() => {
        // Obtenemos una referencia al elemento que será nuestro 'pin' en la sección 1
        // para que la segunda animación empiece después de que el 'pin' de la primera termine.
        const prevSection = getPrevSection(undefined, containerRef.current);

        if (!prevSection) return;

        const prevSectionOffset = getVerticalOffset(prevSection) + prevSection.scrollHeight;
        const scrollDistance = 500; 

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: prevSectionOffset + scrollDistance,
                end: `+=${scrollDistance}`,
                once:true
                //pin: true,
            }
        });

        tl.fromTo(".section4 .enter_animation_up", {
            y: 75, 
            opacity: 0, 
       
        },
        {
            y: 0, 
            opacity: 1, 
            duration: 1,
            stagger:0.125
            
        },">").fromTo("#swipe-card_1, #swipe-card_2, #swipe-card_3, #swipe-card_4", {
            y: 75, 
            opacity: 0, 
       
        },
        {
            y: 0, 
            opacity: 1, 
            duration: 0.6,
            stagger:0.1
            
        },">")

    }, { scope: containerRef }); 

    const openCard = (id:string) =>{

        const target = blackRef.current?.querySelector(`#swipe-card_${id}`)
        if (!target) return;

        const child = target.children[0];
        child.classList.toggle("open");
    }

    return (
        <section ref={containerRef} className="section section4">
            <div  ref={blackRef} className="black_container">
                <Text variant='h2' color='white' extraClass='header_section4 enter_animation_up' fontSize='L'>
                What our clients say
                    
                </Text>
                <Text color='gray' extraClass='key_benefits enter_animation_up'  fontWeight='regular'>
                Snippets of client reviews emphasizing quality and reliability.
                </Text>
           
                <Swiper
                    ref={swipperRef}
                    draggable
                    spaceBetween={30}
                    scrollbar={{
                    hide: false,
                    }}
                    slidesPerView={ slidesPerView } 
                    modules={[Scrollbar]}
                    className="mySwiper swiper_section4"
                >
                        <>
                            {testimonials.map(({name, url, id, text}) => (
                            <SwiperSlide key={id}>
                                <div className="swipe-card" id={`swipe-card_${id}`} style={{backgroundImage:`url("/images/testimonials/${url}.png")`}}>
                                    <div onClick={ () => openCard(`${id}`)} className="card_blur"  >
                                            <Text color='white' fontSize='XS'>
                                                {name}
                                            </Text>
                                            <Text extraClass='hide-opacity' color='white'>
                                                {text}
                                            </Text>
                                            <svg className='svg_arrow' viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="26" cy="26" r="26" transform="matrix(1 0 0 -1 0 52)" fill="white"/>
                                                <path d="M16.7927 21C16.9957 21 17.1986 21.0711 17.3533 21.2144L26.0006 29.2277L34.6479 21.2156C34.9573 20.9289 35.4585 20.9289 35.7679 21.2156C36.0774 21.5023 36.0774 21.9667 35.7679 22.2534L26.56 30.785C26.2506 31.0717 25.7494 31.0717 25.44 30.785L16.2321 22.2534C15.9226 21.9667 15.9226 21.5023 16.2321 21.2156C16.3868 21.0711 16.5897 21 16.7927 21Z" fill="#696B36"/>
                                            </svg>
                                    </div>
                                </div>
                            </SwiperSlide>
                            ))}
                        </>
                </Swiper>
               <Text color='white' fontWeight='medium' style={{textAlign:'right', fontSize:"14px", width:"100%", marginTop:"20px", opacity:0.25}}>
                SCROLL OR DRAG
               </Text>

            </div>
        </section>
    );
};

export default Section4;

