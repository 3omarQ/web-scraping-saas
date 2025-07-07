"use client"
import { HomeIcon, Layers2Icon, LogsIcon, UserIcon } from 'lucide-react'

import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'

const routes = [
    {
        href: "/",
        label: "Home",
        icon : HomeIcon
    },
    {
        href: "workflows",
        label: "Workflows",
        icon : Layers2Icon
    },
    {
        href: "logs",
        label: "Logs",
        icon : LogsIcon
    },
    // {
    //     href: "profile",
    //     label: "Profile",
    //     icon : UserIcon
    // },    
]
function SidebarDesktop() {
    const pathname= usePathname();
    const activeRoute = routes.find((route)=> route.href.length>0 && pathname.startsWith(`/${route.href}`)) || routes[0]
    const { user } = useUser()
    return (
    <div className='flex flex-col justify-between relative min-w-[200px] h-screen overflow-hidden border-r-2 border-separate bg-primary/5'>
        <div className="flex items-center justify-center gap-2 border-b-2 border-separate p-4">
            <Logo />
        </div>
        <div className="flex-1 flex flex-col p-2 ">
            {
                routes.map(route => (
                    <Link key={route.href} href={route.href} className={buttonVariants(
                        {variant: activeRoute.href === route.href ? "default" : "ghost" ,
                        className: "flex-row items-start gap-2 !justify-start w-full"}
                    )}>
                        <route.icon size={20}/>
                        {route.label}
                    </Link>
                ))
            }
        </div>
        <SignedIn>
        <div className="flex items-center gap-2 p-4 border-t text-sm">
          <UserButton/>
          <span className="truncate">{user?.fullName || user?.username}</span>
        </div>
      </SignedIn>
    </div>
  )
}

export default SidebarDesktop