import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import './CSS/Dashboard.css'
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";


const Dashboard = () => {
  const [role, setRole] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    let token = localStorage.getItem("token")
    setRole(localStorage.getItem("role"))
    if (!token) {
      navigate('/login')
    }
  })
  return (
    <>

      <DashboardLayout>
        {
          role == "Admin" ? (
            <>

              <div className="dashboard-card-outer">
                <div className="dashboard-cards">
                  <div className="dashboard-card-icon-outer">
                    <div className="dashboard-card-icon">
                      <FaUserGraduate />
                    </div>
                  </div>
                  <div className="dashboard-card-text">
                    <h3>2000+</h3>
                    <p>Students Registered</p>
                  </div>
                </div>
                   <div className="dashboard-cards">
                  <div className="dashboard-card-icon-outer">
                    <div className="dashboard-card-icon">
                      <FaChalkboardTeacher />
                    </div>
                  </div>
                  <div className="dashboard-card-text">
                     <h3>700+</h3>
                    <p>Teacher Working</p>
                  </div>
                </div>
                   <div className="dashboard-cards">
                  <div className="dashboard-card-icon-outer">
                    <div className="dashboard-card-icon">
                      <SiGoogleclassroom />
                    </div>
                  </div>
                  <div className="dashboard-card-text">
                     <h3>40+</h3>
                    <p>Class Provides</p>
                  </div>
                </div>

             

              </div>
            </>

          ) : role == "SupperAdmin" ? (


            
            <h1>This is supper admin page</h1>
          ) : (
            <>
            <div className="teacher-dashboard-card-outer">
                    <div className="teacher-dashboard-cards">
                  <div className=" teacher-dashboard-card-icon-outer">
                    <div className=" teacher-dashboard-card-icon">
                      <FaUserGraduate />
                    </div>
                  </div>
                  <div className=" teacher-dashboard-card-text">
                    <h3>2000+</h3>
                    <p>Students Registered</p>
                  </div>
                </div>
                  <div className="teacher-dashboard-cards">
                  <div className=" teacher-dashboard-card-icon-outer">
                    <div className=" teacher-dashboard-card-icon">
                      <FaChalkboardTeacher />
                    </div>
                  </div>
                  <div className=" teacher-dashboard-card-text">
                  <h3>700+</h3>
                    <p>Teacher Working</p>
                  </div>
                </div>
                  <div className="teacher-dashboard-cards">
                  <div className=" teacher-dashboard-card-icon-outer">
                    <div className=" teacher-dashboard-card-icon">
                     <SiGoogleclassroom />
                    </div>
                  </div>
                  <div className=" teacher-dashboard-card-text">
                   <h3>40+</h3>
                    <p>Class Provides</p>
                  </div>
                </div>
            </div>
            
            
            
            
            </>
          )
        }








      </DashboardLayout>
    </>
  )
}

export default Dashboard
