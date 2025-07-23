import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Stethoscope, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const stats = [
  {
    title: 'Total Patients',
    value: '1,234',
    icon: Users,
    change: '+12% from last month',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100/50',
    action: 'View All',
    actionLink: '/patients'
  },
  {
    title: 'Today\'s Appointments',
    value: '8',
    icon: Calendar,
    change: '+2 from yesterday',
    color: 'text-green-500',
    bgColor: 'bg-green-100/50',
    action: 'View Schedule',
    actionLink: '/appointments'
  },
  {
    title: 'Active Sessions',
    value: '3',
    icon: Stethoscope,
    change: '2 in-person, 1 remote',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100/50',
    action: 'View Sessions',
    actionLink: '/sessions'
  },
  {
    title: 'Monthly Revenue',
    value: '$12,345',
    icon: DollarSign,
    change: '+8% from last month',
    color: 'text-amber-500',
    bgColor: 'bg-amber-100/50',
    action: 'View Reports',
    actionLink: '/reports'
  }
];

const recentActivities = [
  { id: 1, patient: 'John Doe', type: 'Session', time: '10:30 AM', status: 'Completed' },
  { id: 2, patient: 'Jane Smith', type: 'Appointment', time: '11:45 AM', status: 'Upcoming' },
  { id: 3, patient: 'Robert Johnson', type: 'Follow-up', time: '2:15 PM', status: 'Scheduled' },
  { id: 4, patient: 'Emily Davis', type: 'Session', time: '3:30 PM', status: 'In Progress' },
  { id: 5, patient: 'Michael Brown', type: 'Consultation', time: '4:45 PM', status: 'Scheduled' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your practice today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => navigate('/appointments/new')}>
            New Appointment
          </Button>
          <Button onClick={() => navigate('/patients/new')}>Add Patient</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`h-10 w-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-xs mt-2"
                  onClick={() => navigate(stat.actionLink)}
                >
                  {stat.action} →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.patient}</p>
                    <p className="text-sm text-muted-foreground">{activity.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{activity.time}</p>
                    <p className={`text-xs ${
                      activity.status === 'Completed' ? 'text-green-500' : 
                      activity.status === 'In Progress' ? 'text-blue-500' : 
                      'text-amber-500'
                    }`}>
                      {activity.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/appointments/new')}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/patients/new')}>
              <Users className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/expenses')}>
              <DollarSign className="mr-2 h-4 w-4" />
              Record Expense
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/reports')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
