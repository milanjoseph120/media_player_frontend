import React, { useEffect, useState } from 'react'
import VideoCard1 from './VideoCard1'
import { Col, Row } from 'react-bootstrap'
import { getAllVideos } from '../services/allAPI'




function View1({uploadVideoStatus}) {
  const [allVideos , setAllVideos] = useState([])
  const [deleteVideoStatus , setDeleteVideoStatus]=useState(false)

  const getAllUploadedVideos = async()=>{
    const response =await getAllVideos()
    /* console.log(response); */
    const {data}=response
    // console.log(data);
    setAllVideos(data)
  }
console.log(allVideos);
  useEffect(()=>{
    getAllUploadedVideos()
    setDeleteVideoStatus(false)
  },[uploadVideoStatus ,deleteVideoStatus ])
  return (
    
<>
<Row>
  { allVideos.length>0?
   allVideos.map((video)=>( <Col sm={12} md={6} lg={4} xl={3}>
    <VideoCard1 displayVideo ={video} setDeleteVideoStatus={setDeleteVideoStatus}/>
  </Col>))
  :
  <p>Nothing to display</p>
}
</Row>
</>
    
  )
}

export default View1