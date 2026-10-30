import React, { useState, useEffect } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { GrView } from "react-icons/gr";
import "../AdminPages/CSS/Students.css"

const Students = () => {
    const [students, setStudents] = useState([])

    const fetchStudent = async () => {
        try {
            const res = await axios.get('/Data/students.json');
            console.log(res);
            setStudents(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchStudent()
    }, [])


    return (
        <>

            <DashboardLayout>
                <div className="students-header">
                    <h3>All Students</h3>
                    <input type='search' placeholder='Search by email name phone' className='search' />
                </div>
                <div className="student-container">
                    <Table border="1" striped bordered>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile No</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map((s) => (
                                    <tr>
                                        <td>{s._id}</td>
                                        <td>{s.Name}</td>
                                        <td>{s.Email}</td>
                                        <td>{s.PhoneNumber}</td>
                                        <td>
                                            <div className="btns">
                                                <button className='view-btn'> <GrView /></button>
                                            </div>

                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </Table>
                </div>
            </DashboardLayout>

        </>
    )
}

export default Students
