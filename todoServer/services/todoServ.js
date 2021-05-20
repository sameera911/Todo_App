var userdb = require('../models/users');
var tododb = require('../models/todo');


const userRegister = (fullName, userName, password, gender, dob, address, phoneNo, email) => {
    console.log("in Register");
    return userdb.User.findOne({ userName })
        .then(user => {
            if (user) {
                if (password == user.password) {

                    return {
                        status: false,
                        statusCode: 422,
                        message: "User already exist. Please Login.."
                    }
                }
                else {
                    return {
                        status: false,
                        statusCode: 422,
                        message: `Username ${userName} is not available.`
                    }
                }
            }


            const newUser = new userdb.User({
                fullName,
                userName,
                password,
                gender,
                dob,
                address,
                phoneNo,
                email
            });
            newUser.save();
            return {
                status: true,
                statusCode: 200,
                message: "Registration Successful"
            }

        })
}

const userLogin = (req, userName, password) => {
    return userdb.User.findOne({ userName, password })
        .then(user => {
            if (user) {
                req.session.currentUser = user.userName;
                return {
                    status: true,
                    statusCode: 200,
                    message: "login Successful",
                    userName: user.userName,
                    fullName: user.fullName
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "User does not exist with provided account details"
                }
            }
        })
}

const getListLength = (userName) => {
    return tododb.Todo.find({ userName })
        .then(data => {
            if (data) {
                // console.log(data);
                //var len=data.length;
                return {
                    length: data.length,
                    status: true,
                    statusCode: 200,
                    message: "task found",
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "No task found"
                }
            }
        })
}

const getTodoList = (userName) => {

    return tododb.Todo.find({ $and: [{ userName: userName }, { status: "todo" }] })
        .then(data => {
            if (data) {
                // data.forEach(items=>{
                //     todo=items.task;
                // })
                console.log(data);
                return {
                    todo: data,
                    status: true,
                    statusCode: 200,
                    message: "Items found",
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "No task found"
                }
            }
        })
}

const getDoneList = (userName) => {

    return tododb.Todo.find({ $and: [{ userName: userName }, { status: "done" }] })
        .then(data => {
            if (data) {
                console.log(data);
                return {
                    done: data,
                    //done:donelist,
                    status: true,
                    statusCode: 200,
                    message: "Items found",
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 422,
                    message: "No task found"
                }
            }
        })
}

const addItem = (order, userName, task, status) => {
    return tododb.Todo.findOne({ $and: [{ userName: userName }, { task: task }] })
        .then(data => {
            if (!data) {
                //console.log(data);
                //console.log("hello");
                const newtask = new tododb.Todo({
                    order,
                    userName,
                    task,
                    status
                });
                newtask.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: "Task added successfully"
                }

            }
            else{
                alert("hello");
                return {
                    status: false,
                    statusCode: 422,
                    message: "Task already exist."
                }
            }
        })
}

const updateItem = (order, userName, task, status) => {
    //console.log(status);
    if (status === "todo") {
        status = "done";
    }
    else {
        status = "todo";
    }
    //console.log(status);
    var updatetask = ({
        order,
        userName,
        task,
        status
    });

       return tododb.Todo.updateOne({ $and: [{ userName: userName }, { task: task }] }, updatetask)
        .then(() => {
            return {
                status: true,
                statusCode: 200,
                message: "task updated successfully."
            }
        }).catch(err => {
            if (err) {
                return {
                    status: false,
                    statusCode: 422,
                    message: "Error in task update"
                }

            }
        })
}

const removeItem=(task)=>{
return tododb.Todo.deleteOne({  task: task })

.then(data=>{
    console.log(task);
    if(data){
        return {
            status: true,
            statusCode: 200,
            message: "item removed Successfully"
        }

    }
    else{
        return {
            status: false,
            statusCode: 422,
            message: "Error"
        }
    }
})
}
module.exports = {
    userRegister,
    userLogin,
    getTodoList,
    getDoneList,
    addItem,
    getListLength,
    updateItem,
    removeItem
}