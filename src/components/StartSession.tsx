import { useState } from 'react';
import { ArrowLeft, Calendar, Video, MapPin, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
}

interface StartSessionProps {
  patient: Patient;
  onBack: () => void;
  onStartSession: (sessionType: 'in-person' | 'remote') => void;
}

export default function StartSession({ patient, onBack, onStartSession }: StartSessionProps) {
  const [sessionType, setSessionType] = useState<'in-person' | 'remote'>('in-person');
  const [sessionDuration, setSessionDuration] = useState('60');
  const [sessionPurpose, setSessionPurpose] = useState('');

  const handleStartSession = () => {
    onStartSession(sessionType);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="lg" onClick={onBack} className="h-14 px-6 mr-6">
          <ArrowLeft className="mr-3 h-6 w-6" />
          Back to Patients
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Start New Session</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Configure session settings</p>
        </div>
      </div>

      {/* Patient Info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-xl">
            <User className="h-6 w-6 text-primary" />
            <span>Patient Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">{patient.name}</h3>
              <p className="text-lg text-muted-foreground">{patient.age} years • {patient.gender}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Configuration */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-xl">
            <Calendar className="h-6 w-6 text-primary" />
            <span>Session Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Session Type */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Session Type *</Label>
            <RadioGroup
              value={sessionType}
              onValueChange={(value: 'in-person' | 'remote') => setSessionType(value)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="in-person" id="in-person" className="w-5 h-5" />
                <Label
                  htmlFor="in-person"
                  className="flex items-center space-x-3 cursor-pointer flex-1"
                >
                  <MapPin className="h-8 w-8 text-session-clinic" />
                  <div>
                    <div className="text-lg font-semibold">In-Person Session</div>
                    <div className="text-sm text-muted-foreground">Face-to-face consultation at clinic</div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-6 border-2 rounded-lg hover:bg-accent/50 transition-colors">
                <RadioGroupItem value="remote" id="remote" className="w-5 h-5" />
                <Label
                  htmlFor="remote"
                  className="flex items-center space-x-3 cursor-pointer flex-1"
                >
                  <Video className="h-8 w-8 text-session-remote" />
                  <div>
                    <div className="text-lg font-semibold">Remote Session</div>
                    <div className="text-sm text-muted-foreground">Online video consultation</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Session Duration */}
          <div className="space-y-4">
            <Label htmlFor="duration" className="text-lg font-semibold">Expected Duration</Label>
            <Select value={sessionDuration} onValueChange={setSessionDuration}>
              <SelectTrigger className="h-14 text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Session Purpose */}
          <div className="space-y-4">
            <Label htmlFor="purpose" className="text-lg font-semibold">Session Purpose</Label>
            <Select value={sessionPurpose} onValueChange={setSessionPurpose}>
              <SelectTrigger className="h-14 text-lg">
                <SelectValue placeholder="Select session purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="initial-consultation">Initial Consultation</SelectItem>
                <SelectItem value="follow-up">Follow-up Session</SelectItem>
                <SelectItem value="therapy">Therapy Session</SelectItem>
                <SelectItem value="medication-review">Medication Review</SelectItem>
                <SelectItem value="crisis-intervention">Crisis Intervention</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Remote Session Note */}
          {sessionType === 'remote' && (
            <div className="p-6 bg-session-remote/20 border border-session-remote/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <Video className="h-6 w-6 text-session-remote-foreground mt-1" />
                <div>
                  <h4 className="font-semibold text-session-remote-foreground mb-2">Remote Session Features</h4>
                  <ul className="text-sm text-session-remote-foreground space-y-1">
                    <li>• Upload and send prescription images directly to patient</li>
                    <li>• Voice notes will be transcribed automatically</li>
                    <li>• All session notes will be saved digitally</li>
                    <li>• Medicine tracker will be activated for follow-up</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Info */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between text-lg">
            <div className="flex items-center space-x-3">
              <Clock className="h-6 w-6 text-primary" />
              <span className="font-semibold">Session will start at:</span>
            </div>
            <div className="text-right">
              <div className="font-semibold">
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
        <Button variant="outline" size="lg" onClick={onBack} className="h-16 px-8 text-lg">
          Cancel
        </Button>
        <Button 
          size="lg" 
          onClick={handleStartSession}
          className="h-16 px-12 text-lg"
          disabled={!sessionPurpose}
        >
          {sessionType === 'remote' ? (
            <Video className="mr-3 h-6 w-6" />
          ) : (
            <MapPin className="mr-3 h-6 w-6" />
          )}
          Start {sessionType === 'remote' ? 'Remote' : 'In-Person'} Session
        </Button>
      </div>
    </div>
  );
}