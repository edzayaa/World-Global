

import { Card } from '@/shared/components/card/card';
import style from './reviews-view.module.scss';
import { Icon } from '@/shared/components/icon/icon';
import { Button } from '@/shared/components/button/button';
import { ReviewItem } from './review-item/review-item';

export const ReviewsView = () => {

    const reviews = [
        {
            photo: '1',
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        },
        {
            photo: '2',
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        },
        {
            photo: '3',
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        },
        {
            photo: '4',
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        },
        {
            photo: '1',
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        },
        {
            photo: '2',
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        },
        {
            photo: '3',
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        },
        {
            photo: '4',
            name: 'John Doe',
            review: 'Lorem ipsum dolor sit amet consectetur. Duis sed eget at sed tincidunt rhoncus dolor justo aliquam.'
        }
    ]

    return <>
        <div className={`scroll-custom scroll-yellow review-view ${style['reviews-view']}`}>
            {reviews.map((item, index) => (
                <ReviewItem key={index} {...item} />
            ))}
        </div>
    </>

}