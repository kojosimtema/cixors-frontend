import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import login_image from '../../assets/images/default_background.jpg'

const VerifyUser = () => {
    const [userVerified, setUserVerified] = useState(false);
    const [message, setMessage] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [codeResent, setCodeResent] = useState('');
    
    const { email } = useParams();

    const userVerification = () => {
        fetch(`/auth/verify/${email}`, {
            method: 'PUT',
            body: JSON.stringify({
                verification_code: verificationCode,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(data => {
            setUserVerified(data.success);
            setMessage(data.message);
        })
        .catch(err => console.log(err));
    }

    const resendVerificationCode = () => {
        fetch(`/auth/verify/${email}`)
        .then(response => response.json())
        .then(data => {
            // setUserVerified(data.success);
            setCodeResent(data.message);
        })
        .catch(err => console.log(err));
    }

    const handleVerification = (e) => {
        e.preventDefault();
        userVerification();
    }

    const resendCode = (e) => {
        e.preventDefault();
        resendVerificationCode();

        window.setTimeout(
            
            function redirectPage()
            {
                setCodeResent('')
            }, 5000);
        
    }

    const verified = () => {
        window.setTimeout(
            
            function redirectPage()
            {
                window.location.replace('/signin')
            }, 2000);  
    }

    return (
        <>
            {
                userVerified && 
                verified()                
            }
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" style={{marginLeft: '16rem'}}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" style={{width: '5rem', height: '5rem', borderRadius: '50%'}} src={login_image} alt="Login" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Verify your Email</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleVerification}>
                        <div>
                            <div className="flex items-center justify-between">
                                <label for="verification" className="block text-sm font-medium leading-6 text-gray-900">Verification Code</label>
                                <div className="text-sm">
                                    <button type='button' onClick={resendCode} className="font-semibold text-indigo-600 hover:text-indigo-500">Resend Code</button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input id="username" name="verification-code" type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required className="username block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl font-bold sm:leading-6" />
                            </div>
                        </div>
                        {
                            !userVerified &&
                            <span style={{color: 'red'}}>{message}</span>
                        }
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Verify</button>
                        </div>
                    </form>
                </div>
                {
                    userVerified &&
                    <div id="alert-3" style={{top: '60px'}} class="success-alert flex p-4 mb-4 text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <div style={{fontSize: '15px', fontWeight: '600'}} class="ml-3 text-sm font-medium">
                            {message}
                        </div>
                    </div>
                }
                {
                    codeResent &&
                    <div id="alert-3" style={{top: '60px'}} class="success-alert flex p-4 mb-4 text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <div style={{fontSize: '15px', fontWeight: '600'}} class="ml-3 text-sm font-medium">
                            {codeResent}
                        </div>
                    </div>
                }
            </div>
        </>
    );
}
export default VerifyUser;