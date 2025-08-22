"use client"
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { useGSAP } from "@gsap/react";
import { useDebouncedValue, useDidUpdate, useViewportSize } from '@mantine/hooks';
import SVGAnimation from './SVGAnimation';
import Text from '../shared_components/Text/Text';
import Bottom from '../shared_components/Bottom/Bottom';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const frameCount = 200;

const Section1 = () => {

    const viewportSize = useViewportSize();
    const [loadedImages, setLoadedImages] = useState<HTMLImageElement[] | null>(null);
    const [debouncedViewportSize] = useDebouncedValue(viewportSize, 500)
    const isMobile = viewportSize.width < 768;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scopeRef = useRef<HTMLDivElement>(null);
    const imageSequence = useRef({ frame: 0 });
    const loaderRef = useRef<HTMLDivElement>(null)
    const homeCardRef = useRef<HTMLDivElement>(null)

    //const svgRef = useRef<SVGAnimationHandle>(null);

    const startSVGAnimation = () => {
        // Llama a la función expuesta por useImperativeHandle
        if (scopeRef.current) {
            const svgRef = scopeRef.current.querySelector(".svg_animation")
            if (svgRef?.classList.contains("active")) {
                svgRef?.setAttribute("class","svg_animation")
            }else{
                svgRef?.setAttribute("class","svg_animation active")
            }
            
        }
    };

    useEffect(() => {
        if (!canvasRef.current || !viewportSize.width || !viewportSize.height || loadedImages) {
            return;
        }

        const intialSetup = async () => {
            const imageAspect = !isMobile ? 1920 / 1080 : 430 / 932;
            const imageWidth = viewportSize.width;
            const imageHeight = viewportSize.width / imageAspect;
            //@ts-expect-error development
            canvasRef.current.width = viewportSize.width;
             //@ts-expect-error development
            canvasRef.current.height = viewportSize.height;

            const imageSrcs = Array.from(
                { length: frameCount },
                (_, i) => `/videos/home/imageSequence/hero 2_00${i < 10 ? `00${i}` : i < 100 ? `0${i}` : i}.webp`
            );

            try {
                const images = await loadImagesAndDrawFirstFrame({
                     //@ts-expect-error development
                    canvas: canvasRef.current,
                    imageSrcs: imageSrcs,
                    imageWidth: imageWidth,
                    imageHeight: imageHeight,
                });
                setLoadedImages(images);
            } catch (error) {
                console.error("Error loading images:", error);
            }
        };

        intialSetup();
    }, [viewportSize, loadedImages, isMobile]);

    useGSAP(() => {
        if (!canvasRef.current || !loadedImages) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        const initialAnimation = () => {
            gsap.timeline()
            .to(loaderRef.current,{
              opacity:0,
               ease: 'power1.out',
              
            })
            .to(loaderRef.current,{
               zIndex:-1,
               ease: 'none',
               
            }).fromTo(".scope_section1 .text-container",
                {
                    opacity:0,
                    y:"-20%",
                    
                },
                {
                    opacity:1,
                    y:0,
                    ease:"power4.in",
                     duration:1
                }

            ).fromTo(".scope_section1 .scroll_down",
                {
                    opacity:0,
                    y:"20%",
                    
                },
                {
                    opacity:1,
                    y:0,
                    ease:"power4.in",
                    duration:1
                },
                "<"

            ).fromTo(homeCardRef.current,
                {
                    opacity:0,
                    x:"20%"
                },
                {
                    opacity:1,
                    x:0,
                    ease:"power4.in",
                     duration:1
                },
                "<"
            )
        } 

const startAnimation = () => {
    // Timeline principal para la secuencia de imágenes y la entrada del SVG
    const tl = gsap.timeline({
        scrollTrigger: {
            id: 'image-sequence',
            trigger: '.scroll-container',
            scrub: 0.5,
            start: 'top top',
            end: '+=1000',
            pin: true,
            markers: false,
        }
    });

    // 1. Animación de la secuencia de imágenes.
    tl.to(imageSequence.current, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        //@ts-expect-error dddd
        onUpdate: () => render(context, canvasRef.current, loadedImages[imageSequence.current.frame]),
    });

    // 2. Animación del SVG, que empieza justo después de la secuencia de imágenes.
    tl.fromTo(".svg_animation",
        {
            opacity: 0,
        },
        {
            opacity: 1,
            ease: 'power3.out',
            onStart: () => startSVGAnimation(),
            onReverseComplete: () => startSVGAnimation(),
        },
        ">"
    );

    // 3. NUEVO: Animación de salida de los textos y la tarjeta.
    // Usamos el mismo scrollTrigger, pero con un punto de inicio específico.
    // Queremos que esto comience antes de que el timeline principal termine.
    gsap.timeline({
        scrollTrigger: {
            trigger: '.scroll-container',
            scrub: 0.5,
            start: 'top top',
            end: '+=100', // Mismo "end" que el timeline principal
       
        }
    })
    .to(".scope_section1 .text-container", {
        opacity: 0, // Animación de salida, no de entrada
        y: "-20%", // Cambiamos la dirección para un efecto de salida fluido
        ease: "power2.out", // Un ease más suave para la salida
        duration:4
    }, "<0.5") // Inicia al 60% del progreso total del scrollTrigger

    .to(homeCardRef.current, {
        opacity: 0, // Animación de salida
        x: "20%",
        ease: "power2.out",
        duration:4
    }, "<")

    .to(".scope_section1 .scroll_down", {
        opacity: 0, // Animación de salida
        y: "20%",
        ease: "power2.out",
        duration:4
    }, "<");
    
};

        // El chequeo ahora es contra el frameCount completo, no frameCount - 1.
        if (loadedImages.length === frameCount) {
            startAnimation();
            initialAnimation();
        }
    }, { dependencies: [loadedImages], scope: scopeRef });

    	useDidUpdate(() => {
		const handleViewportResize = () => {
			if (!debouncedViewportSize.width || !debouncedViewportSize.height || !loadedImages) return
			if (!canvasRef.current) return
			if (canvasRef.current.width === debouncedViewportSize.width) return
			canvasRef.current.width = debouncedViewportSize.width
			canvasRef.current.height = debouncedViewportSize.height
			const context = canvasRef.current.getContext('2d', { alpha: true })
			if (!context) return
			const progress = ScrollTrigger.getById('image-sequence')?.progress ?? 0
			const nextFrame = Math.floor(progress * loadedImages.length)
			const nextImage = loadedImages[nextFrame]
			if (!nextImage) return
			render(context, canvasRef.current, nextImage)
		}
		handleViewportResize()
	}, [debouncedViewportSize])
    return (
        <>
        <div ref={loaderRef} className="loader">
            <p>cargando..</p>
            <progress value={75} max={100} />
        </div>
        <div className='scope_section1' ref={scopeRef} >
            <div className="scroll-container">
                <canvas ref={canvasRef} className="canvas_image_sequence" />
                <div className="text-container">
                    <Text  variant='h2' fontSize='XL' color='white' extraClass='text_image_seq'>
                       Global Leader in {!isMobile?<br/>:null } Synthetic Roofing
                    </Text>
                </div>
                <div ref={homeCardRef} className="homepage_card blur_bg">
                    <Text fontWeight='medium'  fontSize='XS' color='white' style={{marginBottom:"1rem"}} >
                       EcoThatch Excellence
                    </Text>
                    <Text color='white'>
                        A global leader in premium synthetic thatch roofing and artificial bamboo, delivering durable, authentic, and innovative solutions for exceptional architectural designs.
                    </Text>
                    <Bottom style={{marginTop:"15px"}} bgArrowColor='white' arrowColor='black'>
                        Get a free quote today 
                    </Bottom>

                </div>
                <div className="scroll_down">
                    <Text color='white' fontWeight='medium'>
                        SCROLL DOWN
                    </Text>
                </div>
                <SVGAnimation />
            </div>
          
        </div>
        </>

    );
};

