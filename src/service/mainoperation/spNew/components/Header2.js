import React, {Component} from 'react';
import {Input, Form, Dropdown, Grid, Header, Segment, Label, Button} from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {ROOT_URL} from '../../../../utils/constants';

class Header2 extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            countryOpts, 
            companyOpts, 
            categoryOpts,
            productOpts,
            selectedCompany, 
            selectedCountry, 
            selectedCategory, 
            selectedProduct, 
            inputChange, 
            fetchCategories,
            fetchReferenceList,
            title,
            description,
            startDate,
            saveServicePacket
        } = this.props
        return (        
        
            <Form>
                <Segment padded size='small'>
                    <Label attached='top'><Header as='h3'>Создать сервис пакет</Header></Label>
                    <Grid columns='five' divided>
                        <Grid.Row>                        
                            <Grid.Column width={3}>
                                <Form.Field>
                                    <label>Компания</label>
                                    <Dropdown placeholder='Выберите компанию' fluid selection 
                                        options={companyOpts}
                                        value={selectedCompany}
                                        onChange={(e, {value}) => inputChange(value, 'selectedCompany')} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Страна</label>
                                    <Dropdown placeholder='Выберите страну' fluid selection 
                                        options={countryOpts}
                                        value={selectedCountry}
                                        onChange={(e, {value}) => inputChange(value, 'selectedCountry')} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Категория</label>
                                    <Dropdown placeholder='Выберите категорию' fluid selection 
                                        disabled={!(selectedCountry && selectedCompany)}
                                        value={selectedCategory}
                                        options={categoryOpts}
                                        onChange={(e, {value}) => { 
                                            inputChange(value, 'selectedCategory'); 
                                            fetchCategories(selectedCompany, value);
                                        }} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Товар</label>
                                    <Dropdown placeholder='Select Product' fluid selection 
                                        value={selectedProduct}
                                        options={productOpts}
                                        disabled={!(selectedCountry && selectedCompany && selectedCategory)}
                                        onChange={(e, {value}) => { 
                                            inputChange(value, 'selectedProduct'); 
                                            fetchReferenceList(selectedCompany, selectedCountry, value);
                                        }} />
                                </Form.Field>
                            </Grid.Column>                        
                            <Grid.Column  width={5}>
                                <Form.Field>
                                    <label>Название</label>
                                    <Input type='text' 
                                        placeholder='Название'
                                        value={title}
                                        onChange={(e, {value}) => inputChange(value, 'title')} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Примечание</label>
                                    <Input type='text' 
                                        placeholder='Примечание'
                                        value={description}
                                        onChange={(e, {value}) => inputChange(value, 'description')} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Дата начала действия</label>
                                    <DatePicker 
                                        selected={startDate}
                                        onChange={date => inputChange(date, 'startDate')} />
                                </Form.Field>
                                <Form.Field>
                                    <Button size='massive'
                                        onClick={saveServicePacket}>Сохранить сервис пакет</Button>
                                </Form.Field>
                            </Grid.Column>                        
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Form>            
        )
    }
}

export default Header2;