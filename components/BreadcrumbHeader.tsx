'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import Link from 'next/link';


function BreadcrumbHeader() {
    const pathname = usePathname();
    const paths = pathname === "/" ? [""] : pathname?.split("/")
  return (
    <div className='flex items-center'>
        <Breadcrumb>
            <BreadcrumbList>
                {paths.map((path,index)=>(
                    <React.Fragment key={index}>
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink className='capitalize'>
                                <Link href={`/${path}`}>
                                {path === "" ? "home" : path}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    </div>
  
)
}

export default BreadcrumbHeader