import React, { Component } from 'react';

import {
    Keyboard,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import API from '../service/API';

import Mapping from '../service/Testuser';

import Documents from '../service/Documents';

import ChartView from 'react-native-highcharts';

import { Actions } from 'react-native-router-flux';

import { Card, ListItem, Button, ButtonGroup, Icon } from 'react-native-elements'

import Swiper from 'react-native-swiper-animated';

import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const Window = Dimensions.get('window');

export default class Structchart_comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            doc: [],
            time: [],
            structPer: [],
            attendPer: [],
            midPer: [],
            finalPer: [],
            province: [],
            school: [],
            selectedIndex: 0
        };
        this.updateIndex = this.updateIndex.bind(this)
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
                    var school = [];
                    for (var i = 0; i < Mapping.mappingqcoachvshost.length; i++) {
                        var tmp = Mapping.mappingqcoachvshost[i];
                        if (tmp.staffid == msg.profile.staffid) {
                            mapping = tmp;
                            for (var j = 0; j < mapping.host.length; j++) {
                                Documents.getData(mapping.host[j].hostid, (err, msg) => {
                                    doc.push(msg[0].value.doc)
                                    this._calSchool(doc)
                                })
                                province.push(mapping.host[j].province)
                                school.push(mapping.host[j].hostname)
                                this.setState({ province: province, doc: doc, school: school })
                            }
                            break;
                        }
                    };
                }
            });
        });
    }

    _calSchool(doc) {

        var structPer = [];
        var attendPer = [];
        var midPer = [];
        var finalPer = [];

        for (var i = 0; i < doc.length; i++) {
            structPer.push((doc[i].subjectstructure / doc[i].full) * 100)
            attendPer.push((doc[i].attend / doc[i].full) * 100)
            midPer.push((doc[i].midterm / doc[i].full) * 100)
            finalPer.push((doc[i].final / doc[i].full) * 100)
        }

        this.setState({ structPer: structPer, attendPer: attendPer, midPer: midPer, finalPer: finalPer })

    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }


    render() {
        const buttons = this.state.province
        const school = this.state.school
        const { selectedIndex } = this.state;
        const doc = this.state.doc;
        //const structPer = this.state.structPer;
        //const attendPer = this.state.attendPer;
        //const midPer = this.state.midPer;
        //const finalPer = this.state.finalPer;

        Keyboard.dismiss();
        return (
            <View>
                <View style={{ marginTop: 50, padding: 0 }}>

                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 50 }} />

                </View>

                <View style={{ marginTop: 10 }}>
                    {
                        selectedIndex === 0 ? 
                        <TouchableOpacity 
                      style={styles.contentStyle}
                      onPress={()=>Actions.School_Scene()}
                      >
                        <View style={styles.schoolContainer}>
                            <Text>{school[0]}</Text>
                        </View>
                        <View style={styles.scontentContainer}>
                            <View style={styles.iconContainer}>
                                <Text>บันทึกแผนการสอน: </Text>
                                <Icon name='emoticon-happy'
                                    type='material-community'
                                    color='#006400'
                                />
                            </View>

                            <View style={styles.iconContainer}>
                                <Text>บันทึกการเข้าเรียน: </Text>
                                <Icon name='emoticon-neutral'
                                    type='material-community'
                                    color='#FF8C00'
                                />
                            </View>

                            <View style={styles.iconContainer}>
                                <Text>บันทึกผลสอบกลางภาค: </Text>
                                <Icon name='emoticon-sad'
                                    type='material-community'
                                    color='#FF0000'
                                />
                            </View>

                            <View style={styles.iconContainer}>
                                <Text>บันทึกผลสอบปลายภาค: </Text>
                                <Icon name='emoticon-sad'
                                    type='material-community'
                                    color='#FF0000'
                                />
                            </View>

                        </View>

                    </TouchableOpacity>  
                        
                        : <TouchableOpacity 
                      style={styles.contentStyle}
                      >
                        <View style={styles.schoolContainer}>
                            <Text>{school[1]}</Text>
                        </View>
                        <View style={styles.scontentContainer}>
                            <View style={styles.iconContainer}>
                                <Text>บันทึกแผนการสอน: </Text>
                                <Icon name='emoticon-happy'
                                    type='material-community'
                                    color='#006400'
                                />
                            </View>

                            <View style={styles.iconContainer}>
                                <Text>บันทึกการเข้าเรียน: </Text>
                                <Icon name='emoticon-neutral'
                                    type='material-community'
                                    color='#FF8C00'
                                />
                            </View>

                            <View style={styles.iconContainer}>
                                <Text>บันทึกผลสอบกลางภาค: </Text>
                                <Icon name='emoticon-sad'
                                    type='material-community'
                                    color='#FF0000'
                                />
                            </View>

                            <View style={styles.iconContainer}>
                                <Text>บันทึกผลสอบปลายภาค: </Text>
                                <Icon name='emoticon-sad'
                                    type='material-community'
                                    color='#FF0000'
                                />
                            </View>

                        </View>

                    </TouchableOpacity>  
                    }

                      



                </View>


            </View>


        );
    }
}

const styles = StyleSheet.create({

    contentStyle: {
        width: Window.length - 60,
        height: Window.height - 500,
        flexDirection: 'row',
        backgroundColor: '#FFFFF0'
    },

    schoolContainer: {
        width: 120,
        height: Window.height - 500,
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
    }

});
