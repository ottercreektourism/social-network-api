const router = require('express').Router();

// TODO: require all of the routes from the users controller
const {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriendById
} = require('../../controllers/users-controller');


// /api/users/:userId
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId/reactions/:friendId
router.route('/:userId/friends/:friendId').delete(deleteFriendById).post(addFriend);

// /api/users/:userId/friends
// router.route('/:userId/friends');



module.exports = router; 