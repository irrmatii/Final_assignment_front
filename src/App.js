import './index.css';
import LogInPage from "./pages/LogInPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import Nav from "./components/Nav";
import SinglePostPage from "./pages/SinglePostPage";
import MessagesPage from "./pages/MessagesPage";
import CreatePostPage from "./pages/CreatePostPage";
import FavoritesPage from "./pages/FavoritesPage";
import SingleUserPage from "./pages/SingleUserPage";

function App() {
  return (
    <div className="w-full min-h-screen h-auto flex">
        <BrowserRouter>
            <Nav/>
            <Routes>
                <Route path="/" element={<LogInPage/>}/>
                <Route path="Register" element={<RegistrationPage/>}/>
                <Route path="Home" element={<HomePage/>}/>
                <Route path="Posts/:id" element={<SinglePostPage/>}/>
                <Route path="Messages" element={<MessagesPage/>}/>
                <Route path="CreatePost" element={<CreatePostPage/>}/>
                <Route path="Favorites" element={<FavoritesPage/>}/>
                <Route path="Users/:username" element={<SingleUserPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
