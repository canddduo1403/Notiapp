import React, { Component } from 'react';

import {
    Keyboard,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';

import { width, height, totalSize } from 'react-native-dimension';

import API from '../service/API';

import Mapping from '../service/Testuser';

import Documents from '../service/Documents';

import ChartView from 'react-native-highcharts';

import { Actions } from 'react-native-router-flux';

import { Card, ListItem, Button, ButtonGroup, Icon } from 'react-native-elements'

import Spinner from 'react-native-loading-spinner-overlay';

const Window = Dimensions.get('window');

export default class Structchart_comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            mapping: null,
            doc: [],
            time: [],
            structPer: [],
            attendPer: [],
            midPer: [],
            finalPer: [],
            province: [],
            school: [],
            selectedIndex: 0,
        };
        this.updateIndex = this.updateIndex.bind(this)
        this._calSchool = this._calSchool.bind(this)
    }

    componentDidMount() {
        API.getUser((err, msg) => {
            this._loadUserInfo();
        });

    }

    _loadUserInfo() {
        API.getCredential((err, msg) => {
            if (err) return API.alert('ผิดพลาด', msg);
            API.loadUserInfo(msg, (err, msg) => {
                if (err) {
                    return API.alert('ผิดพลาด', msg);
                } else {
                    var mapping = null;
                    var doc = [];
                    var province = [];
                    for (var i = 0; i < Mapping.mappingqcoachvshost.length; i++) {
                        var tmp = Mapping.mappingqcoachvshost[i];
                        if (tmp.staffid == msg.profile.staffid) {
                            mapping = tmp;
                            for (var j = 0; j < mapping.host.length; j++) {
                                Documents.getData(mapping.host[j].hostid, (err, msg) => {
                                    doc.push(msg[0].value.doc)
                                    if (doc.length > 1) {
                                        if (doc[0].hostid < doc[1].hostid) {
                                            this._calSchool(doc, mapping)
                                        }
                                        else if (doc[0].hostid > doc[1].hostid) {
                                            this._loadUserInfo()
                                        }
                                    }
                                })
                                this.setState({ doc: doc, mapping: mapping })

                            }
                            break;
                        }
                    };
                }
            });
        });
    }

    _calSchool(doc, mapping) {

        var structPer = [];
        var attendPer = [];
        var midPer = [];
        var finalPer = [];

        var school = [];
        var province = [];

        for (var i = 0; i < doc.length; i++) {
            school.push(doc[i].hostname)
            structPer.push((doc[i].subjectstructure / doc[i].full) * 100)
            attendPer.push((doc[i].attend / doc[i].full) * 100)
            midPer.push((doc[i].midterm / doc[i].full) * 100)
            finalPer.push((doc[i].final / doc[i].full) * 100)
            province.push(mapping.host[i].province)
        }

        this.setState({
            structPer: structPer,
            attendPer: attendPer,
            midPer: midPer,
            finalPer: finalPer,
            school: school,
            province: province
        })

    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }


    render() {
        const buttons = this.state.province
        const school = this.state.school
        const { selectedIndex } = this.state;
        const doc = this.state.doc;
        const structPer = this.state.structPer;
        const attendPer = this.state.attendPer;
        const midPer = this.state.midPer;
        const finalPer = this.state.finalPer;

        Keyboard.dismiss();
        return (
            <View>
                <View style={{ marginTop: 80, padding: 0 }}>

                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 50 }} />

                </View>

                <View style={{ marginTop: 20 }}>
                    {
                        selectedIndex === 0 ?
                            <TouchableOpacity
                                style={styles.contentStyle}
                                onPress={() => Actions.School1_Scene({
                                    doc:
                                    doc[0]
                                })}
                            >
                                <View style={styles.schoolContainer}>
                                    <Text style={{ fontWeight: 'bold' }}>{school[0]}</Text>
                                </View>
                                <View style={styles.scontentContainer}>
                                    <View style={styles.iconContainer}>
                                        <Text style={{ fontWeight: 'bold' }}>แผนการสอน: </Text>
                                        {
                                            structPer[0] >= 0 && structPer[0] < 30 ?
                                                <Icon name='emoticon-sad'
                                                    type='material-community'
                                                    color='#FF0000' />
                                                : structPer[0] >= 30 && structPer[0] <= 60 ?
                                                    <Icon name='emoticon-neutral'
                                                        type='material-community'
                                                        color='#FF8C00' />
                                                    : structPer[0] > 60 && structPer[0] <= 100 ?
                                                        <Icon name='emoticon-happy'
                                                            type='material-community'
                                                            color='#006400' />
                                                        : null
                                        }

                                    </View>

                                    <View style={styles.iconContainer}>
                                        <Text style={{ fontWeight: 'bold' }}>การเข้าเรียน: </Text>
                                        {
                                            attendPer[0] >= 0 && attendPer[0] < 30 ?
                                                <Icon name='emoticon-sad'
                                                    type='material-community'
                                                    color='#FF0000' />
                                                : attendPer[0] >= 30 && attendPer[0] <= 60 ?
                                                    <Icon name='emoticon-neutral'
                                                        type='material-community'
                                                        color='#FF8C00' />
                                                    : attendPer[0] > 60 && attendPer[0] <= 100 ?
                                                        <Icon name='emoticon-happy'
                                                            type='material-community'
                                                            color='#006400' />
                                                        : null
                                        }
                                    </View>

                                    <View style={styles.iconContainer}>
                                        <Text style={{ fontWeight: 'bold' }}>ผลสอบกลางภาค: </Text>
                                        {
                                            midPer[0] >= 0 && midPer[0] < 30 ?
                                                <Icon name='emoticon-sad'
                                                    type='material-community'
                                                    color='#FF0000' />
                                                : midPer[0] >= 30 && midPer[0] <= 60 ?
                                                    <Icon name='emoticon-neutral'
                                                        type='material-community'
                                                        color='#FF8C00' />
                                                    : midPer[0] > 60 && midPer[0] <= 100 ?
                                                        <Icon name='emoticon-happy'
                                                            type='material-community'
                                                            color='#006400' />
                                                        : null
                                        }
                                    </View>

                                    <View style={styles.iconContainer}>
                                        <Text style={{ fontWeight: 'bold' }}>ผลสอบปลายภาค: </Text>
                                        {
                                            finalPer[0] >= 0 && finalPer[0] < 30 ?
                                                <Icon name='emoticon-sad'
                                                    type='material-community'
                                                    color='#FF0000' />
                                                : finalPer[0] >= 30 && finalPer[0] <= 60 ?
                                                    <Icon name='emoticon-neutral'
                                                        type='material-community'
                                                        color='#FF8C00' />
                                                    : finalPer[0] > 60 && finalPer[0] <= 100 ?
                                                        <Icon name='emoticon-happy'
                                                            type='material-community'
                                                            color='#006400' />
                                                        : null
                                        }
                                    </View>

                                </View>

                            </TouchableOpacity>

                            : <TouchableOpacity
                                style={styles.contentStyle}
                                onPress={() => Actions.School2_Scene({
                                    doc:
                                    doc[1]
                                })}
                            >
                                <View style={styles.schoolContainer}>
                                    <Text style={{ fontWeight: 'bold' }}>{school[1]}</Text>
                                </View>
                                <View style={styles.scontentContainer}>
                                    <View style={styles.iconContainer}>
                                        <Text style={{ fontWeight: 'bold' }}>แผนการสอน: </Text>
                                        {
                                            structPer[1] >= 0 && structPer[1] < 30 ?
                                                <Icon name='emoticon-sad'
                                                    type='material-community'
                                                    color='#FF0000' />
                                                : structPer[1] >= 30 && structPer[1] <= 60 ?
                                                    <Icon name='emoticon-neutral'
                                                        type='material-community'
                                                        color='#FF8C00' />
                                                    :
                                                    structPer[1] > 60 && structPer[1] <= 100 ?
                                                        <Icon name='emoticon-happy'
                                                            type='material-community'
                                                            color='#006400' />
                                                        : null
                                        }

                                    </View>

                                    <View style={styles.iconContainer}>
                                        <Text style={{ fontWeight: 'bold' }}>การเข้าเรียน: </Text>
                                        {
                                            attendPer[1] >= 0 && attendPer[1] < 30 ?
                                                <Icon name='emoticon-sad'
                                                    type='material-community'
                                                    color='#FF0000' />
                                                : attendPer[1] >= 30 && attendPer[1] <= 60 ?
                                                    <Icon name='emoticon-neutral'
                                                        type='material-community'
                                                        color='#FF8C00' />
                                                    : attendPer[1] > 60 && attendPer[1] <= 100 ?
                                                        <Icon name='emoticon-happy'
                                                            type='material-community'
                                                            color='#006400' />
                                                        : null
                                        }
                                    </View>

                                    <View style={styles.iconContainer}>
                                        <Text style={{ fontWeight: 'bold' }}>ผลสอบกลางภาค: </Text>
                                        {
                                            midPer[1] >= 0 && midPer[1] < 30 ?
                                                <Icon name='emoticon-sad'
                                                    type='material-community'
                                                    color='#FF0000' />
                                                : midPer[1] >= 30 && midPer[1] <= 60 ?
                                                    <Icon name='emoticon-neutral'
                                                        type='material-community'
                                                        color='#FF8C00' />
                                                    : midPer[1] > 60 && midPer[1] <= 100 ?
                                                        <Icon name='emoticon-happy'
                                                            type='material-community'
                                                            color='#006400' />
                                                        : null
                                        }
                                    </View>

                                    <View style={styles.iconContainer}>
                                        <Text style={{ fontWeight: 'bold' }}>ผลสอบปลายภาค: </Text>
                                        {
                                            finalPer[1] >= 0 && finalPer[1] < 30 ?
                                                <Icon name='emoticon-sad'
                                                    type='material-community'
                                                    color='#FF0000' />
                                                : finalPer[1] >= 30 && finalPer[1] <= 60 ?
                                                    <Icon name='emoticon-neutral'
                                                        type='material-community'
                                                        color='#FF8C00' />
                                                    : finalPer[1] > 60 && finalPer[1] <= 100 ?
                                                        <Icon name='emoticon-happy'
                                                            type='material-community'
                                                            color='#006400' />
                                                        : null
                                        }
                                    </View>

                                </View>

                            </TouchableOpacity>
                    }

                    <View style={styles.iconDetail}>

                        <Text>หมายเหตุ : ความหมายของสัญลักษณ์</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='emoticon-sad'
                                type='material-community'
                                color='#FF0000'
                                style={{ marginLeft: 10, marginTop: 10 }}
                            />
                            <Text style={{ marginLeft: 20 }}>: ร้อยละ 0-30 </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='emoticon-neutral'
                                type='material-community'
                                color='#FF8C00'
                                style={{ marginLeft: 10, marginTop: 10 }}
                            />
                            <Text style={{ marginLeft: 20 }}>: ร้อยละ 31-60 </Text>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Icon name='emoticon-happy'
                                type='material-community'
                                color='#006400'
                                style={{ marginLeft: 10, marginTop: 10 }}
                            />
                            <Text style={{ marginLeft: 20 }}>: ร้อยละ 61-100 </Text>

                        </View>


                    </View>

                </View>


            </View>


        );
    }
}

const styles = StyleSheet.create({

    contentStyle: {
        ...Platform.select({
            ios: {
                width: Window.length - 60,
                height: Window.height - 500,
            },
            android: {
                width: width(85),
                height: height(30)
            },

        }),

        flexDirection: 'row',
        backgroundColor: '#FFFFF0'
    },

    schoolContainer: {
        width: width(35),
        backgroundColor: '#FFE4B5',
        alignItems: 'center',
        justifyContent: 'center',
    },

    scontentContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10
    },

    iconContainer: {
        flexDirection: 'row'
    },

    iconDetail: {
        width: width(60),
        height: height(10),
        ...Platform.select({
            ios: {
                marginTop: 100,
            },
            android: {
                marginTop: 30,
            }

        }),
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }

});
