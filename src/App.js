import './App.css';
import React, { useEffect, useState} from 'react';
import BarChart from './charts/BarChart';
 
import PieChart3D from './charts/PieChart3D';
 
import SwitchBtn from './misc/SwitchBtn';
import SliderGroup from './misc/SliderGroup';


function App() {

  const getRandomHexColor = () =>  `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`; 
  const sdata = [
    { label: "Lawyers", value:40, min: 0, max: 100, color:'#f00' },
    { label: "Soldiers", value:40, min: 0, max: 100, color: getRandomHexColor()  },
    { label: "Nurses", value:40, min: 0, max: 100, color: getRandomHexColor()  },
    { label: "Doctors", value:40, min: 0, max: 100, color: getRandomHexColor()  },
    { label: "Teachers", value:40, min: 0, max: 100, color: getRandomHexColor()  },
    { label: "Cooks", value:40, min:0, max: 100, color: getRandomHexColor()  },
  ];

  const [pie, setPie] = useState(true);
  const [ data, setData ] = useState(sdata); 

  // useEffect(()=>{
  //   let ndata = sdata.map(dt => ({...dt, value:40}))
  //   setData(ndata);
  // }, []);


  const readBarValues = (dt) => {
    console.log(dt, 'dtx');
    setData(dt);
  }

  return data && (
          <div className='parent'>
              <div className='content'  style={{height:'100vh'}} >
                <SwitchBtn isOn={pie} onChanged={()=> setPie(!pie)}/>
               
                { !pie ? <PieChart3D sdata={data}/> : <BarChart data={data}/> }           
                
              </div>
              <div className='sideXbar'>
                <h1>Chart Controls </h1>
                <hr/><SliderGroup dataFromSlider={readBarValues} data={data}/>  
              </div>
          </div>);


}

export default App;


 