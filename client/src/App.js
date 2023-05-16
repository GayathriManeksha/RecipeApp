import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import {Home} from "./pages/home";
import {Auth} from "./pages/auth";
import {CreateRecipe} from "./pages/create-recipe";
import {SavedRecipe} from "./pages/saved-recipe";
import  Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/auth" element={<Auth/>}></Route>
          <Route path="/create-recipe" element={<CreateRecipe/>}></Route>
          <Route path="/saved-recipe" element={<SavedRecipe/>}></Route>
        </Routes>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
