import React from 'react'
import { Icons } from '../UI/icons'
import image from '/images/mockup.png';
import Input from '../UI/input';
import { Rnd } from 'react-rnd';

export default function DesktopBar({uploadedImage, isDragging, handleImageUpload, setIsDragging, sizes,size, colors, selectedColor, setSelectedColor, style}) {
    
return (
    <div className="h-[100vh] hidden md:grid">
      <div className="w-full flex justify-center items-center bg-zinc-700 relative">
        <div className="w-full ml-[10rem]">
            <img src={image} alt="" className="w-[70%] md:w-[60%] lg:w-[60%] xl:w-[40%] h-full object-contain" />
        </div>
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
            <div className="absolute left-[27%] top-0 h-full w-0.5 bg-pink-500"></div>
          </>
        )}
      </div>
      <div className="fixed bottom-0 right-0 w-1/2 lg:w-1/2 xl:w-1/3 bg-zinc-100 rounded-ss-xl flex flex-col items-start md:p-5 p-2 md:text-2xl justify-start gap-10">
        {/* Kiyim o'lchami va rangi */}
        <div className="flex_col gap-4">
          <div className="flex_col gap-1">
            <label htmlFor="" className='label'>Size*</label>
            <div className="flex gap-1">
              {sizes.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className={`size_button transition-all cursor-pointer select-none ${item === size ? 'bg-zinc-200' : 'bg-zinc-100'}`} onClick={()=> setSize(item)}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex_col gap-1">
            <label htmlFor="" className='label'>Select color</label>
            <div className='text-sm flex flex-center gap-1'>
                {colors.map((color)=> (
                  <div key={color} onClick={()=> setSelectedColor(color)} className={`size_button rounded-full ${selectedColor == color ? "ring-2": "ring-0"} cursor-pointer w-7 md:w-10 h-10 border-zinc-400`} style={{backgroundColor: color}}></div>
                ))}
            </div>
          </div>
        </div>

        {/* Matn va rasm yuklash */}
        <div className="flex items-end justify-between w-full gap-5">
          <div className="flex-1 flex flex-col">
            <label htmlFor="" className='text'>Enter Text for T-Shirt</label>
            <Input placeholder={"For example Jordan"}/>
          </div>
          <div className="flex-1 relative h-16">
            <input type="file" className='text absolute top-0 opacity-0 rounded-xl z-[10]' accept="image/png, image/jpeg" onChange={handleImageUpload} />
            <div className="flex items-center justify-center z-1 bg-blue-400 rounded-xl text-white absolute top-0 h-full w-full">
              <span className='text flex-2'>Upload file</span>
              <span className='flex-2'><Icons.Upload width={50} height={50} className="fill-white"/></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
