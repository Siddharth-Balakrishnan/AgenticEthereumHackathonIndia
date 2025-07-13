import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchVc, createVc, generateDid, Vc } from '../utils/api';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const VcManagement: React.FC = () => {
  const [vcs, setVcs] = useState<Vc[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [expirationDays, setExpirationDays] = useState<number>(30);
  const [isDidModalOpen, setIsDidModalOpen] = useState(false);

  useEffect(() => {
    fetchVcData();
  }, []);

  const fetchVcData = async () => {
    try {
      const userId = "c55ac7d4-943f-43f6-ab15-bf7c924328f0"; // Replace with actual user ID from auth context, using sample data userId
      const result = await fetchVc(userId);
      if (result.success && result.data) {
        setVcs([result.data]);
      } else {
        setError(result.message || 'No VC found');
      }
    } catch (err) {
      setError((err as Error).message || null);
    }
  };

  const handleCreateVc = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createVc({ email, expirationDays });
      if (result.success) {
        setError(null);
        fetchVcData();
      } else {
        setError(result.message || 'Failed to create VC');
      }
    } catch (err) {
      setError((err as Error).message || 'Network error occurred');
    }
  };

  const handleCreateDid = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await generateDid(email);
      if (result.success) {
        setError(null);
        setIsDidModalOpen(false); // Close modal on success
        // Optionally refresh related data if needed
      } else {
        setError(result.message || 'Failed to create DID');
      }
    } catch (err) {
      setError((err as Error).message || 'Network error occurred');
    }
  };

  return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">VC Management</h1>
            <p className="mt-1 text-sm text-gray-600">View and Create Verifiable Credentials</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
                onClick={() => setIsDidModalOpen(true)}
                className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create DID
            </button>
            <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Create VC Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New VC</h2>
          <form onSubmit={handleCreateVc} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter user email"
                  required
              />
            </div>
            <div>
              <label htmlFor="expirationDays" className="block text-sm font-medium text-gray-700">
                Expiration Days
              </label>
              <input
                  type="number"
                  id="expirationDays"
                  value={expirationDays}
                  onChange={(e) => setExpirationDays(Number(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  min="1"
                  required
              />
            </div>
            <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create VC
            </button>
          </form>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </div>

        {/* Create DID Modal */}
        <Transition appear show={isDidModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsDidModalOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Create New DID
                    </Dialog.Title>
                    <form onSubmit={handleCreateDid} className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="didEmail" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                            type="email"
                            id="didEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter user email"
                            required
                        />
                      </div>
                      <div className="mt-4">
                        <button
                            type="submit"
                            className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Create DID
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsDidModalOpen(false)}
                            className="ml-2 inline-flex justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                    {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* VC Table */}
        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">VC ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expires At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Signature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {vcs.map((vc) => (
                    <tr key={vc.vcId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{vc.vcId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vc.userId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vc.did}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vc.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(vc.expiresAt).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vc.signature}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(vc.createdAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default VcManagement;