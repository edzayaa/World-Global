
import { useEffect, useRef, useState } from 'react';
import style from './svg-item.module.scss';
import { InFromLeft, inFromOpacityZero, InFromRight, inFromScaleZero, inFromTopClipPath } from '@/shared/components/animated-container/libs/Animations';
import { AnimatedContainer } from '@/shared/components/animated-container/animated-container';
import { Icon } from '@/shared/components/icon/icon';
import { sign } from 'crypto';
import gsap from 'gsap';
import breakpoints from '@/shared/types/breakpoints';
import { MapRange } from '@/shared/utils/math-util';

export const ItemSvg = ({ signalStart }: { signalStart: boolean }) => {

    const internalRef = useRef<HTMLDivElement | null>(null);
    const internalSvgRef = useRef<SVGSVGElement | null>(null);
    const delaySvg = 500;
    const delayItems = delaySvg + 150;

    const grupoLines = useRef<SVGGElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [videoPlayed, setVideoPlayed] = useState(false);

    const lines: { start: [number, number], end: [number, number], lineTap: boolean }[] = [
        { start: [880, 410], end: [480, 695], lineTap: true },
        { start: [880, 410], end: [830, 740], lineTap: true },
        { start: [880, 410], end: [1320, 680], lineTap: true },
        { start: [880, 410], end: [895, 465], lineTap: false },

    ]

    const items: {
        icon: string;
        label: string;
        position: [number, number];
    }[] = [
            { icon: 'leaf', label: 'Sustainably sourced', position: [730, 510] },
            { icon: 'waves', label: 'Weather resistant', position: [660, 560] },
            { icon: 'fire', label: 'Fire and wind resistant', position: [595, 605] },
        ];

    function calculateEndLine(start: [number, number], end: [number, number], index: number) {

        const dx = end[0] - start[0];
        const dy = end[1] - start[1];
        const angle = Math.atan2(dy, dx);
        const perpAngle = angle + Math.PI / 2;
        const length = 10;

        const p1x = end[0] + Math.cos(perpAngle) * (-length / 2);
        const p1y = end[1] + Math.sin(perpAngle) * (-length / 2);

        const p2x = end[0] + Math.cos(perpAngle) * (length / 2);
        const p2y = end[1] + Math.sin(perpAngle) * (length / 2);

        return <line key={`line-tap-${index}`} x1={p1x} y1={p1y} x2={p2x} y2={p2y} stroke='white' />;
    }

    function handleVideo() {
        if (videoRef.current) {
            const video = videoRef.current;
            video.play();
            setTimeout(() => {
                gsap.to(video, {
                    opacity: 0,
                    duration: 0.5,
                });
            }, (video.duration - 0.5) * 1000);
            setTimeout(() => {
                setVideoPlayed(true);
            }, (video.duration - 0.9) * 1000);

        }
    }

    function handleScaleFunction(){
        const baseHeightRate = window.innerHeight / 1080;       
        const baseWidthRate = window.innerWidth / 1920;
        
        const scaleRatio = Math.max(baseHeightRate, baseWidthRate);
        
        if(baseHeightRate > baseWidthRate){
            const imgWidth = 1920 * scaleRatio;
            const screenOffset = window.innerWidth / 2 ;
            const widthRate = window.innerWidth / imgWidth;

            const maxOffset = (imgWidth / 2) - screenOffset;        
            const negWidthRate = 1 - widthRate;
            const limitOffset = 1000 * widthRate;
            const offset = Math.min(limitOffset, maxOffset * negWidthRate);
    
    
                gsap.to(internalSvgRef.current!, {
                    scale: scaleRatio,
                    duration: 2,
                    left: `calc(50% + ${offset}px)`
                });
        }else {
            const imgHeight = 1080 * scaleRatio;
            const screenOffset = window.innerHeight / 2;
            const heightRate = window.innerHeight / imgHeight;

            const maxOffset = (imgHeight / 2) - screenOffset;
            const negHeightRate = 1 - heightRate;
            const limitOffset = 1000 * heightRate;
            const offset = Math.min(limitOffset, maxOffset * negHeightRate);

            gsap.to(internalSvgRef.current!, {
                scale: scaleRatio,
                duration: 2,
                top: `calc(50% - ${offset}px)`
            });
        }
    }

    useEffect(() => {
        if (!internalRef.current) return;

        if (grupoLines.current)
            inFromTopClipPath.set(grupoLines.current as unknown as HTMLElement);

        if (!signalStart) return;

        videoRef.current?.play();
        handleVideo();
        
        if (!videoPlayed) return;
        
        handleScaleFunction();
        setTimeout(() => {
            inFromTopClipPath.fn(grupoLines.current as unknown as HTMLElement);
        }, delaySvg);


    }, [signalStart, videoPlayed])


    return (

        <div className={style["svg-item"]} ref={internalRef}>
            <div  >

                <svg ref={internalSvgRef} viewBox='0 0 1920 1080' preserveAspectRatio='xMidYMid slice' xmlns='http://www.w3.org/2000/svg'>

                    <image href="/videos/home/1.webp" width={1920} height={1080} />
                    <rect x="0" y="0" width="100%" height="100%" fill="black" opacity="0.2" />
                    <foreignObject>
                        <video ref={videoRef} src={"/videos/home/1.mp4"} muted />
                    </foreignObject>

                    <g ref={grupoLines} >
                        {lines.map((line, index) => {

                            return <>
                                <line key={'line-'+ index} x1={line.start[0]} y1={line.start[1]} x2={line.end[0]} y2={line.end[1]} stroke='white' />
                                {line.lineTap ? calculateEndLine(line.start, line.end, index) : null}
                            </>
                        })}
                    </g>

                    <foreignObject>
                        {items.map((item, index) => {
                            return (
                                <div className="feature-item" style={{ '--x': `${item.position[0]}px`, '--y': `${item.position[1]}px` } as React.CSSProperties} key={index}>
                                    <AnimatedContainer animationIn={InFromRight} inSignal={videoPlayed} delay={(delayItems * 1.1) * (index + 1)} className="feature-content">
                                        <Icon icon={item.icon as 'leaf' | 'waves' | 'fire'} />
                                        <span>{item.label}</span>
                                    </AnimatedContainer>

                                    <AnimatedContainer className="point-indicator" animationIn={inFromScaleZero} inSignal={videoPlayed} delay={delayItems * (index + 1)}>
                                    </AnimatedContainer>
                                </div>)
                        })}
                    </foreignObject>
                </svg>
            </div>

        </div>

    );
}
