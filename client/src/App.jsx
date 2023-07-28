import {Route, Routes} from "react-router-dom";
import IndexPage from "./page/IndexPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage"
import Layout from "./Layout";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
 
  return (
   <Routes>
    <Route path="/" element={<Layout/>}/>
    <Route index element = {<IndexPage />}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
   </Routes>
  )
}

export default App
