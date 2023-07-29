import {Route, Routes} from "react-router-dom";
import IndexPage from "./page/IndexPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage"
import Layout from "./Layout";
import axios from "axios";
import {UserContextProvider} from "./UserContext";
//import AccountPage from "./page/AccountPage";
import BookingPage from "./page/BookingPage";
import BookingsPage from "./page/BookingsPage";
import PlacePage from "./page/PlacePage";
import PlacesFormPage from "./page/PlacesFromPage";
import PlacesPage from "./page/PlacesPage";
import ProfilePage from "./page/ProfilePage";


axios.defaults.baseURL = ' http://127.0.0.1:5173/'
axios.defaults.withCredentials = true;

function App() {
 
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/account/places" element={<PlacesPage />} />
        <Route path="/account/places/new" element={<PlacesFormPage />} />
        <Route path="/account/places/:id" element={<PlacesFormPage />} />
        <Route path="/place/:id" element={<PlacePage />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
      </Route>
    </Routes>
  </UserContextProvider>
  )
}

export default App
