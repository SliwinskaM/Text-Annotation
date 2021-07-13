import React from 'react';
import './styles.css'
import { loadLabels } from '../../marking.js';
//<button className="close-btn" onClick = {localStorage.setItem('trigger',false)}>X</button>
function Popup(props) {
    console.log(global.trigger);
    loadLabels();
    return(props.trigger) ? (
        <div className="popup">
                
                {props.children}
                <div className="popup-inner">
                    {localStorage.getItem('text')}
                </div>
        </div>

    ) : "";
}

export default Popup