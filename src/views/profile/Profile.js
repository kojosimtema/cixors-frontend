
import './Profile.css';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom/cjs/react-router-dom.min";
import globe from '../../assets/images/black-marble.png';
import NotFound from '../notFound/NotFound';

const Profile = () => {
    const [user, setUser] = useState('');
    const [urls, setUrls] = useState([]);
    const [tokenValid, setTokenValid] = useState();
    const [tokenExp, setTokenExp] = useState('');
    const { username } = useParams();

    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('username')


    useEffect(() => {
        const checkValidToken = () => {
            fetch(`/auth/checkvalidtoken/${token}`)
            .then(response => response.json())
            .then(data => {
                setTokenValid(data.valid_token);
                setTokenExp(data.message);   
            })
            .catch(err => console.log(err))
        }

        if (token){
            checkValidToken();
            if(tokenValid === false){
                window.alert(tokenExp);
                localStorage.clear();
                window.location.replace('/signin');
            }
        }
    }, [token, tokenValid, tokenExp])


    useEffect(()=>{
        const fetchUser = () => {
            fetch(`/users/${username}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setUrls(data.urls)
            })
            .catch(err => console.log(err))
        };

        fetchUser();
    }, [username])

   
    return (
        <> 
            {
                token && user.id &&
                
                <div style={{marginLeft: '256px', height: '642px'}}>
                    
                    <div className='profile-wrapper'>
                        <h2 style={{paddingTop: '50px'}} className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Your Profile
                        </h2>
                        <div className='profile-main'>
                            <div className='profile-img'>
                                <img src={globe} alt='globe' />
                            </div>
                            <div className='profile-details'>
                                <div className='details'>
                                    <h1>
                                        {user.username}
                                    </h1>
                                    <p>
                                        {user.email}
                                    </p>
                                </div>
                                <div className='profile-url'>
                                    <h1>
                                        Total URL's:
                                    </h1>
                                    <p>
                                        {urls.length}
                                    </p>
                                </div> 
                                {
                                    currentUser == username &&
                                    <div className='profile-btns'>
                                        <Link to={`/edit/${username}`} className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                            Edit Profile
                                        </Link>
                                        <Link to={`/changepassword/${username}`} className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                            Change Password
                                        </Link>
                                    </div>
                                }
                            </div>

                        </div>          
                    </div>
                </div>
                
            }
            {
                user.id === null &&
                <NotFound />
            }
            {
                !token &&
                window.location.replace('/signin')
            }
            
        </>
    );
}
export default Profile;