import React,{ Component } from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import {ROOT_URL} from '../../../utils/constants';

class  PositionF4 extends Component{
    constructor(props) {
        super(props)
        this.state = {
            options:[],
            selected:''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}/api/reference/positions`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            let loaded = res.data.map((p) => {
                return {
                    key:p.position_id,
                    text:p.text,
                    value:p.position_id
                }
            })

            loaded.unshift({
                key:0,
                text:'Не выбрано',
                value:0
            });

            this.setState({
                ...this.state,
                options:loaded
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    handleChange(e,v){
        this.props.handleChange(e,v);
    }

    render(){
        return (
        <Form.Select
            name="position"
            multiple={this.props.multiple || false}
            search={this.props.search}
            selection
            label='Должность'
            selectOnBlur={false}
            options={this.state.options}
            placeholder='Должность'
            onChange={this.handleChange}  />
        )
    }
}

export default PositionF4;