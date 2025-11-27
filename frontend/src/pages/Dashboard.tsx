import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  MessageCircle, BookOpen, Target, Brain, TrendingUp, 
  Calendar, ArrowRight, Plus, CheckCircle2,
  Sun, Moon, CloudSun, Heart, Flame
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'
import { formatDate, getMoodEmoji, getGreeting } from '@/lib/utils'
import type { MoodEntry, Habit, HabitLog } from '@/lib/database.types'

interface DashboardStats {
  journalCount: number
  chatRooms: number
  streakDays: number
  moodAvg: number
}

const getTimeIcon = () => {
  const hour = new Date().getHours()
  if (hour < 12) return Sun
  if (hour < 18) return CloudSun
  return Moon
}

export default function Dashboard() {
  const { profile } = useAuthStore()
  const [stats, setStats] = useState<DashboardStats>({
    journalCount: 0,
    chatRooms: 0,
    streakDays: 0,
    moodAvg: 0,
  })
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([])
  const [todayHabits, setTodayHabits] = useState<(Habit & { completed: boolean })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const userId = profile?.id
      if (!userId) return

      const today = new Date().toISOString().split('T')[0]

      // Fetch stats in parallel
      const [journalsRes, moodsRes, habitsRes, logsRes] = await Promise.all([
        supabase.from('journal_entries').select('id', { count: 'exact' }).eq('user_id', userId),
        supabase.from('mood_entries').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(7),
        supabase.from('habits').select('*').eq('user_id', userId).eq('is_active', true),
        supabase.from('habit_logs').select('*').eq('user_id', userId).eq('date', today),
      ])

      // Process data
      setStats({
        journalCount: journalsRes.count || 0,
        chatRooms: 5, // Placeholder
        streakDays: calculateStreak(logsRes.data || []),
        moodAvg: calculateMoodAvg(moodsRes.data || []),
      })

      setRecentMoods(moodsRes.data || [])

      // Combine habits with completion status
      const habits = habitsRes.data || []
      const logs = logsRes.data || []
      setTodayHabits(
        habits.map((h) => ({
          ...h,
          completed: logs.some((l: HabitLog) => l.habit_id === h.id),
        }))
      )
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStreak = (logs: HabitLog[]): number => {
    // Simplified streak calculation
    return logs.length > 0 ? Math.min(logs.length, 7) : 0
  }

  const calculateMoodAvg = (moods: MoodEntry[]): number => {
    if (moods.length === 0) return 0
    const sum = moods.reduce((acc, m) => acc + m.mood_score, 0)
    return Math.round((sum / moods.length) * 10) / 10
  }

  const toggleHabit = async (habitId: string, completed: boolean) => {
    const userId = profile?.id
    if (!userId) return

    const today = new Date().toISOString().split('T')[0]

    if (completed) {
      // Remove log
      await supabase.from('habit_logs').delete().eq('habit_id', habitId).eq('date', today)
    } else {
      // Add log
      await supabase.from('habit_logs').insert({ habit_id: habitId, user_id: userId, date: today })
    }

    // Update local state
    setTodayHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, completed: !completed } : h))
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
          <Heart className="absolute inset-0 m-auto h-5 w-5 text-primary-600 animate-pulse" />
        </div>
      </div>
    )
  }

  const TimeIcon = getTimeIcon()

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-emerald-600 rounded-2xl p-5 md:p-6 text-white shadow-xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse-slow" />
          <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-float" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TimeIcon className="w-5 h-5 text-yellow-300" />
              <span className="text-primary-100 text-xs font-medium">
                {formatDate(new Date().toISOString())}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold">
              {getGreeting()}, {profile?.display_name || 'Friend'}!
            </h1>
            <p className="text-primary-100 text-sm mt-1">
              How are you feeling today?
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/app/mood"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-primary-600 rounded-lg 
                       hover:bg-primary-50 transition-all duration-300 shadow-md hover:shadow-lg 
                       hover:scale-105 font-medium text-sm"
            >
              <Plus size={16} /> Log Mood
            </Link>
            <Link
              to="/app/journal"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg 
                       hover:bg-white/30 transition-all duration-300 border border-white/30 font-medium text-sm"
            >
              <BookOpen size={16} /> Journal
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Journal Entries" value={stats.journalCount} color="purple" />
        <StatCard icon={MessageCircle} label="Chat Rooms" value={stats.chatRooms} color="blue" />
        <StatCard icon={Flame} label="Day Streak" value={stats.streakDays} color="green" suffix="🔥" />
        <StatCard icon={Brain} label="Avg Mood" value={stats.moodAvg || '-'} color="orange" />
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Habits */}
        <div className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Target className="text-green-600 dark:text-green-400" size={18} />
              </div>
              Today's Habits
            </h2>
            <Link to="/app/habits" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 font-medium group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {todayHabits.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No habits set up yet</p>
              <Link
                to="/app/habits"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg 
                         hover:bg-primary-700 transition-all duration-300 font-medium"
              >
                <Plus size={16} /> Create your first habit
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {todayHabits.slice(0, 5).map((habit, index) => (
                <button
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id, habit.completed)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 
                            transform hover:scale-[1.02] ${
                    habit.completed
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800'
                      : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-100 dark:border-gray-700'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    habit.completed 
                      ? 'bg-green-500 text-white scale-110' 
                      : 'border-2 border-gray-300 dark:border-gray-600'
                  }`}>
                    {habit.completed && <CheckCircle2 size={16} />}
                  </div>
                  <span className={`flex-1 text-left font-medium ${
                    habit.completed ? 'text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'
                  }`}>{habit.name}</span>
                  <span className="text-2xl">{habit.emoji || '✨'}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mood Trend */}
        <div className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-orange-600 dark:text-orange-400" size={18} />
              </div>
              Recent Moods
            </h2>
            <Link to="/app/mood" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 font-medium group">
              Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {recentMoods.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No mood entries yet</p>
              <Link
                to="/app/mood"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg 
                         hover:bg-primary-700 transition-all duration-300 font-medium"
              >
                <Plus size={16} /> Log your first mood
              </Link>
            </div>
          ) : (
            <div className="flex items-end justify-between h-36 gap-3 pt-4">
              {recentMoods.slice(0, 7).reverse().map((mood, index) => (
                <div key={mood.id} className="flex-1 flex flex-col items-center gap-2 group" style={{ animationDelay: `${index * 50}ms` }}>
                  <span className="text-2xl transform group-hover:scale-125 transition-transform duration-300">
                    {getMoodEmoji(mood.mood_score)}
                  </span>
                  <div className="w-full relative">
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
                        style={{ width: `${(mood.mood_score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {new Date(mood.created_at).toLocaleDateString('en', { weekday: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Today's Date Footer */}
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 
                      rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-500">
          <Calendar size={14} />
          {formatDate(new Date().toISOString())}
        </div>
      </div>
    </div>
  )
}

// Sub-components
function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color,
  suffix
}: { 
  icon: React.ElementType
  label: string
  value: string | number
  color: 'purple' | 'blue' | 'green' | 'orange'
  suffix?: string
}) {
  const colors = {
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30',
      icon: 'bg-purple-100 dark:bg-purple-800/50 text-purple-600 dark:text-purple-400',
      border: 'border-purple-100 dark:border-purple-800/50'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30',
      icon: 'bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400',
      border: 'border-blue-100 dark:border-blue-800/50'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30',
      icon: 'bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-400',
      border: 'border-green-100 dark:border-green-800/50'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30',
      icon: 'bg-orange-100 dark:bg-orange-800/50 text-orange-600 dark:text-orange-400',
      border: 'border-orange-100 dark:border-orange-800/50'
    },
  }

  return (
    <div className={`${colors[color].bg} ${colors[color].border} rounded-2xl p-5 border 
                   hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default group`}>
      <div className={`w-12 h-12 ${colors[color].icon} rounded-xl flex items-center justify-center mb-3
                     group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={22} />
      </div>
      <div className="flex items-baseline gap-1">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        {suffix && <span className="text-lg">{suffix}</span>}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">{label}</p>
    </div>
  )
}
