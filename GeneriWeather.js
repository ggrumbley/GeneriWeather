import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native'
import Forecast from './Forecast'

const API_URL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const API_KEY = 'adc3bee64d54e6fecd1061e8b70a5c17'


class GeneriWeather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zip: '',
      forecast: null
    }
  }

  _handleTextChange(event) {
    let zip = event.nativeEvent.text
    this.setState({ zip: zip })
    const URL = `${API_URL}${zip},us&APPID=${API_KEY}&units=imperial`
    fetch(URL)
      .then((res) => res.json())
      .then((resJSON) => {
        console.log(resJSON);
        this.setState({
          forecast: {
            main: resJSON.weather[0].main,
            description: resJSON.weather[0].description,
            temp: resJSON.main.temp
          }
        })
      })
      .catch((err) => console.warn(err))
  }

  render() {
    let content = null
    if (this.state.forecast !== null) {
      content = <Forecast
                  main={this.state.forecast.main}
                  description={this.state.forecast.description}
                  temp={this.state.forecast.temp} />
    }

    return (
        <View style={styles.container}>
          <Image source={require('./flowers.png')}
                 resizeMode='cover'
                 style={styles.backdrop}>
            <View style={styles.overlay}>
              <View style={styles.row}>
                <Text style={styles.mainText}>
                  Current weather for
                </Text>
                <View style={styles.zipContainer}>
                  <TextInput
                    style={[styles.zipCode, styles.mainText]}
                    onSubmitEditing={(e) => this._handleTextChange(e)}/>
                </View>
              </View>
              {content}
            </View>
          </Image>
        </View>
    )
  }
}

const baseFontSize = 16

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 30 },
  backdrop: { flex: 1, flexDirection: "column" },
  overlay: {
    paddingTop: 5,
    backgroundColor: "#000000",
    opacity: 0.5,
    flexDirection: "column",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    padding: 30
  },
  zipContainer: {
    height: baseFontSize + 10,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: { flex: 1, flexBasis: 1, width: 50, height: baseFontSize },
  mainText: { fontSize: baseFontSize, color: "#FFFFFF" }
});

export default GeneriWeather
