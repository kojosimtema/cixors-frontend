import './NotFound.css';

const NotFound = () => {
    return (
        <>
            <div className='not-found'>
                <h1 className='text-3xl' >
                    PAGE NOT FOUND
                </h1>
                <p className='text-xl'>You might have clicked on a bad or invalid link</p>
            </div>
        </>
    );
}
export default NotFound;