import { useState, useEffect } from 'react'

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
  <img src={`${import.meta.env.BASE_URL}MediCoderAIInverted.png`} alt="MediCoder.AI" className="w-8 h-8 object-contain" />
)

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
      scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-medi-gray-900/5' : 'bg-transparent'
    }`}>
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
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 badge-green animate-fade-in">
              <span className="w-2 h-2 bg-medi-green-500 rounded-full animate-pulse" />
              Built for Primary Care
            </div>
            
            <h1 className="section-heading animate-slide-up text-balance">
              Medical coding on{' '}
              <span className="gradient-text">autopilot</span>
            </h1>
            
            <p className="section-subheading animate-slide-up animate-delay-100">
              Transform your clinical notes into accurate ICD-10 and CPT/HCPCS codes instantly. 
              Purpose-built for outpatient primary care clinics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animate-delay-200">
              <a href="#pricing" className="btn-primary">
                Get Started
                <IconArrowRight />
              </a>
              <a href="#how-it-works" className="btn-secondary">
                See How It Works
              </a>
            </div>
            
            <div className="flex items-center gap-8 pt-4 animate-fade-in animate-delay-300">
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
          
          {/* Hero Visual - Code Preview */}
          <div className="relative animate-scale-in animate-delay-300">
            <div className="absolute inset-0 bg-gradient-to-r from-medi-green-500/20 to-medi-blue-500/20 rounded-3xl blur-3xl" />
            <div className="relative glass-card p-8 space-y-6">
              {/* Mock clinical note */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="badge-green text-xs font-mono">CLINICAL NOTE</div>
                  <div className="h-px flex-1 bg-medi-gray-200" />
                </div>
                
                <div className="font-body text-medi-gray-700 leading-relaxed">
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
              
              {/* Arrow indicator */}
              <div className="flex justify-center py-2">
                <div className="w-10 h-10 rounded-full bg-medi-green-100 flex items-center justify-center animate-float">
                  <svg className="w-5 h-5 text-medi-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
              
              {/* Generated codes */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 text-yellow-600 bg-yellow-200 text-xs font-mono rounded-full">GENERATED CODES</div>
                  <div className="h-px flex-1 bg-medi-gray-200" />
                </div>
                
                <div className="grid gap-2">
                  {[
                    { code: 'I10', desc: 'Essential hypertension', type: 'ICD-10-CM' },
                    { code: 'I25.111', desc: 'Atherosclerotic heart disease with angina', type: 'ICD-10-CM' },
                    { code: 'E78.5', desc: 'Hyperlipidemia, unspecified', type: 'ICD-10-CM' },
                    { code: '99397', desc: 'Preventive medicine, established patient', type: 'CPT' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-medi-gray-50 rounded-xl group hover:bg-medi-green-50 transition-colors">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Problem/Solution Section
function ProblemSection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-medi-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
            <div key={i} className="card group hover:scale-105 transition-transform duration-300">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                item.color === 'coral' ? 'bg-medi-coral-100 text-medi-coral-600' :
                item.color === 'blue' ? 'bg-medi-blue-100 text-medi-blue-600' :
                'bg-medi-green-100 text-medi-green-600'
              }`}>
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-medi-gray-900 mb-3">{item.title}</h3>
              <p className="text-medi-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How It Works Section
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="gradient-orb gradient-orb-3" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="badge-green mb-4 inline-flex">Simple & Powerful</div>
          <h2 className="section-heading mb-6">
            Steps to{' '}
            <span className="gradient-text">accurate codes</span>
          </h2>
          <p className="section-subheading mx-auto">
            Our AI analyzes your clinical documentation and generates appropriate 
            billing codes in seconds—not hours.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-medi-green-200 via-medi-green-400 to-medi-green-200" />
          
          {[
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
              desc: 'Review the suggested codes, make any adjustments, and submit for billing.',
              icon: <IconCode />
            }
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="card text-center group hover:shadow-2xl transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-medi-green-500 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-medi-green-500/30 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="text-sm font-mono text-medi-green-500 font-semibold mb-2">STEP {item.step}</div>
                <h3 className="font-display font-bold text-xl text-medi-gray-900 mb-3">{item.title}</h3>
                <p className="text-medi-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-medi-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="badge bg-medi-green-500/20 text-medi-green-400 mb-4 inline-flex">
            Built for Healthcare
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Everything you need,{' '}
            <span className="text-yellow-500">nothing you don't</span>
          </h2>
          <p className="text-xl text-medi-gray-400 max-w-3xl mx-auto">
            Focused features designed specifically for primary care outpatient coding workflows.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Primary Care Focused',
              desc: 'Optimized for family medicine, internal medicine, and general practice encounter types.',
              icon: '🩺'
            },
            {
              title: 'ICD-10-CM & CPT/HCPCS',
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
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-medi-green-500/50 transition-all duration-300 group">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-display font-bold text-lg mb-2 group-hover:text-medi-green-400 transition-colors">{item.title}</h3>
              <p className="text-medi-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
function PricingSection() {
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
      description: 'Ideal for growing practices that need collaborative coding workflows.',
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
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="gradient-orb gradient-orb-2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="badge-green mb-4 inline-flex">Flexible Plans</div>
          <h2 className="section-heading mb-6">
            Choose the plan that{' '}
            <span className="gradient-text">fits your practice</span>
          </h2>
          <p className="section-subheading mx-auto">
            From solo practitioners to large clinics, we have a plan designed for your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative card group hover:scale-105 transition-all duration-300 ${
                tier.highlighted
                  ? 'ring-2 ring-medi-green-500 shadow-xl shadow-medi-green-500/20'
                  : ''
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
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
                  href="mailto:contact@medicoder.ai"
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
  return (
    <div className="max-w-xl mx-auto p-8 text-center">
  <p className="text-lg text-medi-gray-600 mb-6">
    Ready to learn more? Get in touch with our team.
  </p>
  <a href="mailto:contact@medicoder.ai" target="_blank" rel="noopener noreferrer" className="btn-primary">
    contact@medicoder.ai
    <IconArrowRight />
  </a>
</div>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-medi-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <IconMedical />
            <span className="font-display font-bold text-xl">
              MediCoder<span className="text-yellow-500">.AI</span>
            </span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-medi-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-medi-gray-500">
          <p>&copy; {new Date().getFullYear()} MediCoder Technologies LLC. All rights reserved.</p>
          <p className="mt-2">Built for primary care. Designed for simplicity.</p>
        </div>
      </div>
    </footer>
  )
}

// Main App
export default function App() {
  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navigation />
      <main>
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
