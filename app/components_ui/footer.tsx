import Link from 'next/link'
export default function Footer()
{
	const navItems = {home:"Home", news:"News", sport:"Sport", business:"Business", entertainment:"Entertainment"}
	return (

            <div className="py-8 px-3">
                 <div className="">
                        <div><h1 className="pt-8 px-3 text-4xl text-start">The Granite</h1></div>
		            	<div className="navigation pt-3 divide-y divide-yellow-500">
		          	  		<ul className="flex flex-row justify-start">
		                        {Object.entries(navItems).map(([key, value])=>(
		                              <li key={key}><Link className="px-2" href={key}>{value}</Link></li>
		                        ))}
		          	  		</ul>
		          	  	</div>
                </div>
                <div className="">
                        <div><h1 className="pt-8 px-3 text-base text-start">Follow The Granite on:</h1></div>
		            	<div className="navigation pt-3 divide-y divide-yellow-500">
		          	  		<ul className="flex flex-row justify-start">
		                        {Object.entries(navItems).map(([key, value])=>(
		                              <li key={key}><Link className="px-2" href={key}>{value}</Link></li>
		                        ))}
		          	  		</ul>
		          	  	</div>
                </div>
            </div>
		)
}