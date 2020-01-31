import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/ingredients.json')
            .then((response) => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({error: true});
            });
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
        
        const queryParams = [];
        for (let i in this.state.ingredients) {
          queryParams.push(
            encodeURIComponent(i) +
              "=" +
              encodeURIComponent(this.state.ingredients[i])
          );
        }
        queryParams.push("price="+this.state.totalPrice);
        const queryString = queryParams.join("&");
        this.props.history.push({
          pathname: "/checkout",
          search: "?" + queryString
        });
    };

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p>: <Spinner/>;
        if (this.state.ingredients) {
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientsAdded={this.addIngrHadler}
                    ingredientsRemoved={this.removeIngrHadler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
            </Aux>);

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                price={this.state.totalPrice} 
                purchaseCancel={this.purchaseCancelHandler} 
                purchaseContinue={this.purchaseContinueHandler}/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>                
                {burger}
            </Aux>
        );
    };
}

export default withErrorHandler(BurgerBuilder, axios);