import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import { Icon, Divider, Header, Avatar } from 'react-native-elements'



const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  iconStyle: {
    margin: 50,
    alignItems: 'flex-start',
    top: 20,
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 0,
    left: 20,
    color: '#ffffff'
  }
});

export default function Sidemenu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>

      <View style={{ top: 50 }}>
        <View style={{ flexDirection: 'row',alignContent:'center' }}>
          <Avatar
            medium
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            activeOpacity={0.7}
          />
          <View style={{ flexDirection: 'column',justifyContent: 'space-between'}}>
            <Text style={{ left: 20,top:20 }}>Username</Text>
          </View>
        </View>
        <Divider style={{ right: 20, top: 50 }} />

      </View>

      {/* Body View */}

      <View style={{
        top: 100, justifyContent: 'space-between',
      }}>
        <TouchableOpacity style={styles.iconStyle}>
          <Icon name='file-multiple'
            type='material-community'
            color='#ffffff'
          />
          <Text style={styles.textStyle}>รายงาน</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconStyle}>
          <Icon name='account-settings-variant'
            type='material-community'
            color='#ffffff'
          />
          <Text style={styles.textStyle}>การตั้งค่า</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconStyle}>
          <Icon name='logout-variant'
            type='material-community'
            color='#ffffff'
          />
          <Text style={styles.textStyle}>ลงชื่อออก</Text>
        </TouchableOpacity>

      </View>


    </ScrollView>
  );
}

Sidemenu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};