


export const OnScrollInFn = (el: HTMLElement, callback: (el: HTMLElement) => void, options?: IntersectionObserverInit ) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                callback(el);
            }
        });
    }, options);

    observer.observe(el);
    return observer;
}

export const OnScrollOutFn = (el: HTMLElement, callback: (el: HTMLElement) => void, options?: IntersectionObserverInit ) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting){
                callback(el);
            }
        });
    }, options);
;
    observer.observe(el);
    return observer;
}