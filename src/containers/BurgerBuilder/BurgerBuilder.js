import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}
class BurgerBuilder extends Component {

    /*
    contructor (props){
        super(props);
        this.state= {...};
    }*/

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseble: false,

    }

    updatePurchaseState(ingredients) {

        //const ingredients = { ...this.state.ingredients };

        const sumIngredients = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sumIngredients, el) => {
                return sumIngredients + el;
            }, 0);

        this.setState({ purchaseble: sumIngredients > 0 });

    }

    addIngredientHandler = (type) => {

        //console.log('[BurgerBuilder.js addIngredientHandler] Before setState()', this.state);

        const curQunatity = this.state.ingredients[type];
        const newQauntity = curQunatity + 1;
        const updatedIngredients = { ...this.state.ingredients };

        updatedIngredients[type] = newQauntity;

        const priceUpdt = INGREDIENT_PRICES[type];
        const curPrice = this.state.totalPrice;
        const newPrice = curPrice + priceUpdt;

        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }
        );

        this.updatePurchaseState(updatedIngredients);
        //console.log('[BurgerBuilder.js] After setstate', this.state);

    }

    removeIngredientHandler = (type) => {

        //console.log('[BurgerBuilder.js addIngredientHandler] Before setState()', this.state);

        const curQunatity = this.state.ingredients[type];

        if (curQunatity <= 0)
            return;

        const newQauntity = curQunatity - 1;
        const updatedIngredients = { ...this.state.ingredients };

        updatedIngredients[type] = newQauntity;

        const priceUpdt = INGREDIENT_PRICES[type];
        const curPrice = this.state.totalPrice;
        const newPrice = curPrice - priceUpdt;

        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updatedIngredients
            }
        );

        this.updatePurchaseState(updatedIngredients);
        
        //console.log('[BurgerBuilder.js] After setstate', this.state);

    }

    render() {

        //console.log('[BurgerBuilder.js] Inside render()', this.state);

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {

            /* Line below is able to handle the both conditions
            if (disabledInfo[key] <= 0)
                disabledInfo[key] = true;
            else
                disabledInfo[key] = false;
            */

            disabledInfo[key] = disabledInfo[key] <= 0;

        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseble={this.state.purchaseble} />
            </Aux>
        );

    }

}

export default BurgerBuilder;