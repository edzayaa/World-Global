import gsap from "gsap";

const distance = 50;

export const InFromTop = {
    fn: (el: HTMLElement) => {
        gsap.to(el, {
            translateY: 0,
            opacity: 1
        })

    },
    set: (el: HTMLElement) => {
        gsap.set(el, {
            translateY: -distance,
            opacity: 0
        });
    }
}

export const InFromLeft = {
    fn: (el: HTMLElement) => {
        gsap.to(el, {
            translateX: 0,
            opacity: 1
        })

    },
    set: (el: HTMLElement) => {
        gsap.set(el, {
            translateX: -distance,
            opacity: 0
        });
    }
}

export const InFromRight = {
    fn: (el: HTMLElement) => {
        gsap.to(el, {
            translateX: 0,
            opacity: 1
        })

    },
    set: (el: HTMLElement) => {
        gsap.set(el, {
            translateX: distance,
            opacity: 0
        });
    }
}

export const inFromScaleZero = {
    fn: (el: HTMLElement) => {
        gsap.to(el, {
            scale: 1,
            opacity: 1
        })

    },
    set: (el: HTMLElement) => {
        gsap.set(el, {
            scale: 0,
      
        });
    }
}

export const inFromOpacityZero = {
    fn: (el: HTMLElement) => {
        gsap.to(el, {
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut'
        })

    },
    set: (el: HTMLElement) => {
        gsap.set(el, {
            opacity: 0
        });
    }
}

export const inFromTopClipPath = {
    fn: (el: HTMLElement) => {
        gsap.to(el, {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 2
        })

    },
    set: (el: HTMLElement) => {
        gsap.set(el, {
            clipPath: 'polygon(0% 0%, 100% 0, 100% 0%, 0% 0%)',
            ease: 'power2.in'
        });
    }
}