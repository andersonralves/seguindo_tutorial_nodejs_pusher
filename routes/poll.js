const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '986630',
    key: '8bb1c043a671b03cf07e',
    secret: '7a7b65c9fe1f1cb1475b',
    cluster: 'us2',
    encrypted: true
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({
        sucess: true,
        votes: votes
    }));
});

router.post('/', (req, res) => {
    const newVote = {
      os: req.body.os,
      points: 1  
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });
    
        return res.json({success: true, message: 'Obrigado por votar'});
    });
    
});

module.exports = router;