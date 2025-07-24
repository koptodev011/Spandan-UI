import { useState } from 'react';
import Navigation from '@/components/Navigation';
import PatientDashboard from '@/components/PatientDashboard';
import PatientDetail from '@/components/PatientDetail';
import AddPatient from '@/components/AddPatient';
import NewAppointment from '@/components/NewAppointment';
import StartSession from '@/components/StartSession';
import SessionWorkspace from '@/components/SessionWorkspace';
import AppointmentManager from '@/components/AppointmentManager';
import ExpenseTracker from '@/components/ExpenseTracker';
import Reports from '@/components/Reports';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  lastSession: string;
  sessionType: 'in-person' | 'remote';
  totalSessions: number;
}

import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeSession, setActiveSession] = useState<{
    patient: Patient;
    sessionType: 'in-person' | 'remote';
  } | null>(null);

  const handleStartSession = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveView('start-session');
  };

  const handleConfirmStartSession = (sessionType: 'in-person' | 'remote') => {
    if (selectedPatient) {
      setActiveSession({
        patient: selectedPatient,
        sessionType
      });
      setActiveView('session');
    }
  };

  const handleBackToPatients = () => {
    setActiveSession(null);
    setSelectedPatient(null);
    setActiveView('patients');
  };

  const handleAddPatient = () => {
    setActiveView('add-patient');
  };

  const handleSavePatient = (patientData: any) => {
    if (patientData.id) {
      // Update existing patient
      setPatients(prevPatients => 
        prevPatients.map(patient => {
          if (patient.id === patientData.id) {
            return {
              ...patient,
              ...patientData,
              age: Number(patientData.age), // Ensure age is a number
              // Preserve session data
              lastSession: patient.lastSession,
              sessionType: patient.sessionType,
              totalSessions: patient.totalSessions
            };
          }
          return patient;
        })
      );
    } else {
      // Add new patient
      const newPatient = {
        ...patientData,
        id: Date.now().toString(),
        age: Number(patientData.age), // Ensure age is a number
        totalSessions: 0,
        lastSession: new Date().toISOString().split('T')[0],
        sessionType: 'in-person' as const
      };
      setPatients(prevPatients => [...prevPatients, newPatient]);
    }
    setActiveView('patients');
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveView('patient-detail');
  };

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 29,
      gender: 'Female',
      lastSession: '2024-01-15',
      sessionType: 'remote',
      totalSessions: 8
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 35,
      gender: 'Male',
      lastSession: '2024-01-14',
      sessionType: 'in-person',
      totalSessions: 12
    },
    {
      id: '3',
      name: 'Emma Davis',
      age: 22,
      gender: 'Female',
      lastSession: '2024-01-12',
      sessionType: 'remote',
      totalSessions: 5
    }
  ]);

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveView('edit-patient');
  };

  const handleDeletePatient = (patientId: string) => {
    if (window.confirm('Are you sure you want to delete this patient? This action cannot be undone.')) {
      setPatients(prevPatients => prevPatients.filter(patient => patient.id !== patientId));
      // If the deleted patient is currently selected, clear the selection
      if (selectedPatient?.id === patientId) {
        setSelectedPatient(null);
        setActiveView('patients');
      }
    }
  };

  const handleNewAppointment = () => {
    setActiveView('new-appointment');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'reports':
        return <Reports />;
      case 'patients':
        return (
          <PatientDashboard 
            patients={patients}
            onStartSession={handleStartSession} 
            onAddPatient={handleAddPatient}
            onViewPatient={handleViewPatient}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
          />
        );
      case 'patient-detail':
        return selectedPatient ? (
          <PatientDetail 
            patient={selectedPatient}
            onBack={handleBackToPatients}
            onEdit={handleEditPatient}
          />
        ) : (
          <PatientDashboard 
            patients={patients}
            onStartSession={handleStartSession} 
            onAddPatient={handleAddPatient}
            onViewPatient={handleViewPatient}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
          />
        );
      case 'add-patient':
        return <AddPatient onBack={handleBackToPatients} onSave={handleSavePatient} />;
      case 'edit-patient':
        return selectedPatient ? (
          <AddPatient 
            patient={selectedPatient}
            onBack={handleBackToPatients} 
            onSave={handleSavePatient} 
          />
        ) : (
          <PatientDashboard 
            patients={patients}
            onStartSession={handleStartSession} 
            onAddPatient={handleAddPatient}
            onViewPatient={handleViewPatient}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
          />
        );
      case 'new-appointment':
        return <NewAppointment onBack={() => setActiveView('appointments')} onSave={() => setActiveView('appointments')} />;
      case 'start-session':
        return selectedPatient ? (
          <StartSession 
            patient={selectedPatient}
            onBack={handleBackToPatients}
            onStartSession={handleConfirmStartSession}
          />
        ) : (
          <PatientDashboard 
            patients={patients}
            onStartSession={handleStartSession} 
            onAddPatient={handleAddPatient}
            onViewPatient={handleViewPatient}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
          />
        );
      case 'session':
        return activeSession ? (
          <SessionWorkspace 
            patient={activeSession.patient}
            sessionType={activeSession.sessionType}
            onBack={handleBackToPatients}
          />
        ) : (
          <PatientDashboard 
            patients={patients}
            onStartSession={handleStartSession} 
            onAddPatient={handleAddPatient}
            onViewPatient={handleViewPatient}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
          />
        );
      case 'appointments':
        return <AppointmentManager onNewAppointment={handleNewAppointment} />;
      case 'expenses':
        return <ExpenseTracker />;
      case 'reports':
        return <Reports />;
      default:
        return (
          <PatientDashboard 
            patients={patients}
            onStartSession={handleStartSession} 
            onAddPatient={handleAddPatient}
            onViewPatient={handleViewPatient}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-40 w-80 flex-shrink-0 transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <Navigation 
          activeView={activeView} 
          onViewChange={setActiveView} 
          onCloseSidebar={() => setIsSidebarOpen(false)}
        />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 transition-all duration-300 min-h-screen">
        {/* Header with mobile menu button and page title */}
        <header className="sticky top-0 z-30 bg-background border-b border-border">
          <div className="flex items-center h-16 px-6">
            <Navigation 
              activeView={activeView} 
              onViewChange={setActiveView} 
              isHeader 
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <h1 className="text-2xl font-semibold ml-4 capitalize">
              {activeView === 'dashboard' ? 'Dashboard' : 
               activeView.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h1>
          </div>
        </header>
        
        <div className="p-6 max-w-7xl mx-auto">
          {renderActiveView()}
        </div>
      </main>
    </div>
  );
};

export default Index;
