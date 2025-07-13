import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Key, 
  Settings, 
  LogOut,
  Menu,
  X,
  FileText,
  UsersIcon,
  Cloud,
  Database,
  Server,
  HardDrive,
  Cpu,
  Globe,
  ShoppingCart,
  Briefcase
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCloudTab, setActiveCloudTab] = useState('AWS');
  const location = useLocation();

  const navigationItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/policies', icon: FileText, label: 'Policies' },
    { path: '/groups', icon: UsersIcon, label: 'Groups' },
    { path: '/vc-management', icon: Shield, label: 'VC Management' },
    { path: '/did-management', icon: Key, label: 'DID Management' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const cloudServices = {
    AWS: [
      { name: 'S3 Storage', icon: HardDrive },
      { name: 'EC2 Compute', icon: Cpu },
      { name: 'RDS Database', icon: Database },
      { name: 'Lambda', icon: Server },
      { name: 'CloudFront', icon: Globe },
      { name: 'IAM', icon: Shield }
    ],
    Azure: [
      { name: 'Virtual Machines', icon: Cpu },
      { name: 'Blob Storage', icon: HardDrive },
      { name: 'SQL Database', icon: Database },
      { name: 'Azure AD', icon: Shield },
      { name: 'App Service', icon: Server },
      { name: 'CDN', icon: Globe }
    ],
    Odoo: [
      { name: 'ERP', icon: Briefcase },
      { name: 'eCommerce', icon: ShoppingCart },
      { name: 'CRM', icon: Users },
      { name: 'Inventory', icon: HardDrive },
      { name: 'Accounting', icon: FileText },
      { name: 'HR', icon: UsersIcon }
    ]
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Poppins']">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-70 md:flex-col" style={{ width: '280px' }}>
        <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-blue-800 to-blue-900">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center px-6 mb-8">
              <h1 className="text-xl font-bold text-white">Secure IAM Portal</h1>
            </div>
            
            {/* Main Navigation */}
            <nav className="flex-1 space-y-1 px-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'bg-blue-900 text-white shadow-lg'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Cloud Providers Section */}
            <div className="mt-8 px-4">
              <div className="mb-6">
                <h3 className="text-base font-bold text-blue-200 text-center mb-4 pb-2 border-b border-blue-600" style={{ borderBottomWidth: '1px', width: '80%', margin: '0 auto 16px auto' }}>
                  Cloud Providers
                </h3>
                
                {/* Cloud Tabs */}
                <div className="flex mb-4 bg-blue-900 rounded-lg p-1">
                  {['AWS', 'Azure', 'Odoo'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveCloudTab(tab)}
                      className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all duration-200 ${
                        activeCloudTab === tab
                          ? 'bg-white text-blue-900 shadow-sm'
                          : 'text-blue-200 hover:text-white hover:bg-blue-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Cloud Services Menu */}
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {cloudServices[activeCloudTab as keyof typeof cloudServices].map((service) => {
                    const ServiceIcon = service.icon;
                    return (
                      <button
                        key={service.name}
                        className="w-full flex items-center px-3 py-2 text-xs text-blue-100 hover:bg-blue-600 hover:bg-opacity-50 rounded-md transition-all duration-200"
                      >
                        <ServiceIcon className="mr-2 h-4 w-4" />
                        {service.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="px-4 pb-4">
              <div className="border-t border-blue-600 pt-8">
                <Link
                  to="/logout"
                  className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-150 shadow-lg"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between bg-blue-800 px-4 py-3">
          <h1 className="text-lg font-bold text-white">Secure IAM Portal</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-blue-200 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-blue-800 px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-blue-900 text-white'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="md:pl-70" style={{ paddingLeft: '280px' }}>
        <main className="flex-1">
          <div className="py-10">
            <div className="max-w-7xl mx-auto px-10 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-4 gap-1">
          {navigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-3 px-1 text-xs transition-colors min-h-16 ${
                  isActivePath(item.path)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="truncate text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="md:hidden h-20"></div>
    </div>
  );
};

export default Layout;