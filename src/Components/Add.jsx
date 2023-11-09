import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { uploadVideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadVideoStatus}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state , setState] = useState({
      id:"",
      caption:"",
      url:"",
      emblink:""

    })
    console.log(state );
    const videoLink=(e)=>{
      const{value}=e.target
      console.log(value.slice(-11));
      const link=`https://www.youtube.com/embed/${value.slice(-11)}`
      setState({...state,emblink:link})
    }
    const handleUpload= async()=>{
        const{id,caption,url,emblink}=state
        if(!id || !caption || !url || !emblink){
          toast.warning("please fill the form")
        }
        else{
          const response = await uploadVideo(state)
          console.log(response);
          if(response.status>=200 && response.status<300){
            setUploadVideoStatus(response.data)
            toast.success("upload succesfuly")
            handleClose()
            
          }
          else{
            console.log(response);
            toast.error("something went wrong")
          }
        }
    }
    

    
  return (
    <>
    <div className='d-flex align-items-center '>
       <button onClick={handleShow}  className='btn btn-warning mt-4'><i class="fa-solid fa-upload "></i> {' '}Upload New Videos</button>
    </div>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film text-warning me-2"></i>Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='border border-secondary p-3 rounded' action="">
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" onChange={(e)=>setState({...state,id:e.target.value})} placeholder="Enter Video ID" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Enter Video Caption" onChange={(e)=>setState({...state,caption:e.target.value})} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Enter Video Image URL" onChange={(e)=>setState({...state,url:e.target.value})} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Enter YouTube video Link" onChange={videoLink} />
          </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
    
  )
}

export default Add

{/* <iframe width="853" height="480" src="https://www.youtube.com/embed/j7jPnwVGdZ8" title="The Fall Guy | Official Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}