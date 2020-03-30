import React, {useEffect, useState} from 'react'
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
import api from './services/api'

import DevItem from './DevItem'
import DevForm from './DevForm'

function App() {
  const [devs, setDevs] = useState([])

  useEffect(()=>{
   async function loadDevs(){
     const response = await api.get('/devs')

     setDevs(response.data)
   }
   loadDevs()
  }, [])

  async function handleAddDev(data){
   
   const response = await api.post('/devs',data)

  
   setDevs([...devs, response.data])
  }

  async function handleDelDev(github_user) {
    await api.delete(`devs/${github_user}`);
    setDevs(devs.filter(dev=>dev.github_user!==github_user));
  }


  return (
    <div id = "app">
      <aside>
      <img source = ""/>
       <strong>Cadastrar Dev</strong>
       <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
       <ul>
         {devs.map( dev =>(
         <DevItem key = {dev._id} dev = {dev} onDelete = {handleDelDev} />
         ))} 
       </ul>
      </main>
    </div>
  )
}

export default App;
