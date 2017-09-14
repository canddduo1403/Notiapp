import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { Card } from 'react-native-elements';

export default class DetailList extends Component {
    render() {
        console.log(this.props.data)
        return (

            <Card
                title={this.props.data.subname}
            >
                <View style={styles.cardBody}>
                    <Text>ชั้น/ห้อง : {this.props.data.class}</Text>
                    <Text>โครงสร้างรายวิชา : {this.props.data.struct}</Text>
                    <Text>อัตราส่วนคะแนน : {this.props.data.ratio}</Text>
                    <Text>บันทึกเข้าเรียน : {this.props.data.attend}</Text>
                    <Text>ผลสอบกลางภาค : {this.props.data.midterm}</Text>
                    <Text>ผลสอบปลายภาค : {this.props.data.final}</Text>
                </View>
            </Card>

        );
    }

}

const styles = StyleSheet.create({
    cardBody: {
        flexDirection: 'column',
        justifyContent:'space-between'
    }

});