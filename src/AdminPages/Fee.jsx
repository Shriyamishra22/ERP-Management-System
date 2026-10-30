import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import "../AdminPages/CSS/Fee.css"
import axios from 'axios'
import { Table } from 'react-bootstrap'
import { FaUserCheck } from "react-icons/fa";



const Fee = () => {
  const [search, setSearch] = useState([])
  const [Students, setStudents] = useState()
  const [searchedStudent, setSearchedStudent] = useState([])
  const [allfee, setAllFee] = useState([])
  const [searchedfee, setSearchedFee] = useState(null)
  const [duePay, setduePay] = useState("")
  const [dueFee, setDueFee] = useState("")

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/Data/students.json');
      setStudents(res.data)
      console.log(res.data)

    } catch (error) {
      console.log(error);

    }
  }

  const fetchFee = async () => {
    try {
      const res = await axios.get("/Data/fee.json")
      setAllFee(res.data)
      console.log(res.data)

    } catch (error) {
      console.log(error)
    }
  }








  const handleSearch = () => {
    let st = Students?.find((t) => {
      return t.PhoneNumber === search || t.Email === search || t.RegNO === search

    })
    console.log(st);

    setSearchedStudent(st)

    const fee = allfee.filter((f) => {
      return f.RegNO === st?.RegNO
    })
    setSearchedFee(fee);
    console.log(fee);



  }

  // console.log(fee);




  useEffect(() => {
    fetchStudents()
    fetchFee()
  }, [])

  const handleSetPay = (f) => {
    setduePay(f)
    setDueFee(String(Number(f.Amount)-Number(f.paidAmount)))
  }
  const collectfee = () => {

    const option = {
      key: "rzp_test_6kz5nGEzi8uXRw",
      amount: Number(dueFee) * 100,
      currency: 'INR',
      name: "ERP-PORTAL",
      description: "Fee Payment",
      image: "/images/logo.png",
      handler: function (response) {
        alert("Payment Sucssful");
      },
   modal:{
    ondismiss:function(r){
      console.log(r);
      alert("Payment Cancelled");
    }
    }
  //      theme:{
  //        color:"#33cc94"
  //      }
    }

    const rzpay = new window.Razorpay(option);
    rzpay.open();
  }


  return (
    <>
      <DashboardLayout>
        <div className="fee-collect-container">
          <div className="fee-collect-header">
            <span><FaUserCheck /></span>
            <input type='text' placeholder='Search by Phone,Email,Reg No' onChange={(e) => setSearch(e.target.value)} value={search} />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="fee-collect-details">
            <div className="left-side-fee">

              <div className="profile">
                <span><FaUserCheck /></span>
              </div>

              <div className="fee-summary">
                <label>{searchedStudent.RegNO}</label>
                <label>{searchedStudent.Name}</label>
                <label className='fname'>{searchedStudent.FatherName}</label>
                <label>{searchedStudent.currentClass}</label>
              </div>
            </div>




          </div>

          <div className="fee-table">
            <Table>
              <thead>
                <tr>
                  <th>Reg No</th>
                  <th>Fee Name</th>
                  <th>Fee Type</th>
                  <th>Paid Amount</th>
                  <th>Due Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  searchedfee?.map((f) => (
                    <tr key={f.RegNO}>
                      <td>{f.RegNO}</td>
                      <td>{f.FeeType}</td>
                      <td>{f.PaymentType}({f?.FeeMonth})</td>
                      <td>{f.paidAmount}</td>
                      <td>{f.Amount - f.paidAmount}</td>
                      <td>{(f.Amount - f.paidAmount === 0) ? "No Dues" : <button onClick={() => handleSetPay(f)} className='pay'>Pay</button>}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>



          </div>
          <div className="fee-type-details">
            <div className="collect-field-details">
              <div className="fee-field">
                <label className='form-label'>Total Fee</label>
                <input type='text' placeholder='Enter due fee' disabled value={duePay?.Amount} className='form-text' />
              </div>
              <div className="fee-field">
                <label className='form-label'>Fee Type</label>
                <input type='text' placeholder='Enter fee' disabled value={duePay?.PaymentType} className='form-text' />
              </div>
              <div className="fee-field">
                <label className='form-label'>Paid Amount</label>
                <input type='text' placeholder='enter paid Amount' disabled value={duePay?.paidAmount} className='form-text' />
              </div>

              <div className="fee-field">
                <label className='form-label'>Due Amount</label>
                <input type='text' placeholder='Enter Due Amount' value={duePay?.Amount - duePay?.paidAmount} onChange={(e) => setDueFee(e.target.value)} className='form-text' />
              </div>
              <div className="Remark">
                <label >Remark</label>
                <textarea className='textarea' placeholder='Enter remark here..'>
                </textarea>
              </div> <br/> <br/>


              <div className="remaining-collect">
                <div className="remaining-info">
                  <p className='remain'>Remaining Due</p>
                  <h3>00</h3>
                </div>
                <button onClick={collectfee} type='submit' className='collect'>Collect Fee</button>
              </div>
            </div>

          </div>

        </div>
      </DashboardLayout>


    </>
  )
}

export default Fee
