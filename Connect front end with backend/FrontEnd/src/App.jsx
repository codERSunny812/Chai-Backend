import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [jokes,setJokes]=useState([]);

  useEffect(()=>{
    axios.get("/api/jokes")
    .then((response)=>{
      console.log(response.data);
      setJokes(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])

  return (
   <>
   <h1>Chai and code </h1>
   <button>jokes : {jokes.length}</button>

   {
    jokes.map((items)=>{
      return(
        <div key={items.id} style={{border:'2px solid white',margin:
        "5px",padding:"5px"}} >
          <h4>{items.title}</h4>
          <p>{items.description}</p>
        </div>
      );
    })
   }

   </>
  )
}

export default App
