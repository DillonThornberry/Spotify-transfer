const getToken = require('./getAccessToken.js').getToken
const getSongs = require('./getSongs.js').getSongs
const likeSongs = require('./likeSongs.js').likeSongs

const main = async (fromOldAccount) => {
    const token = await getToken(fromOldAccount)

    if (fromOldAccount) {
        getSongs(token)
    }

    else {
        likeSongs(token)
    }
}

const fromOldAccount = process.argv[2] == 'old'
main(fromOldAccount)