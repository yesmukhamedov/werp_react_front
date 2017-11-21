import React, {Component} from 'react'
import {
    Button,
    Label,
    Input,
    Form,
    Dropdown,
    Grid,
    Header,
    Segment
} from 'semantic-ui-react'
import moment from 'moment'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default class SearchPanel extends Component {
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
            startDate,
            endDate,
            servicePacketId,
            handleSearch
        } = this.props
        return (
            <Form>
                <Segment padded size='small'>
                    <Label attached='top'>
                        <Header as='h3'>Активация / Деактивация сервис пакета</Header>
                    </Label>
                    <Header as='h5'>Параметры поиска</Header>
                    <Grid columns='five' divided>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Form.Field>
                                    <label>Страна</label>
                                    <Dropdown
                                        placeholder='Выберите страну'
                                        fluid
                                        selection
                                        options={countryOpts}
                                        value={selectedCountry}
                                        onChange={(e, {value}) => inputChange(value, 'selectedCountry')}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Компания</label>
                                    <Dropdown
                                        placeholder='Выберите компанию'
                                        fluid
                                        selection
                                        options={companyOpts}
                                        value={selectedCompany}
                                        onChange={(e, {value}) => inputChange(value, 'selectedCompany')}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Категория</label>
                                    <Dropdown
                                        placeholder='Выберите категорию'
                                        fluid
                                        selection
                                        disabled={!(selectedCountry && selectedCompany)}
                                        value={selectedCategory}
                                        options={categoryOpts}
                                        onChange={(e, {value}) => {
                                        inputChange(value, 'selectedCategory');
                                        fetchCategories(selectedCompany, value);
                                    }}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Товар</label>
                                    <Dropdown
                                        placeholder='Select Product'
                                        fluid
                                        selection
                                        value={selectedProduct}
                                        options={productOpts}
                                        disabled={!(selectedCountry && selectedCompany && selectedCategory)}
                                        onChange={(e, {value}) => {
                                        inputChange(value, 'selectedProduct');
                                    }}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Период</label>
                                </Form.Field>
                                    с <DatePicker 
                                        dateFormat="DD.MM.YYYY"
                                        selected={startDate}
                                        onChange={date => inputChange(date, 'startDate')} />                                                          
                                    до <DatePicker 
                                        dateFormat="DD.MM.YYYY"
                                        selected={endDate}
                                        onChange={date => inputChange(date, 'endDate')}/>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Form.Field>
                                    <label>По номеру пакета</label>
                                    <Input 
                                        type='text' 
                                        placeholder='номер пакета'
                                        onChange={(e, {value}) => inputChange(value,'servicePacketId')} />
                                </Form.Field>
                                <Form.Field>
                                    <label>По запчастям</label>
                                    <Input type='text' placeholder='номер запчасти'/>
                                </Form.Field>
                                <Form.Field>
                                    <label>По услугам</label>
                                    <Input type='text' placeholder='номер услуги'/>
                                </Form.Field>
                                <Button size='huge' onClick={handleSearch}>Поиск</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Form>
        )
    }
}