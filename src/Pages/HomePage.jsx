import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom'
import Add from '../Components/Add'
import View1 from '../Components/View1';
import Category2 from '../Components/Category2';

function HomePage() {
  const [uploadVideoStatus , setUploadVideoStatus] = useState({})
  return (
    <>
        <div className='container d-flex  alighn-items-center  ' style={{justifyContent:'space-between'}}>
        <Add setUploadVideoStatus={setUploadVideoStatus}/>
        <Link className='' to={'/watch-History'} style={{textDecoration:'none',color:'white '}}> <h5>Watch History</h5></Link>
        </div>
        <div className='container-fluid w-100 mt-5 mb-5 d-flex justify-content-between'>
          <div className='all-videos col-lg-9'>
              <h4 className='mb-5'>All Videos</h4>
              <View1 uploadVideoStatus ={uploadVideoStatus}/>
          </div>
          <div className='category col-lg-3'>
           <Category2/>
          </div>
        </div>
        </>
  )
}

export default HomePage
