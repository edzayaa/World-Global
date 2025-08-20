"use client"
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

// Función para calcular el offset vertical
const getVerticalOffset = (element) => {
    if (!element) return 0;
    return element.getBoundingClientRect().top + window.scrollY;
};

// Función para obtener la sección anterior
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

const Section2B = () => {
    const containerRef = useRef(null);
    const first = useRef(null);
    const second = useRef(null);

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
        <section ref={containerRef} className="section section2B">
            <h2 ref={first}>TEXTO ENTRANDO POR ARRIBA</h2>
            <h3 ref={second}>TEXTO ENTRANDO POR DEBAJO</h3>
        </section>
    );
};

export default Section2B;