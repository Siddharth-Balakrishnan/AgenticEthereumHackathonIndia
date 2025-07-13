import React from 'react';
import { Users, Shield, Key, BarChart3, RefreshCw, FileText, CheckCircle, XCircle, Cloud, Database, Server } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { name: 'VCs Issued', value: '567', icon: Shield, color: 'bg-green-500' },
    { name: 'DIDs Created', value: '892', icon: Key, color: 'bg-purple-500' },
    { name: 'Active Sessions', value: '45', icon: BarChart3, color: 'bg-orange-500' },
  ];

  const cloudPlatforms = [
    {
      name: 'AWS',
      icon: Cloud,
      status: 'Connected',
      isConnected: true,
      activeServices: 5,
      usagePercentage: 78,
      color: 'text-orange-500'
    },
    {
      name: 'Azure',
      icon: Database,
      status: 'Connected',
      isConnected: true,
      activeServices: 3,
      usagePercentage: 45,
      color: 'text-blue-500'
    },
    {
      name: 'Odoo',
      icon: Server,
      status: 'Disconnected',
      isConnected: false,
      activeServices: 0,
      usagePercentage: 0,
      color: 'text-purple-500'
    }
  ];

  const recentActivity = [
    { type: 'User Login', user: 'john.doe@example.com', time: '2 minutes ago' },
    { type: 'VC Issued', user: 'jane.smith@example.com', time: '5 minutes ago' },
    { type: 'DID Created', user: 'bob.wilson@example.com', time: '10 minutes ago' },
    { type: 'User Registration', user: 'alice.johnson@example.com', time: '15 minutes ago' },
  ];

  const CircularProgress = ({ percentage, size = 60 }: { percentage: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="4"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#3b82f6"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-medium text-gray-900">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-base text-gray-600">
            Welcome to the Secure IAM System Admin Portal
          </p>
        </div>
        <div className="mt-6 sm:mt-0 flex space-x-4">
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </button>
          <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200">
            <FileText className="h-4 w-4 mr-2" />
            View Logs
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="relative bg-white pt-6 px-6 pb-12 sm:pt-8 sm:px-8 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <div>
                <div className={`absolute p-4 rounded-xl ${stat.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-20 text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </p>
                <p className="ml-20 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cloud Platforms Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cloud Platform Status</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
          {cloudPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.name}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-250 transform hover:scale-102 cursor-pointer border border-gray-100"
                style={{ height: '180px' }}
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-8 w-8 ${platform.color}`} />
                      <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      {platform.isConnected ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <XCircle className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        platform.isConnected ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {platform.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Active Services</p>
                      <p className="text-2xl font-bold text-gray-900">{platform.activeServices}</p>
                    </div>
                    
                    {/* Usage Metrics */}
                    <div className="flex flex-col items-center">
                      <CircularProgress percentage={platform.usagePercentage} />
                      <p className="text-xs text-gray-500 mt-2">Usage</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-lg rounded-xl">
        <div className="px-6 py-6 sm:p-8">
          <h3 className="text-xl leading-6 font-bold text-gray-900 mb-6">
            Recent Activity
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, index) => (
                <li key={index} className="relative pb-8">
                  {index !== recentActivity.length - 1 && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <div className="h-2 w-2 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.type}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white shadow-lg rounded-xl">
        <div className="px-6 py-6 sm:p-8">
          <h3 className="text-xl leading-6 font-bold text-gray-900 mb-6">
            System Status
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 bg-green-500 rounded-full shadow-lg"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Authentication Service</p>
                <p className="text-sm text-gray-500">Operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 bg-green-500 rounded-full shadow-lg"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Blockchain Network</p>
                <p className="text-sm text-gray-500">Operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 bg-yellow-500 rounded-full shadow-lg"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">AI Processing</p>
                <p className="text-sm text-gray-500">Maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;