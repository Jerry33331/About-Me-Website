export type PageId = 
  | 'home' 
  | 'media' 
  | 'future' 
  | 'choice-1' 
  | 'choice-2' 
  | 'contact' 
  | 'admin'
  // Backwards compatibility aliases
  | 'goals' 
  | 'projects' 
  | 'choice';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  reason: string;
  message: string;
  timestamp: string;
  status: 'new' | 'replied';
  replied: boolean;
  repliedAt: string | null;
}

// Backwards compatibility alias
export type Submission = ContactMessage;

export interface MediaCardItem {
  id: string;
  title: string;
  category: 'image' | 'video' | 'social';
  mediaUrl: string;
  thumbnailUrl: string;
  caption: string;
  tag: string;
  date: string;
  externalLink?: string;
  embedType?: 'image' | 'youtube' | 'local-video' | 'social-embed';
}

export interface AdminStats {
  total: number;
  newCount: number;
  replied: number;
  replyRate: number;
  reasons: { reason: string; count: number }[];
  storageFile: string;
  lastUpdated: string | null;
}
