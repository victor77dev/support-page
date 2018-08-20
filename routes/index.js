var express = require('express');
var router = express.Router();
var axios = require('axios');
const keyList = require('../keys.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/solvemedia', function(req, res, next) {
  const site = req.body.site;
  const privatekey = keyList[site];
  console.log(privatekey)
  const challenge = req.body.challenge;
  const response = req.body.response;
  const remoteip = req.body.remoteip;

  axios.get('http://verify.solvemedia.com/papi/verify', {
    params: {
      privatekey: privatekey,
      challenge: challenge,
      response: response,
      remoteip: remoteip,
    }
  }).then((response) => {
    return res.send(response.data);
  }).catch((error) => {
    console.log(error)
  });
});

module.exports = router;
