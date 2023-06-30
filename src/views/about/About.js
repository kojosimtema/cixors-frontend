import customizeImg from '../../assets/images/plm-customization.jpg';
import QRCodeImg from '../../assets/images/qrcode.png';
import analyticsImg from '../../assets/images/analytics.png';
import shortUrlImage from '../../assets/images/URL-shortener.png';

const About = () => {
    return (
        <>
            <div className='homepage-wrapper'>
                <div className='about-main'>
                    <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
                        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                            <button type="button" class="text-white bg-gray-800  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <a href='/signin'>Get started</a>
                            </button>
                        </div>
                    </nav>
                    <div style={{marginTop: '70px', marginBottom: '70px'}} className='about-main'>
                        <div className='about-img'> 
                            <img src={shortUrlImage} alt=''/>
                            {/* <img src={linkImage} alt=''/> */}
                            <img src={customizeImg} alt=''/>
                            <img src={QRCodeImg} alt=''/>
                            <img src={analyticsImg} alt=''/>                            
                        </div>
                        <div className='about'>
                            <h1 class="text-teal-600 mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white">
                                About CIXORS
                            </h1>
                            <p class="text-2xl mb-3 text-gray-500 dark:text-gray-400">
                                In today’s world, it’s important to keep things as short as possible, and this applies to more concepts than you may realize. 
                                From music, speeches, to wedding receptions. Cixors is a simple tool which makes URLs as short as possible. 
                            </p>
                            <h2 class="text-4xl font-extrabold dark:text-white">
                                URL Shortening
                            </h2>
                            <p class="text-xl mb-3 text-gray-500 dark:text-gray-400">
                                Cixors allows users to shorten URLs by pasting a long URL into the Cixors platform
                                and a shorter URL gets automatically generated. The shortened URL is designed to be as short as possible,
                                making it easy to share on social media or through other channels.
                            </p>
                            <h2 class="text-4xl font-extrabold dark:text-white">
                                Custom Urls
                            </h2>
                            <p class="text-xl mb-3 text-gray-500 dark:text-gray-400">
                                Cixors also allows users to customize their shortened URLs. 
                                Users can customize the shorl URL to reflect their brand or content. To choose their own custom domain name as well,
                                users will need to integrate our API on thier website and send a request with thier customized domian name. Our API can be found 
                                <a href='https://cixors.onrender.com/'><span class="text-blue-600 dark:text-blue-500"> here. </span></a>
                                This feature is particularly useful for individuals or small businesses who want to create branded links for their 
                            </p>
                            <h2 class="text-4xl font-extrabold dark:text-white">
                                QR Code Generation
                            </h2>
                            <p class="text-xl mb-3 text-gray-500 dark:text-gray-400">
                                Cixors allows users to also generate QR codes for the shortened URLs. Users can download 
                                the QR code image and use it in their promotional materials or/and on their website. 
                            </p>
                            <h2 class="text-4xl font-extrabold dark:text-white">
                                Analytics
                            </h2>
                            <p class="text-xl mb-3 text-gray-500 dark:text-gray-400">
                                Cixors provides basic analytics that allow users to track their shortened URL's performance. 
                                Users can see how many clicks their shortened URL has received and where the clicks are coming from
                            </p>
                            <h2 class="text-4xl font-extrabold dark:text-white">
                                Link History
                            </h2>
                            <p class="text-xl mb-3 text-gray-500 dark:text-gray-400">
                                Cixors allows users to see the history of links they’ve created so they 
                                can easily find and reuse links they have previously created.
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
export default About;