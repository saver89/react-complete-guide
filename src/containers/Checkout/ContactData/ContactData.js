import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text', placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text', placeholder: 'Your Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text', placeholder: 'Your ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text', placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email', placeholder: 'Your E-Mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value:"fastest", displayValue:"fastest"},
            {value:"cheapest", displayValue:"cheapest"}
          ]
        },
        value: ''
      }
    }
  };

  orderHandler = event => {
    this.setState({ loading: true });

    //alert('You continue');
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Max",
        address: {
          street: "Test street 1",
          zipCode: "41351",
          country: "Germany"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
        //console.log(error)
      });
  };

  render() {
    let FormC = (
      <form className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <Input elementType elementConfig value />
        <Input inputtype="input" name="email" placeholder="Your Mail" />
        <Input inputtype="input" name="street" placeholder="Street" />
        <Input inputtype="input" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      FormC = <Spinner />;
    }
    return <div>{FormC}</div>;
  }
}

export default ContactData;
