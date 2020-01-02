import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false
        };
    }

    updatePurchaseState = (ingr) => {
        //const ingr = {...this.state.ingredients};
        const sum = Object.keys(ingr)
            .map(igKey => { 
                return ingr[igKey];
            }).reduce((sum, el)=>{
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0});
    };

    addIngrHadler = (type) => {
        const odlCount = this.state.ingredients[type];
        const updatedCount = odlCount + 1;
        const updatedIngr = {
            ...this.state.ingredients
        };
        updatedIngr[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPirce = this.state.totalPrice;
        const newPrice = oldPirce + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngr });
        this.updatePurchaseState(updatedIngr);
    };

    removeIngrHadler = (type) => {
        const odlCount = this.state.ingredients[type];

        if (odlCount <= 0) {
            return;
        } 
        
        const updatedCount = odlCount - 1;
        const updatedIngr = {
            ...this.state.ingredients
        };
        updatedIngr[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPirce = this.state.totalPrice;
        const newPrice = oldPirce - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngr });
        this.updatePurchaseState(updatedIngr);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You continue');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                address: {
                    street: "Test street 1",
                    zipCode: "41351",
                    country: "Germany"
                },
                email: "test@test.com",
            },
            deliveryMethod: "fastest"
        };
        axios.post('/orders.json', order)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice} purchaseCancel={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientsAdded={this.addIngrHadler}
                    ingredientsRemoved={this.removeIngrHadler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    };
}

export default BurgerBuilder;