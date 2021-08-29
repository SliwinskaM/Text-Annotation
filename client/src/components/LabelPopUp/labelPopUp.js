import React from 'react';
import './styles.css'

function LabelPopUp(){
    //console.log(global.trigger);
    // return(props.trigger) ? (
    //     <div class="popup">
    //        User:  {localStorage.getItem('labelUser')}
    //     </div>

    // ) :
   return (<div className="popuplabel">
        Place mouse over label to check it's details
        </div>
   )
}
export default LabelPopUp;