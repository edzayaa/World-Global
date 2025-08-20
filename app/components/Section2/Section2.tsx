"use client"
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import "./styles.css";
import SVGAnimation from '../Section1/SVGAnimation';

gsap.registerPlugin(ScrollTrigger);

// Función para calcular el offset vertical
 //@ts-expect-error development
const getVerticalOffset = (element) => {
    if (!element) return 0;
    return element.getBoundingClientRect().top + window.scrollY;
};

// Función para obtener la sección anterior
 //@ts-expect-error development
const getPrevSection = (prevSectionClass, currentSectionElement) => {
    if (prevSectionClass) {
        const prevSection = document.querySelector(prevSectionClass);
        if (prevSection) {
            return prevSection;
        }
    }
    if (currentSectionElement && currentSectionElement.previousElementSibling) {
        return currentSectionElement.previousElementSibling;
    }
    return null;
};

const Section2 = () => {
    const containerRef = useRef(null);
    const first = useRef(null);
    const second = useRef(null);

    useGSAP(() => {
        // Obtenemos la sección anterior de forma dinámica.
        // Puedes pasar 'null' o dejarlo vacío para que busque el hermano anterior.
        const prevSection = getPrevSection(undefined, containerRef.current);

        if (!prevSection) return;

        const prevSectionOffset = getVerticalOffset(prevSection) + prevSection.scrollHeight;
        const scrollDistance = 500; 

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: prevSectionOffset + scrollDistance,
                end: `+=${scrollDistance}`,
                scrub: 1,
                //pin: true,
            }
        });

        tl.from(first.current, {
            y: -100, 
            opacity: 0, 
            duration: 1
        });

        tl.from(second.current, {
            y: 100, 
            opacity: 0, 
            duration: 1
        }, "<"); 
    }, { scope: containerRef }); 

    return (
        <section ref={containerRef} className="section section2">
            <h2 ref={first}>TEXTO ENTRANDO POR ARRIBA</h2>
            <h3 ref={second}>TEXTO ENTRANDO POR DEBAJO</h3>
        </section>
    );
};

export default Section2;