export default Section1;

const loadImagesAndDrawFirstFrame = async ({
    canvas,
    imageSrcs,
    imageWidth,
    imageHeight,
}: {
    canvas: HTMLCanvasElement;
    imageSrcs: string[];
    imageWidth: number;
    imageHeight: number;
}): Promise<HTMLImageElement[]> => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    return new Promise<HTMLImageElement[]>((resolve, reject) => {
        const onImageLoad = (index: number, img: HTMLImageElement) => {
            if (index === 0) {
                const context = canvas.getContext('2d', { alpha: true });
                if (context) {
                    render(context, canvas, img);
                }
            }
            loadedCount++;
            // Corrección: el total de imágenes cargadas debe ser igual a la longitud del array
            const hasLoadedAll = loadedCount === imageSrcs.length;
            if (hasLoadedAll) {
                resolve(images);
            }
        };

        const retries: { [imgIndex: number]: number } = {};
        const maxRetries = 3;

        const onImageError = (i: number, img: HTMLImageElement) => {
            retries[i] = (retries[i] || 0) + 1;
            if (retries[i] < maxRetries) {
                console.warn(`Image ${i} failed to load. Retrying... (Attempt ${retries[i]})`);
                img.src = `${imageSrcs[i]}?r=${retries[i]}`;
            } else {
                console.error(`Image ${i} failed to load after ${maxRetries} retries.`);
                reject(new Error(`Failed to load image at index ${i}`));
            }
        };

        // Corrección: El bucle debe ir hasta el último índice (i < imageSrcs.length)
        for (let i = 0; i < imageSrcs.length; i++) {
            const img = new Image();
            img.src = imageSrcs[i];
            const scale = Math.max(canvas.width / imageWidth, canvas.height / imageHeight);
            img.width = imageWidth * scale;
            img.height = imageHeight * scale;
            img.addEventListener('load', () => onImageLoad(i, img));
            img.addEventListener('error', () => onImageError(i, img));
            images.push(img);
        }
    });
};

const render = (
    renderingContext: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
) => {
    if (!renderingContext || !canvas || !image) {
        console.error('Unable to update canvas: missing parameters');
        return;
    }
    const offsetX = (canvas.width - image.width) / 2;
    const offsetY = (canvas.height - image.height) / 2;
    renderingContext.clearRect(0, 0, canvas.width, canvas.height);
    renderingContext.drawImage(image, offsetX, offsetY, image.width, image.height);
};