import React, {useState, useEffect} from 'react'


function DevForm({onSubmit}){
  const [github_user, setGithub] = useState('')
  const [techs, setTechs] = useState('')

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
          const {latitude, longitude} = position.coords
          
          setLatitude(latitude)
          setLongitude(longitude)
      },
      (err) => {
        console.log(err)
      },
      {
        timeout: 30000,
      }
    )
  }, [])

  async function handleAddDev(e){
    e.preventDefault()
    await onSubmit( {
      github_user,
      techs,
      latitude,
      longitude
    })

    setGithub('')
    setTechs('')
  }

  return(
        <form onSubmit={handleAddDev}>
        <div className="input-block">
         <label htmlFor="github_user">
           Usuário GitHub
         </label>
         <input
          name = "github_user"
          id = "github_user"  
          required 
          value = {github_user}
          onChange = {e => setGithub(e.target.value)}
         />
        </div>
        
        <div className="input-block">
         <label htmlFor="techs">
           Tecnologias
         </label>
         <input
          name = "techs"
          id = "techs"  
          required 
          value = {techs}
          onChange={e => setTechs(e.target.value)}
         />
        </div>
        
        <div className="input-group">
        <div className="input-block">
        <label htmlFor="latitude">
           Latitude
         </label>
         <input 
         type = "number"
         name = "latitude" 
         id = "latitude" 
         required 
         value={latitude}
         onChange = {e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
        <label htmlFor="longitude">
           Longitude
         </label>
         <input
          type = "number"
          name = "longitude"
          id = "longitude"  
          required 
          value={longitude}
          onChange = {e => setLongitude(e.target.value)}
         />
        </div>
        </div>
        
      <button type = "Submit">Salvar</button>
       </form>
)
}

export default DevForm