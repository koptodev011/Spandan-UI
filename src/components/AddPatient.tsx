import { useState } from 'react';
import { ArrowLeft, Save, User, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface PatientData {
  id?: string;
  name: string;
  age: string | number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;
  currentMedications: string;
  allergies: string;
  notes: string;
  lastSession?: string;
  sessionType?: 'in-person' | 'remote';
  totalSessions?: number;
}

interface AddPatientProps {
  patient?: PatientData;
  onBack: () => void;
  onSave: (patient: PatientData) => void;
}

export default function AddPatient({ patient, onBack, onSave }: AddPatientProps) {
  const [formData, setFormData] = useState<PatientData>({
    name: patient?.name || '',
    age: patient?.age || '',
    gender: patient?.gender || '',
    phone: patient?.phone || '',
    email: patient?.email || '',
    address: patient?.address || '',
    emergencyContact: patient?.emergencyContact || '',
    medicalHistory: patient?.medicalHistory || '',
    currentMedications: patient?.currentMedications || '',
    allergies: patient?.allergies || '',
    notes: patient?.notes || ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-none mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="outline" size="lg" onClick={onBack} className="h-14 px-6 mr-6">
          <ArrowLeft className="mr-3 h-6 w-6" />
          Back to Patients
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            {patient?.id ? 'Edit Patient' : 'Add New Patient'}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            {patient?.id ? 'Update patient information' : 'Enter patient information'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-xl">
              <User className="h-6 w-6 text-primary" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-base font-medium">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="h-14 text-lg"
                placeholder="Enter full name"
                required
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="age" className="text-base font-medium">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="h-14 text-lg"
                placeholder="Enter age"
                required
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="gender" className="text-base font-medium">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                <SelectTrigger className="h-14 text-lg">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-xl">
              <Phone className="h-6 w-6 text-primary" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="h-14 text-lg"
                placeholder="Enter phone number"
                required
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="h-14 text-lg"
                placeholder="Enter email address"
              />
            </div>
            
            <div className="space-y-3 lg:col-span-2">
              <Label htmlFor="address" className="text-base font-medium">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="min-h-[100px] text-lg resize-none"
                placeholder="Enter full address"
              />
            </div>
            
            <div className="space-y-3 lg:col-span-2">
              <Label htmlFor="emergencyContact" className="text-base font-medium">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleChange('emergencyContact', e.target.value)}
                className="h-14 text-lg"
                placeholder="Emergency contact name and phone"
              />
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-xl">
              <Calendar className="h-6 w-6 text-primary" />
              <span>Medical Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="medicalHistory" className="text-base font-medium">Medical History</Label>
              <Textarea
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={(e) => handleChange('medicalHistory', e.target.value)}
                className="min-h-[120px] text-lg resize-none"
                placeholder="Previous medical conditions, surgeries, etc."
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="currentMedications" className="text-base font-medium">Current Medications</Label>
              <Textarea
                id="currentMedications"
                value={formData.currentMedications}
                onChange={(e) => handleChange('currentMedications', e.target.value)}
                className="min-h-[120px] text-lg resize-none"
                placeholder="List current medications and dosages"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="allergies" className="text-base font-medium">Allergies</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleChange('allergies', e.target.value)}
                className="min-h-[100px] text-lg resize-none"
                placeholder="Known allergies to medications, foods, etc."
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="notes" className="text-base font-medium">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="min-h-[120px] text-lg resize-none"
                placeholder="Any additional information"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button variant="outline" size="lg" onClick={onBack} className="h-14 px-8 text-lg">
            Cancel
          </Button>
          <Button type="submit" size="lg" className="h-14 px-8 text-lg">
            <Save className="mr-3 h-6 w-6" />
            Save Patient
          </Button>
        </div>
      </form>
    </div>
  );
}