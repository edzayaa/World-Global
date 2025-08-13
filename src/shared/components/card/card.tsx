import { CSSProperties, forwardRef } from 'react';
import style from './card.module.scss';
import { Color } from '@/shared/types/colors';
import clsx from 'clsx';

export interface CardProps {
    children?: React.ReactNode;
    className?: string;
    color?: Color;
}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const finalClassname = clsx('card', style.card, props.className);

    const finalColor = `--color-${props.color?.color ?? 'white'}${props.color?.alpha ? '-alpha-' + props.color.alpha : ''}`;

    return (
        <div className={finalClassname} ref={ref} style={{ '--background-color': `var(${finalColor})` } as CSSProperties}>
            {props.children}
        </div>
    );
});
