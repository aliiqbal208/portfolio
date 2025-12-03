import * as React from "react"

// More comprehensive breakpoints
const BREAKPOINTS = {
  mobile: 690,    // Small phones
  tablet: 768,    // Tablets
  desktop: 1024   // Desktop
} as const

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.mobile - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.mobile)
    }
    
    // Set initial value
    onChange()
    
    mql.addEventListener("change", onChange)
    
    // Also listen to resize events for better responsiveness
    window.addEventListener("resize", onChange)
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", onChange)
    }
  }, [])
  
  return !!isMobile
}

// Enhanced version with multiple breakpoint support
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<'mobile' | 'tablet' | 'desktop' | undefined>(undefined)
  
  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.mobile) {
        setBreakpoint('mobile')
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('desktop')
      }
    }
    
    // Set initial value
    updateBreakpoint()
    
    // Use resize event for more responsive updates
    window.addEventListener("resize", updateBreakpoint)
    
    return () => window.removeEventListener("resize", updateBreakpoint)
  }, [])
  
  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop'
  }
}

// Touch-aware version for better mobile UX
export function useIsMobileTouch() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [hasTouch, setHasTouch] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    const checkMobile = () => {
      const screenWidth = window.innerWidth < BREAKPOINTS.mobile
      const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      setIsMobile(screenWidth)
      setHasTouch(touchSupport)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  
  return {
    isMobile: !!isMobile,
    hasTouch,
    isMobileTouch: !!isMobile && hasTouch
  }
}
