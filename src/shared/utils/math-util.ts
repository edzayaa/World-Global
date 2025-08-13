export const MapRange = (value: number, [minIn, maxIn]: [number, number], [minOut, maxOut]: [number, number], clamp = false) => {
    const inputRange = maxIn - minIn;
    const outputRange = maxOut - minOut;
    const scaledValue = ((value - minIn) / inputRange) * outputRange + minOut;

    if (clamp) {
        return Math.min(Math.max(scaledValue, minOut), maxOut);
    }

    return scaledValue;
}
