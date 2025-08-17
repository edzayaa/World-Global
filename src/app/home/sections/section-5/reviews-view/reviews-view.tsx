

'use client';
import { Card } from '@/shared/components/card/card';
import style from './reviews-view.module.scss';
import { Icon } from '@/shared/components/icon/icon';
import { Button } from '@/shared/components/button/button';
import { ReviewItem } from './review-item/review-item';
import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';
export const ReviewsView = ({spacerRef}: {spacerRef: RefObject<HTMLElement | null>}) => {

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

    const reviewsRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        animate();
    },[]);

    function animate(){
        
        gsap.fromTo(reviewsRefs.current, {
            translateY: 200
        }, {
            translateY: 0,
            stagger: 0.2,
            scrollTrigger: {
                trigger: spacerRef.current,
                scroller: document.querySelector(`html`),
                start: 'top top',
                end: '+=90%',
                scrub: true
            }
        });
    }

    return <>
        <div className={`scroll-custom scroll-yellow review-view ${style['reviews-view']}`}>
            {reviews.map((item, index) => (
                <ReviewItem key={index} {...item} ref={el => {reviewsRefs.current[index] = el}} />
            ))}
        </div>
    </>

}