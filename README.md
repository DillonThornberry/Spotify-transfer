# README

### About
For transfering my liked tracks from one Spotify account to another using the Spotify API

### Process
Call `node main.js old` to get the songs from old account and write to a .json file
1. Opens a signin and authorize prompt in the browser
2. Returns access code to express server
3. Uses code to get an access token to read liked songs from old account
4. Gets all songs page by page and then writes them to a .json file

Call `node main.js new` to get liked songs from file and like on new account
1. Opens a signin and authorize prompt in the browser
2. Returns access code to express server
3. Reads songs list from .json file
4. Uses access token to like each song on new account
