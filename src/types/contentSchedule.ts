export interface VideoContent {
  id: string;
  date: string;
  day: number;
  dentist: string;
  topic: string;
  contentType: string;
  duration: string;
  script: string;
  brollShots: string[];
  completed: boolean;
}

export interface ScheduleWeek {
  weekNumber: number;
  videos: VideoContent[];
}