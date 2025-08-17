

import { Button } from '@/shared/components/button/button';
import style from './section-6.module.scss';
import { Icon } from '@/shared/components/icon/icon';
import { ViewSection } from '@/shared/components/view-sections/view-sections';
import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Section6 = () => {

    const photos = [
        '1',
        '2',
        '3'
    ]

    const internalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const height = internalRef.current?.offsetHeight || 0;
        internalRef.current!.style.flex = `0 0 ${height}px`;
        internalRef.current!.style.minHeight = 'unset';
        animate();
    }, []);

    function animate(){

    }
    
    return (
        <ViewSection className={style['section-6']} padding ref={internalRef}>
            <div className="photos-wrapper">
                {photos.map((photo, index) => (
                    <img key={index} src={`/images/products/${photo}.png`} alt={`Product ${photo}`} />
                ))}
            </div>
            <div className="buttons-wrapper hide-min-md">
                <Button circle color={{color: 'black', alpha: '100'}}>
                    <Icon icon={'arrow-left'} color={{color: 'white', alpha: '100'}} />
                </Button>
                <Button circle color={{color: 'black', alpha: '100'}}>
                    <Icon icon={'arrow-right'} color={{color: 'white', alpha: '100'}} />
                </Button>
            </div>
        </ViewSection>
    );
};

export default Section6;