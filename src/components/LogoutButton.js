"use client";

import { Button } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function LogoutButton() {
  return (
    <Button onClick={() => signOut({
        redirect: "/login"
    })}>Logout</Button>
  )
}
