import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';
import AuxWithClass from '../../../hoc/AuxWithClass';

const CONTROLS = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (

    <AuxWithClass classes={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {CONTROLS.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}

        <button>Order Now</button>

    </AuxWithClass>

);

export default buildControls;