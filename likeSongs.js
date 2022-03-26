const fs = require('fs')
const request = require('request')

const MAX_PAGE_LENGTH = 50
const PERFECT_ORDER = true

const likeSongs = async (token) => {
    // Read song list from file and parse
    const songList = JSON.parse(fs.readFileSync('liked-songs-list.json', 'utf-8'))
    
    /* 
    Even when requests are made one after the other synchonously, the API fails to maintain proper order of the songs in the list. If maintaining the order perfectly is less
    important than performing the actions quickly, the code in this IF block is sufficient
    */

    if (!PERFECT_ORDER){

        // Iterate backwards so order is from least recently saved songs to most recently saved songs
        var trackIdPages = []
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

        // Like each song page by page (await request to finish before beginning next request so that song order is maintained)
        for (var page of trackIdPages){
            const pageStr = page.reverse().join(',')
            console.log(page[0] + ' - ' + page[page.length-1])
            await likePage(pageStr, token)
        }
    
    }

    /*
    The only way to keep the tracklist in perfect order is to request to like songs one-by-one, with a 500ms interval in between. For me [2173 tracks], this takes ~18 minutes
    to complete. While that is annoying, I prefer to keep my songs in the order they were added, and am willing to wait this long since it is just a one-time process. 
    */

    else {
        var current = songList.length - 1

        const reqInterval = setInterval(() => {
            if (current < 0){
                clearInterval(reqInterval)
            }
            else {
                likePage(songList[current].track.id, token)
                console.log(`${songList.length - current}/${songList.length} tracks saved`)
                current--
            }
        }, 500)
    }
}

const likePage = async (pageStr, token) => {
    return new Promise(resolve => {
        var options = {
            uri: `https://api.spotify.com/v1/me/tracks?ids=${pageStr}`,
            headers: { 'Authorization': 'Bearer ' + token },
            json: true
        }
    
        request.put(options, (error, response) => {
            if (error) { console.log('Request to like song failed') }
            resolve(1)
          })
    })
}

module.exports = { likeSongs }