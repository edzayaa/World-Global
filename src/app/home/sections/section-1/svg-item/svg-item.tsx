
import { Fragment, RefObject, useEffect, useRef, useState } from 'react';
import style from './svg-item.module.scss';
import { InFromRight, inFromScaleZero, inFromTopClipPath } from '@/shared/components/animated-container/libs/Animations';
import { AnimatedContainer } from '@/shared/components/animated-container/animated-container';
import { Icon } from '@/shared/components/icon/icon';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

export const ItemSvg = ({ signalStart }: { signalStart: boolean }) => {

    const internalRef = useRef<HTMLDivElement | null>(null);
    const internalSvgRef = useRef<SVGSVGElement | null>(null);
    const delaySvg = 500;
    const delayItems = delaySvg + 150;

    const groupLines = useRef<SVGGElement | null>(null);
    const videoCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoWrapperRef = useRef<HTMLDivElement | null>(null);
    const videoSpacerRef = useRef<HTMLDivElement | null>(null);
    
    const images: HTMLImageElement[] = [];
    const totalFrame = 199;
    const baseNameImg = 'hero 2_';
    const formatImg = 'webp';
    const svgDuration = 1200;
    const indicatorsDuration = 1200;
    const [offsetContainer, setOffsetContainer] = useState<number>(0);
    const [videoDuration, setVideoDuration] = useState<number>(totalFrame * 50);

    const [videoPlayed, setVideoPlayed] = useState(false);

    const svgSpacerRef = useRef<HTMLDivElement | null>(null);
    const indicatorsSpacerRef = useRef<HTMLDivElement | null>(null);
    const bgBackdropRef = useRef<HTMLDivElement | null>(null);

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
            { icon: 'leaf', label: 'Sustainably sourced', position: [730, 516] },
            { icon: 'waves', label: 'Weather resistant', position: [660, 566] },
            { icon: 'fire', label: 'Fire and wind resistant', position: [595, 611] },
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

        
        for(let i = 0; i < totalFrame; i++) {
            const img = new Image();
            img.src = `/videos/home/imageSequence/${baseNameImg}${i.toString().padStart(5, '0')}.${formatImg}`;
            images.push(img);
        }
        
        const canvas = videoCanvasRef.current;
        canvas!.width = 1920;
        canvas!.height = 1080;
        const ctx = canvas?.getContext('2d');

        images[0].onload = () => {
            if(canvas && ctx && images.length > 0){
                ctx.drawImage(images[0], 0,0, canvas.width, canvas.height);
            }
        }
        
       

        ScrollTrigger.create({
            trigger: videoSpacerRef.current!,
            scroller: videoWrapperRef.current!,
            start: `top top`,
            end: `bottom bottom`,            
            scrub:  .1,
            
            onUpdate: (self => {
                
                if(!canvas) return;

                const baseProgress = self.progress < 0.0001 ? 0 : self.progress
                const progress = gsap.parseEase('power1.out')(baseProgress);

                const frameIndex = Math.floor(progress * (totalFrame - 1));
                ctx?.clearRect(0,0, canvas?.width, canvas?.height);
                ctx?.drawImage(images[frameIndex], 0,0, canvas?.width, canvas?.height);

                if (frameIndex == totalFrame) {
                    videoCanvasRef.current?.classList.remove('video-active');
                } else {
                    videoCanvasRef.current?.classList.add('video-active');
                }
                
            }),

        })



        ScrollTrigger.create({
            trigger: svgSpacerRef.current!,
            scroller: videoWrapperRef.current!,
            start: `top top`,
            end: `bottom bottom`,
            scrub:  .1,
            onUpdate: (self)=>{
                const progress = self.progress;

                bgBackdropRef.current!.style.opacity = `${progress * 100}%`;

                groupLines.current!.style.maskSize = `${progress * 100}% ${progress * 100}%`;
            }
        });

        ScrollTrigger.create({
            trigger: indicatorsSpacerRef.current!,
            scroller: videoWrapperRef.current!,
            start: `top top`,
            end: `bottom bottom`,
            scrub:  .1,
            onUpdate: (self) => {
                const progress = self.progress;
                
                const points: HTMLElement[] = Array.from(document.querySelectorAll('.bg-wrapper svg .feature-item .point-indicator'));
                points.forEach(point => {
                    point.style.opacity = `${progress * 100}%`;
                    point.style.transform = `translateY(${(1 - progress) * 300}px)`;
                });
            
                const indicatorsLabel: HTMLElement[] = Array.from(document.querySelectorAll('.bg-wrapper svg .feature-item .feature-content'));
                indicatorsLabel.forEach(label => {
                    label.style.opacity = `${progress * 100}%`;
                    label.style.transform = `translateX(${(1 - progress) * -300}px)`;
                });

            }

        })

    }

    function handleScaleFunction() {
        const baseHeightRate = window.innerHeight / 1080;
        const baseWidthRate = window.innerWidth / 1920;

        const scaleRatio = Math.max(baseHeightRate, baseWidthRate);

        if (baseHeightRate > baseWidthRate) {
            const imgWidth = 1920 * scaleRatio;
            const screenOffset = window.innerWidth / 2;
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
        } else {
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

        if (!signalStart) return;

        let h = window.innerHeight;
        let b = internalRef.current.getBoundingClientRect();

        const heightLimit = window.innerHeight - internalRef.current!.getBoundingClientRect().bottom;
        setOffsetContainer(heightLimit);

        handleVideo();        
        document.addEventListener('scroll', scrollListener)



    }, [signalStart, videoPlayed])

    const scrollListener = (event: Event) => {
        
        if((event.target as HTMLDocument).scrollingElement!.scrollTop > 0) {
            videoWrapperRef.current?.classList.add('scroll-off');
        } else {
            videoWrapperRef.current?.classList.remove('scroll-off');
        }
    }


    return (

        <div className={style["svg-item"]} ref={internalRef}>

            <div className="video-bg" >
                <canvas className='video-active video-canvas' ref={videoCanvasRef}></canvas>                
                <div className="videoWrapper" ref={videoWrapperRef}>
                    <div className="offsetSpacer" style={{'height': `${offsetContainer}px`}}></div>
                    <div className="videoSpacer" style={{'height': `${videoDuration}px`}} ref={videoSpacerRef}></div>
                    <div className="svgSpacer" ref={svgSpacerRef} style={{'height': `${svgDuration}px`}}></div>
                    <div className="indicatorSpacer" style={{'height': `${indicatorsDuration}px`}} ref={indicatorsSpacerRef}></div>
                    <div className="offsetSpacer" style={{'height': `${offsetContainer}px`}}></div>
                </div>
            </div>
            <div className="bg-backdrop" ref={bgBackdropRef}></div>
            <svg ref={internalSvgRef} viewBox='0 0 1920 1080' preserveAspectRatio='xMidYMid slice' xmlns='http://www.w3.org/2000/svg'>

                {/* <image href="/videos/home/1.webp" width={1920} height={1080} /> */}
                <rect x="0" y="0" width="100%" height="100%" fill="black" opacity="0.2" />
                <g ref={groupLines} >
                    {lines.map((line, index) => {

                        return (
                            <Fragment key={'line-group-' + index}>

                                <line key={'line-' + index} x1={line.start[0]} y1={line.start[1]} x2={line.end[0]} y2={line.end[1]} stroke='white' />
                                {line.lineTap ? calculateEndLine(line.start, line.end, index) : null}
                            </Fragment>
                        )
                    })}
                </g>

                <foreignObject>
                    {items.map((item, index) => {
                        return (
                            <div className="feature-item" style={{ '--x': `${item.position[0]}px`, '--y': `${item.position[1]}px` } as React.CSSProperties} key={index}>
                                <div  className="feature-content">
                                    <Icon icon={item.icon as 'leaf' | 'waves' | 'fire'} />
                                    <span>{item.label}</span>
                                </div>

                                <div className="point-indicator" >
                                </div>
                            </div>)
                    })}
                </foreignObject>
            </svg>


        </div>

    );
}
