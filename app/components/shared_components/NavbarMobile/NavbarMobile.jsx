

import { useRef, memo } from "react";
import gsap from "gsap"; // Importa GSAP
import { useGSAP } from "@gsap/react";
import "./styles.css"
import Image from "next/image";
import {  usePathname } from "next/navigation";
import Link from "next/link";

gsap.registerPlugin(useGSAP);


 const NavbarMobile = () => {

  const pathName = usePathname()

  const menuRef = useRef(null); // Referencia al contenedor del menú

  const container = useRef();
  // store the timeline in a ref.
  const tl = useRef();
      
  const { contextSafe } = useGSAP(() => {
    
    tl.current = gsap.timeline({ paused: true }) // Mantenemos esta configuración
      .fromTo(container.current, {
        height: "60px"
      }, {
        height: "900px",
      }).fromTo(".menu-list", {
        opacity:0,
        y:"-20px"
      }, {
        opacity:1,
        y:0,
        delay:0.065
      }).fromTo(".menu-list-extra", {
        opacity:0,
        y:"-20px"
      }, {
        opacity:1,
        y:0,
        delay:0.04
      });
  }, { scope: container });
  
  
  const toggleTimeline = contextSafe(() => {
   
  if (tl.current.progress() === 0) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
    
  });



  return (
   <nav ref={container} className="navbar-mobile blur_bg">
            <div className="alwayws_visible">
                <Image src={"/images/navbar_logo.png"} width={57} height={57} alt="logo" />

                <button className="toggle-btn" onClick={toggleTimeline}>
                    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1.62561H25" stroke="white" strokeWidth="1.5"/>
                        <path d="M4.46484 10L25.0006 10" stroke="white" strokeWidth="1.5"/>
                        <path d="M0 18.3744H25" stroke="white" strokeWidth="1.5"/>
                    </svg>
                </button>
            </div>

            <div ref={menuRef} className="menu-container">
                <ul className="menu-list">
                    {menuItems.map(({label, url}, index) => {
                        // Compara la URL del item con el pathname actual
                        const isActive = url === pathName;
                  
                        // Asigna la clase 'active' si isActive es true
                        const className = `menu-item ${isActive ? "active" : ""}`;
                        return (
                            <li key={index} className={className}>
                                <Link href={url}>{label}</Link>
                            </li>
                        )}
                    )}
                </ul>

                <ul className="menu-list-extra">
                    {menuExtraItems.map(({label, url}, index) => {
                        // Compara la URL del item con el pathname actual
                        const isActive = url === pathName;
                        // Asigna la clase 'active' si isActive es true
                        const className = `menu-item ${isActive ? "active" : ""}`;
                        return (
                            <li key={index} className={className}>
                                <Link href={url}>{label}</Link>
                            </li>
                        )}
                    )}
                </ul>
            </div>

        </nav>
  );
}

export default memo(NavbarMobile);

  const menuItems = [
    {label:"Home", url:"/"},
    {label:"Product Palm", url:"/products/product-palm"},
    {label:"Synthetic Bamboo", url:"/products/synthetic-bamboo"},
    {label:"About Us", url:"/about-us"},
    {label:"Technology", url:"/technology"},
    {label:"Contact Us", url:"/contact-us"},
   ];

  const menuExtraItems = [
    {label:"Privacy Policy", url:"/privacy-policy"},
    {label:"Terms & Conditions", url:"/terms-&-tonditions"},
   ];