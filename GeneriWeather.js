import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  Image
} from 'react-native'

import Forecast from './components/Forecast'
import LocationButton from './components/LocationButton'
// import PhotoBackdrop from './components/PhotoBackdrop'
// import textStyles from './styles/typography';

const STORAGE_KEY = '@GeneriWeather:zip'
const API_URL = 'http://api.openweathermap.org/data/2.5/weather?'
const API_KEY = 'adc3bee64d54e6fecd1061e8b70a5c17'


class GeneriWeather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      forecast: null
    }

    // Bind event handlers, since we're using a ES2015 class.
    this._getForecastForZip = this._getForecastForZip.bind(this);
    this._getForecastForCoords = this._getForecastForCoords.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
    this._getForecast = this._getForecast.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((val) => {
        if (val !== null) {
          this._getForecastForZip(val)
        }
      })
      .catch((err) => console.warn(`AsyncStorage Err: ${err.message}`))
      .done()
  }

  _getForecastForZip(zip) {
    AsyncStorage.setItem(STORAGE_KEY, zip)
      .then(() => console.log(`Saved Selection to disk: ${zip}`))
      .catch((err) => console.log(`AsyncStorage Err: ${err.message}`))
      .done()

    this._getForecast(
      `${API_URL}zip=${zip},us&units=imperial&APPID=${API_KEY}`
    )
  }

  _getForecastForCoords(lat, lon) {
    this._getForecast(
      `${API_URL}lat=${lat}&lon=${lon}&units=imperial&APPID=${API_KEY}`
    )
  }

  _getForecast(url, cb) {
    fetch(url)
      .then((res) => res.json())
      .then((resJSON) => {
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

  _handleTextChange(e) {
    let zip = e.nativeEvent.text;
    this._getForecastForZip(zip);
  }

  render() {
    let content = null
    if (this.state.forecast !== null) {
      content = (
        <View style={styles.row}>
          <Forecast
            main={this.state.forecast.main}
            description={this.state.forecast.description}
            temp={this.state.forecast.temp}/>
        </View>
      )
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
                  style={[styles.mainText, styles.zipCode]}
                  returnKeyType='go'
                  onSubmitEditing={this._handleTextChange}/>
              </View>
            </View>
            <View style={styles.row}>
              <LocationButton onGetCoords={this._getForecastForCoords}/>
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
})


export default GeneriWeather
