// Require Users Model
const { Users, Thoughts } = require('../models');

const usersController = {

    // Create new user
    // POST /api/users
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
    // GET /api/users
    getUsers(req, res) {
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
    // GET /api/users/:id
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
    // PUT /api/users/:id
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
    // DELETE /api/users/:id
    deleteUserById({ params }, res) {
        Users.findOneAndRemove(
            { _id: params.userId }
        ).then((userData) => {
            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            return res.json(userData);
        })
        // Delete the user from all friend arrays that exist using $in
        Users.updateMany(
            { _id: { $in: userData.friends } },
            { $pull: { friends: params.userId } }
        ).then(() => {
            // Delete all thoughts written by the user
            Thoughts.deleteMany(
                { username: UserData.username }
            ).then((userData) => {
                if (!userData) {
                    return res.status(404).json({ message: "deleted user and associated thoughts." })
                }
                return res.json(userData);
            })
        })
    },


    // Add friend
    // POST /api/users/:userId/friends/:friendId
    addFriend({ params }, res) {
        // Add friendId to userId's friends list
        Users.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
        ).then((userData) => {
            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            // Adding the userId to the friendId's friend list
            Users.findOneAndUpdate(
                { _id: params.friendId },
                { $addToSet: { friends: params.userId } },
                { new: true, runValidators: true }
            ).then((userData) => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user with that ID' })
                }
                return res.json(userData);
            })
        })
    },



    // Delete friend by id
    // DELETE /api/users/:userId/friends/:friendId
    deleteFriendById({ params }) {
        Users.findOneAndRemove(
            // Delete the friendId from the userId's friend list
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        ).then((userData) => {
            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            // Delete userId from the friend list
            Users.findOneAndUpdate(
                { _id: params.friendId },
                { $pull: { friends: params.userId } },
                { new: true, runValidators: true }
            ).then((userData) => {
                if (!userData) {
                    return res.status(404).json({ message: 'No user with that ID' })
                }
                return res.json(userData);
            })
        })
    }
}


module.exports = usersController;