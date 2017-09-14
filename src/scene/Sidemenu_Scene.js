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

import { Icon, Divider, Header, Avatar } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

const Window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: Window.width,
    height: Window.height,
    backgroundColor: '#8c4827',
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
  },
  headTextStyle: {

  }
});

export default function Sidemenu() {
  return (
    < ScrollView scrollsToTop={false} style={styles.menu} >

      <View style={{ top: 50 }}>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <Avatar
            medium
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            activeOpacity={0.7}
          />
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text style={{ left: 20, top: 20, color: '#ffffff' }}>User</Text>
          </View>
        </View>
        <Divider style={{ right: 20, top: 50 }} />

      </View>

      {/* Body View */}

      <View style={{
        top: 100, justifyContent: 'space-between',
      }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10, color: '#ffffff' }}>รายงานความก้าวหน้า</Text>
        <TouchableOpacity style={styles.iconStyle} onPress={() => Actions.Director_Scene()}>
          <Icon name='file-multiple'
            type='material-community'
            color='#ffffff'
          />
          <Text style={styles.textStyle}>แบ่งตามระดับชั้น</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconStyle} onPress={()=>Actions.Perprogress_Scene()}>
          <Icon name='file-multiple'
            type='material-community'
            color='#ffffff'
          />
          <Text style={styles.textStyle}>รายบุคคล</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconStyle} onPress={() => Actions.Login_Scene()}>
          <Icon name='logout-variant'
            type='material-community'
            color='#ffffff'
          />
          <Text style={styles.textStyle}>ลงชื่อออก</Text>
        </TouchableOpacity>

      </View>


    </ScrollView >
  );
}