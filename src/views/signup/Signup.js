import './Signup.css';
import login_image from '../../assets/images/default_background.jpg';
import { useState, useEffect } from 'react';


const Signup = () => {
    const [accesToken, setAccessToken] = useState('');
    const [failedSignup, setFailedSignup] = useState('');
    const [user, setUser] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');


    useEffect(() =>{
        setAccessToken(localStorage.getItem('token'))
    }, [])

    const signup = () => {
        fetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirm_password: confirmPass,
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
        })
        .then(response => response.json())
        .then(data => {
            setUser(data.id)
            setFailedSignup(data.message);
        })
        .then(err => console.log(err))
    };

   
    const submitSignupForm = (e)=>{
        e.preventDefault();
        signup();
    }

    const verifyUser = () => {
        window.setTimeout(
            
            function redirectPage()
            {
                window.location.replace(`/verify/${email}`)
            }, 5000);  
    }
   
    console.log(user)

    return (
        
        <>
            {
                user && 
                verifyUser()
            }
            {
                
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" style={{marginLeft: '16rem'}}>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" style={{width: '5rem', height: '5rem', borderRadius: '50%'}} src={login_image} alt="Login" />
                        <h2  style={{marginTop: '10px'}} className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a New Account</h2>
                    </div>
                    {
                        user &&
                        <div id="alert-3" style={{top: '27px', marginBottom: '27px'}} class="success-alert flex p-4 mb-4 text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <div style={{fontSize: '18px', fontWeight: '400'}} class="ml-3 text-sm font-medium">
                                {`Successfully signed up. Check your email "${email}" for Verification Code`}
                            </div>
                        </div>
                    }

                    <div style={{marginTop: '20px'}} className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={submitSignupForm}>
                            <div>
                                <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                                <div className="mt-2">
                                    <input id="username" name="username" type="text" autocomplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="username block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="email" autocomplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="email block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autocomplete="current-password" required className="password block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                                </div>
                                <div className="mt-2">
                                    <input id="confirm_pass" name="confirm_pass" type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} autocomplete="current-password" required className="password block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            {
                                failedSignup &&
                                <span style={{color: 'red'}}>{failedSignup}</span>
                            }
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
                        <p style={{textAlign: 'center', marginTop: '10px'}}>
                            Already have an account? Signin <a href='/signin' style={{color: 'blue'}}>Here</a>
                        </p>
                    </div>
                </div>
            }
            
        </>
    );
}
export default Signup;