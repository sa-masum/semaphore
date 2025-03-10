import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    customerName: '',
    zone: '',
    area: '',
    salesPerson: '',
    customerType: ''
  });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = Cookies.get('authToken');

        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/v1/user/customers', {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setCustomers(response.data.customers);
        setFilteredCustomers(response.data.customers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    const filtered = customers.filter(customer => {
      const matchesName = customer.name.toLowerCase().includes(searchCriteria.customerName.toLowerCase());
      const matchesZone = !searchCriteria.zone || customer.zone === searchCriteria.zone;
      const matchesArea = !searchCriteria.area || customer.area === searchCriteria.area;
      const matchesSalesPerson = !searchCriteria.salesPerson || 
        customer.salesPerson.toLowerCase().includes(searchCriteria.salesPerson.toLowerCase());
      const matchesType = !searchCriteria.customerType || customer.customerType === searchCriteria.customerType;

      return matchesName && matchesZone && matchesArea && matchesSalesPerson && matchesType;
    });

    setFilteredCustomers(filtered);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer._id);
    setEditFormData(customer);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (customerId) => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/v1/user/customer/${customerId}`,
        editFormData,
        {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const updatedCustomers = customers.map(customer =>
        customer._id === customerId ? response.data.customer : customer
      );
      setCustomers(updatedCustomers);
      setFilteredCustomers(updatedCustomers);
      setEditingCustomer(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleCancel = () => {
    setEditingCustomer(null);
    setEditFormData({});
  };

  return (
    <div className="customer-list">
      <div className="search-panel">
        <div className="search-fields">
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={searchCriteria.customerName}
            onChange={handleSearchChange}
          />
          <select
            name="zone"
            value={searchCriteria.zone}
            onChange={handleSearchChange}
          >
            <option value="">Select Zone</option>
            <option value="zone1">Zone 1</option>
            <option value="zone2">Zone 2</option>
          </select>
          <select
            name="area"
            value={searchCriteria.area}
            onChange={handleSearchChange}
          >
            <option value="">Select Area</option>
            <option value="Area1">Area 1</option>
            <option value="Area2">Area 2</option>
          </select>
          <input
            type="text"
            name="salesPerson"
            placeholder="Sales Person"
            value={searchCriteria.salesPerson}
            onChange={handleSearchChange}
          />
          <select
            name="customerType"
            value={searchCriteria.customerType}
            onChange={handleSearchChange}
          >
            <option value="">Select Type</option>
            <option value="Wholesale">Wholesale</option>
            <option value="Retail">Retail</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="customer-table">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Representative</th>
              <th>Customer Name</th>
              <th>Customer Code</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Zone</th>
              <th>Area</th>
              <th>Current Balance</th>
              <th>Last Transaction</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={customer._id}>
                {editingCustomer === customer._id ? (
                  <>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="salesPerson"
                        value={editFormData.salesPerson || ''}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name || ''}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>{customer.customerCode}</td>
                    <td>
                      <input
                        type="text"
                        name="phone1"
                        value={editFormData.phone1 || ''}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="billingAddress"
                        value={editFormData.billingAddress || ''}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <select name="zone" value={editFormData.zone || ''} onChange={handleEditChange}>
                        <option value="zone1">Zone 1</option>
                        <option value="zone2">Zone 2</option>
                      </select>
                    </td>
                    <td>
                      <select name="area" value={editFormData.area || ''} onChange={handleEditChange}>
                        <option value="Area1">Area 1</option>
                        <option value="Area2">Area 2</option>
                      </select>
                    </td>
                    <td>{customer.currentBalance || 0}</td>
                    <td>{customer.lastTransaction || 'N/A'}</td>
                    <td>
                      <button 
                        onClick={() => handleSave(customer._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2 text-sm font-medium"
                      >
                        Save
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{index + 1}</td>
                    <td>{customer.salesPerson}</td>
                    <td>{customer.name}</td>
                    <td>{customer.customerCode}</td>
                    <td>{customer.phone1}</td>
                    <td>{customer.billingAddress}</td>
                    <td>{customer.zone}</td>
                    <td>{customer.area}</td>
                    <td>{customer.currentBalance || 0}</td>
                    <td>{customer.lastTransaction || 'N/A'}</td>
                    <td>
                      <button 
                        onClick={() => handleEdit(customer)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;