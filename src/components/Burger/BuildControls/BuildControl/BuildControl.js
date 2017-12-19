import React from 'react';

import classes from './BuildControl.css';
import AuxWithClass from '../../../../hoc/AuxWithClass';

const buildControl = (props) => (

    <AuxWithClass classes={classes.BuildControl}>

        <AuxWithClass classes={classes.Label}>{props.label}</AuxWithClass>
        
        <button
            className={classes.Less}
            onClick={props.removed}
            disabled={props.disabled}>Less</button>

        <button
            className={classes.More}
            onClick={props.added}>More</button>

    </AuxWithClass >

);

export default buildControl;
