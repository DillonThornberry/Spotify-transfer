const fs = require('fs')
const request = require('request')

const MAX_PAGE_LENGTH = 50

const likeSongs = (token) => {
    // Read song list from file and parse
    const songList = JSON.parse(fs.readFileSync('liked-songs-list.json', 'utf-8'))
    var trackIdPages = []

    // Iterate backwards so order is from least recently saved songs to most recently saved songs
    var trackPage = []
    for (var i=songList.length-1; i >= 0; i--){

        // Store track ID's in batches of 50 each (max per request)
        trackPage.push(songList[i].track.id)
        if (trackPage.length == MAX_PAGE_LENGTH){
            trackIdPages.push(trackPage)
            trackPage = []
        }
    }
    // Push remaining track ID's into list
    if (trackPage.length){
        trackIdPages.push(trackPage)
    }

    console.log('pages ' + trackIdPages.length)
    console.log('last page ' + trackIdPages[trackIdPages.length - 1].length)
}

module.exports = { likeSongs }