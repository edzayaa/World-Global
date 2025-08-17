

import { Button } from '@/shared/components/button/button';
import style from './section-6.module.scss';
import { Icon } from '@/shared/components/icon/icon';
import { ViewSection } from '@/shared/components/view-sections/view-sections';
import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Section6 = ({spacerRef}: {spacerRef: RefObject<HTMLElement|null>}) => {

    const photos = [
        '1',
        '2',
        '3'
    ]

    const internalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const height = internalRef.current?.offsetHeight || 0;
        spacerRef.current!.style.flex = `0 0 ${height}px`;
        spacerRef.current!.style.minHeight = 'unset';
        animate();
    }, []);

    function animate(){
        gsap.fromTo(internalRef.current, { 
            opacity: 0 
        }, {
            opacity: 1,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: "top 150%",
                end: "top 140%",
                scrub: true
            }
        });

        gsap.fromTo(internalRef.current, 
            {translateY: () => window.innerHeight},
            {
                translateY: 0,
                scrollTrigger: {
                    trigger: spacerRef.current,
                    scroller: document.querySelector(`html`),
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,                    
                }
            }
        );

        gsap.to(internalRef.current, {
            translateY: () => window.innerHeight * -1,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: "bottom bottom",
                end: "bottom top",
                scrub: true,
            }
        });
    }
    
    return (
        <ViewSection className={style['section-6']} padding ref={internalRef}>
            <div className="photos-wrapper">
                {photos.map((photo, index) => (
                    <img key={index} src={`/images/products/${photo}.png`} alt={`Product ${photo}`} />
                ))}
            </div>
            <div className="buttons-wrapper hide-min-md">
                <Button circle color={{color: 'black', alpha: '100'}}>
                    <Icon icon={'arrow-left'} color={{color: 'white', alpha: '100'}} />
                </Button>
                <Button circle color={{color: 'black', alpha: '100'}}>
                    <Icon icon={'arrow-right'} color={{color: 'white', alpha: '100'}} />
                </Button>
            </div>
        </ViewSection>
    );
};

export default Section6;