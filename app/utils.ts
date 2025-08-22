// Función para calcular el offset vertical
 //@ts-expect-error development
export const getVerticalOffset = (element) => {
    if (!element) return 0;
    return element.getBoundingClientRect().top + window.scrollY;
};

// Función para obtener la sección anterior
 //@ts-expect-error development
export const getPrevSection = (prevSectionClass, currentSectionElement) => {
    if (prevSectionClass) {
        const prevSection = document.querySelector(prevSectionClass);
        if (prevSection) {
            return prevSection;
        }
    }
    if (currentSectionElement && currentSectionElement.previousElementSibling) {
        return currentSectionElement.previousElementSibling;
    }
    return null;
};