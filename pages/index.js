
import Layout from "@/components/Layout"
import { useSession } from "next-auth/react"
import Image from "next/image"


export default function Home() {
  const{data:session} = useSession()
  return (
    <Layout>
     <div className="flex justify-between">
     <div>
        <h1>Hello, {session?.user?.name}</h1>
      </div>
      <div className="flex bg-gray-300 rounded-lg overflow-auto items-center max-sm:hidden">
        <img src={session?.user?.image}
        alt="no"
        className="w-8 h-8"
        />
        <p className="px-2">{session?.user?.name}</p>
      </div>
     </div>
    </Layout>
    
  )
}
