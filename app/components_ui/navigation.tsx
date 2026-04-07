import Link from 'next/link'
export default function Navigation(){
	const navItems = {home: "Home", news: "News", sport:"Sport", business:"Business"}
	return(
          <div>
          	  <nav>
          	    {/*Logo*/}
          	  	<div className="logo">
          	  		<h1>
          	  		  <Link href={Object.keys(navItems)[0]}>The Granite</Link>
          	  		</h1>  
          	  	</div>

          	  	{/*Navigation items*/}
          	  	<div className="navigation">
          	  		<ul>
                        {Object.entries(navItems).map(([key, value])=>(
                              <li key={key}><Link href={key}>{value}</Link></li>
                        ))}
          	  		</ul>
          	  	</div>
          	  </nav>
          </div>
		)
}