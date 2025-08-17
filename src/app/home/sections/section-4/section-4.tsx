'use client';

import { ViewSection } from '@/shared/components/view-sections/view-sections';
import style from './section-4.module.scss';
import { AnimatedContainer } from '@/shared/components/animated-container/animated-container';
import { forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import { OnScrollInFn } from '@/shared/components/animated-container/libs/OnScrollFn';
import { InFromTop } from '@/shared/components/animated-container/libs/Animations';
import { Button } from '@/shared/components/button/button';
import { Icon } from '@/shared/components/icon/icon';
import gsap from 'gsap';
import { PlanetComponent } from './planet/planet.component';
import { title } from 'process';

export const Section4 = forwardRef<HTMLDivElement | null, {spacerRef: RefObject<HTMLDivElement | null>}>(({spacerRef}, ref) => {

    const [inView, setInView] = useState(false);
    const internalRef = useRef<HTMLDivElement | null>(null);

    const titleRef = useRef<HTMLDivElement | null>(null);
    const descriptionRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!internalRef.current) return;
        animate();
    }, []);

    function animate(){
         gsap.to(internalRef.current, {
            opacity: 1,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: "top 80%",
                end: "top 20%",                    
                scrub: true,
                          
            }
        });

        gsap.to(internalRef.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: "bottom 80%",
                end: "bottom top",
                scrub: true,                    
            }
        });

        gsap.fromTo(titleRef.current, {
            translateY: -200,
        },{
            translateY: 0,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: "top 80%",
                end: "top 20%",
                scrub: true,
            }
        })
        gsap.fromTo(descriptionRef.current, {
            translateY: -100,
        },{
            translateY: 0,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: "top 80%",
                end: "top 20%",
                scrub: true,
            }
        })
        gsap.fromTo(buttonRef.current, {
            translateY: -50,
        },{
            translateY: 0,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: "top 80%",
                end: "top 20%",
                scrub: true,
            }
        })

        gsap.to(titleRef.current, {
            opacity: 0,
            translateY: -200,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: 'top top',
                end: '+=15%',
                scrub: true,
            }
        })
        gsap.to(descriptionRef.current, {
            opacity: 0,
            translateY: -100,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: 'top top',
                end: '+=15%',
                scrub: true,
            }
        })
        gsap.to(buttonRef.current, {
            opacity: 0,
            translateY: -50,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: 'top top',
                end: '+=15%',
                scrub: true,
            }
        })
        
    }

    return <>
        <ViewSection ref={internalRef} className={style['section-4']}>
            <div className='title' ref={titleRef}>
                <h1>Eco-Friendly Roofing Solutions For a Sustainable Future</h1>
            </div>
            <div className='description' ref={descriptionRef}>
                <p>Key benefits such as reduced environmental impact, fire resistance, and pest deterrence.</p>
            </div>
            <div  ref={buttonRef}>
                <Button border color={{color: 'white', alpha: '100'}}  borderColor={{color: 'green', alpha: '100'}} >
                    <span>Learn about our technology</span>
                    <Button circle color={{color: 'green', alpha: '100'}}>
                        <Icon icon={'arrow-right-with-tail'} ></Icon>
                    </Button>
                </Button>
            </div>
            <PlanetComponent spacerRef={spacerRef} />
        </ViewSection>

    </>

})