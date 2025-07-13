// src/pages/DIDManagement.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, Key, ArrowLeft, Trash2, X, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchDIDs, generateDid, DIDItem } from '../utils/api';

interface DID {
  id: string;
  did: string;
  email: string;
  role: string;
  creationDate: string;
}

const DIDManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newDID, setNewDID] = useState({ email: '' }); // Removed role from state
  const [error, setError] = useState<string | null>(null);
  const [dids, setDids] = useState<DID[]>([]);

  useEffect(() => {
    const fetchDIDsData = async () => {
      try {
        const result = await fetchDIDs();
        if (result.success && result.data) {
          const didsData = Object.values<DIDItem>(result.data as { [key: string]: DIDItem }).map((item) => ({
            id: item.userId, // Using userId as a temporary id; adjust if needed
            did: item.did,
            email: item.email || '', // Directly use email from API response
            role: item.role || '',   // Directly use role from API response
            creationDate: item.createdAt,
          }));
          setDids(didsData);
        } else {
          setError(result.message || 'Failed to fetch DIDs');
        }
      } catch (err) {
        setError((err as Error).message || 'An error occurred');
      }
    };
    fetchDIDsData();
  }, []);

  const filteredDIDs = dids.filter(did =>
      did.did.toLowerCase().includes(searchTerm.toLowerCase()) ||
      did.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      did.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateDID = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateDid(newDID.email); // Send only email
      if (result.success) {
        console.log('DID generated:', result.did); // Safe access with optional chaining or type guard
        // Refetch DIDs to update the list
        const fetchResult = await fetchDIDs();
        if (fetchResult.success && fetchResult.data) {
          const didsData = Object.values<DIDItem>(fetchResult.data as { [key: string]: DIDItem }).map((item) => ({
            id: item.userId,
            did: item.did,
            email: item.email || '', // Update with email from API
            role: item.role || '',   // Update with role from API
            creationDate: item.createdAt,
          }));
          setDids(didsData);
        }
      } else {
        setError(result.message || 'Failed to generate DID');
      }
    } catch (err) {
      setError((err as Error).message || 'An error occurred');
    } finally {
      setIsGenerating(false);
      setShowCreateModal(false);
      setNewDID({ email: '' }); // Reset only email
    }
  };

  const handleDeleteDID = (didId: string) => {
    console.log('Deleting DID:', didId);
    // Implement delete logic if backend endpoint exists
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'manager': return 'bg-green-100 text-green-800';
      case 'guest': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Decentralized Identifiers Management</h1>
            <p className="mt-2 text-base text-gray-600">
              Manage decentralized identifiers and their associations
            </p>
          </div>
          <div className="mt-6 sm:mt-0 flex space-x-4">
            <Link
                to="/"
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create DID
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
                type="text"
                placeholder="Search DIDs by ID, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* DIDs Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-6 sm:p-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Creation Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {filteredDIDs.map((did) => (
                    <tr key={did.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Key className="h-5 w-5 text-purple-500 mr-3" />
                          <span className="text-sm font-medium text-gray-900 font-mono">
                          {did.did.substring(0, 30)}...
                        </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{did.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(did.role)}`}>
                        {did.role}
                      </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {did.creationDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                            onClick={() => handleDeleteDID(did.did)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-150 p-2 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Create DID Modal */}
        {showCreateModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
              <div className="relative p-8 border shadow-2xl rounded-xl bg-white max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Create Decentralized Identifier</h3>
                  <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 space-y-8">
                  {error && <div className="text-red-600 text-sm">{error}</div>}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
                    <input
                        type="email"
                        value={newDID.email}
                        onChange={(e) => setNewDID({ email: e.target.value })}
                        placeholder="Enter email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>

                  <div className="flex justify-center pt-4">
                    <button
                        onClick={handleCreateDID}
                        disabled={!newDID.email || isGenerating}
                        className="px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                        style={{ width: '160px', height: '48px' }}
                    >
                      {isGenerating ? (
                          <Loader className="h-4 w-4 animate-spin mx-auto" />
                      ) : (
                          <span className="mx-auto">Generate DID</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default DIDManagement;