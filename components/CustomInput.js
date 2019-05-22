import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Label, Input, Form, Item} from 'native-base';

class CustomInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            test : ''
        }
    }

    render(){

        const { label,value } = this.props;

        return(
            <Form>
                <Item floatingLabel>
                    <Label >{label}</Label>
                    <Input
                        value={value}
                        onChange = {this.props.onValueChange}
                    />
                </Item>
            </Form>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        color: '#CBCBCB'
    }
})

export default CustomInput;