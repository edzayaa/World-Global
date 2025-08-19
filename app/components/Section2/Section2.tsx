"use client"
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
    const containerRef = useRef(null);
    const first = useRef(null);
    const second = useRef(null);

    useGSAP(() => {
        // Obtenemos una referencia al elemento que será nuestro 'pin' en la sección 1
        // para que la segunda animación empiece después de que el 'pin' de la primera termine.
        const prevSection = document.querySelector('.scroll-container');

        if (!prevSection) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                // El trigger es la misma sección, pero el 'start' se ajusta
                trigger: ".section2", 
                // La animación comienza cuando el top del 'trigger' es 200px desde el final del 'pin' del section1
                start: prevSection.scrollHeight + 200, 
                // La animación termina cuando el top del 'trigger' es 200px desde el final del 'pin' del section1
                end: prevSection.scrollHeight + 200, 
                scrub: 1, 
                once:true
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