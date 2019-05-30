import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

import CustomInput from '../components/CustomInput';

class ResultScreen extends Component{

    static navigationOptions = {
        title: 'Verify',
        headerTitleStyle: {
            fontFamily: 'Roboto',
            color: '#484A54',	
            fontSize: 18,
                fontWeight: 'bold',
                	lineHeight: 25
        }
    }

    constructor(props){
        super(props);
        this.state = {
            amount: this.props.navigation.getParam('amount', ''),
            provider_name: this.props.navigation.getParam('provider_name', ''),
            provider_address: this.props.navigation.getParam('provider_address', ''),
            guarantor_number:this.props.navigation.getParam('guarantor_number',''),
            guarantor_name: this.props.navigation.getParam('guarantor_name','')
        }
    }

    _amountChange = (event) => {
        this.setState({
            amount: event.nativeEvent.text
        })
    }

    _provider_nameChange = (event) => {
        this.setState({
            provider_name: event.nativeEvent.text
        })
    }

    _provider_addressChange = (event) => {
        this.setState({
            provider_address: event.nativeEvent.text
        })
    }

    _guarantor_numberChange = (event) => {
      this.setState({
        guarantor_number: event.nativeEvent.text
      })
    }

    _guarantor_nameChange = (event) => {
      this.setState({
        guarantor_name: event.nativeEvent.text
      })
    }

    render(){

        const { amount, provider_name, provider_address,guarantor_number,guarantor_name } = this.state;

        return(
            <View style={{paddingLeft:10}}>
                <Text style={styles.heading}>Provider Information</Text>
                <CustomInput
                    value={amount}
                    label="Amount"
                    onValueChange = { this._amountChange }
                />
                <CustomInput
                    value={provider_name}
                    label="Provider Name"
                    onValueChange = { this._provider_nameChange }
                />
                <CustomInput
                    value={provider_address}
                    label="Provider Address"
                    onValueChange = { this._provider_addressChange }
                />
                <Text style={styles.heading}>Guarantor Information</Text>
                <CustomInput
                    value={guarantor_number}
                    label="Guarantor Number"
                    onValueChange = { this._guarantor_numberChange }
                />
                <CustomInput
                    value={guarantor_name}
                    label="Guarantor Name"
                    onValueChange = { this._guarantor_nameChange }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    heading: {
        paddingTop: '8%',
        paddingLeft : '4%',
        paddingBottom:17,
        fontSize: 18,
        fontWeight:'bold'

    }
});

export default ResultScreen;
