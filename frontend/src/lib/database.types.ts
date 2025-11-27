export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_seed: string
          created_at: string
          is_online: boolean
        }
        Insert: {
          id: string
          username: string
          avatar_seed?: string
          created_at?: string
          is_online?: boolean
        }
        Update: {
          id?: string
          username?: string
          avatar_seed?: string
          is_online?: boolean
        }
      }
      chat_rooms: {
        Row: {
          id: string
          name: string
          description: string
          topic: string
          icon: string
          color: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          topic: string
          icon?: string
          color?: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          name?: string
          description?: string
          topic?: string
          icon?: string
          color?: string
          is_active?: boolean
        }
      }
      messages: {
        Row: {
          id: string
          room_id: string
          user_id: string
          content: string
          created_at: string
          is_flagged: boolean
        }
        Insert: {
          id?: string
          room_id: string
          user_id: string
          content: string
          created_at?: string
          is_flagged?: boolean
        }
        Update: {
          content?: string
          is_flagged?: boolean
        }
      }
      journals: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          mood: number
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          mood?: number
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          content?: string
          mood?: number
          tags?: string[]
          updated_at?: string
        }
      }
      habits: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          icon: string
          color: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          icon?: string
          color?: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          icon?: string
          color?: string
          is_active?: boolean
        }
      }
      habit_logs: {
        Row: {
          id: string
          habit_id: string
          user_id: string
          completed_at: string
        }
        Insert: {
          id?: string
          habit_id: string
          user_id: string
          completed_at?: string
        }
        Update: {
          completed_at?: string
        }
      }
      mood_entries: {
        Row: {
          id: string
          user_id: string
          mood_score: number
          energy_level: number
          anxiety_level: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mood_score: number
          energy_level?: number
          anxiety_level?: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          mood_score?: number
          energy_level?: number
          anxiety_level?: number
          notes?: string | null
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row'] & {
  display_name?: string
}
export type ChatRoom = Database['public']['Tables']['chat_rooms']['Row'] & {
  member_count?: number
  is_private?: boolean
  created_by?: string
}
export type Message = Database['public']['Tables']['messages']['Row']
export type JournalEntry = Database['public']['Tables']['journals']['Row']
export type Journal = Database['public']['Tables']['journals']['Row']
export type Habit = Database['public']['Tables']['habits']['Row'] & {
  emoji?: string
}
export type HabitLog = Database['public']['Tables']['habit_logs']['Row'] & {
  date?: string
}
export type MoodEntry = Database['public']['Tables']['mood_entries']['Row']
