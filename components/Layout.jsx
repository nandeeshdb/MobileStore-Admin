
import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({children}) {
  const { data: session } = useSession()
  if(!session){

    return (
      <div className='h-screen w-screen bg-blue-800 flex items-center'>
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
    <div className="bg-blue-800 h-screen w-screen flex">
      <Nav />
      <div className="bg-white flex-grow my-4 mx-4 p-4 rounded-lg ">{children}</div>
      </div>
  
   
  )
}
