

import { Card } from '@/shared/components/card/card';
import style from './reviews-view.module.scss';

export const ReviewsView = () => {

    const reviews = [
        {
            photo: 1,
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        },
        {
            photo: 2,
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        },
        {
            photo: 3,
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        },
        {
            photo: 4,
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        }
    ]

    return <>
        <div className={`scroll-custom scroll-yellow review-view ${style['reviews-view']}`}>
            {reviews.map((item, index) => (            
                <div className="review-item" key={index}>
                    <img src={`/images/home/customers/${item.photo}.png`} alt={item.name} />
                    <Card color={{color: 'white', alpha: '25'}}>
                        <h3>{item.name}</h3>
                        <p>{item.review}</p>
                    </Card>
   
                </div>
            ))}            
        </div>
    </>

}