import React from 'react'

const Loading = ({ children, loading }) => {
    return (
        <div style={{
            overflow: "hidden"
        }}>
            {/* {loading && <div className='w-full'>
                <div className=' flex items-stretch  w-[calc(300vw-810px)]'>
                    <div className='w-[calc(100vw-270px)] loading h-[40px] bg-gradient-to-r from-[#51a2ff] to-[blue]'></div>
                    <div className='w-[calc(100vw-270px)] loading h-[40px] bg-gradient-to-r from-[blue] to-[#51a2ff]'></div>
                    <div className='w-[calc(100vw-270px)] loading h-[40px] bg-gradient-to-r from-[#51a2ff] to-[blue]'></div>
                </div>
            </div>} */}
            <div className={`loader ${loading && "loading"}`}></div>
            {children}
        </div>
    )
}

export default Loading