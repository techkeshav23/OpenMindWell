import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Brain, MessageCircle, BookOpen, Target, TrendingUp, Sparkles,
  Menu, X, Moon, Sun, LogOut, Phone, ChevronLeft, ChevronRight, Home
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { supabase, signInAnonymously, generateUsername, signOut } from '../../lib/supabase'
import { getAvatarUrl } from '../../lib/utils'
import CrisisModal from '@/components/CrisisModal'
import toast from 'react-hot-toast'

const navItems = [
  { to: '/app', icon: Home, label: 'Dashboard', end: true },
  { to: '/app/chat', icon: MessageCircle, label: 'Chat Rooms' },
  { to: '/app/journal', icon: BookOpen, label: 'Journal' },
  { to: '/app/habits', icon: Target, label: 'Habits' },
  { to: '/app/mood', icon: TrendingUp, label: 'Mood Tracker' },
  { to: '/app/resources', icon: Sparkles, label: 'Resources' },
]

export default function DashboardLayout() {
  const navigate = useNavigate()
  const { user, profile, setProfile, logout } = useAuthStore()
  const { sidebarOpen, darkMode, setSidebarOpen, toggleDarkMode } = useUIStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showCrisis, setShowCrisis] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const initUser = async () => {
      if (!user) {
        try {
          await signInAnonymously()
          toast.success('Welcome! You\'re anonymous.')
        } catch (error) {
          toast.error('Failed to connect')
          return
        }
      }

      // Fetch or create profile
      if (user && !profile) {
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (existingProfile) {
          setProfile(existingProfile)
        } else {
          const newProfile = {
            id: user.id,
            username: generateUsername(),
            avatar_seed: Math.random().toString(36).substring(7),
            is_online: true,
          }
          
          const { data, error } = await supabase
            .from('profiles')
            .insert(newProfile)
            .select()
            .single()

          if (!error && data) {
            setProfile(data)
          }
        }
      }
    }

    initUser()
  }, [user, profile, setProfile])

  const handleSignOut = async () => {
    try {
      await signOut()
      logout()
      navigate('/')
      toast.success('Signed out')
    } catch {
      toast.error('Failed to sign out')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-primary-50/30 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center justify-between px-4 h-16">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Brain className="text-white" size={20} />
            </div>
            <span className="font-bold text-lg">OpenMindWell</span>
          </div>
          <button 
            onClick={() => setShowCrisis(true)} 
            className="p-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all"
          >
            <Phone size={20} />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className={`hidden lg:flex flex-col fixed top-0 left-0 h-full z-40
          bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50
          transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-72' : 'w-20'}`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 h-20 border-b border-gray-200/50 dark:border-gray-800/50">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 flex-shrink-0">
              <Brain className="text-white" size={22} />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                OpenMindWell
              </span>
            )}
          </div>

          {/* Profile */}
          {profile && (
            <div className={`p-4 border-b border-gray-200/50 dark:border-gray-800/50 ${!sidebarOpen && 'flex justify-center'}`}>
              <div className={`flex items-center gap-3 ${sidebarOpen ? 'p-3 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl' : 'flex-col'}`}>
                <div className="relative">
                  <img
                    src={getAvatarUrl(profile.avatar_seed)}
                    alt="Avatar"
                    className="w-11 h-11 rounded-xl bg-gray-100 ring-2 ring-primary-500/20"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                </div>
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{profile.username}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Anonymous
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `
                  group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800/70 text-gray-700 dark:text-gray-300'}
                  ${!sidebarOpen && 'justify-center px-3'}
                `}
              >
                <item.icon size={20} className={`flex-shrink-0`} />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50 space-y-2">
            <button
              onClick={() => setShowCrisis(true)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full
                bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 
                text-red-600 dark:text-red-400 hover:from-red-100 hover:to-red-100 dark:hover:from-red-900/30 dark:hover:to-red-900/20
                border border-red-200/50 dark:border-red-800/30 transition-all duration-200
                ${!sidebarOpen && 'justify-center px-3'}`}
            >
              <Phone size={20} />
              {sidebarOpen && <span className="font-medium">Crisis Help</span>}
            </button>

            <div className="flex gap-2">
              <button
                onClick={toggleDarkMode}
                className={`flex items-center justify-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                  ${sidebarOpen ? 'flex-1' : 'w-full'}`}
              >
                {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-500" />}
              </button>

              <button
                onClick={handleSignOut}
                className={`flex items-center justify-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors
                  ${sidebarOpen ? 'flex-1' : 'hidden'}`}
              >
                <LogOut size={20} />
              </button>
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
                ${!sidebarOpen && 'justify-center px-3'}`}
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              {sidebarOpen && <span className="text-sm text-gray-500">Collapse sidebar</span>}
            </button>
          </div>
        </aside>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-30">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="p-5">
                {/* Mobile Logo */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                    <Brain className="text-white" size={22} />
                  </div>
                  <span className="font-bold text-xl">OpenMindWell</span>
                </div>

                {profile && (
                  <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl">
                    <div className="relative">
                      <img src={getAvatarUrl(profile.avatar_seed)} alt="" className="w-12 h-12 rounded-xl ring-2 ring-primary-500/20" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                    </div>
                    <div>
                      <p className="font-semibold">{profile.username}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Anonymous User
                      </p>
                    </div>
                  </div>
                )}
                
                <nav className="space-y-1.5">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                      `}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-2">
                  <button
                    onClick={() => { setShowCrisis(true); setMobileOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl w-full
                      bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 
                      text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-800/30"
                  >
                    <Phone size={20} />
                    <span className="font-medium">Crisis Help</span>
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={toggleDarkMode}
                      className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-800"
                    >
                      {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-500" />}
                      <span className="text-sm">{darkMode ? 'Light' : 'Dark'}</span>
                    </button>
                    <button
                      onClick={() => { handleSignOut(); setMobileOpen(false); }}
                      className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500"
                    >
                      <LogOut size={20} />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className={`flex-1 min-h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <CrisisModal open={showCrisis} onClose={() => setShowCrisis(false)} />
    </div>
  )
}
