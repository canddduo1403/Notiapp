import React ,{Component,PropTypes} from 'react';
import Drawer from 'react-native-drawer';

import Sidecomp from '../component/Sidecomp';

export default class Sidescene extends Component{
    render(){
        return(
            <Drawer
                ref={c=>this.drawer=c} /** Assigning a drawer object into the class.*/
                type="overlay"
                content={<Sidecomp/>}
                tapToClose
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                tweenHandler={(ratio)=>({main:{opacity:(2-ratio)/2}})}
            >
            {React.Children.map(
                this.props.children,c=>React.cloneElement(c,{route:this.props.route})
                )}
            </Drawer>
        );
    }
}

Sidescene.prototype={
    children:PropTypes.node,
    route:PropTypes.object,
}