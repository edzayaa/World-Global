// En tu componente Home.js
"use client"
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother'; // Importa el plugin
import Section1 from "./components/Section1/Section1";
import Section2 from "./components/Section2/Section2";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
    const smoother = useRef(null);
    const mainRef = useRef(null);

    useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to the top-left corner
        // Asegúrate de que los elementos existen antes de inicializar
        if (mainRef.current) {
            // Crea una instancia de ScrollSmoother
            smoother.current = ScrollSmoother.create({
                content: mainRef.current,
                smooth: 1, // Puedes ajustar la suavidad (1 es un buen valor inicial)
                effects: true // Habilita efectos como parallax
            });
        }

        // Limpieza: destruye la instancia al desmontar el componente
        return () => {
            if (smoother.current) {
                smoother.current.kill();
            }
        };
    }, []);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content" ref={mainRef}>
                <Section1 />
                <Section2 />
            </div>
        </div>
    );
}