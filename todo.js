const todoDB = [];

const addTodo = (req, res) => {
    const {detail, user_id} = req.body;
    const data = {
        todo_id: todoDB.length + 1,
        user_id,
        detail,
        status: false
    };
    todoDB.push(data);
    res.send({todo_id:data.todo_id});
}

const editTodo = (req, res) => {
    const {detail, user_id, todo_id} = req.body;
    let valid = false;
    for (let i = 0; i < todoDB.length; i++){
        if (todoDB[i].user_id == user_id && todoDB[i].todo_id == todo_id){
            todoDB[i].detail = detail;
            valid = true;
            break;
        }
    }
    if (valid){
        res.send(valid);
    }else{
        res.send('Error Edit todo');
    }
} 

const doneTodo = (req, res) => {
    let valid = false;
    const {user_id, todo_id} = req.body;
    for (let i = 0; i < todoDB.length; i++){
        if (todoDB[i].user_id == user_id && todoDB[i].todo_id == todo_id){
            if (todoDB[i].status == false){
                todoDB[i].status = true;
                valid = true;
                break;
            }
        }
    }
    if (valid){
        res.send(valid);
    }else{
        res.send('Error Done todo');
    }
}

const undoTodo = (req, res) => {
    let valid = false;
    const {user_id, todo_id} = req.body;
    for (let i = 0; i < todoDB.length; i++){
        if (todoDB[i].user_id == user_id && todoDB[i].todo_id == todo_id){
            if (todoDB[i].status == true){
                todoDB[i].status = false;
                valid = true;
                break;
            }
        }
    }
    if (valid){
        res.send(valid);
    }else{
        res.send('Error Undo todo');
    }
}

const deleteTodo = (req, res) => {
    const {user_id, todo_id} = req.body;
    let valid = false;
    for (let i = 0; i < todoDB.length; i++){
        if (todoDB[i].user_id == user_id && todoDB[i].todo_id == todo_id){
            todoDB.splice(i, 1);
            valid = true;
            break;
        }
    }
    if (valid){
        res.send(valid);
    }else{
        res.send('Error Delete todo');
    }
} 

const getTodo = (req, res) => {
    const {user_id} = req.body;
    let valid = false;
    let data = [];
    for (let i = 0; i < todoDB.length; i++){
        if (todoDB[i].user_id == user_id){
            data.push(todoDB[i]);
            valid = true;
        }
    }
    if (valid){
        res.send(data);
    }else{
        res.send('Error Get todo');
    }
} 

module.exports = {
    addTodo,
    editTodo,
    doneTodo,
    undoTodo,
    deleteTodo,
    getTodo
}