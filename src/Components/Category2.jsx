import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { addAllCategory, deleteCategory, getAVideo, getAllCategory, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import VideoCard1 from './VideoCard1';
import { Col, Row } from 'react-bootstrap'




function Category2() {
  const [categoryName , setCategoryName] = useState("")
  const[categories , setCategories] =useState([])
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  // function to add category
  const addCategory =async()=>{
    console.log(categoryName);
    if(categoryName){
      let body = {
        categoryName,
        allVideos:[]
      }
      const response = await addAllCategory(body)
      console.log(response);
      if(response.status>=200 && response.status<300){
        toast.success("category added successfuly")
        // state value is made null
        setCategoryName("")
        // close the modl
        handleClose()
      }
      else{
        toast.error("something went wrong")
      }
    }
    else{
      toast.warning("Please enter Category name")
    }
    
  }
  // Function to get all category
  const allCategory= async()=>{
    const{data} =await getAllCategory()
    setCategories(data);
  }
  console.log(categories);
 
  // function to delete category
  const deleteACategory =async(id)=>{
    await deleteCategory(id)
    allCategory()
  }
  // function to prevent reload
  const dragOver=(e)=>{
    e.preventDefault()
  }
  
  const videoDrop = async(e, categoryID)=>{
            console.log(`dropped on the category id ${categoryID}`);
            let videoId = e.dataTransfer.getData("videoID")
            console.log(videoId);
            const {data} = await getAVideo(videoId)
            console.log(data);
            const selectedCategory = categories.find(item=>item.id===categoryID)
            selectedCategory.allVideos.push(data)
            console.log(selectedCategory);

            await updateCategory(categoryID,selectedCategory)
            allCategory()
  }
  
  

  useEffect(()=>{
    allCategory()
  },[])
  return (
    
         <>
         <div className='d-grid ms-3' > 
          <button onClick={handleShow} style={{width:'300px'}}  className='btn btn-warning'>Add new Category</button>
         </div>
        {categories?.length>0?
        categories?.map((item)=>(<div className='mt-5 border border-secondary p-3 rounded'>
        <div className='d-flex justify-content-between align-items-center' droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
               <h6>{item.categoryName}</h6>
               <button onClick={()=>deleteACategory(item?.id)} className='btn btn-danger '><i class="fa-solid fa-trash"></i></button>
        </div>
        <Row  >
          <Col>
          {
            item?.allVideos?.length >0?
            item?.allVideos?.map(card=>(<VideoCard1 displayVideo={card} ispresent={true}/>))
            :<p>Nothing to display</p>
          }
          </Col>
        </Row>
        </div>))
           :
           <p>No category added</p>
        }
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
          <Form.Label>Category Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Category Name" onChange={(e)=>setCategoryName(e.target.value)} />
          </Form.Group>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addCategory} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
         </>

    
  )
}

export default Category2