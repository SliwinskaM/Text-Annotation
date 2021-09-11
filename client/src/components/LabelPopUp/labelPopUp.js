import React, { useState } from 'react';
import './styles.css'

function LabelPopUp(props){
    const [userLabel, setLabel] = useState("Place mouse over label to check its details")

    function changeLabel(user){
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