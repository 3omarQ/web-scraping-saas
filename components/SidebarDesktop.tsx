"use client"
import { HomeIcon, Layers2Icon } from 'lucide-react'

import React from 'react'
import Logo from './Logo'
import Link from 'next/link'

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
]
function SidebarDesktop() {
  return (
    <div className='hidden relative md:block min-w-[200px] h-screen overflow-hidden border-r-2 border-separate bg-primary/5'>
        <div className="flex items-center justify-center gap-2 border-b-2 border-separate p-4">
            <Logo />
        </div>
            <div className="flex flex-col p-2">
                {
                    routes.map(route => (
                        <Link key={route.href} href={route.href}>{route.label}</Link>
                    ))
                }
            </div>
    </div>
  )
}

export default SidebarDesktop