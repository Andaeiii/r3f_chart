import { useState, useEffect } from "react"; 
import _ from "lodash";

const SliderGroup = ({ allValues }) => {
  // Define slider names and initial values
  const sliders = [
    { name: "Lawyers", min: 0, max: 100 },
    { name: "Soldiers", min: 0, max: 100 },
    { name: "Nurses", min: 0, max: 100 },
    { name: "Doctors", min: 0, max: 100 },
    { name: "Teacjers", min: 0, max: 100 },
    { name: "Cooks", min:0, max: 100 },
  ];

  // State to hold slider values
  const [values, setValues] = useState(
    sliders.map((slider) => ({ name: slider.name, value: slider.min }))
  );
  
  const addLeadingZero = (num) => _.padStart(num.toString(), 2, '0');

  // Handle slider change
  const handleChange = (index, newValue) => {
    const updatedValues = values.map((item, i) => i === index ? { ...item, value: newValue } : item );
    setValues(updatedValues);
    //console.log(updatedValues); // Logs the updated array of objects
  };

  // Call getValues whenever values change
  useEffect(() => {

    allValues(values);

  }, [values, allValues]);

  return (
    <div style={{padding:"10px 5px"}}>
      {sliders.map((slider, index) => (
        <div key={index} style={{display:'flex', flexDirection:'row', padding:'10px 0px'}}>
          <label style={{fontWeight:'bolder', width:'20%', marginRight:'6px'}}>{slider.name}:  </label>
          <input
            type="range"
            min={slider.min}
            max={slider.max}
            value={values[index].value}
            onChange={(e) => handleChange(index, Number(e.target.value))}
            style={{flexGrow:1}}
          />
          <label style={{fontWeight:'bolder', marginLeft:'6px'}}>{addLeadingZero(values[index].value)}</label>
        </div>
      ))}
    </div>
  );
};

export default SliderGroup;
