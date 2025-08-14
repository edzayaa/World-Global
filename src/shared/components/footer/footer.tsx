'use client';
import { usePathname } from 'next/navigation';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { ViewSection } from '../view-sections/view-sections';
import style from './footer.module.scss';

export const Footer = () => {

    const activePath = usePathname();

    return <>
        <ViewSection className={style['form-pre-footer']}>
            <div className="title">
                <h1>Get In Touch With WorldGD</h1>
                <p>Have a question or need assistance? Contact us and our team at WorldGD will get back to you as soon as possible.</p>
            </div>
            <div className="form-wrapper">
                <input type="text" placeholder='Full name' />
                <input type="text" placeholder='Email' />
                <input type="text" placeholder='Phone number' />
                <div className="select-wrapper">
                    <span className='placeholder' >Select bamboo or palms</span>
                    <select>
                        <option value="" disabled selected hidden></option>
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

        </ViewSection>
        <ViewSection className={style.footer}>
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
            </div>
            <div className="end-wrapper">
                <div className="extras-sites">
                    <a href="/terms-of-service">Terms and Conditions</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                </div>
                <div className="world-name">
                    <img src="/images/world-name.png" alt="World Global" />
                    <Button circle className='hide-sm'>
                        <Icon icon={'arrow-up-with-tail'}></Icon>
                    </Button>
                </div>
                <span>© All rights reserved 2025.</span>
            </div>
        </ViewSection>
    </>
}