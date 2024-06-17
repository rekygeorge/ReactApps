require("dotenv").config();


const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);

const User = require('./models/user.model');
const Note = require('./models/note.model');

const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./utilities');

app.use(express.json());

app.use(
    cors({
        origin: '*',
        // credentials: true,
    })
);

app.get('/',  (req, res) => {
    res.json({data : 'hello'})
});


// Create Account
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if(!fullName){
        return res
        .status(400)
        .json({error: true, message: 'Full Name is required'});
    }

    if(!email){
        return res
        .status(400)
        .json({error: true, message: 'Email Name is required'});
    }

    if(!password){
        return res
        .status(400)
        .json({error: true, message: 'Password Name is required'});
    }

    const isUser = await User.findOne({email:email});

    if(isUser){
        return res.json({error: true, message: 'User already exists'});
    }

    const user = new User({
        fullName,
        email,
        password
    });

    await user.save();

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '36000m',
    })    

    return res.json({
        error: false,
        user,
        accessToken,
        message: 'Registered successfully',
    })

})

// Login
app.post('/login', async(req, res) => {
    const {email, password} = req.body;

    if(!email){
        return res
       .status(400)
       .json({error: true, message: 'Email is required'});
    }

    if(!password){
        return res
       .status(400)
       .json({error: true, message: 'Password is required'});
    }

    const userInfo = await User.findOne({
        email : email });

    if (!userInfo){
        return res
       .status(400).json({message : "User not found"});
    }

    if (userInfo.email && userInfo.password){
        const user = {user : userInfo};
        const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '36000m',
        });

        return res.json({
            error: false,
            message: 'Logged in successfully',
            email,
            accessToken,
        })
    }else{

        return res
       .status(400)
       .json({
            error: true, 
            message: 'Email or Password is incorrect'});
    } 

});

// Get User information
app.get("/get-user", authenticateToken, async (req, res) => {
    const {user}  = req.user;
    const isUser = await User.findOne({_id: user.user._id});

    console.log('user : ', user);
    if(!isUser) {
        return res
       .sendStatus(401);
    }

    return res.json({
        error: false,
        user: isUser,
        message: 'User information',
    });

});

// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags} = req.body;
    const {user}  = req.user;

    // console.log(user);
    // console.log('user id : ', user.user._id);
    // console.log('req.user --->', req.user)

    if(!title){
        return res
        .status(400)
        .json({error: true, message: 'Title is required'});
    }
    
    if(!content){
        return res
       .status(400)
       .json({error: true, message: 'Content is required'});
    }
   
    try{
        const note = new Note({
            title,
            content,
            tags : tags || [],
            userId: user.user._id,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: 'Note added successfully',
        });
    
    } catch (error){
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        })
    }


});

// Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    
    // console.log('req.params.noteId : ', req.params.noteId)
    const noteId = req.params.noteId;
    const { title, content, tags , isPinned} = req.body;
    const {user}  = req.user;

    console.log('noteId : ', noteId);
    console.log('user id : ', user.user._id);
    console.log('user -->', user )
    if (!title && !content && !tags){
        return res
       .status(400)
       .json({error: true, message: 'No changes provided'});
    }

    
    try{
        
        const note = await Note.findOne({_id:noteId});

        if(!note){
            return res
            .status(400)
            .json({error: true, message: 'Note not found'});
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: 'Note updated successfully',
        });
        
    }catch(error){
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
            errorMessage: error.message
        });
    }

})

// Get All Notes
app.get("/get-all-notes/", authenticateToken, async (req, res) => {
    const {user} = req.user;

    try{
        const notes = await Note.find({userId: user.user._id}).sort({isPinned: -1});
        return res.json({
            error: false,
            notes,
            message: 'All Notes fetched successfully',
        });
        
    }catch(error){
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

// Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const {user} = req.user;

    try{
        const note = await Note.findOne({_id:noteId, userId: user.user._id});
        
        if(!Note){
            return res
           .status(400)
           .json({error: true, message: 'Note not found'});
        }
        
        await Note.deleteOne({_id:noteId, userId: user.user._id});

        return res.json({
            error: false,
            note,
            message: 'Note deleted successfully',
        });
         
    }catch(error){
        return res.status(500)
                .json({
                    error: true,
                    message: "Internal Server Error"
                })
    }

});

// Update isPinned Value
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    console.log('req.params.noteId : ', req.params.noteId)
    const noteId = req.params.noteId;
    const {isPinned} = req.body;
    const {user}  = req.user;

    // console.log('noteId : ', noteId);
    // console.log('user id : ', user.user._id);
    // console.log('user -->', user )

    
    try{
        const note = await Note.findOne({_id:noteId, userId: user.user._id});
        // console.log('note : ', note);
        if(!note){
            return res
        .status(400)
        .json({error: true, message: 'Note not found'});
        }

        // if(isPinned) 
        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: 'Note updated successfully',
        });
        
    }catch(error){
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }

});

// Search Notes
app.get("/search-notes/", authenticateToken, async (req, res) => {
   const {user} = req.user;
   const {query} = req.query;

   if(!query){
    return res
        .status(400)
        .json({error: true, message: 'Search query is required'});
   }

   try{
    console.log('user.user._id: ', user.user._id);
    console.log('user:', user)
    const matchingNotes = await Note.find({
        userId: user.user._id,
        $or:[
            {title : { $regex : new RegExp(query, 'i')}},
            {content : {$regex: new RegExp(query, 'i')}},
        ],
    });

    return res.json({
        error: false,
        notes: matchingNotes,
        message: 'Notes matching the search fetched successfully',
    });

   }catch(error){
    return res.status(500).json({
        error: true,
        message: 'Internal Server Error',
    });
   }

});


app.listen(8000);
module.exports = app;

