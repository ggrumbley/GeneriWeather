import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';


class Button extends React.Component {
  propTypes: {
    onPress: React.PropTypes.func,
    label: React.PropTypes.string
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={[styles.button, this.props.style]}>
          <Text>
            {this.props.label}
          </Text>
        </View>
      </TouchableHighlight>
      );
  }
}

const styles = StyleSheet.create({
  button: {
      backgroundColor: '#FFDDFF',
      width: 200,
      padding: 25,
      borderRadius: 5
    },
})
export default Button;
