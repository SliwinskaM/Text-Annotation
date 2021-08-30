import React from 'react';
import './styles.css'

function LabelPopUp(props){
    console.log("hifhlehflhew")
    return(props.trigger) ? (
        <div class="popuplabel">
           User:  {localStorage.getItem('userLabel')}
        </div>

    ) :
   (<div className="popuplabel">
        Place mouse over label to check it's details
        </div>
   )
}
export default LabelPopUp;