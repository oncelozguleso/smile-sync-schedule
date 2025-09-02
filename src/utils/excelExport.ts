import * as XLSX from 'xlsx';
import { VideoContent } from '@/types/contentSchedule';

interface ExcelVideoContent {
  Date: string;
  Day: number;
  Dentist: string;
  Topic: string;
  ContentType: string;
  Duration: string;
  Script: string;
  BRollGuidance: string;
  Week: number;
}

export const exportToExcel = (videos: VideoContent[]) => {
  // Create workbook
  const workbook = XLSX.utils.book_new();
  
  // Prepare data for Excel format
  const excelData: ExcelVideoContent[] = videos.map(video => ({
    Date: video.date,
    Day: video.day,
    Dentist: video.dentist,
    Topic: video.topic,
    ContentType: video.contentType,
    Duration: video.duration,
    Script: video.script.replace(/"/g, '""'), // Escape quotes for Excel
    BRollGuidance: video.brollShots.join('\n• '), // Join B-roll shots with bullet points
    Week: Math.ceil(video.day / 7)
  }));

  // Create main schedule worksheet
  const mainWorksheet = XLSX.utils.json_to_sheet(excelData);
  
  // Set column widths for better readability
  const columnWidths = [
    { wch: 12 }, // Date
    { wch: 6 },  // Day
    { wch: 15 }, // Dentist
    { wch: 35 }, // Topic
    { wch: 20 }, // Content Type
    { wch: 12 }, // Duration
    { wch: 80 }, // Script
    { wch: 50 }, // B-Roll Guidance
    { wch: 8 }   // Week
  ];
  mainWorksheet['!cols'] = columnWidths;

  // Add main worksheet
  XLSX.utils.book_append_sheet(workbook, mainWorksheet, 'Complete Schedule');

  // Create separate worksheets for each dentist
  const nourinVideos = excelData.filter(video => video.Dentist.includes('Nourine'));
  const parisaVideos = excelData.filter(video => video.Dentist.includes('Parisa'));

  if (nourinVideos.length > 0) {
    const nourinWorksheet = XLSX.utils.json_to_sheet(nourinVideos);
    nourinWorksheet['!cols'] = columnWidths;
    XLSX.utils.book_append_sheet(workbook, nourinWorksheet, 'Dr. Nourine Schedule');
  }

  if (parisaVideos.length > 0) {
    const parisaWorksheet = XLSX.utils.json_to_sheet(parisaVideos);
    parisaWorksheet['!cols'] = columnWidths;
    XLSX.utils.book_append_sheet(workbook, parisaWorksheet, 'Dr. Parisa Schedule');
  }

  // Create weekly breakdown worksheets
  for (let week = 1; week <= 3; week++) {
    const weekVideos = excelData.filter(video => video.Week === week);
    if (weekVideos.length > 0) {
      const weekWorksheet = XLSX.utils.json_to_sheet(weekVideos);
      weekWorksheet['!cols'] = columnWidths;
      XLSX.utils.book_append_sheet(workbook, weekWorksheet, `Week ${week}`);
    }
  }

  // Create summary worksheet
  const summaryData = [
    ['Total Videos', videos.length],
    ['Dr. Nourine Videos', nourinVideos.length],
    ['Dr. Parisa Videos', parisaVideos.length],
    ['Schedule Duration', '3 Weeks'],
    ['Shooting Frequency', 'Every 3 Days'],
    ['Average Script Length', '1-2 Minutes'],
    ['', ''],
    ['Week 1 Videos', excelData.filter(v => v.Week === 1).length],
    ['Week 2 Videos', excelData.filter(v => v.Week === 2).length],
    ['Week 3 Videos', excelData.filter(v => v.Week === 3).length],
    ['', ''],
    ['Content Types:', ''],
    ...Array.from(new Set(videos.map(v => v.contentType))).map(type => [
      type,
      videos.filter(v => v.contentType === type).length
    ])
  ];

  const summaryWorksheet = XLSX.utils.aoa_to_sheet(summaryData);
  summaryWorksheet['!cols'] = [{ wch: 25 }, { wch: 15 }];
  XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Summary');

  // Generate filename with current date
  const today = new Date();
  const dateString = today.toISOString().split('T')[0];
  const filename = `Dental_Video_Schedule_${dateString}.xlsx`;

  // Write and download file
  XLSX.writeFile(workbook, filename);
  
  return filename;
};

export const exportDentistSchedule = (videos: VideoContent[], dentistName: string) => {
  const dentistVideos = videos.filter(video => 
    video.dentist.toLowerCase().includes(dentistName.toLowerCase())
  );

  if (dentistVideos.length === 0) {
    throw new Error(`No videos found for ${dentistName}`);
  }

  const workbook = XLSX.utils.book_new();
  
  const excelData: ExcelVideoContent[] = dentistVideos.map(video => ({
    Date: video.date,
    Day: video.day,
    Dentist: video.dentist,
    Topic: video.topic,
    ContentType: video.contentType,
    Duration: video.duration,
    Script: video.script.replace(/"/g, '""'),
    BRollGuidance: video.brollShots.join('\n• '),
    Week: Math.ceil(video.day / 7)
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const columnWidths = [
    { wch: 12 }, { wch: 6 }, { wch: 15 }, { wch: 35 }, 
    { wch: 20 }, { wch: 12 }, { wch: 80 }, { wch: 50 }, { wch: 8 }
  ];
  worksheet['!cols'] = columnWidths;

  XLSX.utils.book_append_sheet(workbook, worksheet, `${dentistName} Schedule`);

  const today = new Date();
  const dateString = today.toISOString().split('T')[0];
  const filename = `${dentistName}_Video_Schedule_${dateString}.xlsx`;

  XLSX.writeFile(workbook, filename);
  
  return filename;
};
