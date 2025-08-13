import { usePathname } from 'next/navigation';
import { Icon } from '../../icon/icon';
import style from './nav-section.module.scss';

export const NavSection = ({ openState }: { openState: boolean }) => {

    const path = usePathname();

    return (
        <div className={`${style['nav-section']} nav-section ${openState ? 'open' : ''}`}>
            <a className={`${path === '/home' ? 'active' : ''}`} href="/home">Home</a>
            <div className="product-item">
                <div className="product-label">
                    <span>Product</span>
                    <Icon icon={'arrow-down'} />
                </div>
                <div className="product-wrapper">
                    <a className={`${path === '/products/palm' ? 'active' : ''}`} href="/products/palm">Palm</a>
                    <a className={`${path === '/products/bamboo' ? 'active' : ''}`} href="/products/bamboo">Synthetic Bamboo</a>
                </div>
            </div>
            <a className={`${path === '/about-us' ? 'active' : ''}`} href="/about-us">About Us</a>
            <a className={`${path === '/technology' ? 'active' : ''}`} href="/technology">Technology</a>
            <a className={`${path === '/contact-us' ? 'active' : ''}`} href="/contact-us">Contact Us</a>
            <div className="extra-sites hide-min-md">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms & Conditions</a>
            </div>
        </div>
    );
};
