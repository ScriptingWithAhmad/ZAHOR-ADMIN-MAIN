import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { io } from "socket.io-client"
import toast, { Toaster } from "react-hot-toast";
const Chat = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const socket = io.connect(apiUrl + "ticket");
  let [user, setUser] = useState()
  let [messages, setMessages] = useState([])
  let { handleSubmit, register, formState, watch, reset, setValue } = useForm()
  const { id } = useParams();
  const { ticketID } = useParams();
  const getData = async () => {
    try {
      let resp = await axios.get(apiUrl + "user/getById?id=" + id)
      console.log(resp);
      setValue("company", resp.data.company)
      setValue("trnNumber", resp.data.trnNumber)
      setValue("tradeLicenseNo", resp.data.tradeLicenseNo)
      setValue("name", resp.data.name)
      setValue("phoneNo", resp.data.phoneNo)
      setUser(resp.data);

    } catch (error) {
      console.log(error)
    }
    try {
      let resp = await axios.get(apiUrl + "ticket/getById?id=" + ticketID)
      console.log(resp);
      setValue("discription", resp.data.discription)
      setValue("weightUnit", resp.data.weightUnit)
      // setUser(resp.data);

    } catch (error) {
      console.log(error)
    }
    try {
      let resp = await axios.get(apiUrl + "message/getAll")
      const filteredMessages = resp.data.filter((data) => data.ticketID == ticketID);
      setMessages(filteredMessages);

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

    getData()


  }, []);
  // socket.on("connect", () => {

  // })
  const formSubmit = async (value) => {

    value.sender = "admin"
    value.ticketID = ticketID
    // console.log(value)
    // console.log("hello")
    if (value.offer) {
      value.message = "Offer AED: " + value.offer + "/-"
      await axios.put(apiUrl + "ticket/updateById", { id: ticketID, status: "Price Quoted", offer: value.offer }).then((resp) => {
        console.log(resp)

      })
      socket.emit("newMessage", value)
    } else {
      if (value.message) {
        
        socket.emit("newMessage", value)
      }else{
        toast.error("Please type a message")
      }
    }
    reset()
    getData()


  }
  useEffect(() => {
    socket.on("getMessage", (data) => {
      if (data.ticketID === ticketID) {
        messages.push(data)
        setMessages(prev => [...prev, data])
        // axios.get(apiUrl + "message/getAll").then((resp) => {
        //   const filteredMessages = resp.data.filter((data) => data.ticketID == ticketID);
        //   setMessages(filteredMessages);
        // });
      }
    });
  }, []);


  return (
    <div className="container-fluid">

      {/*  <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Ticket</h1>
        {/* <Link to="/addUsers" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                className="fas fa-plus fa-sm text-white-50"></i> Add</Link> */}
      </div>


      {user ? <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              {/* <div id="plist" className="people-list">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-search" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  <li className="clearfix tw-h-11">
                    <img
                      className='tw-h-11'
                      src={apiUrl + "/images/" + user.userImage}
                      alt="img"
                    />
                    <div className="about">
                      <div className="name">{user.name}</div>
                      <div className="status">
                        {" "}



                      </div>
                    </div>
                  </li>
                </ul>
              </div> */}
              <div className="chat !tw-m-0">
                <div className="chat-header clearfix">
                  <div className="row">
                    <div className="col-lg-6">
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#view_info"
                      >
                        <img
                          className='tw-h-11'
                          src={apiUrl + "images/" + user.userImage}
                          alt="img"
                        />
                      </a>
                      <div className="chat-about">
                        <h6 className="m-b-0">{user.name}</h6>
                      </div>
                    </div>
                    <div className="col-lg-6 hidden-sm text-right">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-outline-secondary"
                      >
                        <i className="fa fa-camera" />
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-outline-primary"
                      >
                        <i className="fa fa-image" />
                      </a>
                      <a href="javascript:void(0);" className="btn btn-outline-info">
                        <i className="fa fa-cogs" />
                      </a>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-outline-warning"
                      >
                        <i className="fa fa-question" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="chat-history">
                  <ul className="m-b-0">
                    {messages?.map((data) => {
                      return <>
                        {data.sender == "admin" ? <li className="clearfix tw-text-end">
                          <div className="message-data">
                            <span className="message-data-time">{data.createdAt}</span>
                          </div>
                          <div className="message tw-bg-blue-400">{data.message}

                            {data.offer ? <div>
                              Compnay Name: {data.company} <br />
                              TRN No: {data.trnNumber} <br />
                              License No: {data.tradeLicenseNo} <br />
                              Contact Name: {data.name} <br />
                              Contact Number: {data.phoneNo} <br />
                              Discription: {data.discription} <br />
                              Unit: {data.weightUnit} <br />
                              Condition: {data.condition} <br />
                            </div> : null}



                            {data.agreement ? <a href={data.agreement}>
                              <div className='tw-bg-slate-400 tw-w-full tw-h-20 tw-flex tw-items-center tw-p-4 tw-justify-between'>
                                <h2 className='tw-text-start tw-text-xl tw-font-bold'>Agreement</h2>
                                <div>
                                  <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="File / File_Download"> <path id="Vector" d="M12 12V18M12 18L15 16M12 18L9 16M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.5192 21 7.07899 21 8.19691 21H15.8031C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                                </div>
                              </div>
                            </a> : null}

                            {data.document ? <a href={data.document}>
                              <div className='tw-bg-slate-400 tw-w-full tw-h-20 tw-flex tw-items-center tw-p-4 tw-justify-between'>
                                <h2 className='tw-text-start tw-text-xl tw-font-bold'>Document</h2>
                                <div>
                                  <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="File / File_Download"> <path id="Vector" d="M12 12V18M12 18L15 16M12 18L9 16M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.5192 21 7.07899 21 8.19691 21H15.8031C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                                </div>
                              </div>
                            </a> : null}
                          </div>


                        </li> :
                          <li className="clearfix">
                            <div className="message-data">
                              <span className="message-data-time">{data.createdAt}</span>
                            </div>
                            <div className="message my-message">{data.message}

                              {data.document ? <a href={data.document}>
                                <div className='tw-bg-slate-400 tw-w-full tw-h-20 tw-flex tw-items-center tw-p-4 tw-justify-between'>
                                  <h2 className='tw-text-start tw-text-xl tw-font-bold'>Document</h2>
                                  <div>
                                    <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="File / File_Download"> <path id="Vector" d="M12 12V18M12 18L15 16M12 18L9 16M13 3.00087C12.9045 3 12.7973 3 12.6747 3H8.2002C7.08009 3 6.51962 3 6.0918 3.21799C5.71547 3.40973 5.40973 3.71547 5.21799 4.0918C5 4.51962 5 5.08009 5 6.2002V17.8002C5 18.9203 5 19.4801 5.21799 19.9079C5.40973 20.2842 5.71547 20.5905 6.0918 20.7822C6.5192 21 7.07899 21 8.19691 21H15.8031C16.921 21 17.48 21 17.9074 20.7822C18.2837 20.5905 18.5905 20.2842 18.7822 19.9079C19 19.4805 19 18.9215 19 17.8036V9.32568C19 9.20296 19 9.09561 18.9991 9M13 3.00087C13.2856 3.00347 13.4663 3.01385 13.6388 3.05526C13.8429 3.10425 14.0379 3.18526 14.2168 3.29492C14.4186 3.41857 14.5918 3.59182 14.9375 3.9375L18.063 7.06298C18.4089 7.40889 18.5809 7.58136 18.7046 7.78319C18.8142 7.96214 18.8953 8.15726 18.9443 8.36133C18.9857 8.53376 18.9963 8.71451 18.9991 9M13 3.00087V5.8C13 6.9201 13 7.47977 13.218 7.90759C13.4097 8.28392 13.7155 8.59048 14.0918 8.78223C14.5192 9 15.079 9 16.1969 9H18.9991M18.9991 9H19.0002" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                                  </div>
                                </div>
                              </a> : null}

                              {data.image ? <a href={data.image} target="_blank">
                                <div>

                                  <img src={data.image} alt="" />
                                </div>
                              </a> : null}
                            </div>
                          </li>
                        }
                      </>
                    })}
                  </ul>
                </div>
                <div className="chat-message clearfix">
                  <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="input-group mb-0">
                      <div className="input-group-prepend">
                        <button className="input-group-text">
                          <i className="fa fa-send" />
                        </button>
                      </div>
                      <input
                        {...register("message")}
                        type="text"
                        className="form-control"
                        placeholder="Enter text here..."
                        style={{ width: "150px" }}
                      />

                      <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Send Offer
                      </button>
                    </div>





                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h3 class="modal-title tw-font-semibold tw-text-xl" id="exampleModalLabel">Send Offer</h3>
                              <button type="button" class="!tw-bg-transparent btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <div className="tw-my-4">
                                <h3 className='tw-font-semibold tw-m-2'>Price</h3>
                                <input
                                  {...register("offer")}
                                  type="text"
                                  className="form-control rounded-pill"
                                  id="exampleFormControlInput1"
                                  placeholder="AED: 200"
                                  style={{ height: "40px" }}
                                />


                                <h3 className='tw-font-semibold tw-m-2'>Company Name</h3>
                                <input
                                  {...register("company")}
                                  type="text"
                                  className="form-control rounded-pill"
                                  id="exampleFormControlInput1"
                                  placeholder="Company Name"
                                  style={{ height: "40px" }}
                                />

                                <h3 className='tw-font-semibold tw-m-2'>TRN No</h3>
                                <input
                                  {...register("trnNumber")}
                                  type="text"
                                  className="form-control rounded-pill"
                                  id="exampleFormControlInput1"
                                  placeholder="TRN No"
                                  style={{ height: "40px" }}
                                />

                                <h3 className='tw-font-semibold tw-m-2'>License No</h3>
                                <input
                                  {...register("tradeLicenseNo")}
                                  type="text"
                                  className="form-control rounded-pill"
                                  id="exampleFormControlInput1"
                                  placeholder="License No"
                                  style={{ height: "40px" }}
                                />
                                <h3 className='tw-font-semibold tw-m-2'>Contact Name</h3>
                                <input
                                  {...register("name")}
                                  type="text"
                                  className="form-control rounded-pill"
                                  id="exampleFormControlInput1"
                                  placeholder="Contact Name"
                                  style={{ height: "40px" }}
                                />

                                <h3 className='tw-font-semibold tw-m-2'>Contact Number</h3>
                                <input
                                  {...register("phoneNo")}
                                  type="text"
                                  className="form-control rounded-pill"
                                  id="exampleFormControlInput1"
                                  placeholder="Contact Name"
                                  style={{ height: "40px" }}
                                />

                                <h3 className='tw-font-semibold tw-m-2'>Discription</h3>
                                <input
                                  {...register("discription")}
                                  type="text"
                                  className="form-control rounded-pill"
                                  id="exampleFormControlInput1"
                                  placeholder="Contact Name"
                                  style={{ height: "40px" }}
                                />

                                <h3 className='tw-font-semibold tw-m-2'>Unit</h3>
                                <input
                                  {...register("weightUnit")}
                                  type="text"
                                  className="form-control rounded-pill"
                                  id="exampleFormControlInput1"
                                  placeholder="Contact Name"
                                  style={{ height: "40px" }}
                                />

                                <h3 className='tw-font-semibold tw-m-2'>Term & Condition</h3>
                                <textarea
                                  {...register("condition")}
                                  type="text"

                                  className="form-control rounded-pill"
                                  id="exampleFormControlInput1"
                                  placeholder="Term & Condition"
                                  style={{ height: "40px" }}
                                />

                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="submit" class="btn btn-primary !tw-bg-[#4e73df]" data-bs-dismiss="modal">Send Offer</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>







                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> : null}


    </div>
  )
}
export default Chat