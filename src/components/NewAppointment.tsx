import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Video, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface NewAppointmentProps {
  onBack: () => void;
  onSave: (appointmentData: any) => void;
}

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];

const patients = [
  { id: '1', name: 'Sarah Johnson' },
  { id: '2', name: 'Michael Chen' },
  { id: '3', name: 'Emma Davis' },
  { id: '4', name: 'John Smith' },
  { id: '5', name: 'Lisa Wong' }
];

export default function NewAppointment({ onBack, onSave }: NewAppointmentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'remote'>('in-person');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!selectedDate || !selectedTime || !selectedPatient) {
      alert('Please fill in all required fields');
      return;
    }

    const appointmentData = {
      id: Date.now().toString(),
      patientId: selectedPatient,
      patientName: patients.find(p => p.id === selectedPatient)?.name || '',
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      type: appointmentType,
      status: 'scheduled',
      notes
    };

    onSave(appointmentData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="outline" size="lg" onClick={onBack} className="h-12 w-12 p-0 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">New Appointment</h1>
          <p className="text-muted-foreground">Schedule a new appointment with your patient</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointment Form */}
        <Card className="rounded-2xl shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl">Appointment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Patient Selection */}
            <div className="space-y-2">
              <Label htmlFor="patient" className="text-sm font-medium">Patient *</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{patient.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start text-left font-normal rounded-xl",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium">Time *</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{time}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Appointment Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Appointment Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={appointmentType === 'in-person' ? 'default' : 'outline'}
                  onClick={() => setAppointmentType('in-person')}
                  className="h-12 rounded-xl"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  In-Person
                </Button>
                <Button
                  variant={appointmentType === 'remote' ? 'default' : 'outline'}
                  onClick={() => setAppointmentType('remote')}
                  className="h-12 rounded-xl"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Remote
                </Button>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</Label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes for this appointment..."
                className="w-full h-24 p-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button variant="outline" onClick={onBack} className="flex-1 h-12 rounded-xl">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1 h-12 rounded-xl">
                Schedule Appointment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Preview */}
        <Card className="rounded-2xl shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl">Calendar Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="pointer-events-auto w-full"
            />
            
            {selectedDate && (
              <div className="mt-6 p-4 bg-primary-light/20 rounded-xl">
                <h4 className="font-semibold mb-2">Selected Date</h4>
                <p className="text-sm text-muted-foreground">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </p>
                {selectedTime && (
                  <p className="text-sm text-muted-foreground mt-1">
                    at {selectedTime}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}