import React from 'react'

const Loading = ({ children, loading }) => {
    return (
        <div style={{
            overflow: "hidden"
        }}>
            <div className={`loader ${loading && "loading"}`}></div>
            {children}
        </div>
    )
}

export default Loading