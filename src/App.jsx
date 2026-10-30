import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import DashboardLayout from './Components/DashboardLayout'
import { ToastContainer } from 'react-toastify'
import Subject from './AdminPages/Subject'
import Fee from './AdminPages/Fee'
import AdminSetting from './AdminPages/AdminSetting'
import Registration from './AdminPages/Registration'
import Teacher from './AdminPages/Teacher'
import AllClasses from './AdminPages/AllClasses'
import Students from './AdminPages/Students'
import TeacherClasses from './TeacherPages/TeacherClasses'
import Profile from './TeacherPages/Profile'


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Super admin */}
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard-layout' element={<DashboardLayout />} />
          {/* superadmin end */}

          {/* admin route */}
          <Route path='/subject' element={<Subject />} />
          <Route path='/fee' element={<Fee />} />
          <Route path='/setting' element={<AdminSetting />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/students' element={<Students />} />
          <Route path='/teachers' element={<Teacher />} />
          <Route path='/class' element={<AllClasses />} />
          {/* admin route end */}


          {/* Teacher Route */}

          <Route path='/myclass' element={<TeacherClasses />} />
          <Route path='/profile' element={<Profile/>}/>
          {/* Teacher Route End */}


        </Routes>
      </Router>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />



    </>
  )
}

export default App
