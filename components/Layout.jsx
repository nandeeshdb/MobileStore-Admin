
import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"
import Logo from "./Logo";

export default function Layout({children}) {
  const { data: session } = useSession()
  const[showNav,setShowNav] = useState(false);
  if(!session){

    return (
      <div className='h-screen w-screen bg-bgGray flex items-center'>
      <div className='text-center w-full'>
      <button 
      className="bg-white p-3 rounded-lg"
      onClick={()=>signIn('google')}
    
      
      >
        Login with google</button>
      </div>
    </div>
    )

  }
  return (
    <div className="bg-bgGray min-h-screen ">
     <div className=" md:hidden flex  items-center p-4">
     <button onClick={()=>setShowNav(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6">
      <path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
      </svg>

      </button>

      <div className="flex flex-grow justify-center ml-6"><Logo /></div>
      </div>
    <div className=" flex">
      <Nav show={showNav} />
      <div className="flex-grow  p-4">{children}</div>
      </div>
    </div>
    
  )
}
