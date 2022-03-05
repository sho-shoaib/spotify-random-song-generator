import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = (code) => {
  let navigate = useNavigate();

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((response) => {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setExpiresIn(response.data.expiresIn);

        navigate.replace({
          search: "",
        });
      })
      .catch(() => {
        navigate("/");
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((response) => {
          setAccessToken(response.data.accessToken);
          setExpiresIn(response.data.expiresIn);
        })
        .catch(() => {
          navigate("/");
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return { accessToken, refreshToken, expiresIn };
};

export default useAuth;
