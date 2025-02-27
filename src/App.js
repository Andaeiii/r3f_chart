import './App.css';
import React, { useState} from 'react';
import BarChart from './charts/BarChart';
 
import PieChart2 from './charts/PieChart2';
 
import SwitchBtn from './misc/SwitchBtn';
import SliderGroup from './misc/SliderGroup';


function App() {

  const [pie, setPie] = useState(true);
  const [ data, setData ] = useState({})

   // Callback function to receive values from SliderGroup
   const readSliderValues = (v) => {
    console.log("Slider Value:", v);
    //setSliderValue(v);
    setData(data);
  };

  return (
    <div className='parent'>



        <div className='content'  style={{height:'100vh'}} >

        <SwitchBtn isOn={pie} onChanged={()=> setPie(!pie)}/>

          { !pie ? <PieChart2 data={data}/> : <BarChart data={data}/> } 
          
        </div>


        <div className='sideXbar'>
          <h1>Chart Controls </h1>
          <hr/>
          
           <SliderGroup allValues={readSliderValues}/>

        </div>

    </div>

 
  );
}

export default App;


 