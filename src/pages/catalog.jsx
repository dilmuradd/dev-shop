import React, { useState } from 'react'
import footbal from '/images/football.jpg'
import tShirt from '/images/tShirt.webp'
import hoodie from '/images/hoodie.webp'
import { useNavigate } from 'react-router-dom'

export default function Catalog() {
    const navigate = useNavigate()
    const [catalog, setCatalog]=useState([
        {id: 1, name: 'Futbol ushin', image: footbal,
            clubs: [
                {id: 1, name: "Real Madrid", image: ""},
                {id: 1, name: "Barcelona", image: ""},
                {id: 1, name: "Manchester City", image: ""},
                {id: 1, name: "Manchester United", image: ""},
            ]
    },
        {id: 1, name: 'Futbolkalarga', image: tShirt, clubs: null},
        {id: 1, name: 'Hoodielarga', image: hoodie, clubs: null}
    ]) 
  return (
    <div>
        <h1>Master Print</h1>
        <div className="grid grid-cols-3 ">
            {catalog.map((cat)=> (
                <div onClick={()=> navigate(cat.clubs == null ? '/create': `/clubs/${cat.name}`)}>
                    <img src={cat.image} alt="" />
                    <h2>{cat.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}
