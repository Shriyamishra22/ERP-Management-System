import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import "../AdminPages/CSS/Subject.css"
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { RiDeleteBin2Fill } from "react-icons/ri";


const Subject = () => {
  const [ModalShow, setModalShow] = useState(false)
  const [subjects, setSubject] = useState([])

  const fetchSubject = async () => {
    try {
      const res = await axios.get('/Data/Subject.json');
      console.log(res);
      setSubject(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchSubject()
  }, [])


  return (
    <>

      <DashboardLayout>
        <div className='all-subjects-header'>
          <h1>All Subjects</h1>
          <button className='subject-create' onClick={() => setModalShow(true)}>Create Subject</button>
        </div>
        <Table className='table-section' cellPadding='0' cellSpacing='0'  striped bordered>
          <thead>
            <tr >
              <th>Sr No.</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              subjects.map((subject) => (
                <tr>
                  <td>{subject._id}</td>
                  <td>{subject.name}</td>
                  <td >
                    <div className="subject-btns">
                      <button className='subject-edit-btn'><FaEdit /></button>
                      <button className='subject-delete-btn'><RiDeleteBin2Fill /></button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </Table>
















        <Modal show={ModalShow} centered>
          <Modal.Header className='d-flex justify-content-between align-item-center'>
            <h1 className='fs-4'>Create Class</h1>
            <button className='btn btn-secondary' onClick={() => setModalShow(false)}>X</button>
          </Modal.Header>

          <Modal.Body className='subject-body'>
            <input type='text' placeholder='Enter Subject Name' />
            <button>Add</button>
          </Modal.Body>


        </Modal>


      </DashboardLayout>
    </>
  )
}

export default Subject
