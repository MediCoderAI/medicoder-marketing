import { useState, useEffect, useRef } from 'react'

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
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
const IconCode = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

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
              Request Demo
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
              <a href="#pricing" className="btn-primary text-center">Request Demo</a>
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

  const codes = [
    { code: 'I10', desc: 'Essential hypertension', type: 'ICD-10-CM' },
    { code: 'I25.111', desc: 'Atherosclerotic heart disease with angina', type: 'ICD-10-CM' },
    { code: 'E78.5', desc: 'Hyperlipidemia, unspecified', type: 'ICD-10-CM' },
    { code: '99397', desc: 'Preventive medicine, established patient', type: 'CPT' },
  ]

  useEffect(() => {
    // Step 0: Show note with paste animation (1.5s)
    // Step 1: Show process button (2s)
    // Step 1.5: Button click effect (200ms)
    // Step 2: Processing (2s)
    // Step 3: Show all codes at once (3s)
    const timings = [1500, 2000, 200, 2000, 3000]

    const timer = setTimeout(() => {
      if (animationStep === 4) {
        setAnimationStep(0)
      } else {
        setAnimationStep(animationStep + 1)
      }
    }, timings[animationStep])

    return () => clearTimeout(timer)
  }, [animationStep])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 badge-green animate-swipe-up">
              <span className="w-2 h-2 bg-medi-green-500 rounded-full animate-pulse" />
              Built for Primary Care
            </div>

            <h1 className="section-heading animate-swipe-up animate-delay-100 text-balance">
              Medical coding on{' '}
              <span className="gradient-text">autopilot</span>
            </h1>

            <p className="section-subheading animate-swipe-up animate-delay-200">
              Transform your clinical notes into accurate ICD-10, CPT & HCPCS codes instantly.
              Purpose-built for outpatient primary care clinics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-swipe-up animate-delay-300">
              <a href="#pricing" className="btn-primary">
                Get Started
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
                <span className="text-medi-gray-600 font-medium">95%+ Accuracy</span>
              </div>
            </div>
          </div>

          {/* Hero Visual - Animated Code Preview */}
          <div className="relative animate-swipe-up animate-delay-500">
            <div className="absolute inset-0 rounded-3xl blur-3xl animate-glow-pulse" style={{
              background: 'linear-gradient(to right, rgba(21, 19, 36, 0.2), rgba(238, 204, 111, 0.3), rgba(249, 115, 22, 0.1))'
            }} />
            <div className="relative glass-card p-8 gradient-border" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              transition: 'all 500ms ease-out'
            }}>
              {/* Mock clinical note */}
              <div className={`space-y-4 transition-all duration-500 ${animationStep >= 4 ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                <div className="flex items-center gap-3">
                  <div className="badge-green text-xs font-mono">CLINICAL NOTE</div>
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

                <div className={`font-body text-medi-gray-700 leading-relaxed ${animationStep === 0 ? 'animate-slide-up' : ''}`}>
                  <p className="mb-3">
                    73-year-old male presents for annual check-up. History of{' '}
                    <span className="bg-medi-coral-100 text-medi-coral-700 px-1.5 py-0.5 rounded font-medium">
                      coronary artery disease
                    </span>{' '}
                    with stent placement 04/2022.
                  </p>
                  <p>
                    Current medications for{' '}
                    <span className="bg-medi-coral-100 text-medi-coral-700 px-1.5 py-0.5 rounded font-medium">
                      hypertension
                    </span>{' '}
                    and{' '}
                    <span className="bg-medi-coral-100 text-medi-coral-700 px-1.5 py-0.5 rounded font-medium">
                      hyperlipidemia
                    </span>.
                  </p>
                </div>
              </div>

              {/* Process Button / Click Effect / Loading / Arrow */}
              <div className="flex justify-center py-2">
                {animationStep === 1 ? (
                  <button className="btn-primary !py-3 !px-6 !text-sm animate-scale-in">
                    <IconBolt />
                    Process Note
                  </button>
                ) : animationStep === 2 ? (
                  <button className="btn-primary !py-3 !px-6 !text-sm scale-95 opacity-80 transition-all duration-200">
                    <IconBolt />
                    Process Note
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
                    <span className="text-medi-gray-600 font-medium ml-2">Processing...</span>
                  </div>
                ) : animationStep >= 4 ? (
                  <svg className="w-8 h-8 text-medi-green-500 animate-scale-in" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                ) : null}
              </div>

              {/* Generated codes - appear all at once */}
              {animationStep >= 4 && (
                <div className="space-y-3 animate-slide-up">
                  <div className="flex items-center gap-3">
                    <div className="px-2 py-1 text-yellow-600 bg-yellow-200 text-xs font-mono rounded-full">GENERATED CODES</div>
                    <div className="h-px flex-1 bg-medi-gray-200" />
                  </div>

                  <div className="grid gap-2">
                    {codes.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-medi-gray-50 rounded-xl group hover:bg-medi-green-50 transition-all duration-300 hover:shadow-md hover:shadow-medi-green-500/10"
                        style={{
                          animation: 'slideUp 0.6s ease-out forwards',
                          animationDelay: `${i * 100}ms`,
                          opacity: 0
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-semibold text-medi-gray-900">{item.code}</span>
                          <span className="text-sm text-medi-gray-500">{item.desc}</span>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          item.type === 'CPT' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
            Medical coding shouldn't be a{' '}
            <span className="line-through text-yellow-500">bottleneck</span>
          </h2>
          <p className="section-subheading mx-auto">
            Your staff spends hours translating clinical documentation into billing codes. 
            We believe that time is better spent on patient care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <IconClock />,
              title: 'Hours Lost Daily',
              desc: 'Manual coding takes 10-15 minutes per encounter. For a busy clinic, that adds up to hours every day.',
              color: 'coral'
            },
            {
              icon: <IconChart />,
              title: 'Revenue at Risk',
              desc: 'Coding errors lead to claim denials. Each rejected claim costs time and money to rework and resubmit.',
              color: 'blue'
            },
            {
              icon: <IconShield />,
              title: 'Compliance Concerns',
              desc: 'Staying current with coding updates and documentation requirements is a constant challenge.',
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
      title: 'Upload Clinical Note',
      desc: 'Upload your clinical documentation. We support encounter notes, progress notes, and more.',
      icon: <IconDocument />
    },
    {
      step: '02',
      title: 'AI Analysis',
      desc: 'Our specialized AI reads the note, identifies diagnoses, procedures, and relevant clinical concepts.',
      icon: <IconBolt />
    },
    {
      step: '03',
      title: 'Review & Submit',
      desc: 'Review suggested codes and apply any necessary adjustments seamlessly in your existing billing workflow.',
      icon: <IconCode />
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
              Steps to{' '}
              <span className="gradient-text">accurate codes</span>
            </h2>
            <p className="section-subheading">
              Our AI analyzes your clinical documentation and generates appropriate
              billing codes in seconds—not hours.
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
            Built for Healthcare
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-medi-gray-900">
            Everything you need,{' '}
            <span className="gradient-text">nothing you don't</span>
          </h2>
          <p className="text-xl text-medi-gray-600 max-w-3xl mx-auto leading-relaxed">
            Focused features designed specifically for primary care outpatient coding workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Primary Care Focused',
              desc: 'Purpose-built for family medicine, internal medicine, pediatrics, geriatrics, and telehealth specialties.',
              icon: '🩺'
            },
            {
              title: 'ICD-10-CM, CPT & HCPCS',
              desc: 'Generates both diagnosis and procedure codes from a single clinical note.',
              icon: '📋'
            },
            {
              title: 'HIPAA Compliant',
              desc: 'Enterprise-grade security with full HIPAA compliance and BAA available.',
              icon: '🔒'
            },
            {
              title: '95%+ Accuracy',
              desc: 'High accuracy rates validated against certified coder benchmarks.',
              icon: '🎯'
            },
            {
              title: 'Instant Results',
              desc: 'Get code suggestions in seconds, not minutes. Batch processing available.',
              icon: '⚡'
            },
            {
              title: 'Smart De-ID',
              desc: 'Intelligent redaction of sensitive PII data. Protect patient privacy automatically.',
              icon: '🛡️'
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
      name: 'Free Trial',
      description: 'Experience AI medical coding with no commitment.',
      perks: [
        '14-day full access trial',
        'Email support',
        'No credit card required',
        'Single user access'
      ],
      highlighted: false,
      badge: null
    },
    {
      name: 'Basic',
      description: 'For solo cilinicians needing precision and trusted tool.',
      perks: [
        'Unlimited code generation',
        'Standard support',
        'Single user access'
      ],
      highlighted: false,
      badge: null
    },
    {
      name: 'Team',
      description: 'Ideal for teams that need collaborative coding workflows.',
      perks: [
        'All perks from previous tier',
        'Priority support',
        'Multi-user access (up to 5)'
      ],
      highlighted: true,
      badge: 'Most Popular'
    },
    {
      name: 'Business',
      description: 'Enterprise-grade solution for high-volume clinics and organizations.',
      perks: [
        'All perks from previous tier',
        'Priority support',
        'Multi-user access (up to 10)'
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
            Choose the plan that{' '}
            <span className="gradient-text">fits your practice</span>
          </h2>
          <p className="section-subheading mx-auto">
            From solo practitioners to large clinics,<br />
            we have a plan designed for your needs.
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
        Ready to learn more? Get in touch with our team.
      </p>
      <button onClick={handleCopyEmail} className="btn-primary">
        contact@medicoder.ai
        <IconArrowRight />
      </button>
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
              Built for primary care. Designed for simplicity.
            </p>
            <p className="text-[#2b180a]/60 text-sm leading-relaxed max-w-md">
              Transform your clinical notes into accurate medical codes with AI-powered automation.
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

      {/* Gradient orbs - positioned globally to flow across sections */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{zIndex: 1}}>
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
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
