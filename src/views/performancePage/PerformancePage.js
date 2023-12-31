import './PerformancePage.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom/cjs/react-router-dom";


const PerformancePage = () => {

    const [tokenValid, setTokenValid] = useState();
    const [shortUrl, setShortUrl] = useState('');
    const [longUrl, setLongUrl] = useState('');
    const [urlClicks, setUrlClicks] = useState();
    const [urlAnalyitics, setUrlAnalytics] = useState([]);
    const [tokenExp, setTokenExp] = useState('');

    const { url_id } = useParams()

    const token = localStorage.getItem('token')


    useEffect(() => {
        const checkValidToken = () => {
            fetch(`/auth/checkvalidtoken/${token}`)
            .then(response => response.json())
            .then(data => {
                setTokenValid(data.valid_token);
                setTokenExp(data.msg);
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
        const fetchUrl = () => {
            fetch(`/scx/${url_id}`)         
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setShortUrl(data.short_url);
                setLongUrl(data.long_url);
                setUrlClicks(data.clicks);
                setUrlAnalytics(data.analytics);
            })
            .catch(err => console.log(err))
        };

        fetchUrl();
    }, [url_id])
 
    
    return (
        
        <>
            {
                token &&
                <div className='homepage-wrapper'>
                    <div id='pf' class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div class="head p-5 text-3xl font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                            URL Analytics
                        </div>
                        <table class="w-full text-xl text-left text-gray-500 dark:text-gray-400">
                            
                            <thead class="text-xl text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        <Link to={longUrl} target='_blank' rel='noreferrer'>{shortUrl}</Link>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                    <Link to={longUrl} target='_blank' rel='noreferrer'>{longUrl}</Link>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        {urlClicks} <span className='fpx-6 py-3'> Click{urlClicks === 1 ? '' : 's'}</span>
                                    </th>
                                </tr>
                            </thead>     
                        </table>
                        <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                            {
                                urlAnalyitics &&
                                urlAnalyitics.map((analytic) => {
                                    return (
                                            <li class="pb-3 sm:pb-4">
                                                <div class="flex items-center space-x-4">
                                                    <div class="text-xl inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        Visitor:
                                                    </div>
                                                    <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
                                                        {analytic.user_agent}
                                                    </p>
                                                </div>
                                                <div class="flex items-center space-x-4">
                                                    <div class="text-xl inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        Location:
                                                    </div>
                                                    <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
                                                        {analytic.address}
                                                    </p>
                                                </div>
                                                <div class="flex items-center space-x-4">
                                                    <div class="text-xl inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                        IP Address:
                                                    </div>
                                                    <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
                                                        {analytic.ip_address}
                                                    </p>
                                                </div>
                                            </li>
                                        

                                    )
                                })
                            } 
                        </ul>
                    </div>
                </div>
            }
            {
                !token &&
                window.location.replace('/signin')
            } 
        </>
    )
}

export default PerformancePage;