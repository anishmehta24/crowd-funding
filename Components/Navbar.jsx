"use client"
import React,{useState,useContext} from 'react'

import { CrowdFundingContext } from '../Context/CrowdFunding'
import {Menu , Logo} from '../Components/Index'

function Navbar() {

  const {currentAccount,connectWallet} = useContext(CrowdFundingContext)
  const [menuOpen,setMenuOpen] = useState(false)

  const menuList = ["White Paper","Projects","Donation" , "Members"]

  return (
    <div className = "backgroundMain">
      <div className='px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
        <div className='relative flex items-center justify-between'>
          <div className='flex items-center'>
            <a href="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center mr-8 "
            >
              <Logo color = "text-white" />
              <span className='ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase'> Company</span>
            </a>
            <ul className='flex item-center hidden space-x-8 lg:flex'></ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar