// server.js
import cors from "cors"
import express from "express"

const app = express()
app.use(cors())

const port = 8000

const users = {
    users_list: [
        {
            id : 'xyz789',
            name : 'Charlie',
            job: 'Janitor',
        },
        {
            id : 'abc123',
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            id : 'ppp222',
            name: 'Mac',
            job: 'Professor',
        },
        {
            id: 'yat999',
            name: 'Dee',
            job: 'Aspring actress',
        },
        {
            id: 'zap555',
            name: 'Dennis',
            job: 'Bartender',
        }
    ]
}

const findUserByPredicates = (...predicates) =>
    users['users_list']
        .find(user => predicates.every(predicate => predicate(user)))

const findUsersByPredicates = (...predicates) =>
    users['users_list']
        .filter(user => predicates.every(predicate => predicate(user)))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users', (req, res) => {
    const name = req.query.name
    const job = req.query.job

    const predicates = []

    if (name !== undefined)
        predicates.push(user => user['name'] === name)
    if (job !== undefined)
        predicates.push(user => user['job'] === job)

    res.send({users_list: findUsersByPredicates(...predicates)})
})

app.get('/users/:id', (req, res) => {
    const id = req.params['id']  // or req.params.id
    let result = findUserByPredicates(user => user['id'] === id)

    if (result === undefined) {
        res.status(404).send('Resource not found.')
    } else {
        res.send(result)
    }
})

const addUser = user => {
    users['users_list'].push(user)
    return user
}

app.post('/users', (req, res) => {
    const userToAdd = req.body
    addUser(userToAdd)
    res.send()
})

const findUserIndexById = id =>
    users['users_list']
        .findIndex(user => user['id'] === id)

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']

    const index = findUserIndexById(id)
    if (index !== -1)
        users['users_list'].splice(index, 1)

    res.send()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
