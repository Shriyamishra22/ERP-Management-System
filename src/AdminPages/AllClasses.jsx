import React, { use, useEffect } from 'react'
import { useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import "../AdminPages/CSS/AllClasses.css"
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { GrView } from "react-icons/gr";

const AllClasses = () => {
    const [modalClass, setModalClass] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [subjects, setSubject] = useState([]);
    const [teachers, setTeacher] = useState([])
    const [classes, setClasses] = useState([])
    const [modalClassData, setModalClassData] = useState([])
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null);

    const [rows, setRows] = useState([
        { teacher: "", subject: "" },
    ])

    const [rows1, setRows1] = useState([
        { fee: "" },
    ])
    const fetchClasses = async () => {
        try {
            const res = await axios.get("/Data/classdetails.json")
            console.log(res);
            setClasses(res.data);
        } catch (error) {
            console.log(error);

        }
    }
    const fetchData = async () => {
        try {
            const res = await axios.get('./Data/Subject.json');
            console.log(res);
            setSubject(res.data)

            const res1 = await axios.get('./Data/Teacher.json');
            console.log(res1);
            setTeacher(res1.data)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        setTimeout(() => {
            fetchData()
            fetchClasses()
        }, 2000)
    }, [])
    const addMore = () => {
        setRows([...rows, { teacher: "", subject: "" }])
    }

    const addMore1 = () => {
        setRows1([...rows, { fee: "" }])
    }


    const handleShow = (data) => {
        setModalClass(true)
        console.log(data);
        setModalClassData(data)
    }
    return (
        <>
            <DashboardLayout>
                <div className='all-classes-header'>
                    <h1>All Classes</h1>
                    <button className='all-create-class' onClick={() => setModalShow(true)}>Create Class</button>
                </div>

                <div className="all-classes-table">
                    <Table cellPadding="0" cellSpacing="0" striped bordered className='table-section-class'>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Class</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                classes.map((c) => (
                                    <tr>
                                        <td>{c._id}</td>
                                        <td>{c.Class}</td>
                                        <td >
                                            <div className="subjects">
                                                <button className='subject-edit'><FaEdit /></button>
                                                <button className='subject-delete'><RiDeleteBin2Fill /></button>
                                                <button className='view' onClick={() => handleShow(c)}> <GrView /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </Table>
                </div>

                {/* view Modal usecase */}
                <Modal show={modalClass} centered>
                    <Modal.Header className='d-flex justify-content-between align-items-center'>

                        <h3>View Class</h3>

                        <button className='btn btn-secondary' onClick={() => setModalClass(false)}>X</button>
                    </Modal.Header>
                    {/* <hr/> */}
                    <h5 className='class-section'>
                        Class: {modalClassData?.Class ?? "Class Name"}
                    </h5>


                    <Modal.Body>
                        <Table border='1' striped bordered style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Teacher</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    modalClassData?.Subjects?.map((d) => (
                                        <tr>
                                            <td>{d.Subject}</td>
                                            <td>{d.Teacher}</td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </Table>
                        <h1>Fee</h1>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Fee Type</th>
                                    <th>Fee Amount</th>
                                    <th>Payment Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    modalClassData?.fee?.map((f) => (
                                        <tr>
                                            <td>{f.FeeType}</td>
                                            <td>{f.Amount}</td>
                                            <td>{f.PaymentType}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>

                    </Modal.Body>

                </Modal>


                {/* create class modal */}
                <Modal show={modalShow} centered>
                    <Modal.Header className='d-flex justify-content-between align-items-center' >
                        <h1 className='fs-4'>Create Class</h1>
                        <button className='btn btn-secondary' onClick={() => setModalShow(false)}>X</button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="adminclass">
                            <input type='text' placeholder='Enter Class' />

                            <div>
                                {
                                    rows.map((index, data) => (
                                        <div key={index} className="admin-types-class">
                                            <select className='subject-type'>
                                                <option>Select Subject</option>
                                                {
                                                    subjects.map((subject) => (
                                                        <option>{subject.name}</option>
                                                    ))
                                                }

                                            </select>
                                            <select className='teacher-type'>
                                                <option>Select Teacher</option>
                                                {
                                                    teachers.map((teacher) => (
                                                        <option>{teacher.name}</option>
                                                    ))
                                                }

                                            </select>

                                        </div>
                                    ))
                                }
                            </div>
                            <button className='btn-add' onClick={addMore}>Add More</button> <br />
                        </div>
                        <div className="admission-fee-type">
                            <h1 className='fee-type'>Fee</h1>
                            {
                                rows1.map((index, data) => (
                                    <div key={index} className='fee-section'>
                                        <select className='select-fee-type'>
                                            <option value="--">Select fee type</option>
                                            <option vlaue="">Tution Fee</option>
                                            <option vlaue="">Exam Fee</option>
                                            <option vlaue="">Admission Fee</option>
                                            <option vlaue="">Other</option>
                                        </select>
                                        <input type='text' name='fee' placeholder='Enter Fee in rupees' className='fess-data-type' />
                                        <div className="input-type">
                                            <input type='radio' value='monthly' />
                                            <span>Monthly</span>
                                            <input type='radio' value='Yearly' />
                                            <span>Yearly</span>
                                            <input type='radio' value='oneTime' />
                                            <span>One-Time</span>
                                        </div>
                                    </div>
                                ))
                            }
                            <button className='add-more' onClick={addMore1}>Add More</button>

                        </div>
                        <button className='save-btn'>Save</button>

                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </DashboardLayout>
        </>
    )
}
export default AllClasses
