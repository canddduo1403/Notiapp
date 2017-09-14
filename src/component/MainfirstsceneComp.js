import React,{Component} from 'react';
import {StyleSheet,
    View,
    Text,
    ToolbarAndroid,
    TouchableOpacity,
} from 'react-native';

// import Drawer from 'react-native-drawer';

import {Icon} from 'react-native-elements';

import { Actions } from 'react-native-router-flux';

export default class MainfirstsceneComp extends Component{
    render(){
        return(
            
            <View style={styles.mainContainerLayout}>
                
                <TouchableOpacity onPress={Actions.Assignmentscene}>
                    <View style={styles.iconTextLayout} >
                         <Icon name='assignment' size = {50}raised = {true}/> 
                        <Text>การจัดทำแผนการสอน</Text>
                    </View>
                </TouchableOpacity>
               
                <TouchableOpacity onPress={Actions.Studentscene}>
                    <View style={styles.iconTextLayout} >
                         <Icon name='users' type='font-awesome' size = {50}raised = {true} /> 
                        <Text>การบันทึกเวลาเรียน</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity  onPress={Actions.Midtermscene}>
                    <View style={styles.iconTextLayout} >
                         <Icon name='book' type='foundation' size = {50} raised = {true} /> 
                        <Text>การบันทึกผลสอบกลางภาค</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={Actions.Finalscene}>
                    <View style={styles.iconTextLayout} >
                         <Icon name='graduation-cap' type='font-awesome' size = {50} raised = {true} /> 
                        <Text>การบันทึกผลสอบปลายภาค</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainerLayout:{
        flexDirection:'column',
        justifyContent:'space-around',
        flexGrow:1
    },
    iconTextLayout:{
        flexDirection:'row',
        alignItems:'center',
        margin: '10%'
    },
});