import './App.css';
import MainPage from './home/main'
import MenuPopupState from './navbar/Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MarketPlace from './MarketPlace/marketplace';
import MarketPlaceDetail from './MarketPlace/marketplaceDetail';
import Profile from './account/Profile'

// const Profile = () => <div>Your Profile Content</div>;
const Logout = () => <div>Logged Out Successfully</div>;

function App() {
  return (
    <div className="App">
          <Router>
          {/* Your PopupState Menu */}
          <MenuPopupState />

          {/* Define routes */}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/marketplace/:id" element={<MarketPlaceDetail/>} />
            <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
