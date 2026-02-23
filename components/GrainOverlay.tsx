'use client'
import { useEffect } from 'react'

export default function GrainOverlay() {
  useEffect(() => {
    import('grained').then((mod) => {
      // handle both default and module.exports formats
      const grained = mod.default ?? mod
      if (typeof grained !== 'function') return
      grained('#grain-overlay', {
        animate: true,
        patternWidth: 300,
        patternHeight: 300,
        grainOpacity: 0.08,
        grainDensity: 1,
        grainWidth: 1.4,
        grainHeight: 1.4,
        grainChaos: 0.55,
        grainSpeed: 20
      })
    })
  }, [])

  return <div id="grain-overlay" />
}