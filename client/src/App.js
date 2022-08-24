import { useState, useEffect } from 'react'
import Card from './components/card/Card';
import Navbar from './components/navbar/Navbar';
import { posts } from './data'
import { io } from "socket.io-client";

function App() {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState('')
  const [socket, setSocket] = useState(null)
  // console.log(user)
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    console.log(socket)

  }, [])

  useEffect(() => {
    socket?.emit("newUser", user)
  }, [socket, user])

  return (
    <div className="App ">
      <div className="flex border flex-col justify center items-center mt-60 w-[400px] mx-auto">
        {user ? (<>
          <Navbar socket = {socket} />
          {posts?.map((post) => (
            <Card key={post.id} post={post}  socket={socket} user={user}/>
          ))}

          <span className="absolute top-10 right-10 text-green-600 font-semibold">{user}</span>

        </>) :

          (
            <>
              <div className="flex flex-col justify center items-center">
                <input type="text" placeholder='username' className="border rounded-sm mt-2 px-2"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button className="w-[100px] border bg-blue-400 text-white rounded-lg h-[50px] mt-2"
                  onClick={() => setUser(username)}
                >Login</button>
              </div>
            </>
          )}
      </div>



    </div>
  );
}

export default App;
