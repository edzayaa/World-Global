// "use client"
// import { useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import './styles.css';
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// // Define el número total de imágenes en tu secuencia
// const frameCount = 120; 

// // Genera un array con todas las URL de las imágenes de Apple
// const urls = new Array(frameCount)
//     .fill()
//     .map(
//         (o, i) =>
//             `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
//                 i + 1
//             )
//                 .toString()
//                 .padStart(4, '0')}.jpg`
//     );

// const Section3 = () => {
//     const canvasRef = useRef(null);
//     const scopeRef = useRef(null);
//     const imageSequence = useRef({ frame: 0 });
//     const images = useRef([]);

//     useGSAP(() => {
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
//         const headings = gsap.utils.toArray('.text-container_3 h3');

//         // Carga todas las imágenes desde las URL
//         let imagesLoaded = 0;
//         for (let i = 0; i < frameCount; i++) {
//             const img = new Image();
//             img.onload = () => {
//                 imagesLoaded++;
//                 if (imagesLoaded === frameCount) {
//                     startAnimation();
//                 }
//             };
//             img.src = urls[i];
//             images.current.push(img);
//         }

//         const startAnimation = () => {
//             // Ajusta las dimensiones del canvas
//             canvas.width = images.current[0].width;
//             canvas.height = images.current[0].height;

//             const tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: '.scroll-container_3',
//                     scrub: 0.5,
//                     start: 'top top',
//                     end: 'bottom top',
//                     pin: true,
//                     markers: false // Puedes dejarlos para depurar, pero es mejor desactivarlos
//                 }
//             });

//             // Animación de la secuencia de imágenes
//             tl.to(imageSequence.current, {
//                 frame: frameCount - 1,
//                 snap: 'frame',
//                 ease: 'none',
//                 onUpdate: render,
//             });

//             // Animación de los textos
//             headings.forEach((heading, i) => {
//                 const duration = 1 / headings.length;
//                 const position = i * duration;

//                 tl.to(heading, { opacity: 1 }, position)
//                   .to(heading, { opacity: 0 }, position + duration);
//             });

//             render();
//         };

//         const render = () => {
//             context.clearRect(0, 0, canvas.width, canvas.height);
//             context.drawImage(images.current[imageSequence.current.frame], 0, 0);
//         };
//     }, { scope: scopeRef });

//     return (
//         <div ref={scopeRef}>
//           <div className="spacer"></div>
//             <div className="scroll-container_3">
//                 <canvas ref={canvasRef} />
//                 <div className="text-container_3">
//                     <h3>Lorem ipsum dolor sit.</h3>
//                     <h3>Labore, recusandae deleniti. Obcaecati.</h3>
//                     <h3>Magni doloremque ducimus asperiores.</h3>
//                     <h3>Ipsa in labore repellendus?</h3>
//                     <h3>Inventore harum quasi quis?</h3>
//                 </div>
//             </div>
//             {/* Es buena práctica agregar un div extra para crear el scroll, si no hay más contenido */}
// <div className="spacer"></div>
//         </div>
//     );
// };

// export default Section3;