import { createContext, useContext } from 'react'

// Per-slide context: which step of the slide is showing, and the slide's page number.
export const SlideContext = createContext({ step: 99, steps: 0, active: true, number: 1, total: 1, static: true })
export const useSlide = () => useContext(SlideContext)
