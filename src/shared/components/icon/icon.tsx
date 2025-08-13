

import { CSSProperties, forwardRef } from 'react';
import style from './icon.module.scss';
import clsx from 'clsx';
import { Color } from '@/shared/types/colors';

export interface IconProps{
    icon: 'close' | 'logo' | 'logo-after' | 'menu' | 'arrow-right-with-tail' | 'bamboo' | 'shield' | 'planet-nature' | 'leaf' | 'waves' | 'fire' | 'arrow-down',
    color?: Color,
    className?: string
}

export const Icon = forwardRef<HTMLElement, IconProps>((props: IconProps, ref) => {

    const finalClassname = clsx(style.icon, 'icon', `icon-${props.icon}`, props.className);
    const finalColor = `--color-${props.color?.color ?? 'white'}${props.color?.alpha ? '-alpha-' + props.color.alpha : ''}`;

    return (
        <i className={finalClassname} ref={ref} style={{'--color': `var(${finalColor})`} as CSSProperties}></i>
    )
})