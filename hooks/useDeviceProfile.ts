'use client'
import { useEffect, useState } from 'react'

interface DeviceProfile {
  isMobile: boolean
  isLowPower: boolean
  prefersReducedMotion: boolean
  shouldReduceAnimations: boolean
}

export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>({
    isMobile: false,
    isLowPower: false,
    prefersReducedMotion: false,
    shouldReduceAnimations: false,
  })

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setProfile({
      isMobile,
      isLowPower: false,
      prefersReducedMotion,
      shouldReduceAnimations: isMobile || prefersReducedMotion,
    })
  }, [])

  return profile
}
