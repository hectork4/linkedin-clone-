import CreateIcon from '@material-ui/icons/Create'
import ImageIcon from '@material-ui/icons/Image'
import './Feed.css'
import InputOption from './InputOption'
import Subscriptions from '@material-ui/icons/Subscriptions'
import EventNote from '@material-ui/icons/EventNote'
import CalendarViewDay from '@material-ui/icons/CalendarViewDay'
import Post from './Post'
import React, { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection, doc, setDoc, addDoc, serverTimestamp, getDocs, query, where } from "@firebase/firestore";
import { useSelector } from 'react-redux'
import { selectUser } from './features/counter/userSlice'


function Feed() {
    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState()
    const user = useSelector(selectUser);

    const getPosts = async() => {
        //const q = query(collection(db, "posts"), where("name", "==", "Hector"));
        const q = query(collection(db, "posts"));

        const querySnapshot = await getDocs(q);
        setPosts(querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        })))
    }
    
    useEffect(() => {
        
        getPosts();
    })


    const sendPost = async(e) => {
        e.preventDefault();
        
        const docRef = await addDoc(collection(db, "posts"),{
            name: user.name,
            description: user.email,
            message: input,
            photoURL: user.photoURL,
            timestampo: serverTimestamp()
        })

        console.log("new data", docRef)

        setInput("")
    }

  return (
    <div className='feed'>
        <div className='feed__inputContainer'>
            <div className='feed__input'>
                <CreateIcon />
                <form>
                    <input type='text' value={input} onChange={e => setInput(e.target.value)} />
                    <button onClick={sendPost} >Send</button>
                </form>
            </div>
            <div className='feed__inputOptions'>
                <InputOption Icon={ ImageIcon } title='Photo' color='#70B5F9' />
                <InputOption Icon={ Subscriptions } title='Video' color='#E7A33E' />
                <InputOption Icon={ EventNote } title='Event' color='#C0CBCD' />
                <InputOption Icon={ CalendarViewDay } title='Write article' color='#7FC15E' />
            </div>
        </div>

        {posts.map((post) => 
            <Post key={post.id} name={post.data.name} description={post.data.description} message={post.data.message} />
        )}        

    </div>
  )
}

export default Feed