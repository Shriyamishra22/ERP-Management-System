import React from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import '../TeacherPages/CSS/Profile.css'
import { FaUser } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";

const Profile = () => {
    return (
        <>

            <DashboardLayout>
                <div className="profile-main-outer">
                    <h1> My Profile</h1>
                    <p>View and manage your personal Information</p>
                    <div className="profile-outer">
                        <div className="profile-image">
                            <img />
                        </div>
                        <div className="profile-content">
                            <h2>Shriya Mishra</h2>
                            <p>Teacher</p>
                            <div className="profile-text">
                                <div className="name">
                                    <span><FaUser /></span>
                                    <label>Name</label>
                                    <input type='text' placeholder='name' />
                                </div>
                                <div className="email">
                                    <span><MdMarkEmailRead /></span>
                                    <label>Email</label>
                                    <input type='email' placeholder='email' />
                                </div>
                                <div className="mobile">
                                    <span><FaMobileAlt /></span>
                                    <label>Phone Number</label>
                                    <input type='text' placeholder='phone number'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </DashboardLayout>
        </>
    )
}

export default Profile
