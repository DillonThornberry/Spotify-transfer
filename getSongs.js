const request = require('request')
const fs = require('fs')
 
require('dotenv').config()
 
// var accessToken = null
 
// const getAccessToken = async() => {
//     //Load refresh token from json file
//     const refreshToken = JSON.parse(fs.readFileSync('refresh-token.json', 'utf8')).refresh_token
 
//     if (!refreshToken || !refreshToken.length) { 
//         return console.log('no refresh token, getAccessToken failed') 
//     }
 
//     var authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')) },
//         form: {
//           grant_type: 'refresh_token',
//           refresh_token: refreshToken
//         },
//         json: true
//     }
//     // Make post request with request token to receive access token, and update it in state
//     request.post(authOptions, (err, res) => {
//         if (!err && res.statusCode === 200) {
//             var token = res.body.access_token
//             var refresh = res.body.refresh_token
//             fs.writeFile('refresh-token.json', JSON.stringify({ refresh }), () => {
//                 console.log('token overwritten')
//                 process.exit(1)
//             })
//             accessToken = token
//             var url = 'https://api.spotify.com/v1/me/tracks'
//             getSongs(accessToken, url);
//             return console.log('access token set')
//         } else {
//             return console.log('refresh token invalid')
//         }
//     })
// }

// var songList = []
// const getSongs = (token, url) => {
//     //console.log(token)
//     var options = {
//         url: url,
//         headers: { 'Authorization': 'Bearer ' + token },
//         json: true
//     }
 
//     request(options, (err, res) => {
//         console.log(res.body.next)
        
//         songList.push(...res.body.items)
//         if (res.next){
//             console.log('next page')
//             getSongs(token, res.next)
//         }
//         else {
//             //console.log(songList.length)
//         }
//     })
// }

const getSongs = (accessToken) => {

}

module.exports = { getSongs }
