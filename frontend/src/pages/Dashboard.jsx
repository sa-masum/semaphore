import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [customerCount, setCustomerCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("authToken");
      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        setIsAuthenticated(true);
        const { data } = await axios.get("http://localhost:5000/api/v1/user/customer-count");
        setCustomerCount(data.count);
      } catch (err) {
        console.error('Error fetching customer count:', err);
      }
    };

    fetchData();
  }, [navigate]);

  const handleAddCustomer = () => {
    console.log('Add Customer clicked')
    navigate('/add-customer');
  }

  const handleCustomerList = () => {
    console.log('Customer List clicked')
    navigate('/customer-list');
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex gap-4">
              <button 
                onClick={handleAddCustomer}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Customer
              </button>
              <button 
                onClick={handleCustomerList}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                Customer List
              </button>
            </div>
          </div>
        </header>

        <main className="bg-white shadow-sm rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Total Customers</h3>
              <p className="text-3xl font-bold">{customerCount}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;