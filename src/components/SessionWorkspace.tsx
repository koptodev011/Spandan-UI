import { useState } from 'react';
import { 
  Save, 
  ArrowLeft, 
  Mic,
  Upload,
  Send,
  FileText,
  Brain,
  Heart,
  Pill
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
}

interface SessionWorkspaceProps {
  patient: Patient;
  sessionType: 'in-person' | 'remote';
  onBack: () => void;
}

export default function SessionWorkspace({ patient, sessionType, onBack }: SessionWorkspaceProps) {
  const [physicalNotes, setPhysicalNotes] = useState('');
  const [mentalNotes, setMentalNotes] = useState('');
  const [medicines, setMedicines] = useState('');
  const [voiceNote, setVoiceNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [prescriptionImage, setPrescriptionImage] = useState<File | null>(null);

  const handleSaveSession = () => {
    // Save session logic here
    console.log('Saving session...');
  };

  const handleSendPrescription = () => {
    if (sessionType === 'remote' && prescriptionImage) {
      // Send prescription logic here
      console.log('Sending prescription...');
    }
  };

  const sessionDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="lg" onClick={onBack}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Patients
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{patient.name}</h1>
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-muted-foreground">{patient.age} years • {patient.gender}</p>
              <Badge 
                variant={sessionType === 'remote' ? 'default' : 'secondary'}
                className={`px-3 py-1 ${
                  sessionType === 'remote' 
                    ? 'bg-session-remote text-session-remote-foreground' 
                    : 'bg-session-clinic text-session-clinic-foreground'
                }`}
              >
                {sessionType === 'remote' ? 'Remote Session' : 'In-Person Session'}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Session Date</p>
          <p className="font-semibold">{sessionDate}</p>
        </div>
      </div>

      {/* Session Tabs */}
      <Tabs defaultValue="physical" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-14">
          <TabsTrigger value="physical" className="flex items-center space-x-2 text-base">
            <Heart className="h-4 w-4" />
            <span>Physical Health</span>
          </TabsTrigger>
          <TabsTrigger value="mental" className="flex items-center space-x-2 text-base">
            <Brain className="h-4 w-4" />
            <span>Mental Health</span>
          </TabsTrigger>
          <TabsTrigger value="medicines" className="flex items-center space-x-2 text-base">
            <Pill className="h-4 w-4" />
            <span>Medicines</span>
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center space-x-2 text-base">
            <Mic className="h-4 w-4" />
            <span>Voice Notes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="physical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>Physical Health Issues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write or draw physical health observations here. Your handwriting will be converted to text automatically..."
                className="min-h-[300px] text-lg leading-relaxed resize-none"
                value={physicalNotes}
                onChange={(e) => setPhysicalNotes(e.target.value)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mental" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>Mental Health Issues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write or draw mental health observations here. Your handwriting will be converted to text automatically..."
                className="min-h-[300px] text-lg leading-relaxed resize-none"
                value={mentalNotes}
                onChange={(e) => setMentalNotes(e.target.value)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medicines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Pill className="h-5 w-5 text-primary" />
                <span>Medicines Prescribed</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Write prescribed medicines here. Your handwriting will be converted to text automatically..."
                className="min-h-[250px] text-lg leading-relaxed resize-none"
                value={medicines}
                onChange={(e) => setMedicines(e.target.value)}
              />
              
              {sessionType === 'remote' && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold text-foreground">Prescription Image (Remote Session)</h4>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="lg" className="h-12">
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Prescription Photo
                    </Button>
                    {prescriptionImage && (
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-sm">{prescriptionImage.name}</span>
                      </div>
                    )}
                  </div>
                  {prescriptionImage && (
                    <Button size="lg" className="h-12 px-6" onClick={handleSendPrescription}>
                      <Send className="mr-2 h-5 w-5" />
                      Send to Patient
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mic className="h-5 w-5 text-primary" />
                <span>Voice Notes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  size="lg"
                  className="h-12 px-6"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className="mr-2 h-5 w-5" />
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
                {isRecording && (
                  <div className="flex items-center space-x-2 text-destructive">
                    <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Recording...</span>
                  </div>
                )}
              </div>
              
              <Textarea
                placeholder="Voice transcription will appear here automatically..."
                className="min-h-[250px] text-lg leading-relaxed resize-none"
                value={voiceNote}
                onChange={(e) => setVoiceNote(e.target.value)}
                readOnly={isRecording}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Session Button */}
      <div className="flex justify-end mt-8">
        <Button size="lg" className="h-12 px-8" onClick={handleSaveSession}>
          <Save className="mr-2 h-5 w-5" />
          Save Session
        </Button>
      </div>
    </div>
  );
}