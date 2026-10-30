import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import "../AdminPages/CSS/Registration.css"
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa6";
import { VscNewSession } from "react-icons/vsc";
import { FaUserClock } from "react-icons/fa";
import axios from 'axios';
const Registration = () => {

  const [classDetails, setClassDetails] = useState([])
  const [selectedClass, setSelectedClass] = useState("")


  let selectedFee = classDetails.find((t) => {
    return t.Class === selectedClass
    console.log(selectedFee);
  })

  const totalFee = selectedFee?.fee?.reduce((acc, f) => acc + Number(f.Amount), 0)
  console.log(totalFee);

  const fetchClassDetails = async () => {
    try {
      const res = await axios.get('/Data/classdetails.json')
      setClassDetails(res.data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchClassDetails()
  }, [])



  return (
    <>
      <DashboardLayout>
        <div className="erp-student-registration-form">
          <div className='add-student'>Add Students</div>
          <div className='registration-info'>
            <div className="admission-date">
              <div className="icon">
                <span><BsFillCalendarDateFill /></span>
              </div>
              <div className="addmission">
                <span>Admission Date</span>
                <span>{Date.now()}</span>
              </div>
            </div>
            <div className="register">
              <div className="icon-register">
                <span><FaAddressBook /></span>
              </div>
              <div className="resiter-number">
                <span>Registration Number</span>
                <span>{new Date().toISOString().split('T')[0]}</span>
              </div>

            </div>
            <div className="session">
              <div className="session-icon">
                <span><VscNewSession /></span>
              </div>
              <div className="session-type">
                <span>Session</span>
                <span>2026-2027</span>
              </div>

            </div>
          </div>
          <div className="registration-container">
            <div className="personal-details">
              <div className="admin-icon">
                <span><FaUserClock /></span>
              </div>
              <div className="details">
                <h4>Personal Details</h4>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Student Name</label>
                <input type='text' name="name" placeholder='Student Name' />
              </div>
              <div className="form-group">
                <label>Photo</label>
                <input type='file' name='photo' />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type='text' name="phone no" placeholder='Phone NO' />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type='email' name="email" placeholder='Student Email' />
              </div>
              <div className="form-group">
                <label>DOB</label>
                <input type='date' />
              </div>
              <div className="form-group gender-group">
                <label>Gender</label>
                <label className='gender-option'>
                  <input type='radio' value='Male' name='gender' />
                  Male
                </label>
                <label className='gender-option'>
                  <input type='radio' value='Female' name='gender' />
                  Female
                </label>
                <label className='gender-option'>
                  <input type='radio' value='Other' name='gender' />Other
                </label>
              </div>
              <div className="form-group">
                <label>Adhar Number(Optional)</label>
                <input type='number' placeholder='Student Adhar No.' name='adhar no' />
              </div>
              <div className="form-group">
                <label>Father's Name</label>
                <input type='text' name=" father name" placeholder='Father Name' />
              </div>
              <div className="form-group">
                <label>Mother Name</label>
                <input type='text' name=" mother name" placeholder='Mother Name' />
              </div>
              <div className="form-group">

                <label>Category</label>
                <select name='Category'>
                  <option value='General'>General</option>
                  <option value='EWS'>EWS</option>
                  <option value='OBC'>OBC</option>
                  <option value='SC'>SC</option>
                  <option value='SC/ST'>SC/ST</option>
                </select>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type='text' placeholder='Addresss' name='address' />
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input type='text' placeholder='zip code' name='zip code' />
              </div>
            </div>

          </div>
          <div className="Information">
            <div className="last-information">
              <div className="last-heading">
                <div className="last-icon">
                  <span><FaAddressBook /></span>
                </div>

                <div className="last-info">
                  <h2>Last School Information</h2>
                  {/* <p>Details of the previous school attended</p> */}
                </div>
              </div>

              <div className="last-school-fields">

                <div className="form-group">
                  <label>Last School Name</label>
                  <input
                    type="text"
                    placeholder="Enter last school name"
                    name="lastSchoolName"
                  />
                </div>

                <div className="form-group">
                  <label>Last School Class</label>
                  <input
                    type="text"
                    placeholder="Enter last school class"
                    name="lastSchoolClass"
                  />
                </div>

                <div className="form-group">
                  <label>Last School Code</label>
                  <input
                    type="text"
                    placeholder="Enter last school code"
                    name="lastSchoolCode"
                  />
                </div>

                <div className="form-group">
                  <label>Last Class Total No</label>
                  <input
                    type="number"
                    placeholder="Enter total gained number"
                    name="lastClassMarks"
                  />
                </div>

              </div>
            </div>

            <div className="other-information">
              <div className="other-heading">
                <div className="other-icon">
                  <span><FaAddressBook /></span>
                </div>

                <div>
                  <h2>Other Information</h2>
                  {/* <p>Select class and other details</p> */}
                </div>
              </div>

              <div className="other-fields">
                <div className="form-group">
                  <label>Class</label>
                  <select name="class" onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass}>
                    <option value="">Select Class</option>
                    {
                      classDetails.map((c) => (
                        <option key={c._id} value={c.Class}>{c.Class}</option>
                      ))
                    }
                  </select>
                  <h2>Fee Information</h2>
                  {
                    selectedFee?.fee.map((f) => (
                      <div key={f._id}>
                        <label>{f.FeeType}</label>
                        <span>{f.Amount}</span>
                        <span>{f.PaymentType}</span>

                      </div>
                    ))
                  }
                  <h3>{totalFee || 0}</h3>
                </div>
              </div>

            </div>
          </div>




        </div>


      </DashboardLayout>


    </>

  )
}

export default Registration
