import React from 'react'
import { useState } from 'react';
import Dialogue from '../components/Dialogue';

export default function Home() {
    const[openDialogue,setOpenDialogue]=useState(false);
  return (
    <>
    <div className="bg-orange-50 min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className='text-orange-600 text-6xl font-semibold'>
            Easy-Cook-Book 🍲
        </h1>
      <img src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1XAT8q.img?w=1012&h=569&m=6" alt="Easy Cook Book" className="my-8 rounded-lg shadow-lg" />

        <p className="mt-6 text-lg sm:text-xl text-orange-500 max-w-3xl leading-relaxed">
            At Easy Cook Book, we make cooking fast, simple, and fun! ⏱️🍴<br /><br />
    Just tell us what ingredients you have, and within a short time, we’ll suggest a perfect recipe for you. No more last-minute cooking stress – we help you turn what’s in your kitchen into delicious meals quickly and easily.<br /><br />
    Cooking smart has never been this easy!
        </p>
          <button  onClick={()=>setOpenDialogue(true)}className="mt-8 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition">
            Get Started 🍽️
          </button>
      
    </div>
    <Dialogue open={openDialogue}onClose={()=>setOpenDialogue(false)}/>
    </>
  )
}
