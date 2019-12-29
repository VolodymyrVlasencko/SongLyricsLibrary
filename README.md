# LyricsViewer
Web app based on GeniusAPI.
It provides searching for lyrics by artist name or song name and add it to favorite library. It would help to access song lyrics without using search.
Working example: http://lyricsviewer.herokuapp.com/

#Used:
- Socket.io as websocket
- MongoDB for storing users information and their libraries
- Heroku hosting
- Cheerio for scraping genius html pages to get song lyrics
- ejs as view engine
- Cookie sessions
- PassportJS for authentication
- bcrypt as hash for passwords in my MongoDB
