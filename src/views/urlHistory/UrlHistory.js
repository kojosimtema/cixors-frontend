import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import './UrlHistory.css';
import copy from '../../assets/images/copy.jpg';


const UrlHistory = () => {

    const [copied, setCopied] = useState();
    const [urls, setUrls] = useState([]);
    const [deleted, setDeleted] = useState();
    const [tokenValid, setTokenValid] = useState();
    const [tokenExp, setTokenExp] = useState('');

    const userId = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')


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
        const fetchUserUrl = async () => {
            await fetch(`/scx/user/${userId}`)         
            .then(response => response.json())
            .then(data => setUrls(data))
            .catch(err => console.log(err))
        };

        if(userId){
            fetchUserUrl()
        }; 
    }, [userId])


    const deleteUrl = (id) => {
        fetch(`/scx/${id}`, {
        method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${token}`,
        },
        })         
        .then(response => response.json())
        .then(data => {
            setDeleted(data.message);
            // window.location.replace('/url/stats')
        })
        .catch(err => console.log(err))
    };

    const submitDeleteUrl = (url_id) => {
       if(window.confirm('Are you sure you want to delete this url?')){
        deleteUrl(url_id);
       };
    } 

    
    const copyUrl = (shortUrl) => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(1);

        // set disappearing notification
        window.setTimeout(
            
            function removethis()
            {
                setCopied(false)
            }, 4000);          
    }

    const closeAlert = () => {
        setDeleted('');
    };

    return (
        
        <>
            {
                token &&
                <div className='homepage-wrapper'>
                    <div id='history' class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <caption class="p-5 text-4xl font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                URL History
                            </caption>
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Short URL
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Long URL
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        No. Of Clicks
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    urls.map((url) =>{
                                        return (
                                            
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={url.id}>
                                                <td class="py-4">
                                                    {url.short_url}
                                                    
                                                </td>
                                                <td>
                                                    <button onClick={(e)=>{copyUrl(url.short_url)}} style={{width: '30px'}} className="hs-cp text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto text-center">
                                                        <img src={copy} alt='' />
                                                    </button>
                                                </td>
                                                <td class="py-4">
                                                    {url.long_url}
                                                </td>
                                                <td class="py-4">
                                                    {url.clicks}
                                                </td>
                                                <td class="py-4 text-right" style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                                                    <Link to={`/url/analytics/${url.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Analytics
                                                    </Link>
                                                    
                                                    <Link to={`/url/edit/${url.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Customize
                                                    </Link>
                                                    <button onClick={(e)=>{submitDeleteUrl(url.id)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>                                            
                                        
                                        )
                                    })
                                }
                            </tbody>                        
                        </table>
                    </div>
                    {
                        copied &&
                        <div id="alert-3" class="copy flex p-4 mb-4 text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <div class="ml-3 text-sm font-medium">
                                Url Copied
                            </div>
                        </div>
                    }
                    {
                        deleted &&
                        <div id="alert-3" class="delete flex p-4 mb-4 text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <div class="ml-3 text-sm font-medium">
                                {deleted}
                            </div>
                            <button type="button" onClick={closeAlert} class="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                                {/* <span class="sr-only">Close</span> */}
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    }
                </div>
            }
            {
                !token &&
                window.location.replace('/signin')
            } 
        </>
    )
}

export default UrlHistory;