import React, { useState, useEffect } from 'react';
import { Habit, Lead, Note, Project, Settings as SettingsType, Transaction, View, Book, Workout } from './types';
import { StorageService } from './utils';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Habits from './components/Habits';
import Leads from './components/Leads';
import Projects from './components/Projects';
import Notes from './components/Notes';
import Financial from './components/Financial';
import Workouts from './components/Workouts';
import Settings from './components/Settings';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  
  // App State - Hoisted for simplicity and dashboard access
  const [habits, setHabits] = useState<Habit[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [settings, setSettingsState] = useState<SettingsType>({ userName: 'Fundador', yearlyGoal: 'Construir' });
  const [loading, setLoading] = useState(true);

  // Load Data
  useEffect(() => {
    setHabits(StorageService.getHabits());
    setLeads(StorageService.getLeads());
    setProjects(StorageService.getProjects());
    setNotes(StorageService.getNotes());
    setTransactions(StorageService.getTransactions());
    setBooks(StorageService.getBooks());
    setWorkouts(StorageService.getWorkouts());
    setSettingsState(StorageService.getSettings());
    setLoading(false);
  }, []);

  // Save Wrappers
  const updateHabits = (data: Habit[]) => { setHabits(data); StorageService.saveHabits(data); };
  const updateLeads = (data: Lead[]) => { setLeads(data); StorageService.saveLeads(data); };
  const updateProjects = (data: Project[]) => { setProjects(data); StorageService.saveProjects(data); };
  const updateNotes = (data: Note[]) => { setNotes(data); StorageService.saveNotes(data); };
  const updateTransactions = (data: Transaction[]) => { setTransactions(data); StorageService.saveTransactions(data); };
  const updateBooks = (data: Book[]) => { setBooks(data); StorageService.saveBooks(data); };
  const updateWorkouts = (data: Workout[]) => { setWorkouts(data); StorageService.saveWorkouts(data); };
  const updateSettings = (data: SettingsType) => { setSettingsState(data); StorageService.saveSettings(data); };

  // Dashboard specific habit toggle
  const handleDashboardHabitToggle = (id: string, date: string) => {
    const updated = habits.map(h => {
        if (h.id !== id) return h;
        const isCompleted = h.completedDates.includes(date);
        return {
          ...h,
          completedDates: isCompleted
            ? h.completedDates.filter(d => d !== date)
            : [...h.completedDates, date]
        };
    });
    updateHabits(updated);
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-stone-50 text-stone-300">Carregando OS...</div>;

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard 
            habits={habits} 
            leads={leads} 
            projects={projects} 
            settings={settings}
            transactions={transactions}
            books={books}
            onUpdateBooks={updateBooks}
            onNavigate={setCurrentView}
            onToggleHabit={handleDashboardHabitToggle}
        />;
      case 'habits':
        return <Habits habits={habits} setHabits={updateHabits} />;
      case 'workouts':
        return <Workouts workouts={workouts} setWorkouts={updateWorkouts} />;
      case 'leads':
        return <Leads leads={leads} setLeads={updateLeads} />;
      case 'projects':
        return <Projects projects={projects} setProjects={updateProjects} />;
      case 'financial':
        return <Financial transactions={transactions} setTransactions={updateTransactions} />;
      case 'notes':
        return <Notes notes={notes} setNotes={updateNotes} />;
      case 'settings':
        return <Settings settings={settings} saveSettings={updateSettings} />;
      default:
        return <Dashboard 
            habits={habits} 
            leads={leads} 
            projects={projects} 
            settings={settings}
            transactions={transactions}
            books={books}
            onUpdateBooks={updateBooks}
            onNavigate={setCurrentView}
            onToggleHabit={handleDashboardHabitToggle}
        />;
    }
  };

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans text-stone-800">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <main className="ml-64 flex-1 p-8 overflow-y-auto h-screen">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;