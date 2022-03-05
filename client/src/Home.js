import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Container } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import Player from "./Player";
import { genres } from "./Genres";

const code = new URLSearchParams(window.location.search).get("code");

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=c7e1fd8588e245b88f3cf88c4b5dca4e&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Home = ({}) => {
  const { accessToken } = useAuth(code);
  const [genre, setGenre] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [track, setTrack] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  const handleSearch = () => {
    if (genre === "") {
      setErr(true);
      return;
    }
    setLoading(true);
    setErr(false);

    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: "http://localhost:3000",
      accessToken,
    });

    spotifyApi
      .getRecommendations({
        seed_genres: genre,
        limit: 100,
        market: "US",
      })
      .then(
        function (data) {
          setLoading(false);
          setTrack(
            data.body.tracks[
              Math.floor(Math.random() * data.body.tracks.length)
            ]
          );
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  };
  return (
    <Container maxWidth='md' sx={{ pt: 1, pb: 1 }}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          color: "#0012D6",
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant='h2'
          component='h1'
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 5,
            fontSize: { xs: 28, sm: 45, md: 50 },
          }}
        >
          Random song generator
        </Typography>

        <FormControl sx={{ width: 200, mb: 3 }}>
          <InputLabel id='demo-simple-select-label' error={err}>
            Genre
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={genre}
            label='Genre'
            onChange={handleChange}
            error={err}
          >
            {genres &&
              genres.map((genre, i) => {
                return (
                  <MenuItem value={genre} key={i}>
                    {genre}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        {track && (
          <Box sx={{ mb: 3 }}>
            <Player accessToken={accessToken} track={track} />
          </Box>
        )}

        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant='contained'
            color='success'
            onClick={handleSearch}
            href={code ? "#" : AUTH_URL}
            sx={{ display: `${loading ? "none" : "inline-block"}` }}
          >
            Generate
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
