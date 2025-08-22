import Image from "next/image"
import "./styles.css"
import Bottom from "../Bottom/Bottom"
import { useRouter, usePathname } from "next/navigation"
import { MouseEvent, useState } from "react"
import Link from "next/link"

const Navbar = () => {

  const router = useRouter()
  const pathName = usePathname()
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false)

  const toggleProductDropdown = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsProductDropdownOpen(!isProductDropdownOpen)
  }

  return (
    <nav className="navbar blur_bg">
      <Image src={"/images/navbar_logo.png"} width={95} height={95} alt="logo" />

      <Link className={`link ${pathName === '/' ? 'active' : ''}`} href="">Home</Link>
      <div className="wrapper">
       <button id="toggleBtn" onClick={toggleProductDropdown}  className={`link toggleBtn ${pathName.startsWith('/product/') ? 'active' : ''}`}>
          Product 
            <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.57351 1C1.66485 1 1.75618 1.02844 1.8258 1.08577L5.71707 4.2911L9.60835 1.08623C9.74758 0.971562 9.97314 0.971562 10.1124 1.08623C10.2516 1.20091 10.2516 1.38668 10.1124 1.50135L5.96881 4.914C5.82958 5.02867 5.60402 5.02867 5.46479 4.914L1.32122 1.50135C1.18199 1.38668 1.18199 1.20091 1.32122 1.08623C1.39084 1.02844 1.48218 1 1.57351 1Z" fill="#F8F7F3" stroke="#F8F7F3"/>
            </svg>

        </button>
   
          
        <div  id="content" className={`dropdown-menu blur_bg content ${isProductDropdownOpen?"open":''}`}>
            <Link  href="/product/page-1">Page 1</Link>
            <Link  href="/product/page-2">Page 2</Link>
            <Link  href="/product/page-3">Page 3</Link>
        </div>
      </div>

      <Link className={`link ${pathName === '/about-us' ? 'active' : ''}`}  /*onClick={(e) => navigateTo(e, "/about-us")}*/ href="/about-us">About us</Link>

      <Bottom bgArrowColor="yellow" arrowColor="white">
        Quote now
      </Bottom>
    </nav>
  )
}

export default Navbar