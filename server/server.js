const cors = require("cors");
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv");
dotenv.config();

app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// App routes
app.post("/login", (req, res) => {
  // getting code
  const code = req.body.code;

  // making spotifyApi with SpotifyWebApi class
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "http://localhost:3000",
  });

  // authorizing our code and sending response with 'tokens'
  spotifyApi
    .authorizationCodeGrant(code)
    .then((response) => {
      res.status(200).json({
        accessToken: response.body.access_token,
        refreshToken: response.body.refresh_token,
        expiresIn: response.body.expires_in,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: error });
    });
});

// refersh the token automatically since it expires in 3600s
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "http://localhost:3000",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.status(200).json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: error });
    });
});

// starting server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
