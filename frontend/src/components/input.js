import React from 'react'
import '../style.css'

const Input = ({ type, value, onChangeValue }) => {
    return (
        <div className="max-width">
            <input
                className="max-width input"
                type={type}
                value={value}
                onChange={event => onChangeValue(event.target.value)}
            />
        </div>
    )
}

export default Input
