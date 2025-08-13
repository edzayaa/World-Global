'use client';
import { AnimatedContainer } from '@/shared/components/animated-container/animated-container';
import style from './section-2.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ViewSection } from '@/shared/components/view-sections/view-sections';
import { OnScrollInFn } from '@/shared/components/animated-container/libs/OnScrollFn';
import { InFromTop } from '@/shared/components/animated-container/libs/Animations';
import { Icon } from '@/shared/components/icon/icon';

export const Section2 = () => {

    const internalRef = useRef<HTMLDivElement>(null);
    const [signalInView, setSignalInView] = useState(false);
    const delayStep = 300;

    useEffect(() => {
        OnScrollInFn(internalRef.current!, () => setSignalInView(true), {threshold: 0.5});
    });

    return (
        <ViewSection>
            <div className={`section-2-wrapper ${style['section-2']}`} ref={internalRef}>
                <AnimatedContainer animationIn={InFromTop} className='overview' inSignal={signalInView} delay={delayStep * 0}>
                    <span>Overview</span>
                </AnimatedContainer>
                <AnimatedContainer animationIn={InFromTop} className='title' inSignal={signalInView} delay={delayStep * 1}>
                    <h1>Why This Roofing Is The Best Choice </h1>
                </AnimatedContainer>
                <AnimatedContainer animationIn={InFromTop} className='description' inSignal={signalInView} delay={delayStep * 2}>
                    <p>The most realistic synthetic roofing, blending seamlessly with nature.</p>
                </AnimatedContainer>
                <AnimatedContainer className='feature-wrapper' animationIn={InFromTop}  inSignal={signalInView} delay={delayStep * 3} >
                    <div className="feature-item">
                        <Icon icon='bamboo' color={{color: 'green'}} />
                    </div>
                    <span>Realistic Aesthetic</span>
                </AnimatedContainer>
                <AnimatedContainer animationIn={InFromTop} inSignal={signalInView} delay={delayStep * 3} >
                    <div className="spacer"></div>
                </AnimatedContainer>
                <AnimatedContainer className='feature-wrapper' animationIn={InFromTop}  inSignal={signalInView} delay={delayStep * 4} >
                    <div className="feature-item">
                        <Icon icon='planet-nature' color={{color: 'green'}} />
                    </div>
                    <span>Eco-Friendly & Recyclable</span>
                </AnimatedContainer>
                <AnimatedContainer animationIn={InFromTop} inSignal={signalInView} delay={delayStep * 4} >
                    <div className="spacer"></div>
                </AnimatedContainer>
                <AnimatedContainer className='feature-wrapper' animationIn={InFromTop}  inSignal={signalInView} delay={delayStep * 5} >
                    <div className="feature-item">
                        <Icon icon='shield' color={{color: 'green'}} />
                    </div>
                    <span>Durability Against Wind & Fire</span>
                </AnimatedContainer>
            </div>
        </ViewSection>
    )

}