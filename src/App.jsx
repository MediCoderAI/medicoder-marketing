import { useState, useEffect, useRef } from 'react'

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Adjust threshold and rootMargin for mobile devices
    const isMobile = window.innerWidth < 768
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: isMobile ? 0.1 : 0.25,
        rootMargin: isMobile ? '0px 0px -100px 0px' : '0px 0px -300px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isVisible]
}

// Icons as inline SVG components
const IconDocument = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const IconCheck = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const IconArrowRight = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const IconBolt = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const IconShield = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const IconClock = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const IconChart = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const IconMedical = () => (
  <img src={`${import.meta.env.BASE_URL}MediCoderAIInverted.png`} alt="MediCoder.AI" className="w-8 h-8 object-contain rounded-lg" />
)

// Intro Screen Component - Swipes up on load with typewriter effect
function IntroScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const fullText = 'MediCoder.AI'
  const typingSpeed = 80 // milliseconds per character

  useEffect(() => {
    let currentIndex = 0

    // Typewriter effect
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        // Wait 800ms after typing completes, then swipe up
        setTimeout(() => {
          handleDismiss()
        }, 800)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [])

  const handleDismiss = () => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 800) // Match animation duration
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#f6f0e9] transition-all duration-700 ease-out ${
        isAnimatingOut ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'
      }`}
      onClick={handleDismiss}
    >
      {/* Main content - Just the title */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-medi-gray-900 tracking-tight">
          {displayedText}
          {displayedText.length < fullText.length && (
            <span className="inline-block w-0.5 h-12 md:h-16 bg-medi-gray-900 ml-1 animate-pulse" />
          )}
        </h1>
      </div>
    </div>
  )
}

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/70 backdrop-blur-2xl shadow-2xl shadow-medi-gray-900/10 border-b border-white/60' : 'bg-transparent'
    }`} style={scrolled ? {
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)'
    } : {}}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <IconMedical />
            <span className="font-display font-bold text-xl text-medi-gray-900 group-hover:text-medi-green-600 transition-colors">
              MediCoder<span className="text-medi-green-500">.AI</span>
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="font-medium text-medi-gray-600 hover:text-medi-green-600 transition-colors">
              How It Works
            </a>
            <a href="#features" className="font-medium text-medi-gray-600 hover:text-medi-green-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="btn-primary !py-3 !px-6 !text-base">
              Try Free Audit
            </a>
          </div>

          <button 
            className="md:hidden p-2 text-medi-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 animate-slide-up">
            <div className="flex flex-col gap-4">
              <a href="#how-it-works" className="font-medium text-medi-gray-600 py-2">How It Works</a>
              <a href="#features" className="font-medium text-medi-gray-600 py-2">Features</a>
              <a href="#pricing" className="btn-primary text-center">Try Free Audit</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero Section
