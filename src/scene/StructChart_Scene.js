import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import SideMenu from 'react-native-side-menu';

import Sidemenu_comp from './Sidemenu_Scene';

import Structchart_comp from '../component/Structchart_comp';

import { Icon, Divider, Header } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

const image = require('../../bg/ic_list_48pt.png');

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 20,
        padding: 10,
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default class StructChart_Scene extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            selectedItem: 'About',
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });

    render() {
        const menu = <Sidemenu_comp onItemSelected={this.onMenuItemSelected} />;

        return (


            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}>

                <View style={{ backgroundColor: '#FFFFFF', flex: 1, padding: 30 }}>

                    <Header
                        centerComponent={{ text: 'Home' }}
                        backgroundColor={'#fff'}
                    >

                    </Header>

                    <Structchart_comp />

                </View>


                <TouchableOpacity
                    onPress={this.toggle}
                    style={styles.button}
                >
                    <Image
                        source={image}
                        style={{ width: 25, height: 25 }}
                    />

                </TouchableOpacity>

            </SideMenu>


        );
    }
}