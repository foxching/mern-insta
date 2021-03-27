import React, { useState,useEffect } from "react";


const ProfilePhoto = ({pic}) => {
    const [image,setImage] = useState("")

  
    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
     };

     useEffect(()=>{
        if(image){
         const data = new FormData()
         data.append("file",image)
         data.append("upload_preset","instagram")
         data.append("cloud_name","dtvqrqyqr")
         fetch("https://api.cloudinary.com/v1_1/dtvqrqyqr/image/upload",{
             method:"post",
             body:data
         })
         .then(res=>res.json())
         .then(data=>{
            //redux action here
            console.log(data)
         })
         .catch(err=>{
             console.log(err)
         })
        }
     },[image])


    
    return (
        <div style={{textAlign:"center", position:"relative"}}>
            <img
              className="responsive-img circle"
              style={{ width: "160px", height: "160px",  }}
              alt=""
              src={pic}
            />
            <React.Fragment>
              <input
                type="file"
                id="imageInput"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button
                style={{position:"absolute", top:"80%", left:"70%"}}
                className="waves-effect waves-teal btn-flat button"
                onClick={handleEditPicture}
              >
                <i className="tiny material-icons">camera_alt</i>
              </button>
            </React.Fragment>
        </div>
    )
}

export default ProfilePhoto