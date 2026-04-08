import Link from 'next/link'
import { Menu, Search } from 'lucide-react'

export default function Navigation(){
	const navItems = {home:"Home", news:"News", sport:"Sport", business:"Business", entertainment:"Entertainment"}
	return(
          <div className="container mx-auto md:container md:mx-auto py-8 divide-y divide-gray-500">
          	  <nav className="grid grid-cols-1 divide-y divide-gray-500">
          	    {/*Logo*/}
          	  	<div className="top-section grid-group-main">

                    <div className="essentials grid grid-cols-2 gap-4"> 
                         {/*Navigation icon*/}
                         <div className="navicon"><Menu /></div>

                         {/*Search button*/}
                         <div className="search px-3"><Search /></div>
          	  		  </div>
                  {/*Branding*/}
                  
          	  		  <Link href={Object.keys(navItems)[0]} className="px-8 text-4xl text-center">The Granite</Link>
          	  		
                  {/*Register and signin button*/}
                  <div className="top-section-buttons grid-cols-2 ">
                      <Link href="" className="p-3 px-8 bg-black text-white">Register</Link>
                      <Link href="" className="p-3 px-8">Sign In</Link>
                  </div>
          	  	</div>

          	  	{/*Navigation items*/}
          	  	<div className="navigation pt-3 divide-y divide-yellow-500">
          	  		<ul className="flex flex-row justify-center">
                        {Object.entries(navItems).map(([key, value])=>(
                              <li key={key}><Link className="px-8" href={key}>{value}</Link></li>
                        ))}
          	  		</ul>
          	  	</div>
          	  </nav>
          </div>
		)
}