import { ForwardedRef, forwardRef, ReactNode } from "react";
import styles from './view-sections.module.scss';
import clsx from "clsx";

export interface ViewSectionProps {
    children?: ReactNode,
    className?: string,
    padding?: boolean
}

export const ViewSection = forwardRef<HTMLElement, ViewSectionProps>((props: ViewSectionProps, ref: ForwardedRef<HTMLElement>) => {
    const { children, className, padding } = props;
    const finalClassName = clsx(
        styles['view-section'],
        'view-section',
        className,
        padding && 'padding'
    );


    return (
        <section
            ref={ref}
            className={finalClassName}
        >
            {children}
        </section>
    );
});