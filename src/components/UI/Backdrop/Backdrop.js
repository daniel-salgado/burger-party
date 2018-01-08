import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => (

    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null

);


/* This also works
const backdrop = (props) => {

    let showBackdrop = null;

    if (props.show) {
        showBackdrop = <div className={classes.Backdrop} onClick={props.clicked}></div>
    }

    return showBackdrop;

};
*/

export default backdrop;