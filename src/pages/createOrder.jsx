import image from '/images/mockup.png';
import React, { useState } from 'react';
import ImageCanvas from '../components/imageCanvas.jsx';

export default function CreateOrder(){
  const [imageSrc, setImageSrc] = useState('');
  let deleteImg = (data) =>{
    setImageSrc(data)
  }
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='h-[100vh] flex w-full'>
      <div className='bg-zinc-100 flex-1 p-5'>
        <input type="file" onChange={handleImageUpload} />
      </div>
      <div className='bg-zinc-800 flex-1 p-5'>
        <div className=' relative'>
          <img src={image} alt="" className='h-[97vh]' /> 
          {imageSrc && <ImageCanvas  onSendData={deleteImg} imageSrc={imageSrc} className="bg-red-300 absolute top-24 left-1/2 -translate-x-[50%] overflow-hidden w-[250px] h-[300px]" />}
        </div>
      </div>
    </div>
  );
};

