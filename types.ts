export type Frequency = 'diário' | 'semanal';

export interface Habit {
  id: string;
  title: string;
  time?: string; // Format "HH:mm"
  frequency: Frequency;
  completedDates: string[]; // ISO date strings YYYY-MM-DD
  archived: boolean;
}

export type LeadStatus = 'Lead' | 'Contatado' | 'Reunião' | 'Proposta' | 'Fechado' | 'Perdido';

export interface Lead {
  id: string;
  name: string;
  origin: string;
  product: string;
  value: number;
  status: LeadStatus;
  lastAction: string; // ISO Date
  nextAction: string; // ISO Date
  archived: boolean;
}

export type ProjectStatus = 'Ativo' | 'Pausado' | 'Concluído';
export type ProjectCategory = 'MicroSaaS' | 'Trabalho' | 'Relacionamento' | 'Casa' | 'Estudos';

export interface ProjectTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  category: ProjectCategory;
  priority: 'Alta' | 'Média' | 'Baixa';
  tasks: ProjectTask[];
  archived: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string; // Markdown-ish text
  tags: string[];
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

// Financial Types
export type TransactionType = 'income' | 'expense';
export type FinancialSubCategory = 'custo_fixo' | 'custo_variavel' | 'lazer' | 'ganho_fixo' | 'ganho_variavel' | 'ganho_passivo';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string; // Transporte, Mercado, etc.
  subCategory: FinancialSubCategory;
  date: string; // ISO Date YYYY-MM-DD
  completed: boolean;
}

export interface Book {
  id: string;
  title: string;
  coverUrl: string;
  totalPages: number;
  pagesRead: number;
  status: 'lendo' | 'lido';
}

export interface Workout {
  id: string;
  title: string;
  link?: string;
  date: string; // ISO Date YYYY-MM-DD
  completed: boolean;
}

export interface Settings {
  yearlyGoal: string;
  userName: string;
}

// Navigation
export type View = 'dashboard' | 'habits' | 'leads' | 'projects' | 'notes' | 'financial' | 'workouts' | 'settings';