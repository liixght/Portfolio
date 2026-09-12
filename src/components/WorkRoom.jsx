import { useEffect, useRef, useState } from 'react'
import { Edges, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Room from './Room'
import RoomDisc from './RoomDisc'
import SectionLabel from './SectionLabel'
import ProjectCard from './ProjectCard'
import useLockedInnerScroll from '../hooks/useLockedInnerScroll'
import { projects } from '../data/projects'
import { mainProgress } from '../lib/mainProgress'
import { SITE } from '../config/site'

const GOLD = '#ccaa77'

function useScale(base = 820) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => setScale(Math.min(1, window.innerHeight / base))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [base])
  return scale
}

export default function WorkRoom() {
  const scale = useScale()
  const scroll = useScroll()
  const activeRef = useRef(false)
  const [sectionActive, setSectionActive] = useState(false)
  const innerRef = useLockedInnerScroll({ outerEl: scroll?.el, active: sectionActive, scrollObj: scroll })
  const featured = projects.filter((project) => project.featured === true)
  const others = projects.filter((project) => project.featured !== true)

  useFrame(() => {
    mainProgress.update(scroll.offset)
    if (scroll.el && !scroll.el.classList.contains('no-scrollbar')) {
      scroll.el.classList.add('no-scrollbar')
    }
    const on = scroll.offset >= 0.92
    if (on !== activeRef.current) {
      activeRef.current = on
      setSectionActive(on)
    }
  })

  return (
    <Room position={[0, 0, -24]}>
      <RoomDisc />

      <group position={[0, 0.3, 0]} rotation={[0, 0.4, 0]}>
        <mesh>
          <boxGeometry args={[1.7, 2.5, 0.3]} />
          <meshStandardMaterial
            color="#262626"
            flatShading
            metalness={0.25}
            roughness={0.7}
          />
          <Edges threshold={15} color={GOLD} />
        </mesh>
        <mesh position={[0, 0, 0.28]}>
          <boxGeometry args={[1.1, 1.7, 0.06]} />
          <meshStandardMaterial
            color={GOLD}
            flatShading
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      </group>

      <SectionLabel
        position={[0, 0.34, 0]}
        windowStart={0.93}
        windowEnd={1}
        fadeIn={0.06}
        fadeOut={0}
        wrapperClass="work-cards-html"
        className="select-none"
      >
        <div className="select-none" style={{ transform: `scale(${scale})` }}>
          <div className="relative">
            <div
              ref={innerRef}
              className={`no-scrollbar h-[440px] w-[700px] max-w-[94vw] overflow-y-auto ${
                sectionActive ? 'work-scroll-active' : 'work-scroll-inactive'
              }`}
            >
              {featured.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {featured.map((project) => (
                    <ProjectCard key={project.id} project={project} variant="featured" />
                  ))}
                </div>
              )}
              {others.length > 0 && (
                <>
                  {featured.length > 0 && (
                    <h3 className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-gold/60">
                      Other Projects
                    </h3>
                  )}
                  <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${featured.length > 0 ? 'mt-3' : ''}`}>
                    {others.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </>
              )}
              {(featured.length > 0 || others.length > 0) && (
                <div className="pointer-events-none mt-6 flex flex-col items-center gap-1.5">
                  <span className="animate-pulse text-[10px] uppercase tracking-[0.3em] text-off-white/50">
                    scroll
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-5 animate-pulse text-gold"
                  >
                    <path d="M12 5v9" />
                    <path d="M5.5 10l6.5 5 6.5-5" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionLabel>

      <SectionLabel
        position={[0, -2.66, 0]}
        windowStart={0.97}
        windowEnd={1}
        fadeIn={0.05}
        fadeOut={0}
        wrapperClass="work-contact-html"
        className="select-none"
      >
        <div className="select-none" style={{ transform: `scale(${scale})` }}>
          <div className="flex w-[620px] max-w-[92vw] flex-col items-center rounded-xl border border-gold/25 bg-black/45 px-6 py-3 text-center backdrop-blur-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/70">
              get in touch
            </p>
            <p className="mt-1.5 text-xs leading-snug text-off-white/85">
              Building real software one step at a time — currently open to collaborations, freelance,
              and part-time work; best reached by email.
            </p>
            <p className="mt-1.5 font-mono text-[11px] tracking-[0.2em] text-off-white/80">
              {SITE.email}
            </p>
            <div className={`mt-2.5 flex flex-wrap items-center justify-center gap-2.5 ${
              sectionActive ? 'pointer-events-auto' : 'pointer-events-none'
            }`}>
              <a
                href={`mailto:${SITE.email}`}
                className="rounded-lg border border-gold/60 px-3 py-1 text-[11px] font-medium text-gold transition-colors hover:bg-gold/10"
              >
                Email
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-off-white/20 px-3 py-1 text-[11px] font-medium text-off-white/80 transition-colors hover:border-gold/50 hover:text-gold"
              >
                GitHub
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-off-white/20 px-3 py-1 text-[11px] font-medium text-off-white/80 transition-colors hover:border-gold/50 hover:text-gold"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </SectionLabel>
    </Room>
  )
}
