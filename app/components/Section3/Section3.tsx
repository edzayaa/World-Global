"use client"
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import "./styles.css";
import { getPrevSection, getVerticalOffset } from '@/app/utils';
import Text from '../shared_components/Text/Text';
import Bottom from '../shared_components/Bottom/Bottom';
import Image from 'next/image';
import { useViewportSize } from '@mantine/hooks';

gsap.registerPlugin(ScrollTrigger);

// const screenWidth = window.screen.width;
// console.log("Screen Width:", screenWidth);


//console.log("Viewport Width:", viewportWidth);


const Section3 = () => {
    const containerRef = useRef(null);
    const first = useRef(null);
    const second = useRef(null);

       const viewportSize = useViewportSize();
    const isMobile = viewportSize.width < 768;

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
                start: prevSectionOffset + scrollDistance + 300,
            }
        });

        tl.fromTo(".planet_image", {
            rotate:"-45deg", 
            ease:'power4.in'
            //duration: 1
        },
        {
            rotate:0, 
            duration: 0.8
        });

        tl.fromTo(".yellow_marker", {
          
            opacity: 0, 
            scale:0,
         
        },{
            ease:'bounce.in',
            opacity:1, 
            scale:1,
            duration: 1
        }, "<").fromTo(`${isMobile? ".label_marker":'.label_animation'}`, {
          
            opacity: 0, 
            y:10,
         
        },{
            opacity: 1, 
            y:0,
            duration: 1
        }, "<"); 
    }, { scope: containerRef }); 

    return (
        <section ref={containerRef} className="section section3">
            <Text variant='h2' extraClass='header_section3' fontSize='L'>
                {isMobile ? <><>Eco-Friendly roofing<br/> solutions for a<br/> sustainable future</></> :<>Eco-Friendly roofing solutions<br/> for a sustainable future</>}
                
            </Text>
            <Text extraClass='key_benefits enter_animation'  fontWeight='regular'>
                Key benefits such as reduced environmental impact, fire resistance and UV resistant.
            </Text>
            <Bottom  borderColor='dark-border' bgColor='white' bgArrowColor='yellow'>
                Learn about our technology
            </Bottom>
            <div className="planet_container">
                <img src={isMobile?"/images/planet_mobile.png" :"/images/planet_mobile.png"} className='planet_image'  alt='planet image'/>
                
                <div className="yellow_marker marker_1"></div>
                <div className="yellow_marker marker_2"></div>
                <div className="yellow_marker marker_3"></div>
                <div className="yellow_marker marker_4"></div>
                <div className="yellow_marker marker_5"></div>
                <div className="yellow_marker marker_6"></div>

                <div className="label_marker label_2 label_animation">
                    <span>eco-friendlys resorts</span>
                </div>
                <div className="label_marker label_4 label_animation">
                     <span>sustainable homes</span>
                </div>
                <div className="label_marker label_5">
                   
                    <span>atraction park</span>
                </div>
                <div className="label_marker label_6">
                    <span>fire resistant for cruise ship<br/> like eco-friendly resort</span>
                </div>
            </div>
            
        </section>
    );
};

export default Section3;