import { Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Card } from "@mui/material";
import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyWebApi from "spotify-web-api-node";

const Player = ({ track, accessToken }) => {
  // const spotifyApi = new SpotifyWebApi({
  //   clientId: process.env.CLIENT_ID,
  //   clientSecret: process.env.CLIENT_SECRET,
  //   redirectUri: "http://localhost:3000",
  //   accessToken,
  // });

  // spotifyApi.getMe().then(
  //   function (data) {
  //     console.log("Some information about this user", data.body);
  //   },
  //   function (err) {
  //     console.log("Something went wrong!", err);
  //   }
  // );
  console.log(track);

  return (
    <Card
      elevation={0}
      sx={{ maxWidth: 300, p: 2, border: 0.1, borderColor: "rgba(0,0,0,0.2)" }}
    >
      <Typography variant='h6' gutterBottom sx={{ textAlign: "center" }}>
        {track.name}
      </Typography>
      <CardMedia
        component='img'
        height='300'
        image={track.album.images[1].url}
        alt='green iguana'
        sx={{ objectFit: "cover" }}
      />
      <SpotifyPlayer token={accessToken} uris={[track.uris]} />
    </Card>
  );
};

export default Player;
