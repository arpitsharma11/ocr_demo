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
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
        //aspect: [4, 3],
        });

        console.log("Normal",result.uri);

        if (!result.cancelled) {
            this.setState({
                loading: true,
                img: result.uri
            })
            console.log("in");
            let localUri = result.uri;
            let filename = localUri.split('/').pop();

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            // Upload the image using the fetch and FormData APIs
            let formData = new FormData();
            // Assume "photo" is the name of the form field the server expects
            formData.append('photo', { uri: localUri, name: filename, type });
            console.log('filename',formData);
            this.setState({
                loading: true
            })
            const res = await fetch('http://172.16.17.131:5000/test', {
              method: 'POST',
              body: formData,
              headers: {
                'content-type': 'multipart/form-data',
              },
            });
            const responseJson = await res.json();
            console.log("response", responseJson);

            console.log("out");
            this.setState({
                loading: false
            })
            navigate('Result',{
                amount: responseJson.amount,
                provider_name: responseJson.provider_name,
                provider_address: responseJson.provider_address,
                guarantor_number: responseJson.guarantor_number,
                guarantor_name: responseJson.guarantor_name
            });

        };
    }

    _openCam = () => {
        const { navigate } = this.props.navigation;
        navigate('Camera',{});
    }

    _pickImageCrop = async () => {
        const { navigate } = this.props.navigation;

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,5],
        });

        if (!result.cancelled) {
            console.log("Normal",result.uri);
            this.setState({

                loading: true
            })
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
                /*navigate('Result',{
                    amount: res.amount,
                    provider_name: res.provider_name,
                    provider_address: res.provider_address
                });*/
            }, (error) => {
                console.log(error);
            })
        };
    }

    _apiCall = async (data) => {
      let localApi = '172.16.17.131:5000/test'
      console.log("api call",data);
        try {
            let response = await fetch(localApi,{
                method: 'POST',
                body: JSON.stringify({ img: data}),
                headers:{
                  'Content-Type':'application/json'
                }
            });
           let responseJson = await response.json();
           console.log("response", responseJson);
            return responseJson
        } catch (error) {
            console.error(error);
        }
    }

    render() {

        let { loading, encodedData } = this.state;

        if(loading)
            return(
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                          <Image style={{width: 150,height: 300}} source={{uri : this.state.img}} />
                    <Spinner color='red' />
                    <Text>Image is being processed </Text>
                </View>
            )
        else
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ paddingBottom: 10 }} >
                        <Button
                            title="Open camera"
                            onPress={this._openCam}
                        />
                    </View>    
                        <Button
                            title="Pick an image from camera roll"
                            onPress={this._pickImage}
                        />
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
