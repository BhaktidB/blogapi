const express = require('express')
require('./config/dbConfig')
const port = 3000
const app=express();
const Post=require('./model/Post')

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('home route')
})

// get posts
app.get('/post',async (req,res)=>{
    try {
        const getAllPosts=await Post.find({})
        res.json(getAllPosts)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
})

// get specific post
app.get('/post/:postid',async (req,res)=>{
    let postid=req.params.postid
    try {
    if(!postid){
        res.status(404).json({"message":"no post found"})
    }
    
        const getAllPosts=await Post.findById(postid)
        res.json(getAllPosts)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

// create a post
app.post('/post',async (req,res)=>{
    try {
        const newPost=new Post({
            title:req.body.title,
            content:req.body.content,
            author:req.body.author
        })
    
        const savedPost=await newPost.save()
        res.json(savedPost)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
})

// update a post
app.patch('/post/:postid',async (req,res)=>{
    let postid=req.params.postid
    try {
    if(!postid){
        res.status(404).json({"message":"no post found"})
    }
    
        const updatePost=await Post.findByIdAndUpdate(postid,{
            title:req.body.title,
            content:req.body.content,
            author:req.body.author
        })
        res.json(updatePost)
    } catch (error) {
        res.status(500).json({error:error.message})
    }})

// delete a post
app.delete('/post/:postid',async (req,res)=>{
    try {
        let postid=req.params.postid;
        if(!postid){
            res.json({"message":"post does not exist"})
        }
        const deleteAPosts=await Post.deleteOne({_id:postid})
        res.json({message:`Deleted ${deleteAPosts.deletedCount} posts`})
    } catch (error) {
        res.json({message:error.message})
    }
})

// delete all posts
app.delete('/post',async (req,res)=>{
    try {
        const deleteAllPosts=await Post.deleteMany({})
        res.json({message:`Deleted ${deleteAllPosts.deletedCount} posts`})
    } catch (error) {
        res.json({message:error.message})
    }
})


app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log(`Server running at ${port}`)
})