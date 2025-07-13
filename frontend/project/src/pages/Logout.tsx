import React from 'react';
import { LogOut, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logout: React.FC = () => {
  const handleLogout = () => {
    console.log('Logging out...');
    // Here you would typically:
    // 1. Clear authentication tokens
    // 2. Clear local storage/session storage
    // 3. Redirect to login page
    // 4. Call logout API endpoint
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <LogOut className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Confirm Logout
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to log out of the IAM Portal?
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Before you go
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Make sure you have saved any unsaved work. You will need to log in again to access the admin portal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                to="/"
                className="flex-1 flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Cancel
              </Link>
              <button
                onClick={handleLogout}
                className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Confirm Logout
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Session will be terminated and all temporary data will be cleared.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logout;