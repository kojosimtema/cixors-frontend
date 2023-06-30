import './EditUrl.css';
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect, useState } from "react";
import login_image from '../../assets/images/default_background.jpg';


import dummyqr from '../../assets/images/qr-code.png'

const EditUrl = () => {
    const [urlPath, setUrlPath] = useState('');
    const [url, setUrl] = useState('');
    const [qrCode, setQrcode] = useState();
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [tokenValid, setTokenValid] = useState();
    const [tokenExp, setTokenExp] = useState('');
    
    const { id } = useParams();
    const token = localStorage.getItem('token');

    
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
        const fetchUrlToEdit = () => {
            fetch(`/scx/${id}`)
            .then(response => response.json())
            .then(data => {
                setUrlPath(data.url_path)
                setUrl(data.short_url)
                setQrcode(data.qr_code)
                console.log(data)
            })
            .catch(err => console.log(err))
        };

        fetchUrlToEdit();
    }, [id]);

    useEffect(() => {
        if (success){
            const urledited = document.querySelector('.edit-success')
            window.setTimeout(
            
                function removethis()
                {
                    urledited.style.display = 'none';
                }, 4000);   
        }
    }, [success])


    const editUrl = () => {
        fetch(`/scx/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
        url_path: urlPath,
        }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${token}`,
        },
        })         
        .then(response => response.json())
        .then(data => {
            setUrl(data.new_url);
            setSuccess(data.success);
            setMessage(data.message);
            // navigate(-1)
        })
        .catch(err => console.log(err))
    };

    const generateQRCode = () => {
        fetch(`/scx/${urlPath}/qrcode`, {
        method: 'PUT',
        body: JSON.stringify({
        url_path: urlPath,
        }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${token}`,
        },
        })         
        .then(response => response.json())
        .then(data => {
            setQrcode(data.qrcode);
            setMessage(data.message);
            // navigate(-1)
        })
        .catch(err => console.log(err))
    };

    const submitEditUrlForm = (e) => {
        e.preventDefault();
        editUrl();
    };

    
    const handleQrCode = (e) => {
        e.preventDefault();
        generateQRCode();
    };

    console.log(qrCode)
    // console.log()
    

    return (
        <>
            <div className='editUrl-wrapper'>
                {
                    success &&
                    <div style={{position: 'fixed', left: '670px', top: '20px', minWidth: '300px'}} id="alert-3" class="edit-success flex p-4 mb-4 text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <div style={{textAlign: 'center'}} class="ml-3 text-sm font-medium">
                            {message}
                        </div>
                    </div>
                }
                <div style={{paddingTop: '30px', paddingBottom: '20px'}} className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" style={{width: '5rem', height: '5rem', borderRadius: '50%'}} src={login_image} alt="Login" />
                    <h2  style={{marginTop: '10px'}} className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Edit URL
                    </h2>
                    <p className='text-center text-xl'>
                        You can customize your URL Path and Generate QRCode here
                    </p>
                </div>
                <form style={{marginBottom: '50px'}} className="space-y-6" onSubmit={submitEditUrlForm}>
                    <div>
                        <label for="url" className="block text-lg font-medium leading-6 text-gray-900">Short Url</label>
                        <div className="mt-2 edit-input">
                            <input name="url" type="text" value={url} readonly className="text-lg block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6" />
                        </div>
                    </div>
                    {/* <div>
                        <label for="host_url" className="block text-lg font-medium leading-6 text-gray-900">Host Url</label>
                        <div className="mt-2 edit-input">
                            <input name="host_url" type="text" value={hostUrl} readonly className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" />
                        </div>
                    </div> */}

                    <div>
                        <label for="url_path" className="block text-lg font-medium leading-6 text-gray-900">Url Path</label>
                        <div className="mt-2 edit-input">
                            {/* <input value={urlPath} onChange={(e) => setUrlPath(e.target.value)} /> */}
                            <input name="url_path" type="text" value={urlPath} onChange={(e) => setUrlPath(e.target.value)} required className="text-lg block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6" />
                        </div>
                    </div>
                    {
                        !success &&
                        <span style={{color: 'red'}}>{message}</span>
                    }
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </form>
                <div className='qrcode-wrapper'>
                    <div className="qrcode">
                        {
                            qrCode ? (
                                <img src={qrCode} alt="qrcode-img" />
                            ) : (
                                <img src={dummyqr} alt='dummy-qrcode' />
                            )
                        }
                        
                    </div>
                    <div className='qrcode-btns'>
                        <a href={qrCode} className={`${!qrCode ? 'disable-download' : ''} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Download QRCode</a>
                        {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download QRCode</button> */}
                        <button type="button" onClick={handleQrCode} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate QRCode</button>
                    </div>
                </div>
            </div>
            {/* <div>
                <div className="qrcode">
                    <img src="" alt="qrcode-img" />
                </div>
                <button>Download QRCode</button>
                <button>Generate QRCode</button>
            </div> */}
        </>
    );
}
export default EditUrl