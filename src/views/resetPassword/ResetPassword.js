import './ResetPassword.css';
import { useState } from 'react';
import login_image from '../../assets/images/default_background.jpg'

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const resetPassword = () => {
        fetch(`/auth/resetpassword/${email}`, {
            method: 'PUT',
            body: JSON.stringify({
            email: email,
            }),
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(data => {
            setSuccess(data.success)
            setMessage(data.message)
        })
    }

    const handleResetPass = (e) => {
        e.preventDefault();
        resetPassword();
    }
    
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" style={{marginLeft: '16rem'}}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" style={{width: '5rem', height: '5rem', borderRadius: '50%'}} src={login_image} alt="Login" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset Your Password</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleResetPass}>
                        <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autocomplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="email block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        {
                            !success &&
                            <span style={{color: 'red'}}>{message}</span>
                        }
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Reset Password</button>
                        </div>
                    </form>
                </div>
                {
                    success &&
                    <div id="alert-3" class="success-alert flex p-4 mb-4 text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <div class="ml-3 text-sm font-medium">
                            {message}
                        </div>
                    </div>
                }
            </div>
        </>
    );
}
export default ResetPassword;