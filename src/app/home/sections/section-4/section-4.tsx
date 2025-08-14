'use client';

import { ViewSection } from '@/shared/components/view-sections/view-sections';
import style from './section-4.module.scss';
import { AnimatedContainer } from '@/shared/components/animated-container/animated-container';
import { useEffect, useRef, useState } from 'react';
import { OnScrollInFn } from '@/shared/components/animated-container/libs/OnScrollFn';
import { InFromTop } from '@/shared/components/animated-container/libs/Animations';
import { Button } from '@/shared/components/button/button';
import { Icon } from '@/shared/components/icon/icon';
import { PlanetComponent } from './planet/planet.component';

export const Section4 = () => {

    const [inView, setInView] = useState(false);
    const internalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!internalRef.current) return;
        OnScrollInFn(internalRef.current!, () => {setInView(true)}, {threshold: 0.5})
    }, []);

    const delayStep = 300;

    return <>
        <ViewSection ref={internalRef} className={style['section-4']}>
            <AnimatedContainer className='title' inSignal={inView} animationIn={InFromTop} delay={delayStep * 1}>
                <h1>Eco-Friendly Roofing Solutions For a Sustainable Future</h1>
            </AnimatedContainer>
            <AnimatedContainer className='description' inSignal={inView} animationIn={InFromTop} delay={delayStep * 2}>
                <p>Key benefits such as reduced environmental impact, fire resistance, and pest deterrence.</p>
            </AnimatedContainer>
            <AnimatedContainer inSignal={inView} animationIn={InFromTop} delay={delayStep * 3} >
                <Button border color={{color: 'white', alpha: '100'}}  borderColor={{color: 'green', alpha: '100'}} >
                    <span>Learn about our technology</span>
                    <Button circle color={{color: 'green', alpha: '100'}}>
                        <Icon icon={'arrow-right-with-tail'} ></Icon>
                    </Button>
                </Button>
            </AnimatedContainer>
            <PlanetComponent/>
        </ViewSection>

    </>

}