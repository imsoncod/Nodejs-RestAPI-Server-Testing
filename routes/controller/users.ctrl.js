const db = require('../../config/db_config')
const conn = db.init()

const user1 = {name : 'Alice'}

const user2 = [
  {id : 0 , name : 'Alice'},
  {id : 1 , name : 'Ben'},
  {id : 2 , name : 'Peter'},
  {id : 3 , name : 'James'},
]

const getUser = (req, res) => {
    conn.query("select * from user",
    (err, rows, fiends) => {
        if(err) throw err
        res.status(200).json(rows)
    })
}

const getUserById = (req, res) => {
    var uid = req.params.id
    if(uid){
        conn.query('select * from user where uid = ?', [uid],
        (err, rows ,fields) => {
            if(err) throw err
            res.status(200).json(rows)
        })
    }
}

const insertUser = (req, res) => {
    var email = req.body.email
    var password = req.body.password
    var name = req.body.name
    if(email && password && name){
        conn.query('insert into user values(null,?,?,?)', [email, password, name],
        (err, rows, fields) => {
            if(err) throw err
            res.status(201).json(rows)
        })
    }
}

const deleteUser = (req,res) => {
    var uid = req.params.id
    if(uid){
        conn.query('delete from user where uid = ?', [uid],
        (err, rows ,fields) => {
            if(err) throw err
            res.status(200).json(rows)
        })
    }
}

module.exports = {
    getUser,
    getUserById,
    insertUser,
    deleteUser
}