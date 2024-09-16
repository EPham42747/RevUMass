import React from 'react';
import './PictureBox.css';

const PictureBox = ({ image, title, description }) => {
  return (
    <div className="picture-box">
      <img src={image} alt={title} className="picture-box-image" />
      <h2 className="picture-box-title">{title}</h2>
      <p className="picture-box-description">{description}</p>
    </div>
  );
};

export default PictureBox;
