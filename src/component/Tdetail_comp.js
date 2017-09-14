import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';

import { Header, Icon } from 'react-native-elements';

import Side_Menu from '../scene/Sidemenu_Scene';

import DetailList from './Tdetaillist_comp';

import Drawer from 'react-native-drawer';

export default class Tdetai_comp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataArr: []
        }
    }

    componentDidMount() {
        var data = [];
        var dataObj = {};
        var dataArr = [];
        var tname = this.props.tname;
        data.push(this.props.data[0])
        for (let i = 0; i < data[0].length; i++) {
            if (data[0][i][0] == tname) {
                dataArr.push(dataObj = {
                    'index': i,
                    'subname': data[0][i][1],
                    'class': data[0][i][2],
                    'struct': data[0][i][3],
                    'ratio': data[0][i][4],
                    'attend': data[0][i][5],
                    'midterm': data[0][i][6],
                    'final': data[0][i][7],
                })
            }
        }
        this.setState({ dataArr: dataArr })
    }

    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };


    render() {
        console.log(this.state.dataArr)
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                content={<Side_Menu />}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                closedDrawerOffset={-3}
                acceptTap={true}
            >
                <View style={styles.bgStyle}>
                    <Header
                        centerComponent={{ text: this.props.tname, style: { fontSize: 20, color: '#fff' } }}
                        outerContainerStyles={{ backgroundColor: '#A0522D' }}
                        leftComponent={<Icon
                            type="material icon"
                            name="dehaze"
                            color="#fff"
                            onPress={this.openControlPanel.bind(this)}
                        />}
                    />
                    <View style={{marginTop:80}}>
                        <FlatList
                            data={this.state.dataArr}
                            extraData={this.state}
                            keyExtractor={item => item.index}
                            renderItem={({ item }) => <DetailList data={item} />}
                        />
                    </View>

                </View>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    bgStyle: {
        backgroundColor: '#FFEBCD',
        flex: 1,
    }

});