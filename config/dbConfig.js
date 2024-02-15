const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/blog1").then(()=>{console.log('db connected')})
.catch((err)=>{console.log("something went wrong fetching",err)})