import React from 'react'
import Hero from './components/Hero'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import DoctorSignUp from './pages/DoctorSignup'
import TopRatedDoctors from './components/TopRatedDoctors'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Doctors from './pages/Doctors'
import Documents from './pages/Documents'
import Appointments from './pages/Appointments'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import DoctorDetails from './pages/DoctorDetails'
const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor-signup" element={<DoctorSignUp />} />
          <Route path="/top-rated-doctors" element={<TopRatedDoctors />} />
          <Route path='/FindDoctor' element={<Doctors/>}/>
          <Route path='/doctors/:id' element={<DoctorDetails/>}/>
          <Route path='/Appointments' element={<Appointments/>}/>
          <Route path='/Documents' element={<Documents/>}/>
          <Route path='/notifications' element={<Notifications/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App
