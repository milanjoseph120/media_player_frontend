import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteVideoHistory, getAllHistory } from '../services/allAPI'

function WatchHistory() {
  const [history , setHistory] = useState([])
  const allHistory = async()=>{
    const {data} =  await getAllHistory()
    // console.log(data);
    setHistory(data)
  }
  console.log(history);
  // function to remove history
  const removeHistory =async(id)=>{
    await deleteVideoHistory(id)
    // to get the remaining history
    allHistory()
  }
  useEffect(()=>{
    allHistory()
  },[])
  return (
    <>
     <div className='container mt-5 d-flex justify-content-between'>
        <h3>Watch History</h3>
        <Link to={'/home'} className='d-flex align-items-center' style={{textDecoration:"none" , color:"white" , fontSize:"20px"}}><i class="fa-solid fa-arrow-left me-2"></i>Back To Home</Link>
     </div>
     <table className='table mt-5 mb-5 container'>
         <thead>
          <th>#</th>
          <th>Caption</th>
          <th>URL</th>
          <th>Time Stamp</th>
         </thead>
         <tbody>
          {history.length>0?
          history?.map((item , index)=>(<tr>
            <td>{index+1}</td>
            <td>{item.caption}</td>
            <td><a href={item.emblink}>{item.emblink}</a></td>
            <td>{item.timestamp}</td>
            <td><button onClick={()=>removeHistory(item?.id)}  className='btn btn-danger '><i class="fa-solid fa-trash"></i></button></td>
          </tr>))
          :
          <p className='mt-5 fw-bolder text-danger fs-3'>No Watch History</p>
          }
         </tbody>
     </table>
    </>
  )
}

export default WatchHistory