import {Route, Routes} from "react-router-dom";
import IndexPage from "./page/IndexPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage"
import Layout from "./Layout";
import axios from "axios";
import {UserContextProvider} from "./UserContext";
import AccountPage from "./page/AccountPage";

axios.defaults.baseURL = ' http://127.0.0.1:5173/'
axios.defaults.withCredentials = true;

function App() {
 
  return (
    <UserContextProvider>
   <Routes>
    <Route path="/" element={<Layout/>}/>
    <Route index element = {<IndexPage />}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/account/:subpage?" element={<AccountPage />} />
    {/* <Route path="/account/places" element={<AccountPage />} />
    <Route path="/account/bookings" element={<AccountPage />} /> */}
   </Routes>
   </UserContextProvider>
  )
}

export default App
