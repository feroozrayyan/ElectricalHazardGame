export type RoomId = 'bathroom' | 'livingroom' | 'kitchen' | 'backyard' | 'street';

export interface Hazard {
  id: string;
  roomId: RoomId;
  title: string;
  shortDescription: string;
  description: string;
  whyDangerous: string;
  clinicalFact: string; // Ties into the forensic autopsy studies
  safetyAction: string;
  icon: string;
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  solved: boolean;
  severity: 'low' | 'medium' | 'high';
  requiredLevel?: number;
  imageUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ClinicalStudy {
  title: string;
  location: string;
  period: string;
  sampleSize: string;
  keyFindings: string[];
  childrenFocus: string;
}

export interface SafetyCause {
  number: number;
  title: string;
  danger: string;
  prevention: string;
  tipForKids: string;
}
