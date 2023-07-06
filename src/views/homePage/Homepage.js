import './Homepage.css';
import { useState, useEffect } from 'react';
import About from '../about/About';

const Homepage = () => {
    const [topUrl, setTopUrl] = useState([]);
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [alert, setAlert] = useState(false);
    const [failedMessage, setFailedMessage] = useState('')
    const [tokenValid, setTokenValid] = useState();
    const [tokenExp, setTokenExp] = useState('');

    const host = window.location.host
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id')


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

    
    useEffect(() => {
        const fetchTopUrl = () => {
            fetch(`/scx/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })         
            .then(response => response.json())
            .then(data => setTopUrl(data))
            .catch(err => console.log(err.message))
        };

        if (token){
            fetchTopUrl();
        }

    }, [userId, token])


    const generateShortUrl = async (long_url) => {
        await fetch('/scx/', {
          method: 'POST',
          body: JSON.stringify({
            long_url: long_url,
            host_url: `${host}/cx/`,
         }),
         headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`  },
        })
        .then(response => response.json())
        .then(data => {
            setShortUrl(data);
            setFailedMessage(data.message);
        })
        .catch(err => console.log(err))
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        generateShortUrl(longUrl);
    };

    const copyShortUrl = () => {
        navigator.clipboard.writeText(shortUrl.short_url);
        setAlert(true);
    };

    const closeAlert = () => {
        setAlert(false);
    };
    

    return (
        <>
            {   
                !token &&
                <About />
            }
            <div className='homepage-wrapper'>
                
                {
                    token && 
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label for="long_url" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">Your URL</label>
                                <input type="text" id="long-url" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter or paste your URL here" required />
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate Short Url</button>
                        </form>
                        <div className='short-url-result bg-gray-900'>
                            {
                                !shortUrl && 'Your short URL will be displayed here'
                            }
                            {
                                shortUrl && 
                                <div style={{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
                                    <p>{longUrl.length > 35 ? longUrl.slice(0, 35) + '...' : longUrl}</p>
                                    <p>{shortUrl.short_url}</p>
                                    <button onClick={copyShortUrl} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Copy</button>
                                </div>
                            }
                        </div>
                        {
                            failedMessage &&
                            <span style={{color: 'red', position: 'relative', top: '150px', textAlign: 'center'}}>
                                {failedMessage}
                            </span>
                        }
                        {
                            alert &&
                            <div id="alert-3" class="flex p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <div class="ml-3 text-sm font-medium">
                                    URL copied to clipboard
                                </div>
                                <button type="button" onClick={closeAlert} class="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                        }
                        <div className='top-url-wrapper'>
                            <h1 className='text-2xl'> TOP PERFORMING URL's</h1>
                            <div className='top-url bg-gray-900'>
                                {
                                topUrl.slice(0, 5).map((url) =>{
                                    return (
                                        <div className='top-short-url bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium' key={url.id}>
                                            <a href={url.long_url} target='_blank' rel='noreferrer'>{url.short_url}</a>
                                            <div className='clicks text-white rounded-md px-3 py-2 text-4xl font-large'>
                                                {url.clicks}
                                                <span className='font-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'>
                                                    Click{url.clicks === 1 ? '' : 's'}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                
                                })
                            }
                            </div>
                        </div>
                    </div>
                }
                

            </div>
        
        </>
    );
}

export default Homepage;