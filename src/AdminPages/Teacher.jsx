import React, { useEffect } from 'react'
import { useState } from 'react';
import DashboardLayout from '../Components/DashboardLayout'
import "../AdminPages/CSS/Teacher.css"
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
const Teacher = () => {
    const [modalShow, setModalShow] = useState(false);
    const [teachers, setTeacher] = useState([])

    const fetchTeacher = async () => {
        try {
            const res = await axios.get('/Data/Teacher.json');
            console.log(res);
            setTeacher(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchTeacher()
    }, [])


    return (
        <>
            <DashboardLayout>
                <div className='all-classes-header'>
                    <h1>All Teacher</h1>
                    <button className='all-create-class' onClick={() => setModalShow(true)}>Create Teacher</button>
                </div>
                <Table cellPadding="0" cellSpacing="0" className='table-section' striped bordered>
                    <thead>
                        <tr>
                            <th>Sr.no</th>
                            <th>Teacher Name</th>
                            <th>Mobile No</th>
                            <th>Action</th>
                        </tr>
                    </thead>


                    <tbody>
                        {
                            teachers.map((teacher) => (
                                <tr>
                                    <td>{teacher._id}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.mobile}</td>
                                    <td>
                                        <div className="subject-edit-btns">
                                            <button className='subject-btn'><FaEdit /></button>&emsp;
                                            <button className='subject-delte-btn'><RiDeleteBin2Fill /></button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>


                </Table>

                <Modal show={modalShow} centered>
                    <Modal.Header className='d-flex justify-content-between align-items-center' >
                        <h1 className='fs-4'>Create Class</h1>
                        <button className='btn btn-secondary' onClick={() => setModalShow(false)}>X</button>
                    </Modal.Header>

                    <Modal.Body className='teacher-body'>
                        <input type='text' placeholder='Enter Teacher Name' /><br /> <br />
                        <input type='text' placeholder='Enter Number' />
                            <button>Add</button>
    


                    </Modal.Body>
                </Modal>
            </DashboardLayout>


        </>
    )
}

export default Teacher



