import './DisplayPage.css';
import {  useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "../../components/sideBar/SideBar";
import NotFound from '../notFound/NotFound';
import Footer from '../../components/footer/Footer';


const DisplayPage = () => {
    const { path_name } = useParams();
    const [longUrl, setLongUrl] = useState('');
    
    useEffect(() => {
      const fetchPage = () => {
        fetch(`/scx/${path_name}`)
        .then(response => response.json())
        .then(data => setLongUrl(data.long_url))
        .catch(err => console.log(err))
    };

      fetchPage();
  }, [path_name]);


    return(
        <>
  
          {longUrl && window.location.replace(longUrl)}
          {
            longUrl === null && 
              <>
                <SideBar />
                <NotFound />
                <Footer />
              </>
          }

        </>
        
    );
    
}
export default DisplayPage;