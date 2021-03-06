import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet, Image, Button, SafeAreaView } from 'react-native';
import { Camera, Permissions, MediaLibrary } from 'expo';
import { Spinner } from 'native-base';


export default class CameraExample extends React.Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            encodedData: null,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            img: '',
        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    _capture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync().then((data) => {
            this.setState({
                loading: true,
                img: data.uri
            }, async () => {
                console.log("asdasdasd")
                const asset = await MediaLibrary.createAssetAsync(data.uri);
                console.log('asset', asset);
                /*MediaLibrary.createAlbumAsync('Expo', asset)
                .then(() => {
                    //Alert.alert('Album created!')
                })
                .catch(error => {
                    //Alert.alert('An Error Occurred!')
                });*/
            })
            this._apiCall(data.uri)
          });
          console.log(photo);
        
        }
    };

    async _apiCall(uri){
        const { navigate } = this.props.navigation;
        let localUri = uri;
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

    }

    render() {
        const { hasCameraPermission,loading } = this.state;
        if(loading)
            return(
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                          <Image style={{width: 150,height: 300}} source={{uri : this.state.img}} />
                    <Spinner color='red' />
                    <Text>Image is being processed </Text>
                </View>
            )
        else if (hasCameraPermission === null) {
        return <View />;
        } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
        } else {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} ref={ref => { this.camera = ref; }} type={this.state.type}
                //skipProcessing = { true }
                autoFocus = {true}
                ratio = {"16:9"}
                pictureSize={ "1920x1080" }
            >
                <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                }}>
                <TouchableOpacity
                    style={{
                    //flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    fontFamily: 'Roboto'
                    }}>
                    <Button
                        title="Capture"
                        onPress={() => { this._capture()}}
                    />
                </TouchableOpacity>
                </View>
            </Camera>
            </View>
            </SafeAreaView>
        );
        }
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