import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"

export default function Layout({children}) {
  const { data: session } = useSession()
  const [showNav, setShowNav]=useState(false)
  if (!session){
    return (
      <div className={'bg-blue-900 w-screen h-screen flex items-center'}>
        <div className="text-center w-full">
          <button onClick={()=>signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login With Google</button>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-blue-900 min-h-screen ">
      <div className="block md:hidden">
        <button onClick={()=>setShowNav(showNav?false:true)} onDoubleClick={()=>setShowNav(false)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 text-white mt-2 ml-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

      </button>
      </div>
      
    <div className="flex">
      <Nav show={showNav}/>
      <div className="bg-zinc-100 flex-grow p-2 sm:m-2 sm:rounded-lg sm:p-4 h-[calc(100vh-1rem)]">
        {children}
      </div>
    </div>
    </div>
      )
}
