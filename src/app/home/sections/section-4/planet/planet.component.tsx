'use client';
import { inFromScaleZero } from '@/shared/components/animated-container/libs/Animations';
import style from './planet.module.scss';
import { CSSProperties, RefObject, useEffect, useRef } from "react";
import { OnScrollInFn } from '@/shared/components/animated-container/libs/OnScrollFn';
import breakpoints from '@/shared/types/breakpoints';

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

export function PlanetComponent() {

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

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() =>{ 
    inFromScaleZero.set(ref.current!);
  
    indicatorsItems.forEach((item, index) => {
      inFromScaleZero.set(item.ref.current!);
      animateIndicators(item.ref, index);
    });

    OnScrollInFn(ref.current!, () => {
      inFromScaleZero.fn(ref.current!);
      window.dispatchEvent(new Event('planet-ready'));
    });

  }, [])


  function animateIndicators(indicator: RefObject<HTMLDivElement|null>, index: number) {
    if (!indicator.current) return null;

    window.addEventListener('planet-ready', () => {
      setTimeout(() => {
        inFromScaleZero.fn(indicator.current!);        
      }, index * 400);
    })
  }

  function createIndicator(item: IndicatorItem | null, index: number) {debugger
    if (!item || typeof window === 'undefined') return null;

    const screenWidth = window.innerWidth;
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

  return (
    <div ref={ref} className={`planet-component ${style['planet-component']}`}>

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
        <img src="/images/home/planet.png" alt="" />
      </div>
    </div>
  );
}