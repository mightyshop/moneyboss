import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Users, Award, BarChart2, LogOut } from 'lucide-react';
import Overview from './Overview';
import Submissions from './Submissions';
import WinningRates from './WinningRates';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/mylogin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/mylogin');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        
        <nav className="mt-6">
          <Link
            to="/admin"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              activeTab === 'overview' ? 'bg-gray-100' : ''
            }`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart2 className="w-5 h-5 mr-3" />
            Overview
          </Link>
          
          <Link
            to="/admin/submissions"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              activeTab === 'submissions' ? 'bg-gray-100' : ''
            }`}
            onClick={() => setActiveTab('submissions')}
          >
            <Users className="w-5 h-5 mr-3" />
            Submissions
          </Link>
          
          <Link
            to="/admin/winning-rates"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              activeTab === 'winning-rates' ? 'bg-gray-100' : ''
            }`}
            onClick={() => setActiveTab('winning-rates')}
          >
            <Award className="w-5 h-5 mr-3" />
            Winning Rates
          </Link>
        </nav>

        <div className="absolute bottom-0 w-64 p-6">
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/winning-rates" element={<WinningRates />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;