// Require Users Model
const { Users } = require('../models');

const usersController = {

    // Create new user
    createUser({ body }, res) {
        Users.create(body)
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: "not added" });
                }
                return res.json(userData);
            })
    },


    // Get all users
    getUsers() {
        Users.find({})
            .populate("thoughts")
            .populate("friends")
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: "No user with that ID" });
                }
                return res.json(userData);
            })
    },


    // Get user by id
    getUserById({ params }, res) {
        Users.findOne({ _id: params.userId })
            .populate("thoughts")
            .populate("friends")
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: "No user with that ID" });
                }
                return res.json(userData);
            })
    },


    // Update user by id
    updateUserById({ params, body }, res) {
        Users.findOneAndUpdate(
            { _id: params.UserId },
            { $set: body },
            { new: true, runValidators: true }
        ).then((userData) => {
            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            return res.json(userData);
        })
    },


    // Delete user by id
    deleteUserById({ params }, res) {
        Users.findOneAndRemove(
            { _id: params.userId }
        ).then((userData) => {
            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            return res.json(userData);
        })
    },


    // Add friend
    addFriend({ params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        ).then((userData) => {
            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            return res.json(userData);

        })
    },


    // Delete friend by id
    deleteFriendById({ params }) {
        Users.findOneAndRemove(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        ).then((userData) => {
            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            return res.json(userData);

        })
    }


}

module.exports = usersController;