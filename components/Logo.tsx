import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

function Logo({
    fontSize = "text-2xl",
    iconSize = 20,

}:{
    fontSize?: string,
    iconSize?: number
}) {
  return (
    <Link href="/">
        <img src="https://www.visioad.com/logovisioad.svg" alt="" />
    </Link>
  )
}

export default Logo