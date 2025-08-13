import { Children, CSSProperties, forwardRef } from 'react';
import style from './button.module.scss';
import clsx from 'clsx';
import { Color } from '@/shared/types/colors';

export interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    color?: Color;
    border?: boolean;
    borderColor?: Color;
    circle?: boolean;
}

export const Button = forwardRef<HTMLDivElement, ButtonProps>((props, ref) => {

    const finalClassname = clsx('button', style.button, props.className, {
        'button-circle': props.circle,        
        'button-mono-child': Children.count(props.children) === 1,
        'button-border': props.border
    });

    const finalColor = `--color-${props.color?.color ?? 'white'}${props.color?.alpha ? '-alpha-' + props.color.alpha : '-alpha-5'}`;
    const finalBorderColor = props.borderColor ? `--color-${props.borderColor.color}${props.borderColor.alpha ? '-alpha-' + props.borderColor.alpha : '-alpha-5'}` : 'var(--border-color)'; 

    return <div className={finalClassname} onClick={props.onClick} ref={ref} style={{ '--background-color': `var(${finalColor})`, '--border-color': `var(${finalBorderColor})` } as CSSProperties}>
        {props.children}
    </div>;

})