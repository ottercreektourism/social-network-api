// Require Users Model
const {Users} = require('../models');

const usersController = {
    // TODO: create new user

    createUsers() {

    },
    // TODO: get all users
    // TODO: get user by id
    getUserById({params}, res) {
        Users.findOne({_id: params.userId})
        .populate("thoughts")
        .populate("friends")
        .select('-__v')
        .then
    }
    // TODO: update user by id
    // TODO: delete user by id
    // TODO: add friend
    // TODO: delete friend by id
    
}

module.exports = usersController; 