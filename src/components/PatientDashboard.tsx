import { useState } from 'react';
import { 
  Plus, 
  Search, 
  User, 
  Calendar,
  Video,
  MapPin,
  Clock,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  lastSession: string;
  sessionType: 'in-person' | 'remote';
  totalSessions: number;
}

interface PatientDashboardProps {
  patients: Patient[];
  onStartSession: (patient: Patient) => void;
  onAddPatient: () => void;
  onViewPatient: (patient: Patient) => void;
  onEditPatient: (patient: Patient) => void;
  onDeletePatient: (patientId: string) => void;
}

export default function PatientDashboard({ 
  patients, 
  onStartSession, 
  onAddPatient, 
  onViewPatient, 
  onEditPatient, 
  onDeletePatient 
}: PatientDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-none mx-auto bg-gradient-to-br from-background to-primary-light/10 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 space-y-6 lg:space-y-0">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight">Patient Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage your patients and sessions with ease</p>
        </div>
        <Button 
          size="lg" 
          className="h-16 px-8 text-lg w-full lg:w-auto rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary-hover" 
          onClick={onAddPatient}
        >
          <Plus className="mr-3 h-6 w-6" />
          Add New Patient
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-10">
        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
        <Input
          placeholder="Search patients by name..."
          className="pl-16 h-16 text-lg rounded-2xl border-0 shadow-lg bg-card backdrop-blur-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-2xl transition-all duration-300 cursor-pointer rounded-2xl border-0 shadow-lg bg-gradient-to-br from-card to-accent/20 hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {patient.age} years • {patient.gender}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={patient.sessionType === 'remote' ? 'default' : 'secondary'}
                  className={
                    patient.sessionType === 'remote' 
                      ? 'bg-session-remote text-session-remote-foreground' 
                      : 'bg-session-clinic text-session-clinic-foreground'
                  }
                >
                  {patient.sessionType === 'remote' ? (
                    <Video className="mr-1 h-3 w-3" />
                  ) : (
                    <MapPin className="mr-1 h-3 w-3" />
                  )}
                  {patient.sessionType === 'remote' ? 'Remote' : 'In-Person'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Last: {new Date(patient.lastSession).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {patient.totalSessions} sessions
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewPatient(patient);
                  }}
                  className="h-10 text-sm rounded-xl"
                >
                  <Eye className="mr-1 h-4 w-4" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditPatient(patient);
                  }}
                  className="h-10 text-sm rounded-xl"
                >
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePatient(patient.id);
                  }}
                  className="h-10 text-sm rounded-xl text-destructive hover:text-destructive-foreground hover:bg-destructive"
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </div>
              
              <Button 
                onClick={() => onStartSession(patient)}
                className="w-full h-12 text-base font-medium rounded-xl"
                size="lg"
              >
                Start New Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No patients found</h3>
          <p className="text-muted-foreground mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first patient'}
          </p>
          <Button size="lg" onClick={onAddPatient}>
            <Plus className="mr-2 h-5 w-5" />
            Add New Patient
          </Button>
        </div>
      )}
    </div>
  );
}