import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css';

function Form() {
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/students');
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (name === '' || college === '') {
      alert('Please fill in all fields');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('college', college);
  
    try {
      await axios.post('http://localhost:5000/students', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchStudents();
      setName('');
      setCollege('');
    } catch (error) {
      console.error(error);
    }
  };
  

return (
    <div className="form-container">
      <h1>Student Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="college">College:</label>
          <input
            type="text"
            id="college"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>Submitted Data:</h2>
      <table className="submitted-data">
        <thead>
          <tr>
            <th>Name</th>
            <th>College</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.college}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Form;
