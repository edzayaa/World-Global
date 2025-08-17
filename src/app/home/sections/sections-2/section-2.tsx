'use client';
import style from './section-2.module.scss';
import { forwardRef, RefObject, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ViewSection } from '@/shared/components/view-sections/view-sections';
import { OnScrollInFn } from '@/shared/components/animated-container/libs/OnScrollFn';
import { InFromTop } from '@/shared/components/animated-container/libs/Animations';
import { Icon } from '@/shared/components/icon/icon';
import gsap from 'gsap';
import { title } from 'process';

export const Section2 = forwardRef<HTMLDivElement | null >((props, ref) => {

    const internalRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const featuresRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            
        animate();
    }, []);
    
    function animate(){

        const tlStart = gsap.timeline({
            scrollTrigger: {
                trigger: internalRef.current,
                scroller: document.querySelector(`html`),
                start: "top top",
                end: "+=140%",
                pin: true,
                scrub: true,                                                
                
                
            }
        }).fromTo(internalRef.current, {
            opacity: 0,
        }, {opacity: 1})
        .fromTo(titleRef.current, 
            {
                translateY: -100
            },
            {
                translateY: 0,
            },
            "<"

        ).fromTo(featuresRef.current, 
            {
                translateY: 100
            },
            {
                translateY: 0,
            }, "<"
        )
        .to({}, {duration: 1})
        .to(internalRef.current, {
            opacity: 0,
        }, ">")
        .to([titleRef.current!, featuresRef.current!], {
            translateY: -500,
        }, "<")

    }

    useImperativeHandle(ref, () => internalRef.current!);


    return (
        <ViewSection ref={internalRef}>
            <div className={`section-2-wrapper ${style['section-2']}`} ref={sectionRef}>
                <div className="title-container" ref={titleRef}>
                    <div  className='overview' >
                        <span>Overview</span>
                    </div>
                    <div  className='title' >
                        <h1>Why This Roofing is The Best Choice </h1>
                    </div>
                    <div  className='description' >
                        <p>The most realistic synthetic roofing, blending seamlessly with nature.</p>
                    </div>
                </div>
                <div className="features-list" ref={featuresRef}>
                    <div className='feature-wrapper' >
                        <div className="feature-item">
                            <Icon icon='bamboo' color={{color: 'green'}} />
                        </div>
                        <span>Realistic Aesthetic</span>
                    </div>
                    <div  >
                        <div className="spacer"></div>
                    </div>
                    <div className='feature-wrapper'   >
                        <div className="feature-item">
                            <Icon icon='planet-nature' color={{color: 'green'}} />
                        </div>
                        <span>Eco-Friendly & Recyclable</span>
                    </div>
                    <div   >
                        <div className="spacer"></div>
                    </div>
                    <div className='feature-wrapper'   >
                        <div className="feature-item">
                            <Icon icon='shield' color={{color: 'green'}} />
                        </div>
                        <span>Durability Against Wind & Fire</span>
                    </div>

                </div>
            </div>
        </ViewSection>
    )

})