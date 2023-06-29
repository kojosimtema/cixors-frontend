import { Link } from "react-router-dom/cjs/react-router-dom";
import './Footer.css';


const Footer = () => {
    return (
        <>
        
            <footer style={{marginLeft: '257px', width: '81%'}} class="footer fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="https://www.linkedin.com/in/jason-simtema-513643bb/" target="_blank" rel="noreferrer" class="hover:underline">
                    Jason Kojo Simtema™</a>. All Rights Reserved.
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link to='/about' class="mr-4 hover:underline md:mr-6">About</Link>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/jason-simtema-513643bb/" class="mr-4 hover:underline md:mr-6" target="_blank" rel="noreferrer">LinkedIn</a>
                    </li>
                    <li>
                        <a href="https://github.com/kojosimtema" class="mr-4 hover:underline md:mr-6" target="_blank" rel="noreferrer">GitHub</a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/kojosimtema/" class="hover:underline md:mr-6" target="_blank" rel="noreferrer">Instagram</a>
                    </li>
                    <li>
                        <a href="https://twitter.com/KojoSta" class="mr-4 hover:underline md:mr-6" target="_blank" rel="noreferrer">Twitter</a>
                    </li>
                    <li>
                        <a href="https://hashnode.com/@kojosimtema" class="mr-4 hover:underline md:mr-6" target="_blank" rel="noreferrer">Blog</a>
                    </li>
                    <li>
                        <a href={'mailto:kojosimtema@gmail.com'} class="mr-4 hover:underline" target="_blank" rel="noreferrer">Email</a>
                    </li>
                </ul>
            </footer>
        </>
    );
}

export default Footer;