function HeroSection() {
  const [animationStep, setAnimationStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const hccResults = [
    { code: 'HCC 85', desc: 'Congestive Heart Failure', raf: '+0.323', status: 'Missed' },
    { code: 'HCC 18', desc: 'Diabetes with Chronic Complications', raf: '+0.302', status: 'Missed' },
    { code: 'HCC 85', desc: 'Coronary Artery Disease', raf: '+0.141', status: 'Captured' },
    { code: 'HCC 22', desc: 'Morbid Obesity', raf: '+0.250', status: 'Missed' },
  ]

  useEffect(() => {
    if (!isPlaying) return
    const timings = [1500, 2000, 200, 2000, 4000]
    const timer = setTimeout(() => {
      if (animationStep === 4) {
        setIsPlaying(false)
        setTimeout(() => setAnimationStep(0), 600)
      } else {
        setAnimationStep(animationStep + 1)
      }
    }, timings[animationStep])
    return () => clearTimeout(timer)
  }, [animationStep, isPlaying])

  const handlePlay = () => {
    setAnimationStep(0)
    setIsPlaying(true)
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 badge-green animate-swipe-up">
              <span className="w-2 h-2 bg-medi-green-500 rounded-full animate-pulse" />
              Zero Integration. Instant Results.
            </div>

            <h1 className="section-heading animate-swipe-up animate-delay-100 text-balance">
              Find the revenue your clinical notes are{' '}
              <span className="gradient-text">leaving behind</span>
            </h1>

            <p className="section-subheading animate-swipe-up animate-delay-200">
              Upload notes. Surface missed HCCs. See the dollar impact.
              No EHR integration required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-swipe-up animate-delay-300">
              <a href="#pricing" className="btn-primary">
                Upload Notes Free
                <IconArrowRight />
              </a>
              <a href="#how-it-works" className="btn-secondary">
                See How It Works
              </a>
            </div>

            <div className="flex items-center gap-8 pt-4 animate-swipe-up animate-delay-400">
              <div className="flex items-center gap-2">
                <IconCheck />
                <span className="text-medi-gray-600 font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCheck />
                <span className="text-medi-gray-600 font-medium">No EHR Integration Required</span>
              </div>
            </div>
          </div>

          {/* Hero Visual - Animated HCC/RAF Preview */}
          <div className="relative animate-swipe-up animate-delay-500">
            <div className="absolute inset-0 rounded-3xl blur-3xl animate-glow-pulse" style={{
              background: 'linear-gradient(to right, rgba(21, 19, 36, 0.2), rgba(238, 204, 111, 0.3), rgba(249, 115, 22, 0.1))'
            }} />
            <div className="relative glass-card gradient-border overflow-hidden h-[480px] sm:h-[420px]">
              {/* Sliding content wrapper */}
              <div className="absolute inset-0 p-4 sm:p-8 transition-transform duration-700 ease-in-out" style={{
                transform: animationStep >= 4 ? 'translateY(-100%)' : 'translateY(0)'
              }}>
                {/* === Slide 1: Clinical Note + Action === */}
                <div style={{ height: '100%' }} className="flex flex-col">
                  {/* Mock clinical note */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="badge-green text-[10px] sm:text-xs font-mono">CLINICAL NOTE</div>
                      {animationStep === 0 && (
                        <div className="flex items-center gap-1.5 text-medi-gray-400 text-xs animate-fade-in">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <span className="font-medium">Pasted</span>
                        </div>
                      )}
                      <div className="h-px flex-1 bg-medi-gray-200" />
                    </div>

                    <div className={`font-body text-medi-gray-700 leading-relaxed text-sm sm:text-base ${animationStep === 0 ? 'animate-slide-up' : ''}`}>
                      <p className="mb-3">
                        73-year-old male presents for annual check-up. History of{' '}
                        <span className="bg-medi-coral-100 text-medi-coral-700 px-1 sm:px-1.5 py-0.5 rounded font-medium text-xs sm:text-base">
                          congestive heart failure
                        </span>{' '}
                        and{' '}
                        <span className="bg-medi-coral-100 text-medi-coral-700 px-1 sm:px-1.5 py-0.5 rounded font-medium text-xs sm:text-base">
                          type 2 diabetes with neuropathy
                        </span>.
                      </p>
                      <p>
                        BMI 42.{' '}
                        <span className="bg-medi-coral-100 text-medi-coral-700 px-1 sm:px-1.5 py-0.5 rounded font-medium text-xs sm:text-base">
                          Morbid obesity
                        </span>{' '}
                        documented. Prior{' '}
                        <span className="bg-medi-coral-100 text-medi-coral-700 px-1 sm:px-1.5 py-0.5 rounded font-medium text-xs sm:text-base">
                          coronary artery disease
                        </span>{' '}
                        with stent 04/2022.
                      </p>
                    </div>
                  </div>

                  {/* Process Button / Click Effect / Loading */}
                  <div className="flex justify-center pt-24 sm:pt-16">
                    {animationStep === 1 ? (
                      <button className="btn-primary !py-3 !px-6 !text-sm animate-scale-in">
                        <IconBolt />
                        Analyze Note
                      </button>
                    ) : animationStep === 2 ? (
                      <button className="btn-primary !py-3 !px-6 !text-sm scale-95 opacity-80 transition-all duration-200">
                        <IconBolt />
                        Analyze Note
                      </button>
                    ) : animationStep === 3 ? (
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full animate-pulse" style={{
                          background: 'linear-gradient(135deg, rgba(238, 204, 111, 1), rgba(218, 165, 32, 1))'
                        }} />
                        <div className="w-3 h-3 rounded-full animate-pulse animation-delay-200" style={{
                          background: 'linear-gradient(135deg, rgba(222, 184, 135, 1), rgba(238, 204, 111, 1))'
                        }} />
                        <div className="w-3 h-3 rounded-full animate-pulse animation-delay-400" style={{
                          background: 'linear-gradient(135deg, rgba(218, 165, 32, 1), rgba(222, 184, 135, 1))'
                        }} />
                        <span className="text-medi-gray-600 font-medium ml-2">Analyzing...</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* === Slide 2: HCC/RAF Results === */}
                <div style={{ height: '100%' }} className="flex flex-col pt-10 sm:pt-12">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="px-2 py-1 text-yellow-600 bg-yellow-200 text-[10px] sm:text-xs font-mono rounded-full whitespace-nowrap">HCC GAP ANALYSIS</div>
                      <div className="h-px flex-1 bg-medi-gray-200" />
                    </div>

                    <div className="grid gap-1.5 sm:gap-2">
                      {hccResults.map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 bg-medi-gray-50 rounded-lg sm:rounded-xl group hover:bg-medi-green-50 transition-all duration-300 hover:shadow-md hover:shadow-medi-green-500/10"
                        >
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <span className="font-mono font-semibold text-medi-gray-900 text-xs sm:text-sm flex-shrink-0">{item.code}</span>
                            <span className="text-xs sm:text-sm text-medi-gray-500 truncate">{item.desc}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 sm:mt-0 flex-shrink-0">
                            <span className="font-mono text-xs sm:text-sm font-semibold text-medi-green-600">{item.raf}</span>
                            <span className={`text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded ${
                              item.status === 'Missed' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* RAF Score Summary */}
                    <div className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl border-2 border-medi-green-500/30 bg-medi-green-50/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[10px] sm:text-xs font-mono text-medi-gray-500 mb-0.5 sm:mb-1">TOTAL RAF SCORE</div>
                          <div className="font-display font-bold text-base sm:text-2xl text-medi-gray-900">1.847</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] sm:text-xs font-mono text-medi-gray-500 mb-0.5 sm:mb-1">EST. REVENUE IMPACT</div>
                          <div className="font-display font-bold text-base sm:text-2xl text-medi-green-600">+$4,215<span className="text-[10px] sm:text-sm font-normal text-medi-gray-500">/yr</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Play overlay */}
              <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl transition-all duration-500 ${
                isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`} style={{ background: '#f3ede7' }}>
                <p className="font-display font-semibold text-medi-gray-700 text-sm sm:text-base mb-4">Watch a note become revenue</p>
                <button
                  onClick={handlePlay}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-xl shadow-medi-green-500/30 hover:shadow-2xl hover:shadow-medi-green-500/40 hover:scale-110 transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #36364a 0%, #151324 100%)' }}
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// No Integration Banner
function NoIntegrationBanner() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section ref={ref} className="py-12 relative overflow-hidden">
      <div className={`max-w-4xl mx-auto px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-medi-green-500/20 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 badge-green">
              <IconBolt />
              <span className="font-semibold">Zero Integration. Instant Results.</span>
            </div>
            <p className="text-medi-gray-600 text-sm md:text-base">
              Other platforms need months of EHR setup. MediCoder works the moment you upload your first note.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Problem/Solution Section
function ProblemSection() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="relative">
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-heading mb-6">
            Your clinical notes have more{' '}
            <span className="gradient-text">value</span>{' '}
            than you think
          </h2>
          <p className="section-subheading mx-auto">
            Most practices leave 15-30% of legitimate RAF value on the table.
            Every missed HCC is revenue you've already earned but never captured.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <IconChart />,
              title: 'Missed HCCs Cost You Money',
              desc: 'Every unrecaptured HCC costs thousands per member per year. Most practices leave significant RAF value undocumented.',
              color: 'coral'
            },
            {
              icon: <IconClock />,
              title: 'Integration Shouldn\'t Be a Barrier',
              desc: 'Other platforms need months of EHR setup and IT approval. Your revenue gaps can\'t wait that long.',
              color: 'blue'
            },
            {
              icon: <IconShield />,
              title: 'V28 Changed the Rules',
              desc: 'The CMS-HCC V28 model shifted weights and dropped conditions. If your workflow hasn\'t adapted, you\'re losing revenue.',
              color: 'green'
            }
          ].map((item, i) => (
            <div key={i} className={`card group hover:scale-105 transition-all duration-500 shimmer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: `${i * 150}ms`}}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                item.color === 'coral' ? 'bg-medi-coral-100 text-medi-coral-600 group-hover:glow-effect-coral' :
                item.color === 'blue' ? 'bg-medi-blue-100 text-medi-blue-600 group-hover:glow-effect-blue' :
                'bg-medi-green-100 text-medi-green-600 group-hover:glow-effect'
              }`}>
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-medi-gray-900 mb-3">{item.title}</h3>
              <p className="text-medi-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

// How It Works Section
function HowItWorksSection() {
  const [ref, isVisible] = useScrollReveal()

  const steps = [
    {
      step: '01',
      title: 'Upload Clinical Notes',
      desc: 'Upload notes from any EHR, any format — PDFs, text, dictation exports. Single notes or batch uploads.',
      icon: <IconDocument />
    },
    {
      step: '02',
      title: 'AI-Powered Analysis',
      desc: 'Our AI surfaces missed HCCs, calculates RAF scores under V28, and identifies documentation specificity gaps.',
      icon: <IconBolt />
    },
    {
      step: '03',
      title: 'Revenue Impact Report',
      desc: 'Get a clear report showing captured vs. missed HCCs, RAF score impact, and estimated revenue per member.',
      icon: <IconChart />
    }
  ]

  return (
    <section ref={ref} id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Heading */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="badge-green mb-4 inline-flex">Simple & Powerful</div>
            <h2 className="section-heading mb-6">
              From clinical notes to{' '}
              <span className="gradient-text">revenue impact</span>
            </h2>
            <p className="section-subheading">
              Upload notes in any format. Get back HCC gaps, RAF scores,
              and dollar impact — in seconds, not weeks.
            </p>
          </div>

          {/* Right side - Vertical steps with arrows */}
          <div className="space-y-6">
            {steps.map((item, i) => (
              <div key={i}>
                <div className={`card group hover:shadow-2xl transition-all duration-500 shimmer ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{transitionDelay: `${i * 150}ms`}}>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-medi-green-500 text-white flex items-center justify-center shadow-lg shadow-medi-green-500/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-medi-green-500/40 transition-all duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-mono text-medi-green-500 font-semibold mb-2">STEP {item.step}</div>
                      <h3 className="font-display font-bold text-xl text-medi-gray-900 mb-3">{item.title}</h3>
                      <p className="text-medi-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div className={`flex justify-center py-4 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: `${i * 150 + 75}ms`}}>
                    <svg className="w-8 h-8 text-medi-green-500 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const [ref, isVisible] = useScrollReveal()

  return (
    <section ref={ref} id="features" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-medi-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="badge-green mb-4 inline-flex">
            Built for Value-Based Care
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-medi-gray-900">
            Everything you need,{' '}
            <span className="gradient-text">nothing you don't</span>
          </h2>
          <p className="text-xl text-medi-gray-600 max-w-3xl mx-auto leading-relaxed">
            Risk adjustment intelligence and FFS coding under one roof — purpose-built for primary care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'HCC Capture & RAF Scoring',
              desc: 'Surface missed HCCs and calculate RAF scores under the V28 model. See the dollar impact per member, per encounter.',
              icon: '🎯'
            },
            {
              title: 'Batch Processing',
              desc: 'Upload hundreds of notes at once. Process an entire panel in minutes, not days.',
              icon: '⚡'
            },
            {
              title: 'Documentation Specificity Analysis',
              desc: 'Identify where documentation lacks the specificity needed to support higher-value HCCs.',
              icon: '📋'
            },
            {
              title: 'Recapture Tracking',
              desc: 'Track which HCCs from prior years need recapture and flag gaps before they cost you revenue.',
              icon: '🔄'
            },
            {
              title: 'FFS Code Generation',
              desc: 'Also generates ICD-10-CM, CPT, and HCPCS codes for fee-for-service billing workflows.',
              icon: '🩺'
            },
            {
              title: 'Smart De-ID & HIPAA Compliance',
              desc: 'Intelligent PII redaction and enterprise-grade security. HIPAA compliant with BAA available.',
              icon: '🔒'
            }
          ].map((item, i) => (
            <div
              key={i}
              className={`glass-card p-8 rounded-2xl border border-medi-gray-200/50 hover:border-medi-green-500/30 transition-all duration-500 group hover:shadow-xl hover:shadow-medi-green-500/5 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{transitionDelay: `${i * 100}ms`}}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="font-display font-bold text-xl mb-3 text-medi-gray-900 group-hover:text-medi-green-500 transition-colors">{item.title}</h3>
              <p className="text-medi-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
function PricingSection() {
  const [ref, isVisible] = useScrollReveal()
  const tiers = [
    {
      name: 'Free Audit',
      description: 'See what you\'re missing — no commitment.',
      perks: [
        '25-chart audit',
        'Full HCC gap analysis',
        'RAF score report',
        'No credit card required'
      ],
      highlighted: false,
      badge: null
    },
    {
      name: 'Starter',
      description: 'For solo practitioners and small practices.',
      perks: [
        'Up to 200 charts/month',
        'HCC capture + RAF scoring',
        'FFS code generation',
        'Email support'
      ],
      highlighted: false,
      badge: null
    },
    {
      name: 'Professional',
      description: 'For growing practices and billing companies.',
      perks: [
        'All Starter features',
        'Unlimited charts',
        'Batch processing',
        'Priority support',
        'Multi-user access (up to 5)'
      ],
      highlighted: true,
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise',
      description: 'For MSOs, IPAs, and large organizations.',
      perks: [
        'All Professional features',
        'Dedicated account manager',
        'Custom integrations',
        'Unlimited users',
        'Volume pricing'
      ],
      highlighted: false,
      badge: null
    }
  ]

  return (
    <section ref={ref} id="pricing" className="py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="badge-green mb-4 inline-flex">Flexible Plans</div>
          <h2 className="section-heading mb-6">
            Start with a free{' '}
            <span className="gradient-text">25-chart audit</span>
          </h2>
          <p className="section-subheading mx-auto">
            From solo practitioners to large organizations,<br />
            find the plan that fits your practice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative card group hover:scale-105 transition-all duration-500 shimmer ${
                tier.highlighted
                  ? 'ring-2 ring-medi-green-500 shadow-xl shadow-medi-green-500/20 gradient-border'
                  : ''
              } ${tier.badge ? 'pt-12' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{transitionDelay: `${i * 100}ms`}}
            >
              {tier.badge && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <span className="badge-green text-xs font-semibold px-4 py-1">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-display font-bold text-2xl text-medi-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-medi-gray-500 text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-3">
                {tier.perks.map((perk, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-medi-green-100 flex items-center justify-center mt-0.5">
                      <IconCheck />
                    </div>
                    <span className="text-medi-gray-600 text-sm">{perk}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="https://calendly.com/samuel-han-medicoder/book-a-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center ${
                    tier.highlighted ? 'btn-primary' : 'btn-secondary'
                  } !py-3 !text-sm`}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  const [ref, isVisible] = useScrollReveal()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contact@medicoder.ai')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <section ref={ref} className="pb-24 relative">
    <div className={`max-w-xl mx-auto p-8 text-center relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      {/* Copied notification banner */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        copied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <div className="bg-medi-green-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
          Copied!
        </div>
      </div>

      <p className="text-lg text-medi-gray-600 mb-6">
        Ready to see what your notes are worth?
      </p>
      <button onClick={handleCopyEmail} className="btn-primary">
        contact@medicoder.ai
        <IconArrowRight />
      </button>
    </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const [ref, isVisible] = useScrollReveal()

  const testimonials = [
    {
      quote: "MediCoder.AI surfaced HCC gaps we didn't even know we were missing. The RAF impact reporting paid for itself in the first month.",
      name: "Arnold Almirez",
      role: "Outpatient Coding Manager",
      image: null // Can add image URL later
    }
    // Add more testimonials here in the future
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-medi-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="badge-green mb-4 inline-flex">
            Testimonials
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 text-medi-gray-900">
            Trusted by{' '}
            <span className="gradient-text">healthcare professionals</span>
          </h2>
          <p className="text-xl text-medi-gray-600 max-w-3xl mx-auto leading-relaxed">
            See what coding professionals are saying about MediCoder.AI
          </p>
        </div>

        {/* Testimonial Grid - responsive: 1 column on mobile, 2 columns on md, 3 columns on lg */}
        <div className={`grid md:grid-cols-${testimonials.length >= 2 ? '2' : '1'} lg:grid-cols-${testimonials.length >= 3 ? '3' : testimonials.length} gap-8 ${testimonials.length === 1 ? 'max-w-2xl mx-auto' : ''}`}>
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`glass-card pt-8 px-8 rounded-2xl border border-medi-gray-200/50 hover:border-medi-green-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-medi-green-500/5 hover:-translate-y-1 flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{transitionDelay: `${i * 100}ms`}}
            >
              {/* Author Info - Now at top */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-medi-gray-200/50">
                {/* Avatar - placeholder or image */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-medi-green-500 to-medi-green-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {testimonial.image ? (
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    testimonial.name.split(' ').map(n => n[0]).join('')
                  )}
                </div>

                {/* Name and Role */}
                <div>
                  <div className="font-display font-bold text-medi-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-medi-gray-600">{testimonial.role}</div>
                </div>
              </div>

              {/* Quote Text with large quote marks around it */}
              <blockquote className="text-medi-gray-700 text-lg leading-relaxed relative mb-0">
                <span className="text-6xl text-medi-green-500/20 absolute -top-4 -left-2 leading-none font-serif">"</span>
                <span className="relative z-10 block pt-6">
                  {testimonial.quote}
                </span>
                <span className="text-6xl text-medi-green-500/20 block text-right leading-none font-serif mt-2">"</span>
              </blockquote>
            </div>
          ))}
        </div>

        {/* Future-proof: When you have more testimonials, the grid will automatically adjust */}
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#f6f0e9] py-20 border-t border-[#2b180a]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <IconMedical />
              <span className="font-display font-bold text-2xl text-[#2b180a]">
                MediCoder<span className="text-medi-green-500">.AI</span>
              </span>
            </div>
            <p className="text-[#2b180a]/70 font-medium text-lg leading-relaxed max-w-md">
              Risk adjustment intelligence. No integration required.
            </p>
            <p className="text-[#2b180a]/60 text-sm leading-relaxed max-w-md">
              Surface missed HCCs, calculate RAF scores, and close revenue gaps — from any clinical note, any format, any EHR.
            </p>
          </div>

          {/* Links Section - Product */}
          <div>
            <h3 className="font-display font-bold text-[#2b180a] mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-[#2b180a]/70 hover:text-[#2b180a] transition-colors text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-[#2b180a]/70 hover:text-[#2b180a] transition-colors text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-[#2b180a]/70 hover:text-[#2b180a] transition-colors text-sm">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Links Section - Company */}
          <div>
            <h3 className="font-display font-bold text-[#2b180a] mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://calendly.com/samuel-han-medicoder/book-a-consultation" target="_blank" rel="noopener noreferrer" className="text-[#2b180a]/70 hover:text-[#2b180a] transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#2b180a]/10 pt-8">
          <p className="text-center text-sm text-[#2b180a]/50">
            &copy; {new Date().getFullYear()} MediCoder Technologies LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main App
export default function App() {
  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  return (
    <div className="relative">
      <IntroScreen />
      <div className="noise-overlay" />

      {/* Gradient orbs - positioned to follow sections */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{zIndex: 1}}>
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div className="gradient-orb gradient-orb-3" />
      </div>

      <Navigation />
      <main className="relative">
        <div className="fixed inset-0 pointer-events-none" style={{zIndex: -20}}>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-medi-gray-50/30 via-50% via-white via-75% to-medi-gray-50/20" />
        </div>
        <HeroSection />
        <NoIntegrationBanner />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
