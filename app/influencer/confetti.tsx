'use client'

import { useEffect, useRef } from 'react'

interface ConfettiProps {
  className?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  spin: number
  color: string
}

const COLORS = ['#39ff88', '#3ef0ff', '#c04bff', '#ffffff', '#ff2d6f']

export function Confetti({ className }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    let width = window.innerWidth
    let height = window.innerHeight

    function resize() {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context?.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = Array.from({ length: 140 }, () => ({
      x: width / 2 + (Math.random() - 0.5) * width * 0.6,
      y: -Math.random() * height * 0.5,
      vx: (Math.random() - 0.5) * 2.4,
      vy: 2 + Math.random() * 3.6,
      size: 5 + Math.random() * 7,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.24,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    const startedAt = Date.now()
    let frame = 0

    function draw() {
      if (!context) return
      context.clearRect(0, 0, width, height)

      const elapsed = Date.now() - startedAt
      const fade = elapsed > 4500 ? Math.max(0, 1 - (elapsed - 4500) / 2000) : 1

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx += Math.sin((particle.y + elapsed) / 120) * 0.02
        particle.rotation += particle.spin

        if (particle.y > height + 30) {
          particle.y = -20
          particle.x = Math.random() * width
        }

        context.save()
        context.globalAlpha = fade
        context.translate(particle.x, particle.y)
        context.rotate(particle.rotation)
        context.fillStyle = particle.color
        context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.6)
        context.restore()
      })

      if (fade > 0) {
        frame = window.requestAnimationFrame(draw)
      } else {
        context.clearRect(0, 0, width, height)
      }
    }

    frame = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas aria-hidden className={className} ref={canvasRef} />
}
