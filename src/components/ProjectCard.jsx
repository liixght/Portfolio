import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function ProjectCard({ project, variant = 'default' }) {
  const [open, setOpen] = useState(false)
  const featured = variant === 'featured'

  return (
    <div
      className={`flex flex-col rounded-xl border text-left backdrop-blur-md ${
        featured
          ? 'border-gold/30 bg-gradient-to-br from-black/55 via-black/45 to-gold/10 p-6 shadow-[0_0_28px_rgba(204,170,119,0.18)]'
          : 'border-off-white/10 bg-black/45 p-4'
      }`}
    >
      <div className={`flex items-center ${featured ? 'gap-3.5' : 'gap-2.5'}`}>
        <div
          className={`flex shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-gold/50 via-gold/15 to-transparent font-semibold text-gold ${
            featured ? 'h-14 w-14 text-2xl ring-2 ring-gold/50' : 'h-10 w-10 text-base'
          } ${!featured && project.featured ? 'ring-1 ring-gold/40' : ''}`}
        >
          {project.title.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3
              className={`truncate font-semibold text-off-white ${
                featured ? 'text-lg' : 'text-sm'
              }`}
            >
              {project.title}
            </h3>
            {project.featured && (
              <span className="rounded-full border border-gold/60 px-2 py-0.5 text-[9px] uppercase tracking-wider text-gold">
                featured
              </span>
            )}
          </div>
          <p className={`uppercase tracking-[0.2em] text-gold/70 ${featured ? 'text-[11px]' : 'text-[9px]'}`}>
            {project.tag}
          </p>
        </div>
      </div>

      {featured ? (
        <p className="mt-3 text-[15px] leading-relaxed text-off-white/80">{project.description}</p>
      ) : (
        <p className="mt-1.5 truncate text-xs text-off-white/75" title={project.description}>
          {project.description}
        </p>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 flex flex-wrap gap-1.5 border-t border-off-white/10 pt-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-off-white/15 px-2 py-0.5 text-[11px] text-off-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-4 text-xs">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="pointer-events-auto font-medium text-off-white/70 transition-colors hover:text-gold"
                >
                  GitHub ↗
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="pointer-events-auto font-medium text-off-white/70 transition-colors hover:text-gold"
                >
                  Live ↗
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="pointer-events-auto mt-1.5 self-start font-mono text-[10px] uppercase tracking-[0.3em] text-off-white/50 transition-colors hover:text-gold"
      >
        {open ? 'less' : 'more'}
      </button>
    </div>
  )
}