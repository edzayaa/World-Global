import Link from "next/link"
import "./styles.css"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

const Footer = () => {
   const router = useRouter();
   const pathName = usePathname();

   const goToTop = () => {
       router.push("#top");
   }

  return (
    <footer className="footer">
        <div className="links_section">
            <div className="links">
                <Link className={`menu-links ${pathName === '/'? "active" : ""}`} href="/">Home</Link>
                <Link className={`menu-links ${pathName === '/about-us'? "active" : ""}`} href="/about-us">About Us</Link>
                <Link className={`menu-links ${pathName === '/products/bamboo'? "active" : ""}`} href={"/products/bamboo"} >Bamboo</Link>
                <Link className={`menu-links ${pathName === '/products/palm'? "active" : ""}`} href={"/products/palm"} >Palm</Link>
                <Link className={`menu-links ${pathName === "/contact-us"? "active" : ""}`} href="/contact-us">Contact us</Link>
            </div>
            <div className="social_media">
                <address className="links_box">
                    <Link className={"menu-links active"} target='_blank' href="mailto:hello@worldgd.com" rel="noopener noreferrer">hello@worldgd.com</Link>
                    <Link className={"menu-links active"} href="tel:+1 (000) 0000 0000" target="_blank" rel="noopener noreferrer">+1 (xxx) xxxx xxxx</Link>
                    <Link className={"menu-links active"} href="https://maps.app.goo.gl/iAfCA2afoANwA3a66" target="_blank" rel="noopener noreferrer">456 Elm Street, Suite 200 New York, NY 10001 United States</Link>
                </address>
                <div className="links_box_2">
                    <Link className={"menu-links"} target="_blank"  href="https://www.instagram.com/" rel="noopener noreferrer">Instagram</Link>
                    <Link className={"menu-links"} target="_blank" href="https://x.com/" rel="noopener noreferrer">X</Link>
                </div>    
            </div>   
        </div>
        <div className="policies_mobile">
            <Link className={`menu-links ${pathName === '/terms-&-conditions'? "active" : ""}`} href="/terms-and-conditions">Terms & Conditions</Link>
            <Link className={`menu-links policy ${pathName === '/privacy-policy'? "active" : ""}`} href="/privacy-policy">Privacy Policy</Link>           
        </div>
        <div className="image_footer">
            <img className="world_image" src={"/images/world-name.png"} alt="world global" />
            <svg onClick={goToTop} width="83" height="94" viewBox="0 0 83 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38.3017 1.57913L1.70851 38.1724C-0.0128605 39.8937 -0.0128607 42.6933 1.70851 44.4147C3.42987 46.136 6.22946 46.136 7.95082 44.4147L36.9965 15.369L37.006 89.0567C37.006 91.4969 38.9827 93.4736 41.4229 93.4736C43.8631 93.4736 45.8398 91.4969 45.8398 89.0567L45.8303 15.369L74.876 44.4147C76.5974 46.136 79.397 46.136 81.1184 44.4147C82.8397 42.6933 82.8397 39.8937 81.1184 38.1723L44.5346 1.58859C42.8227 -0.142238 40.0231 -0.142237 38.3017 1.57913Z" fill="#AB8E4C"/>
            </svg>
        </div>

        <div className="last_links" >
            <span className={"menu-links active"}>© All rights reserved 2025</span>
            <div className="policies">
                <Link className={`menu-links ${pathName === '/terms-&-conditions'? "active" : ""}`} href="/terms-and-conditions">Terms & Conditions</Link>
                <Link className={`menu-links policy ${pathName === '/privacy-policy'? "active" : ""}`} href="/privacy-policy">Privacy Policy</Link>           
            </div>
        </div>
    </footer>
  )
}

export default Footer