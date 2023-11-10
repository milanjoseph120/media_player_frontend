// upload video 

import { common } from "./common"
import { serverURL } from "./serverURL"

export const uploadVideo = async(regBody)=>{
    return await common ('POST' , `${serverURL}/video` ,regBody )
}


//get all upload videos
export const getAllVideos = async()=>{
    return await common ('GET' , `${serverURL}/video`,"")
} 

// to delete video
 export const deleteVideo = async(id)=>{
    return await common ('DELETE' , `${serverURL}/video/${id}`,{})
 }

//  api to add history
export const addToHistory =async(VideoDetails)=>{
    return await common ('POST' , `${serverURL}/history`,VideoDetails)

}

// api call to delete history
export const deleteVideoHistory = async(id)=>{
    return await common ('DELETE' , `${serverURL}/history/${id}`,{})
}

// api to get history from json server
export const getAllHistory = async()=>{
    return await common ('GET' , `${serverURL}/history`,"")
}



// api to add category
export const addAllCategory = async(body)=>{
    return await common ('POST' , `${serverURL}/category`, body)
}

// api to get all category fom json server
export const getAllCategory = async()=>{
    return await common ('GET' , `${serverURL}/category`, "")
}

// api to delete category from json server
export const deleteCategory = async(id)=>{
    return await common ('DELETE' , `${serverURL}/category/${id}`, {})
}

// api to get a particular video from
export const getAVideo = async(id)=>{
    return await common ('GET' , `${serverURL}/video/${id}`, "")
}

// api to add the category with new videos (update)
export const updateCategory =async(id,body)=>{
    return await common ('PUT', `${serverURL}/category/${id}`, body)
}

// api to delete videos from category
export const deleteVC =async(id)=>{
    return await common ('DELETE', `${serverURL}/category/${id}`,{})
}
