const express = require('express');
const router = express.Router();

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '986630',
    key: '8bb1c043a671b03cf07e',
    secret: '7a7b65c9fe1f1cb1475b',
    cluster: 'us2',
    encrypted: true
  });

router.get('/', (req, res) => {
    res.send('POLL');
});

router.post('/', (req, res) => {
    
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
    });

    return res.json({success: true, message: 'Obrigado por votar'});
});

module.exports = router;