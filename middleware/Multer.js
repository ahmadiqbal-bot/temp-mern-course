import multer from "multer";

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Public/Upload')
    },
    filename:(req,file,cb)=>{
       const fileName= file.originalname;
        cb(null,fileName)
    },


})
const Upload= multer({storage});
export default Upload;
