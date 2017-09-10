import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

const Window = Dimensions.get('window')
export default class School_Detail extends Component {
    render() {
        const progress = this.props.schoolData.preprogress;
        const lastWeek = this.props.schoolData.lastweek;

        return (
            <Card
                title={this.props.schoolData.hostname}
                wrapperStyle={{ justifyContent: 'space-around' }}
            >
                <Text> จังหวัด: {this.props.schoolData.province}</Text>
                <Text> สัปดาห์ที่: {this.props.schoolData.week} </Text>

                <View style={styles.iconStyle}>
                    <View style={styles.progressStyle}>
                        <Text> ภาพรวมการทำงาน:  </Text>
                        {
                            progress >= 0 && progress < 30 ?
                                <Icon name='emoticon-sad'
                                    type='material-community'
                                    color='#FF0000' />
                                : progress >= 30 && progress <= 60 ?
                                    <Icon name='emoticon-neutral'
                                        type='material-community'
                                        color='#FF8C00' />
                                    :
                                    progress > 60 && progress <= 100 ?
                                        <Icon name='emoticon-happy'
                                            type='material-community'
                                            color='#006400' />
                                        : null
                        }
                        <Text style={{ padding: 3 }}> ({progress} %)</Text>
                    </View>
                    <View style={styles.progressStyle}>
                        <Text> หมายเหตุ:  </Text>
                        {
                            lastWeek < progress ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name='arrow-up-bold'
                                        type='material-community'
                                        color='#006400'
                                    />
                                    <Text style={{ padding: 1, marginLeft: 5 }}>(กรอกข้อมูลเพิ่มขึ้น {progress - lastWeek} %)</Text>
                                </View>

                                :
                                <View style={{ flexDirection: 'row'}}>
                                    <Icon
                                        name='minus'
                                        type='material-community'
                                        color='#000000'
                                    />
                                    <Text style={{ padding: 1, marginLeft: 5 }}>(ไม่มีการกรอกข้อมูลเพิ่ม)</Text>
                                </View>

                        }
                    </View>
                </View>

                <Button
                    icon={{ name: 'code', color: '#00008B' }}
                    backgroundColor='#FFFFFF'
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10 }}
                    title='ดูรายละเอียด'
                    textStyle={{ color: '#00008B' }}
                    onPress={() => Actions.Subdetail_comp({
                        data: this.props.schoolData
                    })}
                />
            </Card>
        );
    }

}

const styles = StyleSheet.create({

    listContainer: {
        padding: 10,
        height: 50,
        alignItems: 'flex-start',
    },

    progressStyle: {
        flexDirection: 'row',
    },

    iconStyle: {
        flexDirection: 'column'
    }
})