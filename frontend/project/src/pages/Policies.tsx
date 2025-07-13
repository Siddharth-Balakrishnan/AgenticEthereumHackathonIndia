import React, { useState } from 'react';
import { Plus, Search, Shield, X, Edit, Trash2, Users, ChevronDown, ChevronUp } from 'lucide-react';

const Policies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('AWS');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [selectedPolicyForAttach, setSelectedPolicyForAttach] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [expandedServices, setExpandedServices] = useState<string[]>([]);
  
  const [policyData, setPolicyData] = useState({
    name: '',
    description: '',
    service: '',
    permissions: [] as { service: string; actions: string[] }[],
    jsonInput: '',
    inputMode: 'visual' as 'visual' | 'json'
  });

  // Mock data organized by cloud provider
  const policiesByProvider = {
    AWS: [
      { 
        id: 'aws_policy_1', 
        name: 'S3FullAccess', 
        description: 'Complete access to S3 storage services', 
        permissions: [
          { service: 'S3', actions: ['read', 'write', 'delete'] },
          { service: 'CloudFront', actions: ['read'] }
        ],
        createdAt: '2024-01-15',
        attachedGroups: 2,
        status: 'Active'
      },
      { 
        id: 'aws_policy_2', 
        name: 'EC2ReadOnly', 
        description: 'Read-only access to EC2 instances', 
        permissions: [
          { service: 'EC2', actions: ['read'] }
        ],
        createdAt: '2024-01-14',
        attachedGroups: 5,
        status: 'Active'
      },
    ],
    Azure: [
      { 
        id: 'azure_policy_1', 
        name: 'VMContributor', 
        description: 'Manage virtual machines and related resources', 
        permissions: [
          { service: 'Virtual Machines', actions: ['read', 'write', 'delete'] },
          { service: 'Storage', actions: ['read', 'write'] }
        ],
        createdAt: '2024-01-13',
        attachedGroups: 3,
        status: 'Active'
      },
    ],
    Odoo: [
      { 
        id: 'odoo_policy_1', 
        name: 'ERPManager', 
        description: 'Full access to ERP modules', 
        permissions: [
          { service: 'ERP', actions: ['read', 'write', 'delete'] },
          { service: 'Accounting', actions: ['read', 'write'] }
        ],
        createdAt: '2024-01-12',
        attachedGroups: 1,
        status: 'Active'
      },
    ]
  };

  const servicesByProvider = {
    AWS: [
      { name: 'S3', description: 'Simple Storage Service', actions: ['read', 'write', 'delete', 'create'] },
      { name: 'EC2', description: 'Elastic Compute Cloud', actions: ['read', 'write', 'delete', 'create', 'start', 'stop'] },
      { name: 'RDS', description: 'Relational Database Service', actions: ['read', 'write', 'delete', 'create', 'backup'] },
      { name: 'Lambda', description: 'Serverless Functions', actions: ['read', 'write', 'delete', 'create', 'invoke'] },
      { name: 'CloudFront', description: 'Content Delivery Network', actions: ['read', 'write', 'delete', 'create'] },
      { name: 'IAM', description: 'Identity and Access Management', actions: ['read', 'write', 'delete', 'create'] }
    ],
    Azure: [
      { name: 'Virtual Machines', description: 'Compute instances', actions: ['read', 'write', 'delete', 'create', 'start', 'stop'] },
      { name: 'Storage', description: 'Blob and file storage', actions: ['read', 'write', 'delete', 'create'] },
      { name: 'SQL Database', description: 'Managed database service', actions: ['read', 'write', 'delete', 'create', 'backup'] },
      { name: 'App Service', description: 'Web application hosting', actions: ['read', 'write', 'delete', 'create', 'deploy'] },
      { name: 'Azure AD', description: 'Active Directory services', actions: ['read', 'write', 'delete', 'create'] }
    ],
    Odoo: [
      { name: 'ERP', description: 'Enterprise Resource Planning', actions: ['read', 'write', 'delete', 'create'] },
      { name: 'CRM', description: 'Customer Relationship Management', actions: ['read', 'write', 'delete', 'create'] },
      { name: 'eCommerce', description: 'Online store management', actions: ['read', 'write', 'delete', 'create'] },
      { name: 'Inventory', description: 'Stock and warehouse management', actions: ['read', 'write', 'delete', 'create'] },
      { name: 'Accounting', description: 'Financial management', actions: ['read', 'write', 'delete', 'create'] },
      { name: 'HR', description: 'Human Resources', actions: ['read', 'write', 'delete', 'create'] }
    ]
  };

  const groups = [
    { id: 'group_1', name: 'AWS Administrators', memberCount: 3 },
    { id: 'group_2', name: 'Azure DevOps', memberCount: 8 },
    { id: 'group_3', name: 'Odoo Users', memberCount: 5 },
    { id: 'group_4', name: 'Cloud Architects', memberCount: 4 },
  ];

  const currentPolicies = policiesByProvider[activeTab as keyof typeof policiesByProvider] || [];
  const currentServices = servicesByProvider[activeTab as keyof typeof servicesByProvider] || [];

  const filteredPolicies = currentPolicies.filter(policy => 
    policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleServiceSelection = (serviceName: string) => {
    setPolicyData(prev => ({
      ...prev,
      service: serviceName,
      permissions: [...prev.permissions, { service: serviceName, actions: [] }]
    }));
    setExpandedServices(prev => [...prev, serviceName]);
  };

  const handleActionToggle = (serviceName: string, action: string) => {
    setPolicyData(prev => ({
      ...prev,
      permissions: prev.permissions.map(perm => {
        if (perm.service === serviceName) {
          return {
            ...perm,
            actions: perm.actions.includes(action)
              ? perm.actions.filter(a => a !== action)
              : [...perm.actions, action]
          };
        }
        return perm;
      })
    }));
  };

  const handleServiceToggle = (serviceName: string) => {
    setExpandedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const removeServicePermission = (serviceName: string) => {
    setPolicyData(prev => ({
      ...prev,
      permissions: prev.permissions.filter(perm => perm.service !== serviceName)
    }));
    setExpandedServices(prev => prev.filter(s => s !== serviceName));
  };

  const handleCreatePolicy = () => {
    const finalPermissions = policyData.inputMode === 'json'
      ? JSON.parse(policyData.jsonInput || '[]')
      : policyData.permissions;

    console.log('Creating policy for', activeTab, ':', {
      ...policyData,
      permissions: finalPermissions,
      provider: activeTab
    });
    
    // Reset form
    setPolicyData({
      name: '',
      description: '',
      service: '',
      permissions: [],
      jsonInput: '',
      inputMode: 'visual'
    });
    setExpandedServices([]);
    setShowCreateModal(false);
  };

  const handleAttachToGroups = () => {
    console.log('Attaching policy', selectedPolicyForAttach, 'to groups:', selectedGroups);
    setSelectedGroups([]);
    setSelectedPolicyForAttach('');
    setShowAttachModal(false);
  };

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isCreateFormValid = policyData.name.trim() && policyData.description.trim() && 
    (policyData.inputMode === 'visual' ? policyData.permissions.length > 0 : policyData.jsonInput.trim());

  const getSelectedServices = () => policyData.permissions.map(p => p.service);
  const getAvailableServices = () => currentServices.filter(s => !getSelectedServices().includes(s.name));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Policy Management</h1>
          <p className="mt-2 text-base text-gray-600">
            Manage access policies across cloud platforms
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Policy
        </button>
      </div>

      {/* Cloud Provider Tabs */}
      <div className="bg-white shadow-lg rounded-xl">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {['AWS', 'Azure', 'Odoo'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-base transition-all duration-200 ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={{ minWidth: '33.33%', textAlign: 'center' }}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Policies Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPolicies.map((policy) => (
              <div
                key={policy.id}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-200 hover:border-blue-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-900 mb-2">{policy.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
                    
                    {/* Permissions Preview */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {policy.permissions.slice(0, 2).map((permission, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {permission.service}: {permission.actions.join(', ')}
                        </span>
                      ))}
                      {policy.permissions.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{policy.permissions.length - 2} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{policy.attachedGroups} groups</span>
                      </div>
                      <span>{policy.createdAt}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      policy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {policy.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedPolicyForAttach(policy.id);
                      setShowAttachModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Attach Groups
                  </button>
                  <button className="text-indigo-600 hover:text-indigo-900 p-1">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPolicies.length === 0 && (
            <div className="text-center py-12">
              <Shield className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No policies found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : `Create your first ${activeTab} policy.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Policy Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative p-8 border shadow-2xl rounded-xl bg-white max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Create New {activeTab} Policy</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Policy Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Name *
                </label>
                <input
                  type="text"
                  value={policyData.name}
                  onChange={(e) => setPolicyData({ ...policyData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter policy name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={policyData.description}
                  onChange={(e) => setPolicyData({ ...policyData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Describe what this policy allows"
                />
              </div>

              {/* Input Mode Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Policy Editor
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="visual"
                      checked={policyData.inputMode === 'visual'}
                      onChange={(e) => setPolicyData({ ...policyData, inputMode: e.target.value as 'visual' | 'json' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Visual editor</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="json"
                      checked={policyData.inputMode === 'json'}
                      onChange={(e) => setPolicyData({ ...policyData, inputMode: e.target.value as 'visual' | 'json' })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">JSON Input</span>
                  </label>
                </div>
              </div>

              {/* Permissions */}
              {policyData.inputMode === 'visual' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Permissions * ({policyData.permissions.length} service{policyData.permissions.length !== 1 ? 's' : ''} selected)
                  </label>
                  
                  {/* Service Selector */}
                  {getAvailableServices().length > 0 && (
                    <div className="mb-4">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleServiceSelection(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        defaultValue=""
                      >
                        <option value="" disabled>Choose a service</option>
                        {getAvailableServices().map((service) => (
                          <option key={service.name} value={service.name}>
                            {service.name} - {service.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Selected Services and Actions */}
                  <div className="space-y-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                    {policyData.permissions.map((permission, index) => {
                      const service = currentServices.find(s => s.name === permission.service);
                      const isExpanded = expandedServices.includes(permission.service);
                      
                      return (
                        <div key={index} className="border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center justify-between p-4 bg-gray-50">
                            <div className="flex items-center space-x-3">
                              <button
                                type="button"
                                onClick={() => handleServiceToggle(permission.service)}
                                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                              >
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                <span>{permission.service}</span>
                              </button>
                              <span className="text-xs text-gray-500">
                                ({permission.actions.length} action{permission.actions.length !== 1 ? 's' : ''})
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeServicePermission(permission.service)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 hover:bg-red-50 rounded transition-all duration-200"
                            >
                              Remove
                            </button>
                          </div>
                          
                          {isExpanded && service && (
                            <div className="p-4 bg-white">
                              <div className="text-xs text-gray-600 mb-3">{service.description}</div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {service.actions.map((action) => (
                                  <label key={action} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={permission.actions.includes(action)}
                                      onChange={() => handleActionToggle(permission.service, action)}
                                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <span className="text-sm text-gray-700 capitalize">{action}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    
                    {policyData.permissions.length === 0 && (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        No services selected. Choose a service from the dropdown above to start adding permissions.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permissions JSON *
                  </label>
                  <textarea
                    value={policyData.jsonInput}
                    onChange={(e) => setPolicyData({ ...policyData, jsonInput: e.target.value })}
                    placeholder='[{"service": "S3", "actions": ["read", "write"]}]'
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm transition-all duration-200"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Enter permissions as a JSON array of objects with 'service' and 'actions' properties.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePolicy}
                disabled={!isCreateFormValid}
                className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Create Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attach to Groups Modal */}
      {showAttachModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative p-8 border shadow-2xl rounded-xl bg-white max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Attach Policy to Groups</h3>
              <button
                onClick={() => setShowAttachModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Select groups to attach this policy to:
              </p>
              
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {groups.map((group) => (
                  <label key={group.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedGroups.includes(group.id)}
                      onChange={() => handleGroupToggle(group.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{group.name}</div>
                      <div className="text-xs text-gray-500">{group.memberCount} members</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowAttachModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAttachToGroups}
                disabled={selectedGroups.length === 0}
                className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Attach to {selectedGroups.length} Group{selectedGroups.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Policies;