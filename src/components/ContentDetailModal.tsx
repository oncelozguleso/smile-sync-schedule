import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { VideoContent } from "@/types/contentSchedule";
import { Clock, User, Tag, FileText, Camera } from "lucide-react";

interface ContentDetailModalProps {
  video: VideoContent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContentDetailModal = ({ video, isOpen, onClose }: ContentDetailModalProps) => {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-surface border-border shadow-dark">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-semibold text-bright-green flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-green flex items-center justify-center shadow-glow">
              <FileText className="w-4 h-4 text-white" />
            </div>
            {video.topic}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Details Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-bright-green/20 shadow-dark bg-darker-surface">
              <CardContent className="p-4 flex items-center gap-3">
                <User className="w-5 h-5 text-bright-green" />
                <div>
                  <p className="text-sm text-muted-foreground">Dentist</p>
                  <p className="font-semibold text-foreground">{video.dentist}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 shadow-dark bg-darker-surface">
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">{video.duration}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-success/20 shadow-dark bg-darker-surface">
              <CardContent className="p-4 flex items-center gap-3">
                <Tag className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-semibold text-foreground">{video.contentType}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-warning/20 shadow-dark bg-darker-surface">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-warning flex items-center justify-center">
                  <span className="text-xs font-bold text-warning-foreground">{video.day}</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Day</p>
                  <p className="font-semibold text-foreground">{video.date}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Script Section */}
          <Card className="border-bright-green/20 shadow-dark bg-darker-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-bright-green" />
                <h3 className="text-xl font-semibold text-bright-green">Video Script</h3>
              </div>
              <div className="bg-muted/20 rounded-lg p-6 border border-border">
                <div className="text-foreground leading-relaxed whitespace-pre-line font-medium">
                  {video.script}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* B-Roll Section */}
          <Card className="border-lime-green/20 shadow-dark bg-darker-surface">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Camera className="w-6 h-6 text-lime-green" />
                <h3 className="text-xl font-semibold text-lime-green">B-Roll Shot List</h3>
              </div>
              <div className="space-y-3">
                {video.brollShots.map((shot, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-muted/10 rounded-lg border border-border hover:bg-muted/20 transition-all duration-200"
                  >
                    <Badge variant="outline" className="mt-0.5 bg-lime-green/10 text-lime-green border-lime-green/30">
                      {index + 1}
                    </Badge>
                    <p className="text-foreground font-medium leading-relaxed">{shot}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};