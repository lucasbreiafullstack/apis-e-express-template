import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { TCourse, TStudent } from './types'

const app = express()

app.use(express.json())
app.use(cors())


app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//teste api
app.get('/', (req: Request, res: Response) => {
    res.send('API rodando!')
})

//ping
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//get all cousers
app.get('/courses', (req: Request, res: Response) => {
    res.status(200).send(courses)
})

//get all cousers by name
app.get('/courses/search', (req: Request, res: Response) => {
    const name = req.query.name as string //avisa que o 'name' deve ser tratado como uma string
    //const {name} = req.query //pega o name direto sem precisar passar por parâmetro

    const coursesByName = courses.filter((course) => {
        return course.name.toLowerCase().includes(name.toLowerCase())
    })

    res.status(200).send(coursesByName)
})

//add new course
app.post('/courses', (req: Request, res: Response) =>{
    const { id, name, lessons, stack } = req.body
    const newCourse:TCourse = {
        id,
        name,
        lessons,
        stack
    }

    courses.push(newCourse)
    res.status(200).send('Curso resgistrado com sucesso!')
    console.log(courses);
    
})

//get all students
app.get('/students', (req: Request, res: Response) => {
    res.status(200).send(students)
})

//get student by name
app.get('/students/search', (req: Request, res: Response) =>{
    const nameStudent = req.query.name as string

    const studentByName = students.filter((student) =>{
        return student.name.toLowerCase().includes(nameStudent.toString().toLowerCase())
    })
    res.status(200).send(studentByName)
})

//add new student
app.post('/students', (req: Request, res: Response) =>{
    const { id, name, age} = req.body

    const newStudent:TStudent ={
        id,
        name,
        age
    }

    students.push(newStudent)
    res.status(200).send('Aluno registrado!')
})