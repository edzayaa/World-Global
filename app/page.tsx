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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
    const viewportSize = useViewportSize();
    const isMobile = viewportSize.width < 768;

    const smoother = useRef(null);
    const mainRef = useRef(null);

    useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to the top-left corner

        if (isMobile) return;
        // Asegúrate de que los elementos existen antes de inicializar
        if (mainRef.current) {
            // Crea una instancia de ScrollSmoother
             //@ts-expect-error development
            smoother.current = ScrollSmoother.create({
                content: mainRef.current,
                smooth: 1.5, // Puedes ajustar la suavidad (1 es un buen valor inicial)
                effects: true // Habilita efectos como parallax
            });
        }

        // Limpieza: destruye la instancia al desmontar el componente
        return () => {
            if (smoother.current) {
                 //@ts-expect-error development
                smoother.current.kill();
            }
        };
    }, []);

    return (
        <>
        {isMobile?<NavbarMobile/>:  <Navbar/>}
        <div id="smooth-wrapper">
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