import { useState, useEffect } from "react"; 
import _ from "lodash";

const SliderGroup = ({ data, dataFromSlider }) => {

  const [values, setValues] = useState(data);
  
 
  const addLeadingZero = (num) => _.padStart(num.toString(), 2, '0');

  // Handle slider change
  const handleChange = (index, newValue) => {
    const updatedValues = values.map((item, i) => i === index ? { ...item, value: newValue } : item );
    //console.log(index, newValue );
    setValues(updatedValues);
  };

  useEffect(()=>{
    dataFromSlider(values);
  },[values])
 
  return data && (
    <div style={{padding:"10px 5px"}}>
      {data.map((slider, index) => (
        <div key={index} style={{display:'flex', flexDirection:'row', padding:'10px 0px'}}>
          <label style={{fontWeight:'bolder', width:'20%', marginRight:'6px'}}>{slider.label}:  </label>
          <input
            type="range"
            min={slider.min}
            max={slider.max}
            onMouseUp={(e) => handleChange(index, parseInt(e.target.value))}
            style={{flexGrow:1}}
          />
          <label style={{fontWeight:'bolder', marginLeft:'6px'}}> {values[index].value}</label>
        </div>
      ))}
    </div>
  );
};

export default SliderGroup;
