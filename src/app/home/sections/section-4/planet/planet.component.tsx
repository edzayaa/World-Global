import { inFromScaleZero } from '@/shared/components/animated-container/libs/Animations';
import style from './planet.module.scss';
import { CSSProperties, RefObject, useEffect, useRef } from "react";
import { OnScrollInFn } from '@/shared/components/animated-container/libs/OnScrollFn';

interface IndicatorItem {
  ref: RefObject<HTMLDivElement|null>,
  label?: {
    ref: RefObject<HTMLDivElement|null>,
    position: 'top' | 'bottom' ,
    alignment: 'start' | 'center' | 'end',
    padding: number,
    text: string
  },
  point: {
    ref: RefObject<HTMLDivElement|null>,
    position: { x: number, y: number },
    size: number
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
        padding: 2
      },
      point:{
        position:{
          x: 88,
          y: 18
        },
        size: 16,
        ref: useRef<HTMLDivElement>(null)
      }
    },
    {
      ref: useRef<HTMLDivElement>(null),
      label: {
        ref: useRef<HTMLDivElement>(null),
        position: 'top',
        alignment: 'start',
        padding: 1,
        text: 'Fire resistant for cruise ship like eco-friendly resort'
      },
      point:{
        position:{
          x: 10,
          y: 22
        },
        size: 20,
        ref: useRef<HTMLDivElement>(null)
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
      },
      point:{
        ref: useRef<HTMLDivElement>(null),
        position: {
          x: 29,
          y: 60
        },
        size: 10
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
      },
      point:{
        ref: useRef<HTMLDivElement>(null),
        position: {
          x: 70,
          y: 94
        },
        size: 15
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
        size: 6
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
        size: 8
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
    if (!indicator.current) return;

    window.addEventListener('planet-ready', () => {
      setTimeout(() => {
        inFromScaleZero.fn(indicator.current!);        
      }, index * 400);
    })
  }

  function createIndicator(item: IndicatorItem | null, index: number) {
    if (!item) return null;

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