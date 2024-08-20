import React from 'react';
import BarChart from './charts/BarChart';

// const data = [
//   { label: 'A', value: 30, color: '#ff5733' },
//   { label: 'B', value: 50, color: '#33ff57' },
//   { label: 'C', value: 70, color: '#3357ff' },
//   { label: 'D', value: 100, color: '#ff33a1' },
// ];

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <BarChart />
    </div>
  );
}

export default App;