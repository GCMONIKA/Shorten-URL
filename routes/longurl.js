var express = require('express');
var router = express.Router();
var longurlController = require('../controllers/longurlController.js');


let db_URL = {
    "longUrl": "https://www.amazon.in/s?k=-amazon&hvadid=72499124504037&hvbmt=be&hvdev=c&hvqmt=e&tag=msndeskstdin-21&ref=pd_sl_5fksc5jb1x_e",
    "shortUrl": "http:localhost:3000/api/iXxk34sAT",
    "urlCode": "iXxk34sAT",
    "date": "2023-01-16T12:09:06.214Z"
}

router.post('/shorten', function(req, res, next) {
    console.log('longurl:/:', JSON.stringify(req.body));
    let shortUrl = longurlController.shorten(req.body);
    db_URL = shortUrl;
    res.send(shortUrl);
  });


router.get('/:code', async (req, res) => {
    console.log('longurl:/:', req.params);
    try {
        
        console.log('testing======>',db_URL.urlCode,req.params.code,db_URL.urlCode === req.params.code)

        if (db_URL.urlCode === req.params.code) {

            return res.redirect(db_URL.longUrl)

        } else {

            return res.status(404).json('No URL Found')
        }

    }
    
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})

module.exports = router;