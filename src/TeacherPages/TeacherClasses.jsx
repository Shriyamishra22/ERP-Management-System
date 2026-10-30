import React, { useEffect, useState } from 'react'
import "../TeacherPages/CSS/TeacherClasses.css"
import DashboardLayout from '../Components/DashboardLayout'
import axios from 'axios'
import { Table } from 'react-bootstrap'
const TeacherClasses = () => {

  const [classes, setClasses] = useState([])

  useEffect(() => {
    let number = localStorage.getItem("number")
    let arr = []

    const fetchClass = async () => {
      try {
        const res = await axios.get('Data/classdetails.json')
        res.data.forEach((item) => {
          item?.Subjects.forEach((s) => {
            if (s.mobile == number) {
              arr.push({ class: item.Class, subject: s.Subject })
            }
          })
        })
        setClasses(arr)
      } catch (error) {
        console.log(error);

      }
    }

    fetchClass()

  }, [])

  console.log(classes);




  return (
    <>
      <DashboardLayout>
        <Table  striped bordered cellPadding="0" cellSpacing="0" style={{ textAlign: "center" }}>
          <thead>
            <th>Sr No</th>
            <th>Class</th>
            <th>Subject</th>
          </thead>
          <tbody>
            {
              classes?.map((d, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.subject}</td>
                    <td>{d.class}</td>
                  </tr>
        
              ))
            }
          </tbody>

        </Table>



      </DashboardLayout>

    </>
  )
}

export default TeacherClasses

