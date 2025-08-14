'use client';

import { useEffect, useState } from 'react';
import style from './navbar.module.scss';
import { AnimatedContainer } from '../animated-container/animated-container';
import clsx from 'clsx';
import { Icon } from '../icon/icon';
import { InFromTop } from '../animated-container/libs/Animations';
import { Button } from '../button/button';
import { NavSection } from './nav-section/nav-section';

export const Navbar = () => {
    const [inSignal, setInSignal] = useState(false);
    const [openPanel, setOpenPanel] = useState(false);

    useEffect(() => {
        document.addEventListener('loader-hidden', () => { setInSignal(true)}); 
    })

    return (
        <>
            <div className={style.backdrop}></div>
            <AnimatedContainer inSignal={inSignal} animationIn={InFromTop} className={clsx(style.navbar)}>
                <Icon icon={'logo-after'}></Icon>
                <NavSection openState={openPanel} />
                <Button border className='button-menu hide-min-md' onClick={() => setOpenPanel(!openPanel)}>
                    <Icon icon={'menu'} />
                </Button>
                <Button className='button-menu-close hide-min-md' onClick={() => setOpenPanel(!openPanel)} >
                    <Icon icon={'close'} />
                </Button>
                <Button border className='quote-button'>
                    <span>Quote now</span>
                    <Button circle color={{color: 'orange', alpha: '100'}}>
                        <Icon color={{color: 'white', alpha: '100'}} icon='arrow-right-with-tail' />
                    </Button>
                </Button>
            </AnimatedContainer>
        </>
    )

}