import React from 'react'
import loader_anim from './loader.svg';

const Loader = ({ children, loading}) => {
    return (
        <>
            {!loading ? (
                <>{children}</>
            ) : (
                <div className='w-full h-full flex items-center justify-center'>
                    <img src={loader_anim} />
                </div>
            )}
        </>
    )
}

export default Loader