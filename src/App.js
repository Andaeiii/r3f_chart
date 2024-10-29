import React, { useState } from 'react';
import BarChart from './charts/BarChart';
import BarChart2 from './charts/BarChart2';
import PieChart3D from './charts/PieChart';
import PieChart2 from './charts/PieChart2';

// const data = [
//   { label: 'A', value: 30, color: '#ff5733' },
//   { label: 'B', value: 50, color: '#33ff57' },
//   { label: 'C', value: 70, color: '#3357ff' },
//   { label: 'D', value: 100, color: '#ff33a1' },
// ];

function App() {
  const [pie, setPie] = useState(true); 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>

      { pie ? <PieChart2 /> : <BarChart /> } 

    </div>

 
  );
}

export default App;