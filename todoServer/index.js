const express=require ('express');
const app= express();
const todoService=require('./services/todoServ');

app.use(express.json());
const session=require('express-session');
app.use(session({
    secret: 'randonsecurestring',
    resave: false,
    saveUninitialized: false
}))

const cors=require('cors');
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))

const logMiddleware = (req, res, next) => {
    console.log(req.body);
    next()
}
app.use(logMiddleware);

const authMiddleware = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.json({
            status: true,
            statusCode: 401,
            message: "Please log in"
        })
    }
    else {
        next()
    }
}

app.get('/getTodoList/:userName', (req, res) => {
   console.log(req.params.userName);
    todoService.getTodoList(req.params.userName).then(result => { res.status(result.statusCode).json(result) });
});

app.get('/getListLength/:userName', (req, res) => {
   todoService.getListLength(req.params.userName).then(result => { res.status(result.statusCode).json(result) });
 });

app.get('/getDoneList/:userName', (req, res) => {
    //console.log(req.params.userName);
     todoService.getDoneList(req.params.userName).then(result => { res.status(result.statusCode).json(result) });
 });

 app.delete('/removeItem/:task', (req, res) => {
     //console.log(req.body.task);
    
        todoService.removeItem(req.params.task)
        .then(result => { res.status(result.statusCode).json(result) });
});


app.post('/userRegister', (req, res) => {
    
    todoService.userRegister(req.body.fullName, req.body.userName, req.body.password, req.body.gender, req.body.dob, req.body.address, req.body.phoneNo, req.body.email)
        .then(result => { res.status(result.statusCode).json(result) });
});

app.post('/addItem', (req, res) => {
    todoService.addItem(req.body.order, req.body.userName, req.body.task, req.body.status)
        .then(result => { res.status(result.statusCode).json(result) });
});

app.put('/updateItem/:userName', (req, res) => {
    todoService.updateItem(req.body.order, req.body.userName, req.body.task, req.body.status)
        .then(result => { res.status(result.statusCode).json(result) });
});

app.post('/userLogin', (req, res) => {
    todoService.userLogin(req, req.body.userName, req.body.password)
        .then(result => { res.status(result.statusCode).json(result) });
});

app.listen(3000,()=>{
    console.log("Server started at port number 3000");
});