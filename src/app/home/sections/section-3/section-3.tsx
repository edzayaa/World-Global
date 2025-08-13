'use client';

import { ViewSection } from '@/shared/components/view-sections/view-sections';
import style from './section-3.module.scss';
import { AnimatedContainer } from '@/shared/components/animated-container/animated-container';
import { Button } from '@/shared/components/button/button';
import { Icon } from '@/shared/components/icon/icon';
import { useEffect, useRef, useState } from 'react';
import { OnScrollInFn } from '@/shared/components/animated-container/libs/OnScrollFn';
import { InFromRight } from '@/shared/components/animated-container/libs/Animations';
import { CustomersReviews } from './customers-reviews/customers-reviews';


export const Section3 = () => {

    const slides = Array.from({length: 7}, (_,i) => {
        const [inViewSignal, setInViewSignal] = useState(false);
        return {i, ref: useRef<HTMLDivElement|null>(null), inView: inViewSignal, setInView: setInViewSignal };
    });
    const slide3Elements = Array.from({length: 1}, (_, i) => {
        const [inViewSignal, setInViewSignal] = useState(false);
        return {i, ref: useRef<HTMLDivElement|null>(null), inView: inViewSignal, setInView: setInViewSignal };
    });

    const [activeSlide, setActiveSlide] = useState<number>(0);

    useEffect(() => {
        
        slides.forEach((slide) => {
            if(!slide.ref.current) return;
            OnScrollInFn(slide.ref.current, () =>{ slide.setInView(true), setActiveSlide(slide.i)}, {threshold: 0.1});
        })

        slide3Elements.forEach((element) => {
            if(!element.ref.current) return;
            OnScrollInFn(element.ref.current, () => { element.setInView(true)}, {threshold: 0.1});
        });
    },[])



    const delayStep = 300;
    

    return (
        <ViewSection className={`${style['section-3']} section-3`} >
            <img className={`video-bg video-a ${activeSlide <= 2 ? 'active' : ''}`} src="/videos/home/2a.png" alt="" />
            <img className={`video-bg video-b ${activeSlide === 3 ? 'active' : ''}`} src="/videos/home/2b.png" alt="" />
            <img className={`video-bg video-c ${activeSlide === 4 ? 'active' : ''}`} src="/videos/home/2c.png" alt="" />
            <img className={`video-bg video-d ${activeSlide === 5 ? 'active' : ''}`} src="/videos/home/2d.png" alt="" />
            <div className={`section3-wrapper`}>
                <div className="slide-1 slide" ref={slides[0].ref}>
                    <AnimatedContainer inSignal={slides[0].inView} animationIn={InFromRight} delay={1 * delayStep} className='title'>
                        <h1>Every Fiber Designed for Perfection.</h1>
                    </AnimatedContainer>
                    <AnimatedContainer inSignal={slides[0].inView} animationIn={InFromRight} delay={2 * delayStep} className='subtitle'>
                        <span className="number-in-circle">
                            1
                        </span>
                        <p>Hyper-realistic textures that mimic nature without compromise.</p>                        
                    </AnimatedContainer>
                    <AnimatedContainer inSignal={slides[0].inView} animationIn={InFromRight} delay={3 * delayStep}>
                        <Button border>
                            <span>Learn more about us</span>
                            <Button color={{color: 'white', alpha: '100'}} circle>
                                <Icon color={{color: 'orange-2', alpha: '100'}} icon='arrow-right-with-tail'></Icon>
                            </Button>
                        </Button>
                    </AnimatedContainer>
                </div>
                <div className="slide-2 slide" ref={slides[1].ref}>
                    <AnimatedContainer inSignal={slides[1].inView} animationIn={InFromRight} delay={1 * delayStep} className='title' >
                        <h1>The most realistic synthetic roofing, blending seamlessly with nature.</h1>
                    </AnimatedContainer>
                </div>
                <div className="slide-3 slide" ref={slides[2].ref}>
                    <AnimatedContainer inSignal={slides[2].inView} animationIn={InFromRight} delay={1 * delayStep} className='title' >
                        <h1>Engineered to withstand nature's harshest conditions with ease.</h1>
                    </AnimatedContainer>
                    <AnimatedContainer inSignal={slides[2].inView} animationIn={InFromRight} delay={2 * delayStep} className='subtitle'>
                        <div className="number-in-circle-wrapper">
                            <div className="number-in-circle-item">
                                <span className="number-in-circle">
                                    2
                                </span>
                                <p>Wind and fire resistant</p>
                            </div>
                            <AnimatedContainer className="number-in-circle-item" ref={slide3Elements[0].ref}  inSignal={slide3Elements[0].inView} animationIn={InFromRight} delay={200}>
                                <span className="number-in-circle" >
                                    3
                                </span>
                                <p>Heavy wind resistant</p>
                            </AnimatedContainer>

                        </div>
                    </AnimatedContainer>
                </div>                
                <div className="slide-4 slide" ref={slides[3].ref}>
                    <AnimatedContainer inSignal={slides[3].inView} animationIn={InFromRight} delay={1 * delayStep} className='title'>
                        <h1>Sustainably sourced, helping reduce environmental impact.</h1>
                    </AnimatedContainer>
                    <AnimatedContainer inSignal={slides[3].inView} animationIn={InFromRight} delay={2 * delayStep} className='subtitle'>
                        <p>Our thatched roofing are crafted with sustainably sourced materials, minimizing environmental impact. By choosing our eco-friendly designs, you support responsible construction and the preservation of natural ecosystems.</p>
                    </AnimatedContainer>
                    <AnimatedContainer inSignal={slides[3].inView} animationIn={InFromRight} delay={3 * delayStep} className='video'>
                        <Button color={{color: 'green', alpha: '60'}} >
                            <span>Get a free quote</span>
                            <Button circle color={{color: 'white', alpha: '100'}}>
                                <Icon color={{color: 'green-2', alpha: '100'}} icon='arrow-right-with-tail'></Icon>
                            </Button>
                        </Button>
                    </AnimatedContainer>
                    <div className="spacer"></div>
                    <AnimatedContainer animationIn={InFromRight} delay={4 * delayStep} inSignal={slides[3].inView}>
                        <CustomersReviews />
                    </AnimatedContainer>
                        
                </div>
                <div className="slide-5 slide" ref={slides[4].ref}>
                    <AnimatedContainer inSignal={slides[4].inView} animationIn={InFromRight} delay={1 * delayStep} className='title'>
                        <h1>Synthetic palm thatch roofing built to last</h1>
                    </AnimatedContainer>
                    <AnimatedContainer inSignal={slides[4].inView} animationIn={InFromRight} delay={2 * delayStep} className='subtitle'>
                        <p>Features durability, fire resistance, and UV stability.</p>
                    </AnimatedContainer>
                    <AnimatedContainer inSignal={slides[4].inView} animationIn={InFromRight} delay={3 * delayStep} className=''>
                        <Button color={{color: 'green', alpha: '60'}} >
                            <span>Explore</span>
                            <Button circle color={{color: 'white', alpha: '100'}}>
                                <Icon color={{color: 'green-2', alpha: '100'}} icon='arrow-right-with-tail'></Icon>
                            </Button>
                        </Button>
                    </AnimatedContainer>
                </div>
                <div className="slide-6 slide" ref={slides[5].ref}>
                    <AnimatedContainer  inSignal={slides[5].inView} animationIn={InFromRight} delay={1 * delayStep} className='title'>
                        <h1>Artificial bamboo with real aesthetics and superior durability</h1>
                    </AnimatedContainer>
                    <AnimatedContainer inSignal={slides[5].inView} animationIn={InFromRight} delay={2 * delayStep} className='subtitle'>
                        <p>Highlights its pest-resistant, customizable, and weather-proof properties.</p>
                    </AnimatedContainer>
                    <AnimatedContainer inSignal={slides[5].inView} animationIn={InFromRight} delay={3 * delayStep} className=''>
                        <Button color={{color: 'green', alpha: '60'}} >
                            <span>Explore</span>
                            <Button circle color={{color: 'white', alpha: '100'}}>
                                <Icon color={{color: 'green-2', alpha: '100'}} icon='arrow-right-with-tail'></Icon>
                            </Button>
                        </Button>
                    </AnimatedContainer>
                </div>
            </div>
        </ViewSection>
    );
};
