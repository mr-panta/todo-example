const userDB = {};


const login = (req, res) => {
    const { user_id } = req.body
    const data = {
        is_new: !userDB[user_id],
    }
    userDB[user_id] = true
    res.send(data)
}



module.exports = {
    login,
}
