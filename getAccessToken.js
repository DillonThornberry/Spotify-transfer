const express = require('express')
const request = require('request')
const open = require('open')
 
require('dotenv').config()
const app = express()

const getToken = async (oldAccount) => {

  const redirect_uri = 'http://localhost:3002/callback'
  const scope = oldAccount ? 'user-library-read' : 'user-library-modify'

  return new Promise(resolve => {

    // Listen for callback from Spotify with access code
    app.get('/callback', (req, res) => {
        const code = req.query.code
        if (!code){
          return res.send(JSON.stringify('Access was denied'))
        }
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
              code,
              redirect_uri,
              grant_type: 'authorization_code'
            },
            headers: {
              'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
            },
            json: true
        }
    
        // Exchange code for access token and return token, then kill server
        request.post(authOptions, (error, response) => {
          if (error) { console.log('Request for access token failed') }
          const accessToken = response.body.access_token
          resolve(accessToken)
          server.close()
        })
    
        res.send(JSON.stringify('Access Token was received'))
    })
    
    const server = app.listen(3002, () => {
      console.log('listening on 3002')

      // Sign-in page is opened in browser
      open(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`)
    })
  })
  
}

module.exports = { getToken }
