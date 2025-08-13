import { Section1 } from "./sections/section-1/section-1";
import { Section3 } from "./sections/section-3/section-3";
import { Section4 } from "./sections/section-4/section-4";
import { Section5 } from "./sections/section-5/section-5";
import { Section2 } from "./sections/sections-2/section-2";

export const dynamic = "force-static";

export default function HomeView() {
    return (
        <>
            <Section1/>
            <Section2/>
            <Section4/>
            <Section5/>
        </>
    )
    
}