export interface Consultant {
  name: string;
  role: string;
  specialization: string;
  bio: string;
  experienceYears: number;
}

export interface ServiceItem {
  title: string;
  description: string;
  estimatedHours: number;
}

export interface QuoteProposal {
  id: string;
  companyAnalysis: string;
  suggestedStrategy: string;
  team: Consultant[];
  services: ServiceItem[];
  totalEstimate: string;
  timeline: string;
  status?: 'pending' | 'reviewing' | 'accepted' | 'scheduled';
  createdAt?: string;
}

export interface SupportRequest {
  id: string;
  message: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'human_consultation'; // Added specific status
  createdAt: string;
  type: 'extra_info' | 'negotiation' | 'general' | 'technical' | 'human_request';
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export type AppView = 'landing' | 'auth' | 'request' | 'processing' | 'proposal' | 'success' | 'profile' | 'privacy' | 'terms';

export interface User {
  email: string;
  companyName: string;
  requests?: QuoteProposal[];
  supportTickets?: SupportRequest[];
}