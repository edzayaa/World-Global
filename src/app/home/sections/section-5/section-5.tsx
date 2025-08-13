'use client';

import { ViewSection } from '@/shared/components/view-sections/view-sections';
import style from './section-5.module.scss';
import { AnimatedContainer } from '@/shared/components/animated-container/animated-container';
import { useEffect, useRef, useState } from 'react';
import { OnScrollInFn } from '@/shared/components/animated-container/libs/OnScrollFn';
import { InFromTop } from '@/shared/components/animated-container/libs/Animations';
import { ReviewsView } from './reviews-view/reviews-view';
import { Card } from '@/shared/components/card/card';

export const Section5 = () => {

    const internalRef = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);
    const delayStep = 300;

    useEffect(() => {
        if(!internalRef.current) return;

        OnScrollInFn(internalRef.current!, () => { setInView(true); }, { threshold: 0.2 });
    },[])

    return <>
        <ViewSection ref={internalRef} padding>
            <Card color={{color: 'black', alpha: '100'}}  className={style['section-5']}>
                <AnimatedContainer inSignal={inView} delay={delayStep * 1} animationIn={InFromTop} className='title'>
                    <h1>What our clients say</h1>
                </AnimatedContainer>
                <AnimatedContainer inSignal={inView} delay={delayStep * 2} animationIn={InFromTop} className='description'>
                    <p>Snippets of clients reviews emphasizing quality and reliability.</p>
                </AnimatedContainer>
                <AnimatedContainer inSignal={inView} delay={delayStep * 3} animationIn={InFromTop} className='reviews-container'>
                    <ReviewsView />
                </AnimatedContainer>
            </Card>

        </ViewSection>
    </>
}