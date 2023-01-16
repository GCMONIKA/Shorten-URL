const validUrl = require('valid-url')
const shortid = require('shortid')
const baseUrl = 'http:localhost:3000'

var shorten = (longUrlData) => {
    console.log('longUrlData',longUrlData);
    let longUrl = longUrlData.longUrl;
    if (!validUrl.isUri(baseUrl)) {
        return {status_code:401, message: "inValid Base URL"}
    }

    const urlCode = shortid.generate()

    if (validUrl.isUri(longUrl)) {
        try {
             if(longUrl !== '') {
                const shortUrl = baseUrl + '/api/' + urlCode
                let url = {
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                }
                return {status_code:200, message: "Short URL generated succesfully",shortUrlData:url}
            }
        }
        // exception handler
        catch (err) {
            console.log(err)
            return {status_code:500, message: "Server ocuured error"}
        }
    } else {
        
        return {status_code:401, message: "inValid Long URL"}
    }
}

module.exports = {
    shorten
}