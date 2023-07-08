import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect, useRef } from "react";
import login_image from '../../assets/images/default_background.jpg';
import Unauthorized from "../unauthorized/Unauthorized";
import './ChangePassword.css'

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [tokenValid, setTokenValid] = useState();
    const [tokenExp, setTokenExp] = useState('');

    const { username } = useParams();

    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('username');

    const passwords = useRef('');

    
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

    // Disappearing Message
    useEffect(() => {
        if (success){
            const passChange = document.querySelector('.success-alert');
            setPassword('');
            setNewPassword('');
            setConfirmPass('');

            window.setTimeout(
            
                function removethis()
                {
                    passChange.style.display = 'none';
                }, 4000); 
        }
    }, [success])

    const changePassword = () => {
        fetch(`/auth/change_password`, {
            method: 'PUT',
            body: JSON.stringify({
                old_password: password,
                new_password: newPassword,
                confirm_password: confirmPass,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            setSuccess(data.success);
            setMessage(data.message);
        })
        .catch(err => console.log(err));
    }

    const handleChangePass = (e) => {
        e.preventDefault();
        changePassword();
    }

    
    return (
        <>
            {
                token && username === currentUser ?
                <div id="change-pass" className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div style={{paddingTop: '40px'}} className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" style={{width: '5rem', height: '5rem', borderRadius: '50%'}} src={login_image} alt="Login" />
                        <h2  style={{marginTop: '10px'}} className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Change Password
                        </h2>
                    </div>
                    <div style={{marginBottom: '50px'}} className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleChangePass}>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Old Password</label>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" ref={passwords} value={password} onChange={(e) => setPassword(e.target.value)} autocomplete="current-password" required className="password block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label for="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="new_password" type="password" ref={passwords} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autocomplete="current-password" required className="password block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                                </div>
                                <div className="mt-2">
                                    <input id="confirm_pass" name="confirm_pass" type="password" ref={passwords} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} autocomplete="current-password" required className="password block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            {
                                success &&
                                <div style={{position: 'fixed', left: '670px', top: '20px', width: '300px'}} id="alert-3" class="success-alert flex p-4 mb-4 text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                                    <div class="ml-3 text-sm font-medium">
                                        {message}
                                    </div>
                                </div>
                            }
                            {
                                !success &&
                                <span style={{color: 'red'}}>{message}</span>
                            }
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Change</button>
                            </div>
                        </form>
                    </div>
                </div> :
                <Unauthorized />
            }
            
        </>
    )
}
export default ChangePassword;