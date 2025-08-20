"use client"
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { useGSAP } from "@gsap/react";
import { useDebouncedValue, useDidUpdate, useViewportSize } from '@mantine/hooks';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const frameCount = 200;

const Section1 = () => {

    const viewportSize = useViewportSize();
    const [loadedImages, setLoadedImages] = useState<HTMLImageElement[] | null>(null);
    const [debouncedViewportSize] = useDebouncedValue(viewportSize, 500)
    const isMobile = viewportSize.width < 768;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scopeRef = useRef(null);
    const imageSequence = useRef({ frame: 0 });

    useEffect(() => {
        if (!canvasRef.current || !viewportSize.width || !viewportSize.height || loadedImages) {
            return;
        }

        const intialSetup = async () => {
            const imageAspect = !isMobile ? 1920 / 1080 : 430 / 932;
            const imageWidth = viewportSize.width;
            const imageHeight = viewportSize.width / imageAspect;

            canvasRef.current.width = viewportSize.width;
            canvasRef.current.height = viewportSize.height;

            const imageSrcs = Array.from(
                { length: frameCount },
                (_, i) => `/videos/home/imageSequence/hero 2_00${i < 10 ? `00${i}` : i < 100 ? `0${i}` : i}.webp`
            );

            try {
                const images = await loadImagesAndDrawFirstFrame({
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
        const headings = gsap.utils.toArray('.text-container h3');

        if (!context) return;

        // const render = () => {
        //     const image = loadedImages[imageSequence.current.frame];
        //     if (!image) return;

        //     const offsetX = (canvas.width - image.width) / 2;
        //     const offsetY = (canvas.height - image.height) / 2;

        //     context.clearRect(0, 0, canvas.width, canvas.height);
        //     context.drawImage(image, offsetX, offsetY, image.width, image.height);
        // };

        const startAnimation = () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id:'image-sequence',
                    trigger: '.scroll-container',
                    scrub: 0.5,
                    start: 'top top',
                    end: '+=1000', 
                    pin: true,
                    markers: false,
                    
                }
            });

            tl.to(imageSequence.current, {
                frame: frameCount - 1,
                snap: 'frame',
                ease: 'none',
                onUpdate: () => render(context,canvasRef.current, loadedImages[imageSequence.current.frame]),
            });

            headings.forEach((heading, i) => {
                const duration = 1 / headings.length;
                const position = i * duration;
                tl.to(heading, { opacity: 1 }, position).to(heading, { opacity: 0 }, position + duration);
            });
        };

        // El chequeo ahora es contra el frameCount completo, no frameCount - 1.
        if (loadedImages.length === frameCount) {
            startAnimation();
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
        <div className='scope_section1' ref={scopeRef} >
            <div className="scroll-container">
                <canvas ref={canvasRef} className="canvas_image_sequence" />
                <div className="text-container">
                    <h3>Lorem ipsum dolor sit.</h3>
                    <h3>Labore, recusandae deleniti. Obcaecati.</h3>
                    <h3>Magni doloremque ducimus asperiores.</h3>
                    <h3>Ipsa in labore repellendus?</h3>
                    <h3>Inventore harum quasi quis?</h3>
                </div>
            </div>
          
        </div>
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