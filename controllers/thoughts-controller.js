// Require Thoughts and Users Models
const {Thoughts, Users} = require('../models');

const thoughtsController = {
    // TODO: create new thought
    // TODO: get all thoughts

    getThoughts(req, res) {
        Thoughts.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },



    //   getAllThoughts(req,res) {
    //     Thoughts.find({})
    //     .populate({path: 'reactions', select: '-__v'})
    //     .select('-__v')
    //     // .sort({_id: -1})
    //     .then(dbThoughtsData => res.json(dbThoughtsData))
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });
    // }


    // TODO: get thought by id
    // TODO: update thought by id
    // TODO: delete thought by id
    // TODO: add reaction
    // TODO: delete reaction by id

}

module.exports = thoughtsController
