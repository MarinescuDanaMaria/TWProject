import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch('http://localhost:8081/users')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  return (
    <div>
      <h1>User Table</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Check if data exists */}
          {data.length > 0 ? (
            data.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.datebirth}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
