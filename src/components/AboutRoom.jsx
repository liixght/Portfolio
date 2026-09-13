import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLoader } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import Room from './Room'
import RoomDisc from './RoomDisc'
import SectionLabel from './SectionLabel'
import { skills, skillCategories } from '../data/skills'
import { tools } from '../data/tools'
import { SITE } from '../config/site'
import * as THREE from 'three'

const GOLD = '#ccaa77'

// Center focal visual — config-driven profile image sitting inside the ring
// opening. Renders nothing unless SITE.profileImage is configured, so a
// missing config can never break the room.
function CenterProfile() {
  const path = SITE.profileImage
  if (!path) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const texture = useLoader(THREE.TextureLoader, path)

  return (
    <group position={[0, 0, -0.01]}>
      <mesh>
        <circleGeometry args={[0.72, 48]} />
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <ringGeometry args={[0.72, 0.76, 48]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

const PANEL =
  'w-[360px] flex flex-col rounded-xl border border-off-white/10 bg-black/45 p-5 text-left shadow-[0_10px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md'
const PANEL_TITLE = 'font-mono text-[10px] uppercase tracking-[0.35em] text-gold/70'
const MORE_BUTTON =
  'pointer-events-auto self-start mt-4 inline-flex items-center gap-2 rounded-full border border-off-white/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-off-white/80 transition-colors hover:border-off-white hover:bg-off-white/10 hover:text-off-white'

function Expandable({ children, open, onToggle }) {
  return (
    <>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="extra"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <button type="button" onClick={onToggle} className={`${MORE_BUTTON} ${open ? '' : 'animate-pulse'}`}>
        <span
          aria-hidden
          className="text-[12px] leading-none font-normal"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
        >
          {open ? '−' : '+'}
        </span>
        {open ? 'less' : 'more'}
      </button>
    </>
  )
}

const LABEL_STYLE = {
  Learning: 'border-gold/30 text-gold/70',
  'Building with': 'border-gold/60 text-gold',
  'Comfortable with': 'border-off-white/20 text-off-white/80',
}

function AboutPanel() {
  const [open, setOpen] = useState(false)
  return (
    <div className={PANEL}>
      <p className={PANEL_TITLE}>about</p>
      <p className="mt-2 text-sm leading-relaxed text-off-white/90">
        Computer Science student actively building real software — responsive web interfaces,
        small utilities, and ongoing experiments.
      </p>
      <div className="mt-3 space-y-1.5 text-xs leading-relaxed text-off-white/70">
        <p className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-gold" /> building with React, Vite &amp; R3F
        </p>
        <p className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-gold" /> always happy to talk code &amp; collabs
        </p>
      </div>
      <Expandable open={open} onToggle={() => setOpen((o) => !o)}>
        <div className="mt-3 space-y-2 border-t border-off-white/10 pt-3">
          <p className="text-xs leading-relaxed text-off-white/70">
            Currently exploring 3D in the browser with React Three Fiber.
          </p>
          <p className="text-xs leading-relaxed text-off-white/70">
            Outside code I train calisthenics — progress is progress, one rep at a time.
          </p>
        </div>
      </Expandable>
    </div>
  )
}

function SkillsPanel() {
  const [open, setOpen] = useState(false)
  return (
    <div className={PANEL}>
      <p className={PANEL_TITLE}>skills</p>
      <div className="mt-2 space-y-3">
        {skillCategories.map((category) => (
          <div key={category}>
            <p className="text-[10px] uppercase tracking-[0.25em] text-off-white/40">{category}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <span
                    key={skill.name}
                    className={`rounded-full border px-2 py-0.5 text-[11px] ${LABEL_STYLE[skill.proficiencyLabel]} hover:border-gold/50 hover:text-gold`}
                  >
                    {skill.name}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
      <Expandable open={open} onToggle={() => setOpen((o) => !o)}>
        <div className="mt-3 space-y-1.5 border-t border-off-white/10 pt-3">
          {['Learning', 'Building with', 'Comfortable with'].map((label) => (
            <p key={label} className="flex items-center gap-2 text-xs text-off-white/70">
              <span className={`rounded-full border px-2 py-0.5 text-[10px] ${LABEL_STYLE[label]}`}>
                {label}
              </span>
              {label === 'Learning' && '— actively studying'}
              {label === 'Building with' && '— used in real projects'}
              {label === 'Comfortable with' && '— solid foundation'}
            </p>
          ))}
        </div>
      </Expandable>
    </div>
  )
}

function ToolsPanel() {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-[680px] max-w-[92vw] flex flex-col rounded-xl border border-off-white/10 bg-black/45 p-4 text-left shadow-[0_10px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md">
      <p className={PANEL_TITLE}>toolchain</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <span
            key={tool.name}
            title={`${tool.category} — ${tool.note}`}
            className="flex items-center gap-1.5 rounded-lg border border-off-white/10 bg-off-white/5 px-2.5 py-1 text-[11px] text-off-white/85"
          >
            <span className="h-1 w-1 rounded-full bg-gold" />
            {tool.name}
          </span>
        ))}
      </div>
      <Expandable open={open} onToggle={() => setOpen((o) => !o)}>
        <div className="mt-3 space-y-1.5 border-t border-off-white/10 pt-3">
          {tools.map((tool) => (
            <p key={tool.name} className="text-xs leading-relaxed text-off-white/70">
              <span className="text-gold/90">{tool.name}</span>
              <span className="text-off-white/40"> · {tool.category}</span> — {tool.note}
            </p>
          ))}
        </div>
      </Expandable>
    </div>
  )
}

export default function AboutRoom() {
  return (
    <Room position={[0, 0, -12]}>
      <RoomDisc />

      <group position={[0, 0.4, 0]} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <Billboard position={[0, 0, -0.01]}>
          <CenterProfile />
        </Billboard>
        <mesh>
          <torusGeometry args={[1.5, 0.05, 12, 64]} />
          <meshStandardMaterial
            color={GOLD}
            flatShading
            metalness={0.75}
            roughness={0.3}
          />
        </mesh>
        <mesh scale={1.12} rotation={[0, 0.6, 0]}>
          <torusGeometry args={[1.5, 0.022, 8, 64]} />
          <meshBasicMaterial
            color="#9c7841"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      <SectionLabel
        position={[-4.15, 0.55, 0]}
        windowStart={0.46}
        windowEnd={0.8}
        fadeIn={0.18}
        fadeOut={0.06}
        wrapperClass="about-panel-html"
        className="select-none"
      >
        <AboutPanel />
      </SectionLabel>

      <SectionLabel
        position={[3.75, 0.55, 0]}
        windowStart={0.5}
        windowEnd={0.8}
        fadeIn={0.18}
        fadeOut={0.06}
        wrapperClass="skills-panel-html"
        className="select-none"
      >
        <SkillsPanel />
      </SectionLabel>

      <SectionLabel
        position={[0, -1.55, 0]}
        windowStart={0.54}
        windowEnd={0.8}
        fadeIn={0.18}
        fadeOut={0.06}
        wrapperClass="tools-panel-html"
        className="select-none"
      >
        <ToolsPanel />
      </SectionLabel>
    </Room>
  )
}