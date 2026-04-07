import Link from 'next/link'
export default function Navigation(){
	const navItems = {home:"Home", news:"News", sport:"Sport", business:"Business", entertainment:"Entertainment"}
	return(
          <div className="container mx-auto md:container md:mx-auto p-8">
          	  <nav className="grid grid-cols-1">
          	    {/*Logo*/}
          	  	<div className="top-section grid grid-cols-3">
                  {/*Navigation icon*/}
                  <div className="navicon">Navicon</div>
          	  		{/*Branding*/}
                  
          	  		  <Link href={Object.keys(navItems)[0]} className="px-8 text-4xl">The Granite</Link>
          	  		
                  {/*Register and signin button*/}
                  <div className="top-section-buttons grid-cols-2 ">
                      <Link href="" className="px-8">Register</Link>
                      <Link href="" className="px-8">Sign In</Link>
                  </div>
          	  	</div>

          	  	{/*Navigation items*/}
          	  	<div className="navigation pt-3">
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