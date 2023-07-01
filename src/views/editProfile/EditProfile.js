import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import login_image from '../../assets/images/default_background.jpg';
import Unauthorized from "../unauthorized/Unauthorized";

const EditProfile = () => {
    const [newUsername, setNewUsername] = useState('');
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [editError, setEditError] = useState('');
    const [tokenValid, setTokenValid] = useState();
    const [tokenExp, setTokenExp] = useState('');
    
    const { username } =  useParams();

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    const currentUser = localStorage.getItem('username')


    useEffect(() => {
        const checkValidToken = () => {
            fetch('/auth/checkvalidtoken', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                setTokenValid(data.valid_token);
                setTokenExp(data.msg);
            })
            .catch(err => console.log(err))
        }

        if (token){
            checkValidToken();
            if(tokenValid === false || tokenExp){
                window.alert(`Your Your session has expired, please signin again`);
                localStorage.clear();
                window.location.replace('/signin');
            }
        }
    }, [token, tokenValid, tokenExp])


    useEffect(()=>{
        const getUser = () => {
            fetch(`/users/${username}`)
            .then(response => response.json())
            .then(data => {
                setUsername(data.username);
                setEmail(data.email);
            })
            .catch(err => console.log(err))
        };

        getUser();
    }, [username]);


    const editUser = () => {
        fetch(`/users/${user_id}`, {
        method: 'PUT',
        body: JSON.stringify({
        username: userName,
        email: email,
        }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${token}`,
        },
        })
        .then(response => response.json())
        .then(data => {
            setNewUsername(data.username);
            setEditError(data.message);
        })
        .catch(err => console.log(err))
    }

    const handleEditUser = (e) => {
        e.preventDefault();
        editUser();
        if(newUsername){
            localStorage.setItem('username', newUsername);
        }
    }

    return (
        <>
            {
                newUsername &&
                window.location.replace(`/profile/${newUsername}`)
            }
            {
                token && currentUser == username ?
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" style={{marginLeft: '16rem'}}>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" style={{width: '5rem', height: '5rem', borderRadius: '50%'}} src={login_image} alt="Login" />
                        <h2  style={{marginTop: '10px'}} className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Edit Profile</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleEditUser}>
                            <div>
                                <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                <div className="mt-2">
                                    <input id="username" name="username" type="text" autocomplete="username" value={userName} onChange={(e) => setUsername(e.target.value)} required className="username block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xl sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" autocomplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="email block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xl sm:leading-6" />
                                </div>
                            </div>
                            {
                                editError &&
                                <span style={{color: 'red'}}>{editError}</span>
                            }
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                            </div>
                        </form>
                    </div>
                </div> :
                <Unauthorized />
            }
        </>
    );
}
export default EditProfile;