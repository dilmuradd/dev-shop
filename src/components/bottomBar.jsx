import React from 'react'
import { Icons } from '../UI/icons'
import image from '/images/mockup.png';
import Input from '../UI/input';
import { Rnd } from 'react-rnd';


export default function BottomBar({uploadedImage, isDragging, handleImageUpload, setIsDragging, style}) {
  return (
    <div className="w-full h-[100vh] block md:hidden">
        <div className="h-full w-full bg-zinc-900 flex_center">
          <img src={image} alt="" className="w-[90%] h-auto object-contain" />
          {uploadedImage && (
            <Rnd
              default={{
                x: 150,
                y: 150,
                width: 150,
                height: 150,
              }}
              bounds="parent"
              resizeHandleClasses={{
                right: 'resize-handle',
                bottom: 'resize-handle',
              }}
              dragGrid={[1, 1]} // Snap to 10px grid
              resizeGrid={[1, 1]} // Snap resizing to 10px grid
              onDragStart={() => setIsDragging(true)}
              onDragStop={() => setIsDragging(false)}
              style={{
                transform: `rotate(${style.rotate}deg)`,
                border: '1px solid #000',
              }}
            >
              <img
                src={uploadedImage}
                alt="Logo"
                style={{
                  width: `100%`,
                  height: '100%',
                  objectFit: "contain", 
                  padding: '10px',
                }}
                className="draggable-image"
              />
            </Rnd>
          )}
          {/* Magnetic Guidelines */}
          {isDragging && (
          <>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-pink-500"></div>
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-pink-500"></div>
          </>
        )}
        </div>
        <div className="fixed flex bottom-0 bg-indigo-700 w-full h-[5rem] text-zinc-300">
          <div className='flex-1 flex_center flex-col'>
            <Icons.Size width={30} height={30} className="fill-white" />
            <span className='text'>{"Размер"}</span>
          </div>
          <div className='flex-1 flex_center flex-col'>
            <Icons.Color width={30} height={30} className="fill-white" />
            <span className='text'>{"Цвет"}</span>
          </div>
          <div className='flex-1 flex_center flex-col relative'>
            <Icons.Font width={30} height={30} className="fill-white" />
            <span className='text'>{"Текст"}</span>
            <div className="w-44 rounded-xl h-24 bg-white absolute -top-24 flex flex-col justify-between p-2">
              <div className="flex_center gap-2">
                <input type="color" className='w-10 h-10' />
                <label >Цвет текста</label>
              </div>
              <Input placeholder={"For example Jordan"} className={"w-full border-2 h-8"}/>
            </div>
          </div>
          <div className='flex-1 flex_center flex-col'>
            <Icons.Image width={30} height={30} className="fill-white" />
            <span className='text'>{"Изображение"}</span>
            <input type="file" className='text absolute top-0 opacity-0 rounded-xl z-[10]' accept="image/png, image/jpeg" onChange={handleImageUpload} />
          </div>
        </div>
    </div>
  )
}
