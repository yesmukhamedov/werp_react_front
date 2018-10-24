import React, { Component } from 'react'; 
import { Form, Button, Input, Grid, Icon, Segment } from 'semantic-ui-react';

class ListTableCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction:{transaction_code: '', name_ru: '', name_en: '', name_tr: '', url:'', front_url:''},
            errors:{
                transaction_code:false,
                name_ru:false,
                url: false,
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this)
    }
        
    handleChange (e,data) {
        let transaction = Object.assign({}, this.state.transaction);
        let {name,value} = data
        if(transaction.hasOwnProperty(name)){
            transaction[name] = value
        }
       
        this.setState({
            ...this.state,
            transaction:transaction,
         })
    }

    validateForm () {

        let {transaction, errors} = this.state
        for(let k in errors){
            if (errors.hasOwnProperty(k)) {
                errors[k] = false
            }
        }

        if (!transaction.transaction_code) {
            errors['transaction_code'] = true
        }

        if (!transaction.name_ru) {
            errors['name_ru'] = true
        }
        
        if (!transaction.url) {
            errors['url'] = true
        }

        this.setState({
            ...this.state,
            errors: errors
        })

      }

    submitForm () {
        this.validateForm();
        let isValid = true;
        for(let k in this.state.errors){
            if (this.state.errors[k]) {
                isValid = false
                break
            }
        }
  
        if (!isValid) {
            return
        }
        let transaction = Object.assign({}, this.state.transaction);

        this.createTransaction(transaction);
        this.props.handleClose();
    
        //this.props.createTransaction(localStaff);
    }
    createTransaction(createTransaction){
        this.props.createTransaction(createTransaction);
    }
    
    renderForm(){       
        let {transaction,errors} = this.state
        return <Form>
            <div className='ui segments'>
                <div className='ui segment'>
                    <h3>Основные данные</h3>
                </div>
                <div className='ui secondary segment'>
                    <Form.Group widths='equal'>
                        <Form.Field
                            name="transaction_code"
                            error={errors.transaction_code}
                            onChange={this.handleChange}
                            value={transaction.transaction_code}
                            control={Input}
                            required label='Tr Code' placeholder= 'Tr Code' />
                        <Form.Field
                            name="name_ru"
                            error={errors.name_ru}
                            onChange={this.handleChange}
                            value={transaction.name_ru}
                            control={Input}
                            required label='Название (рус)' placeholder='Название (рус)' />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field
                            name="name_en"
                            onChange={this.handleChange}
                            value={transaction.name_en}
                            control={Input}
                            label='Название (En)' placeholder= 'Название (En)' />

                        <Form.Field
                            name="name_tr"
                            onChange={this.handleChange}
                            value={transaction.name_tr}
                            control={Input} label='Название (Tr)' placeholder='Название (Tr)'   />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field
                            name="url"
                            onChange={this.handleChange}
                            value={transaction.url}
                            control={Input}
                            required label='URL' placeholder= 'URL' />

                        <Form.Field
                            name="front_url"
                            onChange={this.handleChange}
                            value={transaction.front_url}
                            control={Input} label='Род. папка' placeholder='Род. папка'   />
                    </Form.Group>
                </div>
            </div>
            
            <Button onClick={this.submitForm} floated='right' className={this.state.sendingData ? 'loading' : ''} color='teal'><Icon name='checkmark' />Сохранить</Button>
            <Button floated='right' onClick={()=>this.props.handleClose()} negative> <Icon name='remove' />Отмена</Button>
        </Form>
    }

    render() {
        return (
            <div className="new_Form_Transaction">
                <div className="ui grid">
                    <div className="one wide column"></div>
                    <div className="fourteen wide column">
                        {this.renderForm()}
                    </div>
                    <div className="one wide column"></div>
                </div>
            </div>
        );
    }
}

export default ListTableCreate;
