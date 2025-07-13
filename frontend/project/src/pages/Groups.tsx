import React, { useState } from 'react';
import { Users, Plus, X, Edit, Trash2, Search, UserPlus } from 'lucide-react';

const Groups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('AWS');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [selectedGroupForEdit, setSelectedGroupForEdit] = useState('');
  const [selectedGroupForAttach, setSelectedGroupForAttach] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const [groupData, setGroupData] = useState({
    name: '',
    description: ''
  });

  // Mock data organized by cloud provider
  const groupsByProvider = {
    AWS: [
      { 
        id: 'aws_group_1', 
        name: 'AWS Administrators', 
        description: 'Full administrative access to AWS resources', 
        memberCount: 3,
        createdAt: '2024-01-15',
        members: ['john.doe', 'jane.admin', 'aws.admin']
      },
      { 
        id: 'aws_group_2', 
        name: 'S3 Users', 
        description: 'Users with access to S3 storage services', 
        memberCount: 8,
        createdAt: '2024-01-14',
        members: ['dev.smith', 'storage.wilson', 'backup.johnson', 'data.brown', 'file.davis', 'bucket.garcia', 'object.miller', 'sync.martinez']
      },
    ],
    Azure: [
      { 
        id: 'azure_group_1', 
        name: 'Azure DevOps Team', 
        description: 'Development and operations team for Azure resources', 
        memberCount: 5,
        createdAt: '2024-01-13',
        members: ['devops.alice', 'pipeline.bob', 'deploy.charlie', 'build.diana', 'release.eve']
      },
      { 
        id: 'azure_group_2', 
        name: 'VM Operators', 
        description: 'Operators managing virtual machines', 
        memberCount: 4,
        createdAt: '2024-01-12',
        members: ['vm.frank', 'compute.grace', 'instance.henry', 'server.iris']
      },
    ],
    Odoo: [
      { 
        id: 'odoo_group_1', 
        name: 'ERP Managers', 
        description: 'Managers with full ERP system access', 
        memberCount: 2,
        createdAt: '2024-01-11',
        members: ['erp.manager1', 'system.manager2']
      },
      { 
        id: 'odoo_group_2', 
        name: 'Sales Team', 
        description: 'Sales representatives using CRM and eCommerce modules', 
        memberCount: 12,
        createdAt: '2024-01-10',
        members: ['sales.rep1', 'sales.rep2', 'sales.rep3', 'sales.rep4', 'sales.rep5', 'sales.rep6', 'sales.rep7', 'sales.rep8', 'sales.rep9', 'sales.rep10', 'sales.rep11', 'sales.rep12']
      },
    ]
  };

  const users = [
    { id: 'user_1', username: 'john.doe', email: 'john.doe@example.com', status: 'active' },
    { id: 'user_2', username: 'jane.smith', email: 'jane.smith@example.com', status: 'active' },
    { id: 'user_3', username: 'bob.wilson', email: 'bob.wilson@example.com', status: 'active' },
    { id: 'user_4', username: 'alice.johnson', email: 'alice.johnson@example.com', status: 'active' },
    { id: 'user_5', username: 'charlie.brown', email: 'charlie.brown@example.com', status: 'active' },
    { id: 'user_6', username: 'diana.prince', email: 'diana.prince@example.com', status: 'active' },
  ];

  const currentGroups = groupsByProvider[activeTab as keyof typeof groupsByProvider] || [];

  const filteredGroups = currentGroups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = () => {
    const newGroup = {
      name: groupData.name,
      description: groupData.description,
      createdAt: new Date().toISOString().split('T')[0],
      id: `${activeTab.toLowerCase()}_group_${Date.now()}`,
      memberCount: 0,
      members: [],
      provider: activeTab
    };

    console.log('Creating group for', activeTab, ':', newGroup);
    
    // Reset form
    setGroupData({ name: '', description: '' });
    setShowCreateModal(false);
  };

  const handleEditGroup = (groupId: string) => {
    const group = currentGroups.find(g => g.id === groupId);
    if (group) {
      setGroupData({
        name: group.name,
        description: group.description
      });
      setSelectedGroupForEdit(groupId);
      setShowEditModal(true);
    }
  };

  const handleUpdateGroup = () => {
    console.log('Updating group:', {
      id: selectedGroupForEdit,
      ...groupData,
      provider: activeTab
    });
    
    setGroupData({ name: '', description: '' });
    setSelectedGroupForEdit('');
    setShowEditModal(false);
  };

  const handleDeleteGroup = (groupId: string) => {
    console.log('Deleting group:', groupId);
  };

  const handleAttachUsers = () => {
    console.log('Attaching users to group:', {
      groupId: selectedGroupForAttach,
      userIds: selectedUsers,
      provider: activeTab
    });
    setShowAttachModal(false);
    setSelectedGroupForAttach('');
    setSelectedUsers([]);
  };

  const handleUserToggle = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const isCreateFormValid = groupData.name.trim() && groupData.description.trim();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Groups Management</h1>
          <p className="mt-2 text-base text-gray-600">
            Manage user groups and their member associations across cloud platforms
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-6 sm:mt-0 inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Group
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

        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search groups by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Groups Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-200 hover:border-blue-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <h3 className="text-base font-medium text-gray-900">{group.name}</h3>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {group.memberCount} members
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{group.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Created: {group.createdAt}</span>
                </div>

                {/* Member Avatars Preview */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex -space-x-2">
                    {group.members.slice(0, 4).map((member, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-medium"
                      >
                        {member.charAt(0).toUpperCase()}
                      </div>
                    ))}
                    {group.memberCount > 4 && (
                      <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                        +{group.memberCount - 4}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedGroupForAttach(group.id);
                      setShowAttachModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    title="Attach Users"
                  >
                    <UserPlus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEditGroup(group.id)}
                    className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded-lg transition-all duration-200"
                    title="Edit Group"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteGroup(group.id)}
                    className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Delete Group"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No groups found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search terms.' : `Create your first ${activeTab} group.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative p-8 border shadow-2xl rounded-xl bg-white max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Create New {activeTab} Group</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Name *</label>
                <input
                  type="text"
                  value={groupData.name}
                  onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
                  placeholder="Enter group name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={groupData.description}
                  onChange={(e) => setGroupData({ ...groupData, description: e.target.value })}
                  placeholder="Describe the group's purpose"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={!isCreateFormValid}
                className={`inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isCreateFormValid
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Group Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative p-8 border shadow-2xl rounded-xl bg-white max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit {activeTab} Group</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Name *</label>
                <input
                  type="text"
                  value={groupData.name}
                  onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
                  placeholder="Enter group name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={groupData.description}
                  onChange={(e) => setGroupData({ ...groupData, description: e.target.value })}
                  placeholder="Describe the group's purpose"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateGroup}
                disabled={!isCreateFormValid}
                className={`inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isCreateFormValid
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                }`}
              >
                <Edit className="h-4 w-4 mr-2" />
                Update Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attach Users Modal */}
      {showAttachModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative p-8 border shadow-2xl rounded-xl bg-white max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Attach Users to Group</h3>
              <button
                onClick={() => setShowAttachModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Users to Attach ({selectedUsers.length} selected)
                </label>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {users.filter(user => user.status === 'active').map((user) => (
                    <label key={user.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserToggle(user.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowAttachModal(false)}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAttachUsers}
                disabled={selectedUsers.length === 0}
                className={`inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  selectedUsers.length > 0
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                }`}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Attach Users
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;