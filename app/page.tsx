// En tu componente Home.js
"use client"
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother'; // Importa el plugin
import Section1 from "./components/Section1/Section1";
import Section2 from "./components/Section2/Section2";
import Navbar from './components/shared_components/Navbar/Navbar';
import NavbarMobile from './components/shared_components/NavbarMobile/NavbarMobile';
import { useViewportSize } from '@mantine/hooks';
import Section3 from './components/Section3/Section3';
import Section4 from './components/Section4/Section4';
import Section5 from './components/Section5/Section5';
import Section6 from './components/Section6/Section6';
import Footer from './components/Footer/Footer';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
    const viewportSize = useViewportSize();
    const isMobile = viewportSize.width < 768;


    const mainRef = useRef(null);
	const smootherWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to the top-left corner

    }, []);

	useGSAP(
		() => {

			// Inicializa ScrollSmoother
			if (!isMobile && mainRef.current && smootherWrapper.current ) {
                //@ts-expect-error ddd
                mainRef.current = ScrollSmoother.create({
                    wrapper: smootherWrapper.current,
                    content: mainRef.current,
                    smooth:1.5, // Puedes ajustar la suavidad (1 es un buen valor inicial)
                    effects: true // Habilita efectos como parallax
                });
			}
  
		},
		{
			dependencies: [ isMobile],
			//scope: header,
		},
	);

    return (
        <>
        {isMobile?<NavbarMobile/>:  <Navbar/>}
        <div id="smooth-wrapper" ref={smootherWrapper}>
            <div id="smooth-content" ref={mainRef}>  
                <Section1 />
                <Section2 />
                <Section3/>
                <Section4/>
                <Section5/>
                <Footer/>
            </div>
        </div>
        </>

    );
}