import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate()
    let token = localStorage.getItem("token")
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    let authenticate = await axios.post(apiUrl + "admin/session-check", { token: token })
                    if (authenticate.data) {
                        let obj={fcmToken:localStorage.getItem("fcmToken")}
                      let token=  await axios.put("admin/fcmTokenUpdate",obj)
                      console.log(token)

                        // localStorage.removeItem("token")
                        navigate("/dashboard")
                    }
                } catch (error) {
                    console.log(error)
                }

            }
            setLoading(false)
        }

        fetchData();
    }, [])
    const submit = async (e) => {

        e.preventDefault()

        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        try {
            let user = await axios.post(apiUrl + "admin/login", { username: username, password: password });
            console.log(user?.data?.admin?._id);
            if (user.data.status == "success") {
                localStorage.setItem("token", user.data.token)
                localStorage.setItem("adminId", user.data?.admin._id)
                let obj={fcmToken:localStorage.getItem("fcmToken")}
                let token=  await axios.put(apiUrl+"admin/fcmTokenUpdate",obj)
                console.log(token)
                toast.success('Successfully Login')
                navigate('/dashboard')
            }
            else {
                toast.error('Invalid username or password')
            }
            console.log(user)
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className='bg-gradient-primary' style={{ height: '100vh' }}>
            <Toaster />
            {loading ?
                <div role="status" className='tw-flex tw-justify-center tw-items-center tw-h-screen'>
                    <svg aria-hidden="true" class="tw-w-16 tw-h-16 tw-mr-2 tw-text-gray-200 tw-animate-spin dark:text-gray-600 tw-fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="tw-text-black tw-font-semibold tw-text-lg">Loading...</span>
                </div>
                : <div className="container" >
                    {/* Outer Row */}
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0" style={{ height: '80vh' }}>
                                    {/* Nested Row within Card Body */}
                                    <div className="row">
                                        <div className="col-lg-6 d-none d-lg-block">
                                            <img src='https://cdn.pixabay.com/photo/2018/09/04/10/16/feedback-3653368_960_720.jpg' alt='login' height='125%' width='100%' />
                                        </div>
                                        <div className="col-lg-6 ">
                                            <div className="p-5 mt-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">Welcome To Zahour Scrap!</h1>
                                                </div>
                                                <form className="user">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-user"
                                                            id="username"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Username"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            className="form-control form-control-user"
                                                            id="password"
                                                            placeholder="Password"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox small">
                                                            <input
                                                                type="checkbox"
                                                                className="custom-control-input"
                                                                id="customCheck"
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="customCheck"
                                                            >
                                                                Remember Me
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={submit}
                                                        className="btn btn-primary btn-user btn-block"
                                                    >
                                                        Login
                                                    </button>

                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

        </div>
    )
}

export default Login