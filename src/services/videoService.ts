import { supabase, VideoRecord } from '@/lib/supabase'
import { VideoContent } from '@/types/contentSchedule'
import { contentScheduleData } from '@/data/contentSchedule'

// Convert VideoContent to VideoRecord for database
const convertToVideoRecord = (video: VideoContent): Omit<VideoRecord, 'created_at' | 'updated_at'> => ({
  id: video.id,
  date: video.date,
  day: video.day,
  dentist: video.dentist,
  topic: video.topic,
  content_type: video.contentType,
  duration: video.duration,
  script: video.script,
  broll_shots: video.brollShots,
  completed: video.completed
})

// Convert VideoRecord to VideoContent for the app
const convertToVideoContent = (record: VideoRecord): VideoContent => ({
  id: record.id,
  date: record.date,
  day: record.day,
  dentist: record.dentist,
  topic: record.topic,
  contentType: record.content_type,
  duration: record.duration,
  script: record.script,
  brollShots: record.broll_shots,
  completed: record.completed
})

export class VideoService {
  // Initialize database with default data (run once)
  static async initializeDatabase(): Promise<void> {
    try {
      // Check if data already exists
      const { data: existingData } = await supabase
        .from('videos')
        .select('id')
        .limit(1)

      if (existingData && existingData.length > 0) {
        console.log('Database already initialized')
        return
      }

      // Insert initial data
      const videoRecords = contentScheduleData.map(convertToVideoRecord)
      const { error } = await supabase
        .from('videos')
        .insert(videoRecords)

      if (error) {
        throw error
      }

      console.log('Database initialized with video schedule data')
    } catch (error) {
      console.error('Error initializing database:', error)
      throw error
    }
  }

  // Get all videos
  static async getAllVideos(): Promise<VideoContent[]> {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('day', { ascending: true })

      if (error) {
        throw error
      }

      return data ? data.map(convertToVideoContent) : []
    } catch (error) {
      console.error('Error fetching videos:', error)
      // Fallback to static data if database fails
      return contentScheduleData
    }
  }

  // Update video completion status
  static async updateVideoCompletion(videoId: string, completed: boolean): Promise<void> {
    try {
      const { error } = await supabase
        .from('videos')
        .update({ completed })
        .eq('id', videoId)

      if (error) {
        throw error
      }

      console.log(`Video ${videoId} completion status updated to ${completed}`)
    } catch (error) {
      console.error('Error updating video completion:', error)
      throw error
    }
  }

  // Subscribe to real-time changes
  static subscribeToChanges(callback: (videos: VideoContent[]) => void) {
    const subscription = supabase
      .channel('videos-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'videos'
        },
        async () => {
          // Refetch all videos when any change occurs
          const videos = await VideoService.getAllVideos()
          callback(videos)
        }
      )
      .subscribe()

    return subscription
  }

  // Unsubscribe from changes
  static unsubscribe(subscription: any) {
    supabase.removeChannel(subscription)
  }
}
