import React, { useState } from 'react';
import './SwitchBtn.css'; // Assuming you create a CSS file for the switch styling

const SwitchBtn = ({ isOn, onChanged}) => {

  return (
    <label className="switch">
      <input type="checkbox" checked={isOn} onChange={onChanged} />
      <span className="slider round"></span>
    </label>
  );
};

export default SwitchBtn;