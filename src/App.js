
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DisplayPage from './views/displayPage/DisplayPage';
import Footer from './components/footer/Footer';
import SideBar from './components/sideBar/SideBar';
import Homepage from './views/homePage/Homepage';
import Signin from './views/signin/Signin';
import Signup from './views/signup/Signup';
import PerformancePage from './views/performancePage/PerformancePage';
import EditUrl from './views/editUrl/EditUrl';
import Profile from './views/profile/Profile';
import EditProfile from './views/editProfile/EditProfile';
import ChangePassword from './views/changePassword/ChangePassword';
import ResetPassword from './views/resetPassword/ResetPassword';
import VerifyUser from './views/verifyUser/VerifyUser';
import UrlHistory from './views/urlHistory/UrlHistory';
import About from './views/about/About';
import NotFound from './views/notFound/NotFound';
import Unauthorized from './views/unauthorized/Unauthorized';



function App() {
    return (
        <>
          {/* <NavBar /> */}
          {/* <Route path='/sc/:path_name' render={() => <DisplayPage />} /> */}
          <SideBar />
          <Switch>
            <Route path='/' exact render={() => <Homepage />} />
            <Route path='/sc/:path_name' render={() => <DisplayPage />} />
            <Route path='/signin' render={() => <Signin />} />
            <Route path='/signup' render={() => <Signup />} />
            {/* <Route path='/url/:path' render={() => <UrlPage />} /> */}
            <Route path='/url/analytics/:url_id' render={() => <PerformancePage />} />
            <Route path='/url/history' render={() => <UrlHistory />} />
            <Route path='/url/edit/:id' render={() => <EditUrl />} />
            <Route path='/profile/:username' render={() => <Profile />} />
            <Route path='/edit/:username' render={() => <EditProfile />} />
            <Route path='/changepassword/:username' render={() => <ChangePassword />} />
            <Route path='/resetpassword' render={() => <ResetPassword />} />
            <Route path='/about' render={() => <About />} />
            <Route path='/verify/:email' render={() => <VerifyUser />} />
            <Route path='*' render={() => <NotFound />} />
            <Route path='/changepassword/*' render={() => <Unauthorized />} />
            <Route path='/edit/*' render={() => <Unauthorized />} />
          </Switch>
          <Footer />
        </>
    );
}

export default App;
