import Logo from '@/components/Logo'
import React from 'react'

function layout({children}:{children:React.ReactNode}) {
  return (
    <div  className='flex flex-col justify-center items-center h-screen gap-5'>
        <Logo />
        {children }
    </div>
  )
}

export default layout