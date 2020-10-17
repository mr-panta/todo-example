import React from 'react'
import '../style.css'

const Button = (props) => {
    return (
        <div>
            <button
                className="button"
                onClick={props.onClick}
            >
                {props.label}
            </button>
        </div>
    )
}

export default Button
