import axios from "axios"

export const common =async(httpMethod,url,regBody)=>{
    let regConfig={
        method: httpMethod,
        url: url ,
        data:regBody,
        Headers:{
            "Content-Type":"application/json"
        }
    }

    return await axios(regConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}