'use client'

import { ViewSection } from "@/shared/components/view-sections/view-sections";
import styles from "./section-1.module.scss";
import { Card } from "@/shared/components/card/card";
import { Icon } from "@/shared/components/icon/icon";
import { Button } from "@/shared/components/button/button";
import { AnimatedContainer } from "@/shared/components/animated-container/animated-container";
import { forwardRef, RefObject, useEffect, useImperativeHandle, useRef, useState } from "react";
import { InFromLeft, InFromRight, InFromTop } from "@/shared/components/animated-container/libs/Animations";
import gsap from "gsap";
import { ItemSvg } from "./svg-item/svg-item";
import { useRouter } from "next/router";
export const Section1 = forwardRef((props, ref) => {

    const [signalInView, setSignalInView] = useState(false);
    const internalRef = useRef<HTMLDivElement>(null);
    const bgSectionRef = useRef<HTMLDivElement>(null);

    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('loader-hidden', () => {
            setSignalInView(true);
        });
        animateOut();
    }, []);

    function animateOut(){

         gsap.to(internalRef.current, {
            opacity: 1,
            scrollTrigger: {
                trigger: internalRef.current,
                scroller: document.querySelector(`html`),
                start: "top 80%",
                end: "top 20%",                    
                scrub: true,
                
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: internalRef.current,
                scroller: document.querySelector(`html`),
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: true,             
                pinSpacing: false   
            }
        })
        .to(bgSectionRef.current, {
            opacity: 0,
            y: 30,
            x: -30,
        })
        .to(titleRef.current,
            {
                opacity: 0,
                y: -50,
            }, "<"
        )
        .to(cardRef.current,
            {
                opacity: 0,
                x: 50,
            }, "<"
        );

    }


    useImperativeHandle(ref, () => internalRef.current)

    return (
        <ViewSection className={styles["section-1"]} padding  ref={internalRef}>
            <div className="section-1-wrapper" >
                <div className="bg-wrapper" ref={bgSectionRef}>
                    <ItemSvg signalStart={signalInView} />
                </div>
                <div className="content">
                    <AnimatedContainer className="title" inSignal={signalInView} animationIn={InFromTop} delay={100} >
                        <h1 ref={titleRef}>Global Leader in Synthetic Roofing</h1>
                    </AnimatedContainer>
                    <AnimatedContainer className="card-container" inSignal={signalInView} animationIn={InFromRight} delay={100}>
                        <Card color={{color: 'black', alpha: '60'}} ref={cardRef}>
                            <h3>EcoThatch Excellence</h3>
                            <p>A global leader in premium synthetic thatch roofing and artificial bamboo, delivering durable, authentic, and innovative solutions for exceptional architectural designs.</p>
                            <Button border onClick={() => window.location.href = '/contact-us'}>
                                <span>Get a free quote today</span>
                                <Button circle color={{color: 'white', alpha: '100'}}>
                                    <Icon icon='arrow-right-with-tail' color={{color: 'green-2'}}></Icon>
                                </Button>
                            </Button>
                        </Card>
                    </AnimatedContainer>
                </div>
            </div>
        </ViewSection>
    );
})