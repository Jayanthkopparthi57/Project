# Project

7PGLUZzsBqkxyejo

import React from 'react'

const Home = () => {
  return (
    <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px' , marginRight: '100px'}}>
         <div style={{display: 'flex', flexDirection: 'column'}}>
            <h1 style={{ color: 'black' , fontFamily: 'Arial', fontSize: '50px' }}>Book An Appointment 
            <br/>
         <span style={{ color: '#1f8916' }}>Now</span></h1>
         <button style={{ backgroundColor: '#1f8916', color: 'white', border: 'none', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Find Your Doctor</button>
         </div>
         <div style={{  alignItems: 'end', justifyContent: 'end' }}>
            <img src="https://i.pinimg.com/1200x/c7/42/ed/c742eddf09aa26650147d03cb4d04b3a.jpg" alt="Doctor" style={{ width: '500px', height: '500px', marginTop: '20px', borderRadius: '30%'}} />
         </div>
        </div>
    </div>
  )
}

export default Home