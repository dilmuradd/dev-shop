import React, { useState } from "react";
import Draggable from "react-draggable";
import { MdDeleteOutline } from "react-icons/md";

const ImageCanvas = ({ imageSrc,onSendData }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showCross, setShowCross] = useState(false);
  const [showHorizontalLine, setShowHorizontalLine] = useState(false);
  const [showVerticalLine, setShowVerticalLine] = useState(false);

  const parentDimensions = { width: 340, height: 340 }; 
  const childDimensions = { width: 200, height: 200 }; 

  const handleDrag = (e, data) => {
    const centerX = parentDimensions.width / 2 - childDimensions.width / 2;
    const centerY = parentDimensions.height / 2 - childDimensions.height / 2;

   
    const isNearLeft = data.x <= 5;
    const isNearRight = data.x >= parentDimensions.width - childDimensions.width - 5;

   
    const isNearTop = data.y <= 5;
    const isNearBottom = data.y >= parentDimensions.height - childDimensions.height - 10; 
   
    const isCenteredX = Math.abs(data.x - centerX) < 10;
    const isCenteredY = Math.abs(data.y - centerY) < 10;


    setShowVerticalLine(isNearLeft || isNearRight);

   
    setShowHorizontalLine(isNearTop || isNearBottom);

   
    if (isCenteredX) {
      setPosition({ x: centerX, y: data.y });
      setShowCross(true);
    } else if (isCenteredY) {
      setPosition({ x: data.x, y: centerY });
      setShowCross(true);
    } else {
      setShowCross(false);
      setPosition({ x: data.x, y: data.y });
    }
  };

  const handleStart = () => {
    setShowCross(true); 
  };

  const handleStop = () => {
    setShowCross(false);
    setShowVerticalLine(false);
    setShowHorizontalLine(false);
  };
let SendData = ()=>{
onSendData('')
}
  return (
    <div className="absolute w-[340px] h-[340px] right-[215px] top-[120px] border border-black">
     
      {showVerticalLine && (
        <div className="absolute h-[2px] w-full bg--500 left-0 top-1/2 transform -translate-y-1/2 z-10"></div>
      )}

     
      {showHorizontalLine && (
        <div className="absolute w-[2px] h-full bg-blue-500 top-0 left-1/2 transform -translate-x-1/2 z-10"></div>
      )}

     
      {showCross && (
        <>
          <div className="absolute w-[2px] h-full bg-blue-500 top-0 left-1/2 transform -translate-x-1/2 z-10"></div>
          <div className="absolute h-[2px] w-full bg-blue-500 left-0 top-1/2 transform -translate-y-1/2 z-10"></div>
        </>
      )}

      <Draggable
        position={position}
        onDrag={handleDrag}
        onStart={handleStart}
        onStop={handleStop}
        bounds="parent"
      >
        <div className="absolute cursor-move flex justify-center items-center max-w-[200px] max-h-[200px] top-0 left-0">
          <img
            src={imageSrc}
            alt="Draggable"
            className="w-full h-full object-contain"
            draggable={false}
          />

          <button
          onClick={()=>SendData()}
            className="absolute top-[-10px] left-[-15px] p-[2px] rounded-[12px] bg-white cursor-pointer"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </Draggable>
    </div>
  );
};

export default ImageCanvas;
