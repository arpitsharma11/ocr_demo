import React, { Component } from 'react';
import getTheme from '../native-base-theme/components'
import material from '../native-base-theme/variables/material';
import { StyleSheet, View } from 'react-native';
import { StyleProvider, Form, Item, Label, Input } from 'native-base';


type Props = {};
export default class CustomInput extends Component<Props> {

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Form style={{width:343}}>
                    <Item stackedLabel style={{borderColor: '#f5f4f8'}}>
                        <Label>{this.props.label}</Label>
                        <Input value={this.props.value}
                        onChange = {this.props.onValueChange}/>
                    </Item>
                </Form>
            </StyleProvider>)
    }
}
const styles = StyleSheet.create({

});

 
