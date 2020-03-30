import React from 'react'
import './styles.css'
import Icon from '../Icon'


function DevItem({dev, onDelete}){

  function deleteDev(){
    onDelete(dev.github_user)
  }
  return(
    <li key = {dev._id} className="dev-item">
         <header>
           <img src={dev.avatar_url} alt={dev.name} />
           <div className = "user-info">
             <strong>{dev.name}</strong>
             <span>{dev.techs.join(', ')}</span>
           </div> 

           <div className="icons">
            <Icon onClick={deleteDev} color = "#bbb" size = {16}/>
          </div>
           
         </header>
         <p>{dev.bio}</p>
         <a href = {`https://github.com/${dev.github_user}`}>Acessar perfil do gitHub</a>
        </li>
  )
}

export default DevItem