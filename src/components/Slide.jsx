import { motion } from 'framer-motion'
import { useSlide } from '../engine/SlideContext'
import { ease } from './motion'

const DECK_TITLE = 'From GenAI to AI Agents'
const SECTION_LABEL = {
  opening: 'Welcome', genai: 'Generative AI', prompting: 'Prompt Engineering',
  agents: 'AI Agents', industry: 'Industry & Careers',
}

/**
 * Every slide starts with <Slide>. It owns padding, the header and the footer.
 *   section  – 'opening' | 'genai' | 'prompting' | 'agents' | 'industry' (sets the accent colour)
 *   kicker   – small uppercase label above the title
 *   title    – headline (string or JSX; wrap a word in <Em> for the serif accent)
 *   lede     – optional one-line sub-headline
 *   center   – vertically centre the body
 *   footer   – set false to hide the footer (title slides)
 */
export default function Slide({ section = 'opening', kicker, title, lede, center, footer = true, className = '', children }) {
  const { number, total } = useSlide()
  const hasHead = kicker || title || lede
  return (
    <section className={`slide ${center ? 'center' : ''} ${className}`} data-section={section}>
      {hasHead && (
        <motion.header className="head" style={{ marginBottom: 44 }}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          {kicker && <div className="kicker">{kicker}</div>}
          {title && <h1 className="title">{title}</h1>}
          {lede && <p className="lede">{lede}</p>}
        </motion.header>
      )}
      <div className="slide-body">{children}</div>
      {footer && (
        <footer className="slide-footer">
          <span><span className="dot" />{DECK_TITLE} · {SECTION_LABEL[section]}</span>
          <span className="num">{String(number).padStart(2, '0')} / {total}</span>
        </footer>
      )}
    </section>
  )
}
