import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import VCManagement from './pages/VCManagement';
import DIDManagement from './pages/DIDManagement';
import Settings from './pages/Settings';
import Logout from './pages/Logout';
import CreatePolicy from './pages/CreatePolicy';
import Policies from './pages/Policies';
import Groups from './pages/Groups';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/vc-management" element={<VCManagement />} />
          <Route path="/did-management" element={<DIDManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;