import React, { useEffect, useState } from 'react'
import "../Components/CSS/DashboardLayout.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { FcBusinessman } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";
import { IoMdMenu } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentBold } from "react-icons/pi";
import { MdSubject } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { MdAppRegistration } from "react-icons/md";
import Swal from 'sweetalert2';




// <RxCross1 />
const DashboardLayout = ({children}) => {
  const [role, setRole] = useState('')
  const [sidebaropen, setSidebarOpen] = useState(true)
  const[isClose,setIsClose] = useState()
const navigate = useNavigate()

  // const[isOpen,setIsOpen] = useState()
  // const [isClose, setIsClose] = useState(false)
  // const logout = () => {
  //   alert("logout")
  // }
  // const handleSidebar = () => {
  //   setIsClose(!isClose)
  // }

  useEffect(() => {
    setRole(localStorage.getItem('role') ?? "Guest")
  },[])

  const tabs={

  SupperAdmin:[
      {title:"Dashboard",path:"/dashboard",icon:IoSettingsOutline},
      {title:"Admins",path:"/admins",icon:RiAdminFill},
    ],

     Admin :[
      {title: "Dashboard",path:"/dashboard",icon:MdDashboard,},
      {title:"Fee",path:"/fee",icon:FaRupeeSign,},
      {title:"Registration",path:"/registration",icon:MdAppRegistration,},
      {title:"Teachers",path:"/teachers",icon:LiaChalkboardTeacherSolid,},
      {title:"Students",path:"/students",icon:PiStudentBold,},
      {title:"Class",path:"/class",icon:SiGoogleclassroom ,},
      {title:"Subject",path:"/subject",icon:MdSubject,},
      {title:"Setting",path:"/setting",icon:IoSettingsOutline,},

    ],
     Teacher:[
     {title: "Dashboard",path:"/dashboard",icon:MdDashboard,},
      {title:"Fee",path:"/fee",icon:FaRupeeSign,},
      {title:"Students",path:"/students",icon:PiStudentBold,},
      {title:" My Classes",path:"/myclass",icon:SiGoogleclassroom ,},
      {title:"My Subjects",path:"/my-subject",icon:MdSubject,},
      {title:"Profile",path:"/profile",icon:RiAdminFill,},
    ]
  }
const roleTabs=tabs[role]  || [];

const handleLogout=()=>{
Swal.fire({
  title: "Are you sure to Logout ?",
  text: "You will be logout from dashboard",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed){
   Swal.fire({
    title: "Logout",
    text: " Logout Successfully",
    icon: "success"
  })
    localStorage.removeItem('token')
  localStorage.removeItem('role')
  navigate('/login')

  }else{
    Swal.fire({
      title:"Cancelled",
      text:"You are still loged in!",
      icon:"info"
    })
  } 
});



}


  return (
    <>
      <div className="dashboardLayout-outer">
        <div className={`sidebar ${sidebaropen ? "sidebar-open" : "sidebar-closed"}`}>
          <div className="dashboard-topbar">
            <div className="logo">
              <img src='logo.png' alt='' />
              <h2>Apex Global University</h2>
            </div>
            <div className="dashboard-links">
                {/* <NavLink to='/dashboard' className={({ isActive }) => `navlinks ${isActive}? "sidebar-active" : "" `}><span><MdDashboard /></span>Dashboard</NavLink> */}
                {
                  roleTabs.map((tab)=>{
                    const Icon=tab.icon;
                    return(<NavLink key={tab.path}to={tab.path} className={({ isActive }) => `navlinks ${isActive}? "sidebar-active" : "" `}><Icon/>{!isClose && (<span>{tab.title}</span>)}</NavLink>)
                  })
                }
                {/* <NavLink to='/fee' className={({ isActive }) => `navlinks ${isActive}? " sidebar-active" : "" `}><span><FaRupeeSign /></span>Fee</NavLink>
                <NavLink to='/teachers' className={({ isActive }) => `navlinks ${isActive}? " sidebar-active" : "" `}><span><LiaChalkboardTeacherSolid /></span>Teachers</NavLink>
                <NavLink to='/students' className={({ isActive }) => `navlinks ${isActive}? " sidebar-active" : "" `}><span><PiStudentBold /></span>Students</NavLink>
                <NavLink to='/class' className={({ isActive }) => `navlinks ${isActive}? " sidebar-active" : "" `}><span><SiGoogleclassroom /></span>Class</NavLink>
                <NavLink to='/subject' className={({ isActive }) => `navlinks ${isActive}? "sidebar-active" : "" `}><span><MdSubject /></span>Subject</NavLink>
                <NavLink to='/setting' className={({ isActive }) => `navlinks ${isActive}? "sidebar-active" : "" `}><span><IoSettings /></span>Setting</NavLink> */}
            </div>
            <div className="dashboard-btn">
              <button className='sidebar-logout' onClick={handleLogout}>LogOut</button>
            </div>
          </div>
        </div>
        <div className="dashboardLayout-main">
          <div className="dashboard-header">
            <div className="header-first">
              {!sidebaropen && (
                <button onClick={() => setSidebarOpen(true)} className='sidebar-open-btn'><IoMdMenu /></button>
              )}
              {
                sidebaropen && (
                  <div onClick={() => setSidebarOpen(false)} className='sidebar-close-btn'> <RxCross1 /> </div>
                )}
              <h2>Welcome Admin!{role}</h2>
            </div>
            <div className="header-last">
              <span className='icon'><FcBusinessman /></span>
              <h2>Admin</h2>
            </div>
          </div>
           <div className="dashboardLayout-content">
             {children}
           </div> 

        </div>
 


      </div>


    </>
  )
}

export default DashboardLayout
