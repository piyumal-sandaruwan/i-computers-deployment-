export function TestPage(props){
    return(
        
        <div className="w-full h-full bg-red-900 lg:bg-green-800">

        </div>
        )
}



// import { useState } from "react";
// import MediaUpload from "../utils/mediaUpload";


// export function TestPage(props){
//    const [file,setFile] = useState(null);
//      async function handleUpload(){

//         const url = await MediaUpload(file);
//         console.log(url);
//     }

//     return(
//         <>
//         <div className="w-full h-full flex justify-center items-center">
//             <input type="file"  onChange={(e)=>{
//                  setFile(e.target.files[0]);
//             }} />  
//            <button onClick={handleUpload}  className="bg-red-900  text-white  p-2 rounded-2xl">Upload</button>
//         </div>

//         </>
//     );
// }