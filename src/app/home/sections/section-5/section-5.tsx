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

export const Section5 = ({spacerRef}: {spacerRef: RefObject<HTMLElement|null>}) => {

    const internalRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const descriptionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!internalRef.current) return;
        animate();
    },[])

    function animate(){
        gsap.to(internalRef.current, {
            opacity: 1,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: "top 80%",
                end: "bottom bottom",
                scrub: true
            }
        });

        gsap.to(internalRef.current, {
            translateY: () => spacerRef.current!.offsetHeight * -1.4,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: "bottom bottom",
                end: "bottom top",
                scrub: true,

            }
        });

        gsap.fromTo(titleRef.current, { translateY: 150 }, {
            translateY: 0,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: "top 80%",
                end: "top 20%",
                scrub: true,
            }
        });

        gsap.fromTo(descriptionRef.current, { translateY: 150 }, {
            translateY: 0,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: "top 80%",
                end: "top 20%",
                scrub: true,
            }
        })


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
                    <ReviewsView spacerRef={spacerRef} />
                </div>
            </Card>

        </ViewSection>
    </>
}