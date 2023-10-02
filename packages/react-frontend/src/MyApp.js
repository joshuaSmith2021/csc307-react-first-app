// src/MyApp.js
import React, {useState} from 'react'
import Form from './Form'
import Table from './Table'

function MyApp() {
  const [characters, setCharacters] = useState([])

    function removeOneCharacter (index) {
	    const updated = characters.filter((character, i) => {
	        return i !== index
	    })

	  setCharacters(updated)
	}

  // src/MyApp.js (a new function inside the MyApp function)
  function updateList(person) {
    setCharacters([...characters, person])
  }

  return (
    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )  
}

export default MyApp
