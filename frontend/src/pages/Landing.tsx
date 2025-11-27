import { Link, useNavigate } from 'react-router-dom'
import { 
  Brain, MessageCircle, BookOpen, Target, Heart, Shield, 
  Sparkles, ArrowRight, Moon, Sun, Star,
  Lock, ChevronRight
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { signInAnonymously } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const features = [
  {
    icon: MessageCircle,
    title: 'Anonymous Peer Support',
    desc: 'Connect with others who understand in safe, topic-based chat rooms.',
    gradient: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/25',
  },
  {
    icon: BookOpen,
    title: 'Private Journaling',
    desc: 'Express your thoughts freely in a secure, encrypted personal journal.',
    gradient: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-500/25',
  },
  {
    icon: Target,
    title: 'Habit Tracking',
    desc: 'Build healthy routines with visual tracking and streak motivation.',
    gradient: 'from-green-500 to-emerald-500',
    shadow: 'shadow-green-500/25',
  },
  {
    icon: Brain,
    title: 'Mood Insights',
    desc: 'Track emotional patterns and discover what affects your wellbeing.',
    gradient: 'from-orange-500 to-amber-500',
    shadow: 'shadow-orange-500/25',
  },
  {
    icon: Shield,
    title: 'Crisis Resources',
    desc: 'One-click access to helplines when you need support the most.',
    gradient: 'from-red-500 to-rose-500',
    shadow: 'shadow-red-500/25',
  },
  {
    icon: Sparkles,
    title: 'Wellness Tips',
    desc: 'Get personalized suggestions based on your mood and activities.',
    gradient: 'from-teal-500 to-cyan-500',
    shadow: 'shadow-teal-500/25',
  },
]

const stats = [
  { value: '100%', label: 'Free Forever' },
  { value: '0', label: 'Data Collected' },
  { value: '24/7', label: 'Available' },
  { value: '∞', label: 'Anonymous' },
]

const testimonials = [
  {
    text: "This app helped me through my darkest days. The anonymous chat rooms made me feel less alone.",
    author: "Anonymous User",
    role: "Community Member"
  },
  {
    text: "Finally, a mental health app that doesn't require my email or track my data. Pure support.",
    author: "Anonymous User", 
    role: "Daily User"
  },
  {
    text: "The habit tracker and journal combo has genuinely improved my daily routine and mental clarity.",
    author: "Anonymous User",
    role: "6-month User"
  }
]

export default function Landing() {
  const { darkMode, toggleDarkMode } = useUIStore()
  const { setUser, setLoading } = useAuthStore()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleGetStarted = async () => {
    setIsSigningIn(true)
    setLoading(true)
    try {
      const { user } = await signInAnonymously()
      if (!user) throw new Error('Failed to create anonymous account')
      setUser(user)
      // Profile will be created by database trigger or we can create it here
      toast.success('Welcome! Your anonymous account is ready.', {
        icon: '💚',
        style: {
          borderRadius: '12px',
          background: '#10b981',
          color: '#fff',
        },
      })
      navigate('/app')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create account')
    } finally {
      setIsSigningIn(false)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Brain className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              OpenMindWell
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
            </button>
            <Link
              to="/app"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:opacity-90 transition-all duration-200"
            >
              Open App <ChevronRight size={18} />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Free & Anonymous Mental Health Support
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Your Safe Space for
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Mental Wellness
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect anonymously with peers, track your mood, build healthy habits, 
            and access crisis resources — all in one beautiful, private space.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleGetStarted}
              disabled={isSigningIn}
              className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl text-lg font-bold 
                         hover:from-primary-600 hover:to-primary-700 transition-all duration-300 
                         shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/40 hover:scale-[1.02]
                         flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSigningIn ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Get Started Free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <a
              href="https://github.com/yourusername/openmindwell"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-lg 
                         font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-[1.02]
                         flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              View on GitHub
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Lock size={16} className="text-green-600" />
              </div>
              <span>No sign-up required</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <Heart size={16} className="text-red-500" />
              </div>
              <span>100% Free forever</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Shield size={16} className="text-blue-600" />
              </div>
              <span>Privacy-first</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit designed with privacy and accessibility at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 
                           hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                <div className={`relative w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${feature.shadow}`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="relative text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="relative text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-8 leading-relaxed">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            <div className="text-gray-600 dark:text-gray-400">
              <p className="font-semibold">{testimonials[currentTestimonial].author}</p>
              <p className="text-sm">{testimonials[currentTestimonial].role}</p>
            </div>
            
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'w-8 bg-primary-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-[2.5rem] p-12 md:p-16">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            </div>
            
            <div className="relative text-center text-white">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                Start Your Wellness Journey
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                No email, no password, no tracking. Just instant, anonymous access to the support you deserve.
              </p>
              <button
                onClick={handleGetStarted}
                disabled={isSigningIn}
                className="px-10 py-5 bg-white text-primary-600 rounded-2xl text-lg font-bold 
                           hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-[1.02]
                           disabled:opacity-70"
              >
                {isSigningIn ? 'Creating...' : 'Begin Now — It\'s Free'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Brain className="text-white" size={24} />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">OpenMindWell</span>
            </div>
            <p className="text-gray-500 text-center">
              Built with 💚 for mental health awareness. Open source and free forever.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-primary-600 transition">Privacy</a>
              <a href="#" className="hover:text-primary-600 transition">Terms</a>
              <a href="#" className="hover:text-primary-600 transition">Resources</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for blob animation */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(30px, 30px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
