//const express = require('express')
const request = require('request')
const fs = require('fs')
//const open = require('open')
 
require('dotenv').config()
 
// const scope = encodeURI('user-read-playback-state user-modify-playback-state')
 
// Sign-in page is opened in browser
//open(`https://accounts.spotify.com/en/authorize?response_type=code&scope=user-library-read&redirect_uri=https://webhook.site/544c38a3-c508-4168-9a53-d742e06e7b93&client_id=${process.env.CLIENT_ID}`)
 
const redirect_uri = 'https://webhook.site/544c38a3-c508-4168-9a53-d742e06e7b93'
 
const code = process.env.CODE
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
    },
    headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
    },
    json: true
}

// Exchange code for refresh token and store it to a json file, then exit 
request.post(authOptions, (error, response) => {
    console.log(response.body)
    const refresh_token = response.body.refresh_token
    fs.writeFile('refresh-token.json', JSON.stringify({ refresh_token }), () => {
        console.log('token overwritten')
        process.exit(1)
    })
})