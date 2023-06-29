

const Unauthorized = () => {
    return (
        <>
            <div className='not-found'>
                <h1 className='text-3xl' style={{marginBottom: '30px'}}>
                    UNAUTHORIZED
                </h1>
                <p className='text-xl'>You are not Authorized to perform this action</p>
            </div>
        </>
    );
}
export default Unauthorized;