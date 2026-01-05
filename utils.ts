import { Habit, Lead, Project, Note, Settings, Transaction, Book, Workout } from './types';

const KEYS = {
  HABITS: 'personal_os_habits',
  LEADS: 'personal_os_leads',
  PROJECTS: 'personal_os_projects',
  NOTES: 'personal_os_notes',
  FINANCIAL: 'personal_os_financial',
  BOOKS: 'personal_os_books',
  WORKOUTS: 'personal_os_workouts',
  SETTINGS: 'personal_os_settings',
};

// Generic Load/Save
function load<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error loading ${key}`, e);
    return defaultValue;
  }
}

function save<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key}`, e);
  }
}

// Specific Getters/Setters
export const StorageService = {
  getHabits: (): Habit[] => load<Habit[]>(KEYS.HABITS, []),
  saveHabits: (data: Habit[]) => save(KEYS.HABITS, data),

  getLeads: (): Lead[] => load<Lead[]>(KEYS.LEADS, []),
  saveLeads: (data: Lead[]) => save(KEYS.LEADS, data),

  getProjects: (): Project[] => load<Project[]>(KEYS.PROJECTS, []),
  saveProjects: (data: Project[]) => save(KEYS.PROJECTS, data),

  getNotes: (): Note[] => load<Note[]>(KEYS.NOTES, []),
  saveNotes: (data: Note[]) => save(KEYS.NOTES, data),

  getTransactions: (): Transaction[] => load<Transaction[]>(KEYS.FINANCIAL, []),
  saveTransactions: (data: Transaction[]) => save(KEYS.FINANCIAL, data),

  getBooks: (): Book[] => load<Book[]>(KEYS.BOOKS, []),
  saveBooks: (data: Book[]) => save(KEYS.BOOKS, data),

  getWorkouts: (): Workout[] => load<Workout[]>(KEYS.WORKOUTS, []),
  saveWorkouts: (data: Workout[]) => save(KEYS.WORKOUTS, data),

  getSettings: (): Settings => load<Settings>(KEYS.SETTINGS, { yearlyGoal: 'Construir algo que as pessoas queiram', userName: 'Fundador' }),
  saveSettings: (data: Settings) => save(KEYS.SETTINGS, data),
};