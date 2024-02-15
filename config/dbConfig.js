const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config()
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log('db connected')})
.catch((err)=>{console.log("something went wrong fetching",err)})