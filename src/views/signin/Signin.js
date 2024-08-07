import './Signin.css'
import login_image from '../../assets/images/default_background.jpg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Signin = () => {
    const [accesToken, setAccessToken] = useState('');
    const [failedLogin, setFailedLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const [success, setSuccess] = useState(false);


    useEffect(() =>{
        setAccessToken(localStorage.getItem('token'))
    }, [])

    const login = async () => {
        setLoading(true)
      await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
        email: email,
        password: password,
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.success === true){
                setAccessToken(data.access_token);
                localStorage.setItem('user_id', data.user_id)
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('username', data.username);
                // window.location.href('/');
            }
            setFailedLogin(data.message);
            setLoading(false);
        })
        .then((err) => console.log(err))
    }

    const submitLoginForm = (e)=>{
        e.preventDefault();
        login();
    }
    

    return (
        
        <>
            {
                accesToken && window.location.replace('/')
            }
            {
                <div id='signin-wrapper' className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-10 w-auto" style={{width: '5rem', height: '5rem', borderRadius: '50%'}} src={login_image} alt="Login" />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={submitLoginForm}>
                            <div>
                                <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                <   input id="email" name="email" type="email" autocomplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="email block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <Link to="/resetpassword" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                                    </div>
                                </div>
                                <div className="mt-2">
                                <   input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autocomplete="current-password" required className="password block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            {
                                failedLogin &&
                                <span style={{color: 'red'}}>{failedLogin}</span>
                            }
                            {
                                loading ?
                                <div>
                                    <button type="button" disabled className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-not-allowed">Signing In..</button>
                                </div> :
                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                                </div>
                            }
                            
                        </form>
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm" >
                        <p style={{textAlign: 'center', marginTop: '10px'}}>
                            Do not have an account? Sign Up <Link to='/signup' style={{color: 'blue'}}>Here</Link>
                        </p>
                    </div>
                </div>
            }
            
        </>
    );
}
export default Signin;