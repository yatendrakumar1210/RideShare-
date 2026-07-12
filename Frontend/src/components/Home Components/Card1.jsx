import React from 'react'
import img1 from '../../assets/img1.jpg'

const Card1 = () => {
  return (
    <div className="w-full h-100 flex gap-4 p-4 mt-10">
      <div className=" w-1/2 h-full text-5xl text-blue-700 text-shadow-black bg-gray-100 rounded-2xl flex justify-center">
        <h1 className='text-center items-center'>Share Ride <br/>Save Money with <br/>!RideShare</h1>
        
      </div>

      <div className=" w-1/2 h-full text-5xl bg-amber-50 rounded-2xl flex justify-center">
        <img 
        className='h-full w-full'
        src={img1}
         alt="car" />
      </div>
    </div>
  );
}

export default Card1
