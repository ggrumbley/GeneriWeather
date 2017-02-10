import React from 'react'
import { StyleSheet } from 'react-native'

import Button from './Button'

class LocationButton extends React.Component {
  propTypes: {
    onGetCoords: React.PropTypes.func.isRequired
  }

  _onPress() {
    navigator.geolocation.getCurrentPosition(
      (initPos) => {
        this.props.onGetCoords(initPos.coords.latitude,
          initPos.coords.longitude)
      },
      (err) => {alert(err.message)},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }

  render () {
    return (
      <Button label="Use CurrentLocation"
        style={styles.locationButton}
        onPress={this._onPress.bind(this)}/>
    )
  }
}

const styles = StyleSheet.create({
  locationButton: {
    backgroundColor: '#FFDDFF',
    width: 200,
    padding: 25,
    borderRadius: 5
  },
})

export default LocationButton;
