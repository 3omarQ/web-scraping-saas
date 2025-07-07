import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React from 'react'

function Profile() {
  return (
    <div className='items-center'>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div>signed out</div>
      </SignedOut>
    </div>
  )
}

export default Profile