import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  Stethoscope,
  Menu,
  X,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isHeader?: boolean;
  onToggleSidebar?: () => void;
  onCloseSidebar?: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'session', label: 'Active Session', icon: Stethoscope },
  { id: 'expenses', label: 'Expenses', icon: DollarSign },
  { id: 'reports', label: 'Reports', icon: FileText },
];

export default function Navigation({ 
  activeView, 
  onViewChange, 
  isHeader = false, 
  onToggleSidebar,
  onCloseSidebar 
}: NavigationProps) {
  if (isHeader) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden h-10 w-10"
        onClick={onToggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <>
      {/* Sidebar Navigation */}
      <Card className="fixed left-0 top-0 h-full w-72 p-6 z-40 lg:relative">
        <div className="flex justify-between items-center mb-8 mt-4 lg:mt-0">
          <h2 className="text-2xl font-bold">Aura Wellbeing</h2>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onCloseSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Stethoscope className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-primary">MindCare</h1>
          </div>
          <p className="text-muted-foreground text-sm">Mental Health Consultation</p>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="lg"
                className={`w-full justify-start h-14 px-4 transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'hover:bg-accent/50'
                }`}
                onClick={() => {
                  onViewChange(item.id);
                  onCloseSidebar?.();
                }}
              >
                <Icon className="mr-4 h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </Card>

      {/* Overlay for mobile/tablet - Removed black background */}
      {onCloseSidebar && (
        <div 
          className="fixed inset-0 z-30 lg:hidden"
          onClick={onCloseSidebar}
        />
      )}
    </>
  );
}