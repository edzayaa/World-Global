'use client';

import { ViewSection } from '@/shared/components/view-sections/view-sections';
import style from './section-5.module.scss';
import { AnimatedContainer } from '@/shared/components/animated-container/animated-container';
import { RefObject, useEffect, useRef, useState } from 'react';
import { OnScrollInFn } from '@/shared/components/animated-container/libs/OnScrollFn';
import { InFromTop } from '@/shared/components/animated-container/libs/Animations';
import { ReviewsView } from './reviews-view/reviews-view';
import { Card } from '@/shared/components/card/card';
import gsap from 'gsap';

export const Section5 = () => {

    const internalRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const descriptionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!internalRef.current) return;
        animate();
    },[])

    function animate(){

        gsap.timeline({
            scrollTrigger: {
                trigger: internalRef.current,
                scroller: document.querySelector(`html`),
                start: "top top",
                end: "+=120%",
                pin: true,
                scrub: true,
                
                
            }
        })
        .to(internalRef.current, {
            opacity: 1,
        })
        .to({}, {duration: 2})
        .fromTo(titleRef.current, { translateY: 150 }, {
            translateY: 0,            
        }, "<")
        .fromTo(descriptionRef.current, { translateY: 150 }, {
            translateY: 0,
        }, "<")


    }

    return <>
        <ViewSection ref={internalRef} padding>
            <Card color={{color: 'black', alpha: '100'}}  className={style['section-5']}>
                <div  className='title' ref={titleRef}>
                    <h1>What our clients say</h1>
                </div>
                <div  className='description' ref={descriptionRef}>
                    <p>Snippets of clients reviews emphasizing quality and reliability.</p>
                </div>
                <div  className='reviews-container'>
                    <ReviewsView spacerRef={internalRef} />
                </div>
            </Card>

        </ViewSection>
    </>
}