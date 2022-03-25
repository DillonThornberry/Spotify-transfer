const getToken = require('./getAccessToken.js').getToken
const getSongs = require('./getSongs.js').getSongs

const main = async (oldAccount) => {
    const token = await getToken(oldAccount)

    if (oldAccount) {
        getSongs(token)
    }

    else {
        likeSongs(token)
    }
}

const oldAccount = process.argv[2] == 'old'
main(oldAccount)