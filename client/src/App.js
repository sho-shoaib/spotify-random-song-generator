import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

// After logging in with spotify we will get a code query in URL, after we get that code we pass it in Home which then passes it in useAuth, then it makes a backend call to /login which uses spotify-web-api to get access token. This token is needed to get genres and play songs

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
