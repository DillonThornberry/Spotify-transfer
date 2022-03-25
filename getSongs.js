const request = require('request')
const fs = require('fs')
 
require('dotenv').config()
 
// Gets all songs from likes and writes to file
const getSongs = async (accessToken) => {
    var url = 'https://api.spotify.com/v1/me/tracks'
    var songList = []

    while (url) {
        // Get the current page
        const currentPage = await getPage(accessToken, url)

        // Update url with next page url and push songs into song list
        url = currentPage.next
        songList.push(...currentPage.songs)
        console.log(songList.length + ' songs retrieved')
    }

    console.log(songList.length + ' total songs retrieved from likes list')

    fs.writeFile('liked-songs-list.json', JSON.stringify(songList), () => {
        console.log('Successfully written to liked-songs-list.json')
    })
}

// Gets a page of songs from likes and returns page
const getPage = (accessToken, url) => {

    // Wait for response and return object with song list and url for next page
    var page = { songs: [], next: null }
    return new Promise(resolve => {
        var options = {
            uri: url,
            headers: { 'Authorization': 'Bearer ' + accessToken },
            json: true
        }
    
        request(options, (err, res) => {
            if (err) { console.log(err) }
            page.songs = res.body.items
            page.next = res.body.next
            resolve(page)
        })
    })
    
}

module.exports = { getSongs }
