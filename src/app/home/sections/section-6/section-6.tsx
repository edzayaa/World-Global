

import { Button } from '@/shared/components/button/button';
import style from './section-6.module.scss';
import { Icon } from '@/shared/components/icon/icon';
import { ViewSection } from '@/shared/components/view-sections/view-sections';

const Section6 = () => {
    
    const photos = [
        '1',
        '2',
        '3'
    ]
    
    return (
        <ViewSection className={style['section-6']} padding>
            
            <div className="photos-wrapper">
                {photos.map((photo, index) => (
                    <img key={index} src={`/images/products/${photo}.png`} alt={`Product ${photo}`} />
                ))}
            </div>
            <div className="buttons-wrapper">
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