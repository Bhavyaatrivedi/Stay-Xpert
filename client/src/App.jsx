import {Route, Routes} from "react-router-dom";
import IndexPage from "./page/IndexPage";
import LoginPage from "./page/LoginPage";
import Layout from "./Layout";

function App() {
 
  return (
   <Routes>
    <Route path="/" element={<Layout/>}/>
    <Route index element = {<IndexPage />}/>
    <Route path="/login" element={<LoginPage/>}/>
   </Routes>
  )
}

export default App
