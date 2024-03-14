const db = require('./db');

const saveUserDetails = async (request, response) => {
    try {
        const { userName,email, password } = request.body
        const result = db.query("INSERT INTO user_details (user_name,email,password) VALUES ($1, $2,$3)", [userName,email, password]);
        response.json(result);
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error');
    }}
const authenticate = async (request, response) => {
        try {
            const { userName, password } = request.body
            const result = await db.query('SELECT * FROM user_details where user_name = $1 and password = $2',[userName, password]);
            let authStatus = result.rowCount==1?"auth successful":"auth failed";
            response.json(authStatus);
        } catch (err) {
            console.error(err);
            response.status(500).send('Internal Server Error');
        }}
const getTasks = async (request, response) => {
    try {
        const result = await db.query('SELECT * FROM task');
        response.json(result.rows);
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error');
    }}
  
  const getTaskById = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const result = await db.query('SELECT * FROM task WHERE id = $1', [id]);
        response.json(result.rows);
    } catch (err) {
        console.error(err);
        response.status(500).send('Internal Server Error');
    }}
  
 
  
  const createTask = async (request, response) => {
    try{
        const { title, description } = request.body
        const result = db.query("INSERT INTO task (title, description,id) VALUES ($1, $2,nextval('increment_id'))", [title, description]);
        response.json(result);
    }catch(err){
        console.error(err);
        response.status(500).send('Internal Server Error');
    }
  }
  
  const updateTask = (request, response) => {
    const id = parseInt(request.params.id)
    try{
        const { title, description } = request.body
        const result = db.query('UPDATE task SET title = $1, description = $2 WHERE id = $3',[title, description, id])
        response.json(result);
    }catch(err){
        console.error(err);
        response.status(500).send('Internal Server Error');
    }
  }
  
  const deleteTask = (request, response) => {
    const id = parseInt(request.params.id)
  try{
    const result = db.query('DELETE FROM task WHERE id = $1', [id])
    response.json(result);
  }catch(err){
    console.error(err);
    response.status(500).send('Internal Server Error');
}}
  
  module.exports = {
    saveUserDetails,
    authenticate,
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
  }