import clsx from "clsx";
import { forwardRef, ReactNode, useEffect, useImperativeHandle, useRef } from "react"

export interface AnimationFunctionItem {
    fn: (el: HTMLElement) => void,
    set: (el: HTMLElement) => void
}

export interface AnimatedContainerProps {
    children?: ReactNode,
    className?: string,
    animationIn?: AnimationFunctionItem,
    animationOut?: AnimationFunctionItem,
    delay?: number,
    inSignal?: boolean
    outSignal?: boolean
}



export const AnimatedContainer = forwardRef<HTMLDivElement, AnimatedContainerProps>((props, ref) => {

    const objIn = useRef(false);
    const objOut = useRef(false);
    const internalRef = useRef<HTMLDivElement>(null);
    const finalClassname = clsx("animated-container", props.className);

    useEffect(() => {
        if(!internalRef.current) return;
        
        if(objIn.current == false )
            props.animationIn?.set?.(internalRef.current!);

        if (props.inSignal) {
            objIn.current = true;
            setTimeout(() => {
                props.animationIn?.fn?.(internalRef.current!);
            }, props.delay);
        }

    }, [props.inSignal]);


    useEffect(() => {
        if(!internalRef.current) return;

        if(objOut.current == false )
            props.animationOut?.set?.(internalRef.current!);

        if (props.outSignal && internalRef.current) {
            objOut.current = true;
            objIn.current = false;
            setTimeout(() => {
                props.animationOut?.fn?.(internalRef.current!);
            }, props.delay);
        }
    }, [props.outSignal]);

    useImperativeHandle(ref, () => internalRef.current!, [])

    return (
        <div className={finalClassname} ref={internalRef}>
            {props.children}
        </div>
    )
});