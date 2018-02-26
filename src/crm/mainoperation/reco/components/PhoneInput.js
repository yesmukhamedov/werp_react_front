import React, {Component} from 'react'
import { Header,Container,Button,Segment,Grid,Table,Divider,Card,Modal,Form,Input } from 'semantic-ui-react'

class PhoneInput extends Component{

    static defaultProps = {
        pattern: '(999) 999 99 99',
        code: '+7',
        name:'',
        number:''
    }

    onChange(e,data){
        console.log(e,data);
    }

    render(){
        const {pattern,code,name,number} = this.props;
        return <Input label={{ basic:true,content:code}} placeholder={pattern}
                      name={name} onChange={this.onChange}
                      value={number} />
    }
}

export default PhoneInput;