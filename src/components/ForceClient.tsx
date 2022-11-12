'use client'

import React, { useEffect, useState } from 'react'

const ForceClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return <>{isMounted ? children : null}</>
}

export default ForceClient
