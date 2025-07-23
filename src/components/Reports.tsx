import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Filter, BarChart3, PieChart, LineChart, Calendar, Users, DollarSign } from 'lucide-react';

// Dummy data for reports
const monthlyRevenue = [
  { month: 'Jan', revenue: 8500, sessions: 45 },
  { month: 'Feb', revenue: 9800, sessions: 52 },
  { month: 'Mar', revenue: 10200, sessions: 58 },
  { month: 'Apr', revenue: 8900, sessions: 48 },
  { month: 'May', revenue: 11000, sessions: 62 },
  { month: 'Jun', revenue: 12500, sessions: 68 },
];

const sessionTypes = [
  { type: 'Individual Therapy', count: 120, color: 'bg-blue-500' },
  { type: 'Couples Therapy', count: 75, color: 'bg-green-500' },
  { type: 'Group Session', count: 45, color: 'bg-purple-500' },
  { type: 'Initial Consultation', count: 30, color: 'bg-amber-500' },
];

const recentTransactions = [
  { id: 1, date: '2025-07-15', patient: 'John Doe', type: 'Session', amount: 150, status: 'Paid' },
  { id: 2, date: '2025-07-14', patient: 'Jane Smith', type: 'Consultation', amount: 200, status: 'Pending' },
  { id: 3, date: '2025-07-14', patient: 'Robert Johnson', type: 'Session', amount: 150, status: 'Paid' },
  { id: 4, date: '2025-07-13', patient: 'Emily Davis', type: 'Group Session', amount: 80, status: 'Paid' },
  { id: 5, date: '2025-07-12', patient: 'Michael Brown', type: 'Session', amount: 150, status: 'Paid' },
];

export default function Reports() {
  // Calculate totals
  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0);
  const totalSessions = monthlyRevenue.reduce((sum, month) => sum + month.sessions, 0);
  const avgSessionValue = (totalRevenue / totalSessions).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            View and analyze your practice's performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Value</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgSessionValue}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center">
              <div className="w-full h-full bg-muted/20 rounded-lg flex items-end p-4 gap-2">
                {monthlyRevenue.map((month, index) => {
                  const height = (month.revenue / 13000) * 100;
                  return (
                    <div key={month.month} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:opacity-80"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs mt-2 text-muted-foreground">{month.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session Types */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Session Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessionTypes.map((session) => {
                const total = sessionTypes.reduce((sum, s) => sum + s.count, 0);
                const percentage = Math.round((session.count / total) * 100);
                
                return (
                  <div key={session.type} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{session.type}</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${session.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {session.count} sessions
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                <div className="space-y-1">
                  <p className="font-medium">{transaction.patient}</p>
                  <p className="text-sm text-muted-foreground">{transaction.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${transaction.amount}</p>
                  <p className={`text-xs ${
                    transaction.status === 'Paid' ? 'text-green-500' : 'text-amber-500'
                  }`}>
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
