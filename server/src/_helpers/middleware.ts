import multer from 'multer'
import path from 'path'

const dir = path.join(__dirname + '/../../public');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ '-' + file.originalname)
    }
});
 
const upload = multer({ storage: storage });

export default upload