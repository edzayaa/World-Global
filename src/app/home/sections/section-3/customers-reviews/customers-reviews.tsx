

import { AnimatedContainer } from '@/shared/components/animated-container/animated-container';
import style from './customers-reviews.module.scss';
import { InFromRight } from '@/shared/components/animated-container/libs/Animations';


export const CustomersReviews = () => {

    const customersImages = ['1', '2', '3', '4'];

    return <>
        <div className={style['customers-reviews']}>
            <div className="customer-images-wrapper">
                {customersImages.map((image, index) => <img className='customer-image' key={index} src={`/images/home/customers/${image}.png`} alt={`Customer ${image}`} />)}
                <span>1M +</span>
            </div>
            <span>Customers around the world</span>
        </div>
    </>


}