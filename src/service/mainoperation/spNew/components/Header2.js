import React, {Component} from 'react';
import { Input, Form, Dropdown, Grid, Header, Container,Segment,Label, List } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';

const companyOptions = [ { key: 'AURA', value: 'AURA', text: 'AURA' }, { key: 'GREENLIGHT', value: 'GREENLIGHT', text: 'GREENLIGHT' }]
const countryOptions = [ { key: 'kz', value: 'kz', flag: 'kz', text: 'Kazakhstan' }]
const productOptions = [ { key: 'ROBO', value: 'ROBO', text: 'ROBOCLEAN' }]
const categoryOptions = [ { key: 'cleaning', value: 'cleaning', text: 'Уборочная система' },
                          { key: 'waterCleaning', value: 'waterCleaning', text: 'Система очистки воды' }]

class Header2 extends Component {

    componentWillMount() {
        axios.get(`${ROOT_URL}/api/reference/companies`, {
            headers: {
                authorization: localStorage.getItem('token')}
        })
        .then(response => {
            // If request is good...
            console.log("Response", response.data);
        })
        .catch(error => {
            // If request is bad...
            // - Show an error to the user
            const msg = "Something is wrong !!!";
            if(error.response) {
                console.log(msg + error.response.data.message);
            } else{
                Promise.resolve({ error }).then(response => console.log(msg + response.error.message));
            } 
        });
    }

    render() {
        return (        
        <Container fluid style={{ marginTop: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Form>
                <Segment padded size='small'>
                    <Label attached='top'><Header as='h3'>Новый сервис пакет</Header></Label>
                    <Grid columns='four' divided>
                        <Grid.Row>                        
                            <Grid.Column>
                                <Form.Field>
                                    <Label>Компания</Label>
                                    <Dropdown placeholder='Select Company' fluid selection options={companyOptions}/>
                                </Form.Field>
                                <Form.Field>
                                    <Label>Страна</Label>
                                    <Dropdown placeholder='Select Country' fluid selection options={countryOptions}/>
                                </Form.Field>
                                <Form.Field>
                                    <Label>Категория</Label>
                                    <Dropdown placeholder='Выберите категорию' fluid selection options={categoryOptions}/>
                                </Form.Field>
                                <Form.Field>
                                    <Label>Товар</Label>
                                    <Dropdown placeholder='Select Product' fluid selection options={productOptions} />
                                </Form.Field>
                            </Grid.Column>                        
                            <Grid.Column>
                                <Form.Field>
                                    <Label>Дата начала действия</Label>
                                    <DatePicker />
                                </Form.Field>
                                <Form.Field>
                                    <Label>Название</Label>
                                    <Input type='text' placeholder='Название' />
                                </Form.Field>
                                <Form.Field>
                                    <Label>Примечание</Label>
                                    <Input type='text' placeholder='Примечание' />
                                </Form.Field>
                                {/* <Form.Input label='Название' placeholder='Название' />
                                <Form.Input label='Примечание' placeholder='Примечание' /> */}
                            </Grid.Column>                        
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Form>     
        </Container>        
        )
    }
}

export default Header2;