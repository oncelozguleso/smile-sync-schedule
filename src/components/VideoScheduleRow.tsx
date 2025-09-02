import { VideoContent } from "@/types/contentSchedule";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, User, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoScheduleRowProps {
  video: VideoContent;
  onViewDetails: (video: VideoContent) => void;
  onToggleComplete: (videoId: string) => void;
}

export const VideoScheduleRow = ({
  video,
  onViewDetails,
  onToggleComplete,
}: VideoScheduleRowProps) => {
  const getDentistColor = (dentist: string) => {
    return dentist.includes("Nourine") ? "accent" : "lime-green";
  };

  const getContentTypeColor = (type: string) => {
    if (type.includes("Educational")) return "success";
    if (type.includes("Technology")) return "bright-green";
    if (type.includes("Problem")) return "warning";
    return "muted";
  };

  return (
    <tr 
      className={cn(
        "border-b border-border hover:bg-muted/20 transition-all duration-200",
        video.completed && "bg-success/5"
      )}
    >
      {/* Day & Date */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-green flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-sm">{video.day}</span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{video.date}</p>
          </div>
        </div>
      </td>

      {/* Dentist */}
      <td className="p-4">
        <div className="flex items-center gap-2">
          <User className={`w-4 h-4 ${video.dentist.includes("Nourine") ? "text-accent" : "text-lime-green"}`} />
          <span className="font-medium text-foreground">{video.dentist}</span>
        </div>
      </td>

      {/* Topic */}
      <td className="p-4">
        <Button
          variant="ghost"
          onClick={() => onViewDetails(video)}
          className="h-auto p-0 text-left hover:text-bright-green transition-colors justify-start"
        >
          <div>
            <p className="font-semibold text-foreground hover:text-bright-green transition-colors">
              {video.topic}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs",
                  getContentTypeColor(video.contentType) === "success" && "border-success/30 text-success bg-success/10",
                  getContentTypeColor(video.contentType) === "bright-green" && "border-bright-green/30 text-bright-green bg-bright-green/10",
                  getContentTypeColor(video.contentType) === "warning" && "border-warning/30 text-warning bg-warning/10",
                  getContentTypeColor(video.contentType) === "muted" && "border-muted-foreground/30 text-muted-foreground bg-muted/10"
                )}
              >
                {video.contentType}
              </Badge>
            </div>
          </div>
        </Button>
      </td>

      {/* Duration */}
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground font-medium">{video.duration}</span>
        </div>
      </td>

      {/* Actions */}
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(video)}
            className="hover:bg-bright-green/10 hover:border-bright-green/30 hover:text-bright-green transition-all"
          >
            <Play className="w-4 h-4 mr-2" />
            View Script
          </Button>
          
          <Button
            variant={video.completed ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleComplete(video.id)}
            className={cn(
              "transition-all duration-200",
              video.completed
                ? "bg-success hover:bg-success/80 text-success-foreground shadow-glow"
                : "hover:bg-success/10 hover:border-success/30 hover:text-success"
            )}
          >
            <Check className="w-4 h-4 mr-2" />
            {video.completed ? "Completed" : "Mark Done"}
          </Button>
        </div>
      </td>
    </tr>
  );
};