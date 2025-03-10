import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
  const branches = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Sylhet'];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    createDate: new Date().toISOString().split('T')[0],
    branch: '',
    area: '',
    zone: '',
    name: '',
    email: '',
    creditLimit: '0',
    customerCode: '',
    phone1: '',
    phone2: '',
    birthDate: '',
    website: '',
    billingAddress: '',
    deliveryAddress: '',
    city: '',
    zipCode: '',
    country: '',
    salesPerson: '',
    customerType: 'Wholesale',
    remarks: '',
    openBalanceData: [{ company: '', balanceType: '', amount: '' }],
    contactname: '', 
    contactphone: '',
    contactmobile: '', 
    contactemail: '', 
    parentAccHead: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      if (name === 'branch') {
        return {
          ...prevData,
          [name]: value,
          openBalanceData: prevData.openBalanceData.map(item => ({
            ...item,
            company: value
          }))
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleOpenBalanceChange = (index, e) => {
    const { name, value } = e.target;
    const newOpenBalanceData = [...formData.openBalanceData];
    newOpenBalanceData[index] = {
      ...newOpenBalanceData[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      openBalanceData: newOpenBalanceData,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    try {
      const response = await axios.post('http://localhost:5000/api/v1/user/addcustomer', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log('Response:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('There was an error submitting the form data!', error.response);
      alert('Failed to save customer data');
    }
  };

  return (
    <div className="add-customer">
      <div className="text-4xl font-bold text-center">Add Customer</div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          {/* Left Side */}
          <div className="left-side">
            <div>
              <label>Create Date:</label>
              <input
                type="date"
                name="createDate"
                value={formData.createDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Branch:</label>
              <select name="branch" value={formData.branch} onChange={handleChange}>
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Zone:</label>
              <select name="zone" value={formData.zone} onChange={handleChange}>
                <option value="">Select Area</option>
                <option value="zone1">Zone 1</option>
                <option value="zone2">Zone 2</option>
              </select>
            </div>

            <div>
              <label>Area:</label>
              <select name="area" value={formData.area} onChange={handleChange}>
                <option value="">Select Area</option>
                <option value="Area1">Area 1</option>
                <option value="Area2">Area 2</option>
              </select>
            </div>

            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Cust Code:</label>
              <input
                type="text"
                name="customerCode"
                value={formData.customerCode}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Customer Type:</label>
              <select
                name="customerType"
                value={formData.customerType}
                onChange={handleChange}
              >
                <option value="Wholesale">Wholesale</option>
                <option value="Retail">Retail</option>
              </select>
            </div>

            <div>
              <label>Phone 1:</label>
              <input
                type="text"
                name="phone1"
                value={formData.phone1}
                onChange={handleChange}
                pattern="01\d{9}"
                required
              />
            </div>

            <div>
              <label>Phone 2:</label>
              <input
                type="text"
                name="phone2"
                value={formData.phone2}
                onChange={handleChange}
                pattern="01\d{9}"
              />
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Birth Date:</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Website:</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Billing Address:</label>
              <input
                type="text"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Delivery Address:</label>
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Zip Code:</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>

            <div>
                <label>Country:</label>
                <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                >
                    <option value="">Select Country</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                </select>
            </div>

            <div>
              <label>Sales Person:</label>
              <input
                type="text"
                name="salesPerson"
                value={formData.salesPerson}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="right-side">
            <h1>Contact Person:</h1>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="contactname"
                value={formData.contactname}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="contactphone"
                value={formData.contactphone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Mobile:</label>
              <input
                type="text"
                name="contactmobile"
                value={formData.contactmobile}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Email:</label>
              <input
                type="email"
                name="contactemail"
                value={formData.contactemail}
                onChange={handleChange}
              />
            </div>

            <h1>Account Info:</h1>

            <div>
              <label>Credit Limit:</label>
              <input
                type="number"
                name="creditLimit"
                value={formData.creditLimit}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Parent Acc. Head:</label>
              <select
                name="parentAccHead"
                value={formData.parentAccHead}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="accountReceiveable">Account Receiveable</option>
                <option value="accountPayable">Account Payable</option>
              </select>
            </div>

            <div>
              <label>Open Balance:</label>
              <table className="open-balance-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Company</th>
                    <th>Balance Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.openBalanceData.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td> 
                      <td>
                        <input
                          type="text"
                          name="company"
                          value={formData.branch || item.company} 
                          disabled
                        />
                      </td>
                      <td>
                        <select
                          name="balanceType"
                          value={item.balanceType}
                          onChange={(e) => handleOpenBalanceChange(index, e)}
                        >
                          <option value="">Select</option>
                          <option value="DR">DR</option>
                          <option value="CR">CR</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          name="amount"
                          value={item.amount}
                          onChange={(e) => handleOpenBalanceChange(index, e)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <label>Remarks:</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddCustomer;
