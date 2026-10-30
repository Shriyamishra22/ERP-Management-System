import React, { useEffect, useState } from 'react'
import "../Pages/CSS/Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Login = () => {
    const [otp, setOtp] = useState("")
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [step, setStep] = useState(1)

    const navigate = useNavigate()
    const fetchData = async () => {
        const res = await axios.get("/Data/users.json")
        console.log(res.data);
        setUser(res.data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const Sendotp = async () => {
        let existingUser = user.find((u) => u?.email == email)
        console.log(existingUser);

        if (email == existingUser?.email) {
            setStep(2)

        } else {
            toast.error('user not found');
        }


    }

    const verifyOtp = () => {
        let existingUser = user.find((u) => u?.email == email)
        console.log(existingUser.otp);

        if (existingUser.otp == otp) {
            localStorage.setItem("token", existingUser.token)
            localStorage.setItem("role", existingUser.role)
            localStorage.setItem("number", existingUser?.mobile)

            toast.success('Login Successfully');
            navigate('/dashboard')
        } else {
            toast.error('Invaild Password');
        }
    }
    return (
        <>
            <div className="login-outer">

                <div className="login-left">

                </div>
                <div className="login-right">
                    <h1>Log In</h1>
                    <input type='text' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                    <br /><br />
                    {
                        step == 2 ?

                            <div>
                                <input type='text' placeholder='enter otp' onChange={(e) => setOtp(e.target.value)} className='sendotp' />
                                <br /><br />
                            </div> : ""
                    }

                    {
                        step == 2 ? <button onClick={verifyOtp}>Verify Otp</button> : <button onClick={Sendotp}>Send Otp</button>
                    }
                </div>
            </div>






        </>
    )
}

export default Login
