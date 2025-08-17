'use client';
import { Footer } from "@/shared/components/footer/footer";
import { Section1 } from "./sections/section-1/section-1";
import { Section3 } from "./sections/section-3/section-3";
import { Section4 } from "./sections/section-4/section-4";
import { Section5 } from "./sections/section-5/section-5";
import Section6 from "./sections/section-6/section-6";
import { Section2 } from "./sections/sections-2/section-2";
import { Fragment, RefObject, useEffect, useRef } from "react";
import './page.scss';

import gsap from "gsap";

export const dynamic = "force-static";

export default function HomeView() {

    useEffect(() => {
        document.querySelector(`html`)!.scrollTop = 0;
    }, []);

    const sectionsSpacersItems:{
        refSpacer: RefObject<HTMLDivElement | null>,
        refSection: RefObject<HTMLDivElement | null>
    }[] = Array.from({ length: 6 }, () => ({
        refSpacer: useRef<HTMLDivElement | null>(null),
        refSection: useRef<HTMLDivElement | null>(null)
    }));


    return (<>  
                <Section1  />
                <Section2  />
                <Section4  />
                <Section5 />
                <Section6 />
                <Footer  image="/images/footer/home.png"/>

            </>

        )

}