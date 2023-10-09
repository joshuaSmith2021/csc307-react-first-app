// src/MyApp.js
import React, {useState, useEffect} from 'react'
import Form from './Form'
import Table from './Table'

function MyApp() {
  const [characters, setCharacters] = useState([])

  function removeOneCharacter (index) {
	  const updated = characters.filter((character, i) => i !== index)
    const userToDelete = characters.find((character, i) => i === index)
    const idToDelete = userToDelete['id']

    fetch(`http://localhost:8000/users/${idToDelete}`, {'method': 'DELETE'})
      .then(response => {
        if (response.status !== 204) {
          throw new Error(`Received unexpected ${response.status} response`)
        }
      })
      .then(() => setCharacters(updated))
      .catch(e => console.error(e))
	}

  function fetchUsers() {
    const promise = fetch('http://localhost:8000/users')
    return promise
  }

  useEffect(() => {
    fetchUsers()
      .then(res => res.json())
      .then(json => setCharacters(json['users_list']))
      .catch(error => console.log(error))
  }, [])

  function postUser(person) {
    const promise = fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    })

    return promise
  }

  function updateList(person) {
    postUser(person)
      .then(data => {
        if (data.status !== 201) {
          throw new Error(`Received unexpected ${data.status} response`)
        }

        return data.json()
      })
      .then(data => {
        setCharacters([...characters, data])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='container'>
      <Table characterData={characters}
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp
