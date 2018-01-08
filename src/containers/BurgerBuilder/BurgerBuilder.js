import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        purchasing: false,
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

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    };

    purchaseContinueHandler = () => {

        alert('Hey');

    };

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
            <Auxiliary>
                {/*Modal could be in a variable, But the animation will not work*/}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    />
                </Modal>

                <Burger ingredients={this.state.ingredients} />

                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseble={this.state.purchaseble}
                    ordered={this.purchaseHandler}
                />

            </Auxiliary>

        );

    }

}

export default BurgerBuilder;