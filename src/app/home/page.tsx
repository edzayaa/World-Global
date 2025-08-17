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


    return (
        <Fragment>
            <Fragment>
                <Section1 spacerRef={sectionsSpacersItems[0].refSpacer} ref={sectionsSpacersItems[0].refSection} />
                <Section2 spacerRef={sectionsSpacersItems[1].refSpacer} ref={sectionsSpacersItems[1].refSection} />
                <Section4 spacerRef={sectionsSpacersItems[2].refSpacer} ref={sectionsSpacersItems[2].refSection} />
                <Section5 spacerRef={sectionsSpacersItems[3].refSpacer} />
                <Section6 spacerRef={sectionsSpacersItems[4].refSpacer} />
                <Footer spacerRef={sectionsSpacersItems[5].refSpacer}  image="/images/footer/home.png"/>
            </Fragment>
            <div className="sections-wrapper">
                <div className="section-spacer" ref={sectionsSpacersItems[0].refSpacer}></div>
                <div className="section-spacer" ref={sectionsSpacersItems[1].refSpacer}></div>
                <div className="section-spacer" ref={sectionsSpacersItems[2].refSpacer}></div>
                <div className="section-spacer" ref={sectionsSpacersItems[3].refSpacer}></div>
                <div className="section-spacer" ref={sectionsSpacersItems[4].refSpacer}></div>
                <div className="section-spacer" ref={sectionsSpacersItems[5].refSpacer}></div>
            </div>
            
            
        </Fragment>
        
    )
    
}