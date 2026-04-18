/**
 * This is the landing or home page 
 * has mixed contents such as breaking, trending and all random stories making the headlines
 * */
"use client"
import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import TopStories from "../sectors/top-stories"
import BreakingNews from "../sectors/breaking-stories"
import Featured from "../sectors/featured-stories"
/**
 * Truncate text
 * 
 * */
function truncate(text: string, limit: number){
   return text.length > limit ? text.slice(0, limit) + "..." : text
}
export default function LandingPage()
{
     
   /**
    * Get features
    * */
	return(
          <main className="main-wrapper grid grid-cols-1 gap-4 p-3 divide-y divide-gray-500">
          	 {/*Breaking news*/}
             {<BreakingNews />}

             {/*Trending or top stories*/}
             {<TopStories />}
             
             {/*featured*/}
             <Featured />
             {/*articles*/}
             <div>
                
             </div>
          </main> 
		)
}

