import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageStore } from 'react-native';
import { ImagePicker } from 'expo';
import { Spinner } from 'native-base';

export default class MainScreen extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            encodedData: null
        }
    }

    _pickImage = async () => {
        const { navigate } = this.props.navigation;
        this.setState({
            loading: true
        })
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
        //aspect: [4, 3],
        });

        console.log("Normal",result.uri);
        ImageStore.getBase64ForTag(result.uri, (result) => {
            //console.log(result);
            /*this.setState({
                encodedData: result
            })*/
        }, (error) => {
            console.log(error);
        })

        if (!result.cancelled) {
            this.setState({
                loading: false
            })
            console.log("in");
            await this._apiCall(result);
            console.log("out")
            navigate('Result',{
                amount: '10', 
                providerName: 'ABC',
                providerAddress: 'XYZ'
            });
        };
    }

    _pickImageCrop = async () => {
        const { navigate } = this.props.navigation;
        this.setState({
            loading: true
        })
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,5],
        });

        if (!result.cancelled) {
            console.log("Normal",result.uri);
            ImageStore.getBase64ForTag(result.uri, (result) => {
                //console.log(result);
                /*this.setState({
                    encodedData: result
                })*/
                console.log("in");
                const res = this._apiCall(result);
                this.setState({
                    loading: false
                })
                navigate('Result',{
                    amount: res.amount, 
                    provider_name: res.provider_name,
                    provider_address: res.provider_address
                });
            }, (error) => {
                console.log(error);
            })
        };
    }

    _apiCall = async (data) => {
        try {
            let response = await fetch('http://172.16.17.131:5000/test',{
                method: 'POST',
                body: "asdad"
            });
           let responseJson = await response.json();
            console.log( responseJson);
            return responseJson
        } catch (error) {
            console.error(error);
        }
    }

    render() {

        let { loading, encodedData } = this.state;

        if(loading)
            return(
                <Spinner color='red' />
            )
        else
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.botton}>
                        <Button
                            title="Pick an image from camera roll"
                            onPress={this._pickImage}
                        />
                    </View>
                    <View style={styles.botton}>
                        <Button
                            title="Pick an image from camera roll with crop"
                            onPress={this._pickImageCrop}
                            style={styles.botton}
                        />
                    </View>
                </View>
            );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botton: {
      paddingBottom : 6
  }
});
