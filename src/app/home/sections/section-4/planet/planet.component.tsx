'use client';
import { inFromScaleZero } from '@/shared/components/animated-container/libs/Animations';
import style from './planet.module.scss';
import { CSSProperties, RefObject, useEffect, useRef, useState } from "react";
import { OnScrollInFn } from '@/shared/components/animated-container/libs/OnScrollFn';
import breakpoints from '@/shared/types/breakpoints';
import gsap from 'gsap';
interface IndicatorItem {
  ref: RefObject<HTMLDivElement|null>,
  label?: {
    ref: RefObject<HTMLDivElement|null>,
    position: 'top' | 'bottom' ,
    alignment: 'start' | 'center' | 'end',
    padding: number,
    text: string,
    desktopVersion?: {
      position: 'top' | 'bottom',
      alignment: 'start' | 'center' | 'end',
      padding: number
    }
  },
  point: {
    ref: RefObject<HTMLDivElement|null>,
    position: { x: number, y: number },
    size: number
    desktopVersion?: {
      position: {x: number, y: number },
      size: number
    }
  }
}

export function PlanetComponent({spacerRef}: {spacerRef: RefObject<HTMLDivElement | null>}) {

  const indicatorsItems: IndicatorItem[] = [
    {
      ref: useRef<HTMLDivElement>(null),
      label: {
        ref: useRef<HTMLDivElement>(null),
        position: 'bottom',
        alignment: 'end',
        text: 'Eco-Friendly Resorts',
        padding: 2,
        desktopVersion: {
          position: 'top',
          alignment: 'center',
          padding: 2
        }
      },
      point:{
        position:{
          x: 88,
          y: 18
        },
        size: 16,
        ref: useRef<HTMLDivElement>(null),
        desktopVersion: {
          position: { x: 7.5, y: 22 },
          size: 54
        }
        
      }
    },
    {
      ref: useRef<HTMLDivElement>(null),
      label: {
        ref: useRef<HTMLDivElement>(null),
        position: 'top',
        alignment: 'start',
        padding: 1,
        text: 'Fire resistant for cruise ship like eco-friendly resort',
        desktopVersion: {
          position: 'top',
          alignment: 'center',
          padding: 3
        }
      },
      point:{
        position:{
          x: 10,
          y: 22
        },
        size: 20,
        ref: useRef<HTMLDivElement>(null),
        desktopVersion: {
          position: {
            x: 99,
            y: 47
          },
          size: 32
        }
      }
    },
    {
      ref: useRef<HTMLDivElement>(null),
      label:{
        ref: useRef<HTMLDivElement>(null),
        position: 'bottom',
        alignment: 'center',
        padding: 3,
        text: 'Attraction Park',
        desktopVersion: {
          position: 'top',
          alignment: 'center',
          padding: 3
        }
      },
      point:{
        ref: useRef<HTMLDivElement>(null),
        position: {
          x: 29,
          y: 60
        },
        size: 10,
        desktopVersion: {
          position: { x: 36, y: 43 },
          size: 44
        }
      }
    },
    {
      ref: useRef<HTMLDivElement>(null),
      label:{
        ref: useRef<HTMLDivElement>(null),
        position: 'bottom',
        alignment: 'center',
        padding: 2,
        text: 'Sustainable Homes',
        desktopVersion: {
          alignment: 'center',
          position: 'top',
          padding: 2
        }
      },
      point:{
        ref: useRef<HTMLDivElement>(null),
        position: {
          x: 70,
          y: 94
        },
        size: 15,
        desktopVersion:{
          position: { x: 86, y: 17 },
          size: 52
        }
      }
    },
    {
      ref: useRef<HTMLDivElement>(null),
      point:{
        ref: useRef<HTMLDivElement>(null),
        position: {
          x: 82,
          y: 66
        },
        size: 6,
        desktopVersion: {
          position: { x: 42, y: 2 },
          size: 38
        }
      }
    },
    {
      ref: useRef<HTMLDivElement>(null),
      point:{
        ref: useRef<HTMLDivElement>(null),
        position: {
          x: 24,
          y: 91
        },
        size: 8,
        desktopVersion: {
          position: { x: 42, y: 2 },
          size: 38
        }
      }
    },
    {
      ref: useRef<HTMLDivElement>(null),
      point:{
        ref: useRef<HTMLDivElement>(null),
        position: {
          x: 24,
          y: 91
        },
        size: 8,
        desktopVersion: {
          position: { x: 7, y: 49},
          size: 26
        }
      }
    }
  ];

  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  const internalRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLImageElement>(null);


  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, [])

  useEffect(() =>{ 
    if(!internalRef.current) return;
    animate();
  }, [screenWidth])


  function animate(){
    if (!planetRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: spacerRef.current,
        scroller: document.querySelector(`html`),
        start: "top top",
        end: "+=110%",
        scrub: true,
      }
    })
    .fromTo(planetRef.current, {
      rotate: -60,
    }, {
      rotate: 0,
    })
    .fromTo(
      indicatorsItems.map(item => item.point.ref.current),
      {opacity: 0, scale: 0},
      {
        opacity: 1, 
        scale: 1, 
        stagger: 0.2,
        
      }, "<"
    )
    .fromTo(
    indicatorsItems.map(item => item.label?.ref.current), 
    {
      opacity: 0, 
      translateY: -50
    },{
      stagger: 0.4,
      opacity: 1,
      translateY: 1,
    }, "<")

    .to(
      indicatorsItems.map(item => item.point.ref.current),
      {
        opacity: 0,
        scale: 0,
        stagger: 0.2,
        
      }, ">"
    )

    .to(
      indicatorsItems.map(item => item.label?.ref.current),
      {
        opacity: 0,
        scale: 0,        
        stagger: 0.2,
        
      }, "<"
    ).to(planetRef.current, {
      rotate: -60,
      opacity: 0
    }, ">")
    .to(internalRef.current, {
      opacity: 0
    }, "<")
    
  }

  function createIndicator(item: IndicatorItem | null, index: number) {
    if(item === null || item === undefined) return null;
    if (typeof window === "undefined") return null; 
    
    const screenWidth = window?.innerWidth;
    if(screenWidth === null) return null;
    
    if(screenWidth > breakpoints.md){
        if (!item.point.desktopVersion) return;
      return <div key={index} className="indicator-item" style={{'--position-x': `${item.point.desktopVersion?.position.x}%`, '--position-y': `${item.point.desktopVersion.position.y}%` } as CSSProperties} ref={item.ref}>
        <div ref={item.point.ref} className={`point`} style={{'--size': `${item.point.desktopVersion!.size}px`} as CSSProperties}></div>
        {item.label?.desktopVersion ? <div ref={item.label.ref} style={{'--padding': `${item.label.desktopVersion.padding}em`} as CSSProperties} className={`label align-${item.label.desktopVersion.alignment} position-${item.label.desktopVersion.position}`}>{item.label.text}</div> : null}
      </div>;
    }

    return (
      <div key={index} className="indicator-item" style={{'--position-x': `${item.point.position.x}%`, '--position-y': `${item.point.position.y}%` } as CSSProperties} ref={item.ref}>
        <div ref={item.point.ref} className={`point`} style={{'--size': `${item.point.size}px`} as CSSProperties}></div>
        {item.label ? <div ref={item.label.ref} style={{'--padding': `${item.label.padding}em`} as CSSProperties} className={`label align-${item.label.alignment} position-${item.label.position}`}>{item.label.text}</div> : null}
      </div>
    )
  }

  if(screenWidth === null)
    return null;

  return (
    <div ref={internalRef} className={`planet-component ${style['planet-component']}`}>

      <div className="planetWrapper">
        <div className="indicatorsWrapper">
          {(() => {
            const els = indicatorsItems.map((e, i) => {
              return createIndicator(e, i);
            })
            return els;
          })()
          }
        </div>
        <img src="/images/home/planet.png" alt="" ref={planetRef} />
      </div>
    </div>
  );
}