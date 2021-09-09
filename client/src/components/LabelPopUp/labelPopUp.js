import React, { useState } from 'react';
import './styles.css'

function LabelPopUp(props){
    const [userLabel, setLabel] = useState(localStorage.getItem('userLabel'))

    function changeLabel(user){
        console.log("tutaj frajwrze")
        setLabel(user)
    }
    window._changeLabel = changeLabel

    return(props.trigger) ? (
        <div class="popuplabel">
           Created by:  {userLabel}
        </div>

    ) :
   (<div className="popuplabel">
        Place mouse over label to check its details
        </div>
   )
}
export default LabelPopUp;