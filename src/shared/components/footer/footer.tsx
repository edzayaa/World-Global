'use client';
import { usePathname } from 'next/navigation';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { ViewSection } from '../view-sections/view-sections';
import style from './footer.module.scss';
import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';


export const Footer = ({image}: {image: string}) => {

    const activePath = usePathname();

    const internalRef = useRef<HTMLDivElement | null>(null);
    const sectionRef1 = useRef<HTMLDivElement | null>(null);
    const sectionRef2 = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        animate();
    }, [])

    function animate(){


    }

    return <>
        <div className="section-footer" ref={internalRef}>
            <ViewSection className={style['form-pre-footer']} ref={sectionRef1} >
                
                <img className='image-footer hide-sm' src={image} alt="" />
                <div className="form-container">
                    <div className="title">
                        <h1>Get In Touch With WorldGD</h1>
                        <p>Have a question or need assistance? Contact us and our team at WorldGD will get back to you as soon as possible.</p>
                        <span className='hide-sm'>hello@worldgd.com</span>
                    </div>
                    <div className="form-wrapper">
                        <input type="text" placeholder='Full name' />
                        <input type="text" placeholder='Email' />
                        <input type="text" placeholder='Phone number' />
                        <div className="select-wrapper">
                            <span className='placeholder' >Select bamboo or palms</span>
                            <select defaultValue={''}>
                                <option value="" disabled hidden></option>
                                <option value="bamboo">Bamboo</option>
                                <option value="palms">Palms</option>
                            </select>
                        </div>
                        <textarea  placeholder='Message' />
                        <Button color={{'color': 'yellow-2', alpha: '100'}} >
                            <span>Submit</span>
                            <Button circle color={{color: 'white', alpha: '100'}} >
                                <Icon icon={'arrow-right-with-tail'} color={{color: 'yellow-2', alpha: '100'}}/>
                            </Button>
                        </Button>
                    </div>
                </div>

            </ViewSection>
            <ViewSection className={style.footer} ref={sectionRef2}>
                <div className="links-wrapper">
                    <a className={activePath === '/home' ? 'active' : ''} href="/home">Home</a>
                    <a className={activePath === '/about-us' ? 'active' : ''} href="/about-us">About Us</a>
                    <a className={activePath === '/bamboo' ? 'active' : ''} href="/bamboo">Bamboo</a>
                    <a className={activePath === '/palm' ? 'active' : ''} href="/palm">Palm</a>
                    <a className={activePath === '/contact-us' ? 'active' : ''} href="/contact-us">Contact Us</a>
                </div>
                <div className="contact-info">
                    <span>hello@worldgd.com</span>
                    <span>+1 (xxx) xxxx-xxxx</span>
                    <div className="address-wrapper">
                        <span>456 Elm Street, Suite 200</span>
                        <span>New York, NY 10001</span>
                        <span>United States</span>
                    </div>
                    <div className="social-links-wrapper hide-sm">
                        <a href="">Instagram</a>
                        <a href="">X</a>
                    </div>
                </div>
                <div className="end-wrapper">
                    <div className="extras-sites">
                        <a href="/terms-of-service">Terms and Conditions</a>
                        <a href="/privacy-policy">Privacy Policy</a>
                    </div>
                    <div className="world-name">
                        <img src="/images/world-name.png" alt="World Global" />
                        <Button circle className='hide-sm'>
                            <Icon color={{color: 'orange', alpha: '100'}} icon={'arrow-up-with-tail'}></Icon>
                        </Button>
                    </div>
                    <span>© All rights reserved 2025.</span>
                </div>
            </ViewSection>
        </div>
    </>
}