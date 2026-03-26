'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)
  const completeRef = useRef(false)
  const tRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const addTimeout = (fn: () => void, delay: number) => {
    tRef.current.push(setTimeout(fn, delay))
  }

  useEffect(() => {
    // Phase 0 → black (0ms)
    // Phase 1 → name appears (300ms)
    // Phase 2 → subtitle (700ms)
    // Phase 3 → role (1100ms)
    // Phase 4 → line expands (1500ms)
    // Phase 5 → progress starts (1800ms)
    // Phase 6 → complete (2800ms)

    addTimeout(() => setPhase(1), 300)
    addTimeout(() => setPhase(2), 700)
    addTimeout(() => setPhase(3), 1100)
    addTimeout(() => setPhase(4), 1500)
    addTimeout(() => setPhase(5), 1800)

    // Progress bar animation
    addTimeout(() => setProgress(100), 1850)
    addTimeout(() => {
      if (!completeRef.current) {
        completeRef.current = true
        onComplete()
      }
    }, 2800)

    return () => tRef.current.forEach(clearTimeout)
  }, [onComplete])

  const handleSkip = () => {
    if (completeRef.current) return
    completeRef.current = true
    onComplete()
  }

  return (
    <motion.div
      className="taj-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Skip button */}
      <button className="taj-skip-btn" onClick={handleSkip} aria-label="Skip loader">
        skip
      </button>

      <div className="taj-center">
        {/* Name: KULDEEP */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              className="taj-name-row"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="taj-name">KULDEEP</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Name: SOLANKI */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              className="taj-name-row"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="taj-name taj-name-accent">SOLANKI</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider line */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              className="taj-line-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="taj-line">
                <motion.div
                  className="taj-line-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Role subtitle */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              className="taj-subtitle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="taj-role-tag">AI/ML ENGINEER</span>
              <span className="taj-role-sep">—</span>
              <span className="taj-role-company">Building systems that ship</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <AnimatePresence>
          {phase >= 5 && (
            <motion.div
              className="taj-progress-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="taj-progress-bar">
                <motion.div
                  className="taj-progress-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="taj-progress-label">
                <span className="taj-mono">initializing</span>
                <span className="taj-mono">{Math.round(progress)}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner decorations */}
      <div className="taj-corner taj-corner-tl" aria-hidden="true" />
      <div className="taj-corner taj-corner-tr" aria-hidden="true" />
      <div className="taj-corner taj-corner-bl" aria-hidden="true" />
      <div className="taj-corner taj-corner-br" aria-hidden="true" />
    </motion.div>
  )
}
