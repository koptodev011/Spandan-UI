import { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Calendar,
  Clock,
  Video,
  MapPin,
  FileText,
  Edit,
  Pill,
  Upload,
  Check,
  Truck,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  lastSession: string;
  sessionType: 'in-person' | 'remote';
  totalSessions: number;
  phone?: string;
  email?: string;
  address?: string;
}

interface VisitHistory {
  id: string;
  date: string;
  type: 'in-person' | 'remote';
  notes: string;
  status: 'completed' | 'missed';
}

interface NextAppointment {
  id: string;
  date: string;
  time: string;
  type: 'in-person' | 'remote';
}

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  image?: string;
  deliveryStatus: 'delivered' | 'in-transit' | 'not-shipped';
}

interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
  onEdit: (patient: Patient) => void;
}

const mockVisitHistory: VisitHistory[] = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'remote',
    notes: 'Patient showed significant improvement in anxiety levels. Continued with current treatment plan.',
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-01-08',
    type: 'in-person',
    notes: 'Initial assessment completed. Prescribed meditation exercises.',
    status: 'completed'
  },
  {
    id: '3',
    date: '2024-01-01',
    type: 'remote',
    notes: 'Follow-up session. Patient missed the appointment.',
    status: 'missed'
  }
];

const mockNextAppointment: NextAppointment = {
  id: '1',
  date: '2024-01-22',
  time: '10:00 AM',
  type: 'remote'
};

const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Sertraline',
    dosage: '50mg',
    frequency: 'Once daily',
    deliveryStatus: 'delivered'
  },
  {
    id: '2',
    name: 'Lorazepam',
    dosage: '0.5mg',
    frequency: 'As needed',
    deliveryStatus: 'in-transit'
  }
];

export default function PatientDetail({ patient, onBack, onEdit }: PatientDetailProps) {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const [uploadingMedicine, setUploadingMedicine] = useState<string | null>(null);

  const getDeliveryStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Check className="h-4 w-4" />;
      case 'in-transit':
        return <Truck className="h-4 w-4" />;
      case 'not-shipped':
        return <Package className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-medical-success text-medical-success-foreground';
      case 'in-transit':
        return 'bg-medical-warning text-medical-warning-foreground';
      case 'not-shipped':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const updateMedicineDeliveryStatus = (medicineId: string, status: string) => {
    setMedicines(medicines.map(med => 
      med.id === medicineId 
        ? { ...med, deliveryStatus: status as 'delivered' | 'in-transit' | 'not-shipped' }
        : med
    ));
  };

  const handleImageUpload = (medicineId: string) => {
    setUploadingMedicine(medicineId);
    // Simulate upload delay
    setTimeout(() => {
      setMedicines(medicines.map(med => 
        med.id === medicineId 
          ? { ...med, image: '/placeholder-medicine.jpg' }
          : med
      ));
      setUploadingMedicine(null);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="lg" onClick={onBack} className="h-12 w-12 p-0 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Patient Details</h1>
            <p className="text-muted-foreground">Complete patient information and history</p>
          </div>
        </div>
        <Button size="lg" onClick={() => onEdit(patient)} className="h-12 px-6 rounded-xl">
          <Edit className="mr-2 h-5 w-5" />
          Edit Patient
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Info */}
        <Card className="lg:col-span-1 rounded-2xl shadow-lg border-0 bg-gradient-to-br from-card to-primary-light/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{patient.name}</h3>
                <p className="text-muted-foreground">{patient.age} years • {patient.gender}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Total Sessions</Label>
                <p className="text-2xl font-bold text-primary">{patient.totalSessions}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Last Session</Label>
                <p className="text-lg font-medium">{new Date(patient.lastSession).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Session Type</Label>
                <Badge 
                  variant="secondary"
                  className={
                    patient.sessionType === 'remote' 
                      ? 'bg-session-remote text-session-remote-foreground' 
                      : 'bg-session-clinic text-session-clinic-foreground'
                  }
                >
                  {patient.sessionType === 'remote' ? (
                    <Video className="mr-2 h-4 w-4" />
                  ) : (
                    <MapPin className="mr-2 h-4 w-4" />
                  )}
                  {patient.sessionType === 'remote' ? 'Remote' : 'In-Person'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Next Appointment */}
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Calendar className="h-6 w-6 text-primary" />
                <span>Next Appointment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary-light/30 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{new Date(mockNextAppointment.date).toLocaleDateString()}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          {mockNextAppointment.time}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          {mockNextAppointment.type === 'remote' ? (
                            <Video className="mr-2 h-4 w-4" />
                          ) : (
                            <MapPin className="mr-2 h-4 w-4" />
                          )}
                          {mockNextAppointment.type === 'remote' ? 'Remote' : 'In-Person'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button size="lg" className="h-12 px-6 rounded-xl">
                    Start Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medicines (for online patients) */}
          {patient.sessionType === 'remote' && (
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Pill className="h-6 w-6 text-primary" />
                  <span>Prescribed Medicines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicines.map((medicine) => (
                    <div key={medicine.id} className="bg-accent/30 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold">{medicine.name}</h4>
                          <p className="text-muted-foreground">{medicine.dosage} • {medicine.frequency}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getDeliveryStatusColor(medicine.deliveryStatus)}>
                            {getDeliveryStatusIcon(medicine.deliveryStatus)}
                            <span className="ml-2 capitalize">{medicine.deliveryStatus.replace('-', ' ')}</span>
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleImageUpload(medicine.id)}
                            disabled={uploadingMedicine === medicine.id}
                            className="h-10 px-4 rounded-lg"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            {uploadingMedicine === medicine.id ? 'Uploading...' : 'Upload Image'}
                          </Button>
                          {medicine.image && (
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                          )}
                        </div>
                        
                        <Select 
                          value={medicine.deliveryStatus} 
                          onValueChange={(value) => updateMedicineDeliveryStatus(medicine.id, value)}
                        >
                          <SelectTrigger className="w-48 h-10 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not-shipped">Not Shipped</SelectItem>
                            <SelectItem value="in-transit">In Transit</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Visit History */}
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <FileText className="h-6 w-6 text-primary" />
                <span>Previous Visit History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVisitHistory.map((visit) => (
                  <div key={visit.id} className="bg-accent/30 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {visit.type === 'remote' ? (
                            <Video className="h-5 w-5 text-primary" />
                          ) : (
                            <MapPin className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{new Date(visit.date).toLocaleDateString()}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{visit.type.replace('-', ' ')}</p>
                        </div>
                      </div>
                      <Badge 
                        className={
                          visit.status === 'completed' 
                            ? 'bg-medical-success text-medical-success-foreground' 
                            : 'bg-medical-warning text-medical-warning-foreground'
                        }
                      >
                        {visit.status === 'completed' ? 'Completed' : 'Missed'}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{visit.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}