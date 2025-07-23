import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock,
  User,
  Video,
  MapPin,
  Search,
  Filter,
  Check,
  X,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: 'in-person' | 'remote';
  status: 'scheduled' | 'attended' | 'missed' | 'rescheduled';
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    type: 'remote',
    status: 'scheduled'
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    date: new Date().toISOString().split('T')[0],
    time: '2:00 PM',
    type: 'in-person',
    status: 'scheduled'
  },
  {
    id: '3',
    patientName: 'Emma Davis',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: '11:00 AM',
    type: 'remote',
    status: 'scheduled'
  },
  {
    id: '4',
    patientName: 'David Wilson',
    date: new Date().toISOString().split('T')[0],
    time: '9:00 AM',
    type: 'in-person',
    status: 'attended'
  },
  {
    id: '5',
    patientName: 'Lisa Brown',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    time: '3:00 PM',
    type: 'remote',
    status: 'missed'
  },
  {
    id: '6',
    patientName: 'Robert Taylor',
    date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], // Day after tomorrow
    time: '1:30 PM',
    type: 'in-person',
    status: 'rescheduled'
  }
];

interface AppointmentManagerProps {
  onNewAppointment?: () => void;
}

export default function AppointmentManager({ onNewAppointment }: AppointmentManagerProps = {}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);

  const updateAppointmentStatus = (appointmentId: string, newStatus: 'attended' | 'missed' | 'rescheduled') => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-medical-warning text-medical-warning-foreground';
      case 'attended':
        return 'bg-medical-success text-medical-success-foreground';
      case 'missed':
        return 'bg-destructive text-destructive-foreground';
      case 'rescheduled':
        return 'bg-medical-info text-medical-info-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAppointmentsForDate = (date: Date) => {
    return filteredAppointments.filter(appointment => 
      appointment.date === date.toISOString().split('T')[0]
    );
  };

  const todayAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];
  const weekDates = selectedDate ? getWeekDates(selectedDate) : [];

  const handleNewAppointment = () => {
    setShowNewAppointmentForm(true);
    onNewAppointment?.();
  };

  const handleBackToList = () => {
    setShowNewAppointmentForm(false);
  };

  if (showNewAppointmentForm) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Patient Name</label>
                <Input placeholder="Enter patient name" className="w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Date</label>
                  <Input type="date" className="w-full" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Time</label>
                  <Input type="time" className="w-full" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Appointment Type</label>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1">
                    <Video className="mr-2 h-4 w-4" />
                    Remote
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MapPin className="mr-2 h-4 w-4" />
                    In-Person
                  </Button>
                </div>
              </div>
              <div className="pt-4 flex space-x-4">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={handleBackToList}
                >
                  Cancel
                </Button>
                <Button className="flex-1" size="lg">
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {!showNewAppointmentForm && (
        <>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Appointment Manager</h1>
              <p className="text-muted-foreground">Manage your daily schedule and appointments</p>
            </div>
            <Button 
              size="lg" 
              className="h-12 px-6 rounded-xl" 
              onClick={handleNewAppointment}
            >
              <Plus className="mr-2 h-5 w-5" />
              New Appointment
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <span>Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-0"
            />
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>
                  {selectedDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })} Appointments
                </span>
              </CardTitle>
              
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1 bg-muted rounded-lg p-1">
                  <Button 
                    variant={viewMode === 'day' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('day')}
                    className="h-8 px-3"
                  >
                    Day
                  </Button>
                  <Button 
                    variant={viewMode === 'week' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('week')}
                    className="h-8 px-3"
                  >
                    Week
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search patients..."
                  className="pl-10 w-64 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No appointments</h3>
                  <p className="text-muted-foreground">No appointments scheduled for this date</p>
                </div>
              ) : (
                todayAppointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{appointment.patientName}</h4>
                            <div className="flex items-center space-x-3 mt-1">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {appointment.time}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                {appointment.type === 'remote' ? (
                                  <Video className="mr-1 h-3 w-3" />
                                ) : (
                                  <MapPin className="mr-1 h-3 w-3" />
                                )}
                                {appointment.type === 'remote' ? 'Remote' : 'In-Person'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                          
                          {/* Status Action Buttons */}
                          <div className="flex space-x-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, 'attended')}
                              className="h-8 w-8 p-0 text-medical-success hover:bg-medical-success hover:text-medical-success-foreground"
                              title="Mark as Attended"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, 'missed')}
                              className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              title="Mark as Missed"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, 'rescheduled')}
                              className="h-8 w-8 p-0 text-medical-info hover:bg-medical-info hover:text-medical-info-foreground"
                              title="Mark as Rescheduled"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button size="sm" className="rounded-xl">
                            Start Session
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
          </div>
        </>
      )}
    </div>
  );
}