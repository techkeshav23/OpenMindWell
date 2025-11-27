import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  MessageCircle, Users, Lock, Globe, Plus, Search, 
  Clock, ArrowRight, Sparkles, Heart
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import type { ChatRoom } from '@/lib/database.types'
import { formatRelativeTime } from '@/lib/utils'

const ROOM_CATEGORIES = [
  { id: 'all', label: 'All Rooms', icon: Globe, color: 'from-gray-500 to-gray-600' },
  { id: 'anxiety', label: 'Anxiety', icon: Heart, color: 'from-purple-500 to-violet-600' },
  { id: 'depression', label: 'Depression', icon: MessageCircle, color: 'from-blue-500 to-indigo-600' },
  { id: 'stress', label: 'Stress', icon: Sparkles, color: 'from-orange-500 to-red-600' },
  { id: 'relationships', label: 'Relationships', icon: Users, color: 'from-pink-500 to-rose-600' },
  { id: 'general', label: 'General', icon: MessageCircle, color: 'from-primary-500 to-emerald-600' },
]

export default function ChatRooms() {
  useAuthStore()
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setRooms(data || [])
    } catch (error) {
      console.error('Error loading rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase()) ||
                          room.description?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || room.topic === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4 md:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl md:rounded-3xl p-4 md:p-8 text-white shadow-2xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 md:w-40 h-28 md:h-40 bg-white/10 rounded-full blur-2xl animate-pulse-slow" />
          <div className="absolute -bottom-10 -left-10 w-24 md:w-32 h-24 md:h-32 bg-white/10 rounded-full blur-2xl animate-float" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h1 className="text-xl md:text-3xl font-bold">Chat Rooms</h1>
            </div>
            <p className="text-blue-100 text-sm md:text-lg max-w-md">
              Connect anonymously with peers who understand. Find your safe space.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white text-indigo-600 rounded-xl 
                     hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl 
                     hover:scale-105 font-semibold text-sm md:text-base w-full md:w-auto"
          >
            <Plus size={18} /> Create Room
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl 
                       bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       transition-all duration-300 text-base md:text-lg"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {ROOM_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 font-medium ${
                category === cat.id
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-[1.02]'
              }`}
            >
              <cat.icon size={16} /> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rooms Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
            <MessageCircle className="absolute inset-0 m-auto h-5 w-5 text-primary-600 animate-pulse" />
          </div>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
            <MessageCircle className="text-gray-400 w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No rooms found</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Try adjusting your search or be the first to create a room in this category!
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl 
                     hover:bg-primary-700 transition-all duration-300 font-medium"
          >
            <Plus size={18} /> Create a Room
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {filteredRooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>
      )}

      {/* Create Room Modal */}
      {showCreateModal && (
        <CreateRoomModal 
          onClose={() => setShowCreateModal(false)} 
          onCreated={() => {
            setShowCreateModal(false)
            loadRooms()
          }}
        />
      )}
    </div>
  )
}

function RoomCard({ room, index }: { room: ChatRoom; index: number }) {
  const categoryColor = ROOM_CATEGORIES.find(c => c.id === room.topic)?.color || 'from-primary-500 to-emerald-600'
  
  return (
    <Link
      to={`/app/chat/${room.id}`}
      className="group block glass rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-xl transition-all duration-300 
                 transform hover:scale-[1.02] hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${categoryColor} rounded-xl flex items-center justify-center 
                         shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {room.is_private ? (
              <Lock className="text-white" size={18} />
            ) : (
              <Globe className="text-white" size={18} />
            )}
          </div>
          <span className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full capitalize font-medium">
            {room.topic || 'general'}
          </span>
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 
                      group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors duration-300">
          <ArrowRight className="text-gray-400 group-hover:text-primary-600 transition-colors duration-300" size={16} />
        </div>
      </div>

      {/* Content */}
      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 
                   dark:group-hover:text-primary-400 transition-colors duration-300">
        {room.name}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
        {room.description || 'A safe space for peer support and connection.'}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="flex items-center gap-2 text-gray-500">
          <div className="flex -space-x-2">
            {[...Array(Math.min(3, room.member_count || 0))].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 
                                    border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] text-white">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span className="font-medium">{room.member_count || 0} members</span>
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Clock size={14} /> {formatRelativeTime(room.created_at)}
        </span>
      </div>
    </Link>
  )
}

function CreateRoomModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const { profile } = useAuthStore()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState('general')
  const [isPrivate, setIsPrivate] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !profile?.id) return

    setLoading(true)
    try {
      const { error } = await supabase.from('chat_rooms').insert({
        name: name.trim(),
        description: description.trim(),
        topic,
        is_private: isPrivate,
        created_by: profile.id,
      })

      if (error) throw error
      onCreated()
    } catch (error) {
      console.error('Error creating room:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl p-5 md:p-8 w-full sm:max-w-md shadow-2xl 
                    transform animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-xl 
                        flex items-center justify-center shadow-lg">
            <Plus className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Create Chat Room</h2>
            <p className="text-xs md:text-sm text-gray-500">Start a new conversation space</p>
          </div>
        </div>
        
        <form onSubmit={handleCreate} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Room Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Anxiety Support Circle"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl 
                       bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       transition-all duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this room about? Help others know what to expect..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl 
                       bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       transition-all duration-300 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl 
                       bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent
                       transition-all duration-300 cursor-pointer"
            >
              <option value="general">General Support</option>
              <option value="anxiety">Anxiety</option>
              <option value="depression">Depression</option>
              <option value="stress">Stress Management</option>
              <option value="relationships">Relationships</option>
            </select>
          </div>

          <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
            <input
              type="checkbox"
              id="private"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="private" className="flex-1">
              <span className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Lock size={16} className="text-orange-500" /> Private Room
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Only invited members can join
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl 
                       hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex-1 px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl 
                       hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </span>
              ) : (
                'Create Room'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
