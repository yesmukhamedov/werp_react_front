import React, { Component } from 'react'; 
import { Icon, Segment, Form, Button ,Input, Grid } from 'semantic-ui-react';
import ListTabale from './listTable';
import '../css/transaction.css';

class ListTableUpdate extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
             transaction:{},
            //transaction:{transaction_code: '', name_ru: '', name_en: '', name_tr: '', transaction_id:'', url:'', front_url:''},
            errors:{
                transaction_code:false,
                name_ru:false,
                url:false,
            }
        }; 
        this.handleChange = this.handleChange.bind(this);
        //this.validateForm = this.validateForm.bind(this)
        this.saveForm = this.saveForm.bind(this)
    }
    

    handleChange (fieldName, o) {
        let transaction = Object.assign({}, this.state.transaction);
        if(o){
            transaction[fieldName] = o.value;
        }else{
            transaction[fieldName] = null;
        }
  
      this.setState({
          ...this.state,
          transaction: transaction
      })
    }

    saveForm () {
        const transaction = Object.assign({}, this.state.transaction);
        const props = this.props.props;
        const transaction_code = 'transaction_code';
        const name_ru = 'name_ru';
        const name_en = 'name_en';
        const name_tr = 'name_tr';
        const url = 'url';
        const front_url = 'front_url';
    
        if (!transaction.transaction_code) {
            transaction[transaction_code] = props.transaction_code;
        }
        if (!transaction.name_ru) {
            transaction[name_ru] = props.name_ru;
        }
        if (!transaction.name_en) {
            transaction[name_en] = props.name_en;
        }

        if (!transaction.name_tr) {
            transaction[name_tr] = props.name_tr;
        }
        if (!transaction.url) {
            transaction[url] = props.url;
        }
        if (!transaction.front_url) {
            transaction[front_url] = props.front_url;
        }

        const transaction_id = 'transaction_id';        
        transaction[transaction_id] = props.transaction_id;
        this.props.newTransaction(transaction);
        this.props.handleClose();
    }
    
    renderForm(){
        const transaction = this.props.props;
        const localDemo = this.state.localDemo;
        return <Form>
            <div className='ui segments'>
                <div className='ui segment'>
                    <h3>Основные данные</h3>
                </div>
                <div className='ui secondary segment'>
                    <Form.Group widths='equal'>
                        <Form.Field 
                            onChange={(e, o) => this.handleChange('transaction_code', o)} 
                            defaultValue={transaction.transaction_code}
                            control={Input}
                            required label='Tr Code' 
                        />
                        <Form.Field
                            onChange={(e, o) => this.handleChange('name_ru', o)}
                            defaultValue={transaction.name_ru}
                            control={Input} required label='Название (рус)' 
                        />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field
                            onChange={(e, o) => this.handleChange('name_en', o)}
                            defaultValue={transaction.name_en}
                            control={Input} label='Название (En)' 
                         />

                        <Form.Field
                            onChange={(e, o) => this.handleChange('name_tr', o)}
                            defaultValue={transaction.name_tr}
                            control={Input} label='Название (Tr)'
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            onChange={(e, o) => this.handleChange('url', o)}
                            defaultValue={transaction.url}
                            control={Input} required label='URL' 
                        />

                        <Form.Field
                            onChange={(e, o) => this.handleChange('front_url', o)}
                            defaultValue={transaction.front_url}
                            control={Input} label='Род. папка' 
                        />
                    </Form.Group>
                </div>
            </div>
            
            <Button onClick={this.saveForm}  floated='right' className={this.state.sendingData ? 'loading' : ''} color='teal'>Изменить</Button>
            <Button floated='right' onClick={()=>this.props.handleClose()} negative> <Icon name='remove' />Отмена</Button>
        </Form>
    }

    render() {
        return (
            <div className="new_Form_Transaction">
                <h2>Редактирование транзакции</h2>
                <div className="ui grid">
                    <div className="two wide column"></div>
                    <div className="twelve wide column">
                        {this.renderForm()}
                    </div>
                    <div className="two wide column"></div>
                </div>
            </div>
        );
    }
}


export default ListTableUpdate;

