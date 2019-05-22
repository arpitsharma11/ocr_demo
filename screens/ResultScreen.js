import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

import CustomInput from '../components/CustomInput';

class ResultScreen extends Component{

    static navigationOptions = {
        title: 'Verify',
    }

    constructor(props){
        super(props);
        this.state = {
            amount: this.props.navigation.getParam('amount', ''),
            providerName: this.props.navigation.getParam('provider_name', ''),
            providerAddress: this.props.navigation.getParam('provider_address', ''),
        }
    }

    _amountChange = (event) => {
        this.setState({
            amount: event.nativeEvent.text
        })
    }

    _providerNameChange = (event) => {
        this.setState({
            providerName: event.nativeEvent.text
        })
    }

    _providerAddressChange = (event) => {
        this.setState({
            providerAddress: event.nativeEvent.text
        })
    }

    render(){

        const { amount, providerName, providerAddress } = this.state;

        return(
            <View>
                <Text style={styles.heading}>Provider Information</Text>
                <CustomInput
                    value={amount}
                    label="Amount"
                    onValueChange = { this._amountChange }
                />
                <CustomInput
                    value={provider_name}
                    label="Provider Name"
                    onValueChange = { this._providerNameChange }
                />
                <CustomInput
                    value={provider_address}
                    label="Provider Address"
                    onValueChange = { this._providerAddressChange }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    heading: {
        paddingTop: '8%',
        paddingLeft : '4%',
        fontSize: 18
    }
});

export default ResultScreen;