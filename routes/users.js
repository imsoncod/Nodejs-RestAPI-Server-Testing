const express = require('express')
const app = require('..')
const router = express.Router()

const user1 = {name : 'Alice'}

const user2 = [
  {id : 0 , name : 'Alice'},
  {id : 1 , name : 'Ben'},
  {id : 2 , name : 'Peter'},
  {id : 3 , name : 'James'},
]

router.get('/', (req, res) => {
  res.json(user1)
})

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  if(Number.isNaN(id)){
    return res.status(400).end()
  }
  const user = user2.filter(user => user.id === id)[0]
  if(!user){
    return res.status(404).end()
  }
  res.json(user)
})

router.post('/', (req,res) => {
  const name = req.body.name
  if(!name){
    return res.status(400).end()
  }

  const found = user2.filter(user => user.name === name).length
  if(found){
    return res.status(409).end()
  }

  const id = Date.now()
  const user = {id, name}
  user2.push(user)
  res.status(201).json(user)
})

router.delete('/:id', (req,res) => {
  const id = parseInt(req.params.id, 10)
  if(Number.isNaN(id)){
    return res.status(400).end()
  }
  res.status(204).end()
})

module.exports = router