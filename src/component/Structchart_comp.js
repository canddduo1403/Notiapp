import React, { Component } from 'react';

import {
    Keyboard,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';

import API from '../service/API';

import Mapping from '../service/Testuser';

import Documents from '../service/Documents';

import ChartView from 'react-native-highcharts';

import { Actions } from 'react-native-router-flux';

import { List, ListItem, Card, Icon, Button } from 'react-native-elements';

import * as Progress from 'react-native-progress';

import ProgressBarClassic from 'react-native-progress-bar-classic';

export default class Structchart_comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            schoolFin: 0,
            schoolUnfin:0,
            doc: [],
            subFull: [],
            subFin: [],
            time: [],
            progress: 0,
            schoolPer:0,
            indeterminate: true,
        };
    }
    
    componentDidMount() {
        API.getUser((err, msg) => {
            this._loadUserInfo();
        });
        this.animate();
    }

    animate() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
            this.setState({ indeterminate: false });
            setInterval(() => {
                progress += Math.random() / 5;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({ progress });
            }, 500);
        }, 1500);
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
                    for (var i = 0; i < Mapping.mappingqcoachvshost.length; i++) {
                        var tmp = Mapping.mappingqcoachvshost[i];
                        if (tmp.staffid == msg.profile.staffid) {
                            mapping = tmp;
                            for (var j = 0; j < mapping.host.length; j++) {

                                Documents.getData(mapping.host[j].hostid, (err, msg) => {
                                    doc.push(msg[0].value.doc)
                                    this._calSchool(doc)
                                })
                            }
                            break;
                        }
                    };
                }
            });
        });
    }

    _calSchool(doc) {
       
        var schoolUnfin = 0;
        var subFull = [];
        var subFin = [];
        var schoolPer = 0;
        for (var i = 0; i < doc.length; i++) {
            subFull.push(doc[i].full)
            subFin.push(doc[i].subjectstructure)

            if (doc[i].subjectstructure < doc[i].full) {
                schoolUnfin: schoolUnfin += 1;
            }
        }
        schoolPer = 1-(schoolUnfin/doc.length)

    }

    render() {
        Keyboard.dismiss();
        return (
            <ScrollView>
                <View style={{ marginTop: 50, flexDirection: 'column', justifyContent: 'space-between' }}>

                    {/*บันโครงสร้างรายวิชา*/}
                    <View>
                        <Card style={{ padding: 20, backgroundColor: '#F5F5F5' }}
                            title='โครงสร้างรายวิชา'
                        >

                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    name='city'
                                    type='material-community'
                                    color='#517fa4'
                                />
                                <Text style={{ marginTop: 5, marginLeft: 20 }}>จำนวนโรงเรียนที่บันทึก</Text>

                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ marginTop: 20, flexDirection: 'row' }}>

                                    <Progress.Bar progress={0.5}
                                        width={250}
                                        height={30}
                                        color={'#DC143C'}
                                        backgroundColor={'#DCDCDC'}
                                        borderWidth={0}
                                        showsText={true}
                                    />
                                    <Text style={{ marginTop: 5, left: 5 }}>1 โรง</Text>

                                </View>
                                <Text style={{ marginTop: 20 }}>จากทั้งหมด 2 โรง</Text>
                            </View>

                            <Button
                                icon={{ name: 'code', color: '#FF7F50' }}
                                backgroundColor='#F5F5F5'
                                buttonStyle={{
                                    borderRadius: 0,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginBottom: 0,
                                    marginTop: 10,
                                }}
                                onPress={()=>Actions.Structdetail_Scene()}
                                color="#FF7F50"
                                title='กดดูรายละเอียด' />

                        </Card>
                    </View>

                    {/*บันทึกการเข้าเรียน*/}
                    <View style={{ marginTop: 20 }}>
                        <Card style={{ padding: 20, backgroundColor: '#F5F5F5' }}
                            title='บันทึกการเข้าเรียน'
                        >

                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    name='city'
                                    type='material-community'
                                    color='#517fa4'
                                />
                                <Text style={{ marginTop: 5, marginLeft: 20 }}>จำนวนโรงเรียนที่บันทึก</Text>

                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ marginTop: 20, flexDirection: 'row' }}>

                                    <Progress.Bar progress={0.5}
                                        width={250}
                                        height={30}
                                        color={'#DC143C'}
                                        backgroundColor={'#DCDCDC'}
                                        borderWidth={0}
                                        showsText={true}
                                    />
                                    <Text style={{ marginTop: 5, left: 5 }}>1 โรง</Text>

                                </View>
                                <Text style={{ marginTop: 20 }}>จากทั้งหมด 2 โรง</Text>
                            </View>

                            <Button
                                icon={{ name: 'code', color: '#FF7F50' }}
                                backgroundColor='#F5F5F5'
                                buttonStyle={{
                                    borderRadius: 0,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginBottom: 0,
                                    marginTop: 10,
                                }}
                                color="#FF7F50"
                                title='กดดูรายละเอียด'
                                onPress={()=>Actions.Attendetail_Scene()} />

                        </Card>
                    </View>

                    {/*บันทึกผลสอบกลางภาค*/}
                    <View style={{ marginTop: 20 }}>
                        <Card style={{ padding: 20, backgroundColor: '#F5F5F5' }}
                            title='บันทึกผลสอบกลางภาค'
                        >

                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    name='city'
                                    type='material-community'
                                    color='#517fa4'
                                />
                                <Text style={{ marginTop: 5, marginLeft: 20 }}>จำนวนโรงเรียนที่บันทึก</Text>

                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ marginTop: 20, flexDirection: 'row' }}>

                                    <Progress.Bar progress={0}
                                        width={250}
                                        height={30}
                                        color={'#DC143C'}
                                        backgroundColor={'#DCDCDC'}
                                        borderWidth={0}
                                        showsText={true}
                                    />
                                    <Text style={{ marginTop: 5, left: 5 }}>0 โรง</Text>

                                </View>
                                <Text style={{ marginTop: 20 }}>จากทั้งหมด 2 โรง</Text>
                            </View>

                            <Button
                                icon={{ name: 'code', color: '#FF7F50' }}
                                backgroundColor='#F5F5F5'
                                buttonStyle={{
                                    borderRadius: 0,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginBottom: 0,
                                    marginTop: 10,
                                }}
                                color="#FF7F50"
                                title='กดดูรายละเอียด'
                                onPress={()=>Actions.Middetail_Scene()} />

                        </Card>
                    </View>

                    {/*บันทึกผลสอบปลายภาค*/}

                    <View style={{ marginTop: 20 }}>
                        <Card style={{ padding: 20, backgroundColor: '#F5F5F5' }}
                            title='บันทึกผลสอบปลายภาค'
                        >

                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    name='city'
                                    type='material-community'
                                    color='#517fa4'
                                />
                                <Text style={{ marginTop: 5, marginLeft: 20 }}>จำนวนโรงเรียนที่บันทึก</Text>

                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ marginTop: 20, flexDirection: 'row' }}>

                                    <Progress.Bar progress={0}
                                        width={250}
                                        height={30}
                                        color={'#DC143C'}
                                        backgroundColor={'#DCDCDC'}
                                        borderWidth={0}
                                        showsText={true}
                                    />
                                    <Text style={{ marginTop: 5, left: 5 }}>0 โรง</Text>

                                </View>
                                <Text style={{ marginTop: 20 }}>จากทั้งหมด 2 โรง</Text>
                            </View>

                            <Button
                                icon={{ name: 'code', color: '#FF7F50' }}
                                backgroundColor='#F5F5F5'
                                buttonStyle={{
                                    borderRadius: 0,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginBottom: 0,
                                    marginTop: 10,
                                }}
                                color="#FF7F50"
                                title='กดดูรายละเอียด'
                                onPress={()=>Actions.Finaldetail_Scene()} />

                        </Card>
                    </View>


                </View>
            </ScrollView>

        );
    }
}
