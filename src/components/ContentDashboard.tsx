import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contentScheduleData } from "@/data/contentSchedule";
import { VideoContent } from "@/types/contentSchedule";
import { ContentDetailModal } from "./ContentDetailModal";
import { VideoScheduleRow } from "./VideoScheduleRow";
import { exportToExcel, exportDentistSchedule } from "@/utils/excelExport";
import { Calendar, Users, Video, CheckCircle2, Clock, Target, Download, FileSpreadsheet, User, Play, Check } from "lucide-react";

export const ContentDashboard = () => {
  const [videos, setVideos] = useState<VideoContent[]>(contentScheduleData);
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (video: VideoContent) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleToggleComplete = (videoId: string) => {
    setVideos(prev =>
      prev.map(video =>
        video.id === videoId
          ? { ...video, completed: !video.completed }
          : video
      )
    );
  };

  const handleExportAll = () => {
    try {
      const filename = exportToExcel(videos);
      console.log(`Exported complete schedule to ${filename}`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleExportNourine = () => {
    try {
      const filename = exportDentistSchedule(videos, 'Nourine');
      console.log(`Exported Dr. Nourine's schedule to ${filename}`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleExportParisa = () => {
    try {
      const filename = exportDentistSchedule(videos, 'Parisa');
      console.log(`Exported Dr. Parisa's schedule to ${filename}`);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const completedVideos = videos.filter(v => v.completed).length;
  const totalVideos = videos.length;
  const completionRate = Math.round((completedVideos / totalVideos) * 100);

  const nourinVideos = videos.filter(v => v.dentist.includes("Nourine"));
  const parisaVideos = videos.filter(v => v.dentist.includes("Parisa"));

  const nourinCompleted = nourinVideos.filter(v => v.completed).length;
  const parisaCompleted = parisaVideos.filter(v => v.completed).length;

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-green flex items-center justify-center shadow-glow">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-bright-green">Dental Content Schedule</h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            <span className="hidden sm:inline">3-Week Video Production Dashboard • 2 Dentists • Every 3 Days • 1-2 Minute Videos</span>
            <span className="sm:hidden">Video Production Dashboard<br/>2 Dentists • 3 Weeks • Every 3 Days</span>
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 px-4">
          <Button
            onClick={handleExportAll}
            className="w-full sm:w-auto bg-gradient-green hover:bg-bright-green/80 text-white shadow-glow transition-all duration-300 flex items-center justify-center gap-2 py-3"
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span className="hidden sm:inline">Export Complete Schedule to Excel</span>
            <span className="sm:hidden">Export Complete Schedule</span>
          </Button>
          
          <Button
            onClick={handleExportNourine}
            variant="outline"
            className="w-full sm:w-auto border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 flex items-center justify-center gap-2 py-3"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Dr. Nourine's Schedule</span>
            <span className="sm:hidden">Dr. Nourine's Schedule</span>
          </Button>
          
          <Button
            onClick={handleExportParisa}
            variant="outline"
            className="w-full sm:w-auto border-lime-green/30 text-lime-green hover:bg-lime-green/10 hover:border-lime-green/50 transition-all duration-300 flex items-center justify-center gap-2 py-3"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Dr. Parisa's Schedule</span>
            <span className="sm:hidden">Dr. Parisa's Schedule</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-bright-green/20 shadow-dark hover:shadow-green transition-all duration-300 bg-dark-surface">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-glow flex items-center justify-center">
                <Video className="w-6 h-6 text-bright-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-bright-green">{totalVideos}</p>
                <p className="text-sm text-muted-foreground">Total Videos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-success/20 shadow-dark hover:shadow-green transition-all duration-300 bg-dark-surface">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{completedVideos}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 shadow-dark hover:shadow-green transition-all duration-300 bg-dark-surface">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dr. Nourine</p>
                <p className="text-lg font-bold text-accent">{nourinCompleted}/{nourinVideos.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-lime-green/20 shadow-dark hover:shadow-green transition-all duration-300 bg-dark-surface">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-lime-green/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-lime-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dr. Parisa</p>
                <p className="text-lg font-bold text-lime-green">{parisaCompleted}/{parisaVideos.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="border-bright-green/20 shadow-dark bg-dark-surface">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-bright-green">
              <Target className="w-6 h-6" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">Overall Completion</span>
              <Badge 
                variant="outline" 
                className={`text-lg px-4 py-2 ${
                  completionRate >= 75 
                    ? "border-success/30 text-success bg-success/10" 
                    : completionRate >= 50 
                    ? "border-warning/30 text-warning bg-warning/10"
                    : "border-muted-foreground/30 text-muted-foreground bg-muted/10"
                }`}
              >
                {completionRate}%
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-green h-3 rounded-full transition-all duration-500 shadow-glow"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule Table */}
        <Card className="shadow-dark border-border bg-dark-surface">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-bright-green">
              <Calendar className="w-6 h-6" />
              Video Schedule & Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-darker-surface">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Day & Date</th>
                    <th className="text-left p-4 font-semibold text-foreground">Dentist</th>
                    <th className="text-left p-4 font-semibold text-foreground">Video Topic</th>
                    <th className="text-left p-4 font-semibold text-foreground">Duration</th>
                    <th className="text-left p-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => (
                    <VideoScheduleRow
                      key={video.id}
                      video={video}
                      onViewDetails={handleViewDetails}
                      onToggleComplete={handleToggleComplete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4 p-4">
              {videos.map((video) => (
                <Card key={video.id} className={`border-border bg-darker-surface ${video.completed ? 'bg-success/5' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-green flex items-center justify-center shadow-glow">
                          <span className="text-white font-bold text-sm">{video.day}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{video.date}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <User className={`w-4 h-4 ${video.dentist.includes("Nourine") ? "text-accent" : "text-lime-green"}`} />
                            <span className="text-sm font-medium text-foreground">{video.dentist}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground font-medium">{video.duration}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-semibold text-foreground mb-2">{video.topic}</h3>
                      <Badge 
                        variant="outline" 
                        className="text-xs border-bright-green/30 text-bright-green bg-bright-green/10"
                      >
                        {video.contentType}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(video)}
                        className="flex-1 hover:bg-bright-green/10 hover:border-bright-green/30 hover:text-bright-green transition-all"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        View Script
                      </Button>
                      
                      <Button
                        variant={video.completed ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleToggleComplete(video.id)}
                        className={`flex-1 transition-all duration-200 ${
                          video.completed
                            ? "bg-success hover:bg-success/80 text-success-foreground shadow-glow"
                            : "hover:bg-success/10 hover:border-success/30 hover:text-success"
                        }`}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        {video.completed ? "Completed" : "Mark Done"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ContentDetailModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};