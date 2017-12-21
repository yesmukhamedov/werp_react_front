import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../css/recoStyles.css';
import ReactTable from 'react-table';
import MaskedInput from 'react-text-mask';
import { Tab,Header,Container,Label,Icon,Form,Grid,Segment,Dropdown,Button,Divider,Checkbox,Radio } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import Phone from './Phone';
import recoStyles from '../css/recoStyles.css'
import { notify } from '../../../../general/notification/notification_action';

const switchDateOptions = [
    {
        key:0,
        text:'В любое время',
        value:0
    },
    {
        key:1,
        text:'Задать дату',
        value:1
    }
];

const callerOptions = [
    {
        key:0,
        text:'Секретарь',
        value:0
    },
    {
        key:1,
        text:'Дилер',
        value:1
    }
];

const phoneMasks = {
    'kz':'9(999) 999 99 99'
};
class RecoCreatePage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            itemIndex:0,
            dealerOptions:[],
            reco:{
                index:0,
                context:'aa',
                contextId:0,
                tempRecommender:'',
                recommenderInfo:'',
                responsibleId:0,
                items:[]
            },
            callResultOptions:[],
            callRefuseOptions:[],
            usedItems:[]
        }

        this.renderHeaderForm = this.renderHeaderForm.bind(this);
        this.addReco = this.addReco.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}/api/hr/pyramid/crm/group-dealers`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            let loaded = res.data.map((item) => {
                return {
                    key:item.staffId,
                    text:item.lastname + ' ' + item.firstname,
                    value:item.staffId
                }
            })
            this.setState({
                ...this.state,
                dealerOptions:loaded
            })
        }).catch((e) => {
            console.log(e);
        })
    }



    handleItemChange(v, f, i){
        let {reco} = this.state;
        let items = reco['items'];
        let item = items[i];
        switch (f){
            case 'hasChild':
            case 'hasAnimal':
            case 'hasAllergy':
            case 'hasAsthma':
                if(v){
                    item[f] = 1;
                }else{
                    item[f] = 0;
                }
                break;

            default:
                item[f] = v;
        }

        items[i] = item;
        reco['items'] = items;
        this.setState({
            ...this.state,
            reco:reco
        })
    }

    handleItemCheckbox(o1,o2,o3){
        console.log(o1);
        console.log(o2);
        console.log(o3);
    }

    inputChange(v,f,i){
    }

    handleChange(v1,v2,v3){
        console.log(v1);
        console.log(v2);
        console.log(v3);
    }

    addReco(){
        let {reco,itemIndex} = this.state;
        let form = {
            index:itemIndex++,
            clientName:'',
            districtName:'',
            professionName:'',
            relativeName:'',
            callDate:null,
            callerIsDealer:0,
            note:'',
            phoneNumber1:'',
            phoneNumber2:'',
            hasChild:0,
            hasAnimal:0,
            hasAllergy:0,
            hasAsthma:0,
            categoryId:0
        };

        reco['items'].push(form);
        this.setState({
            ...this.state,
            reco:reco
        })
    }

    renderRecoForms(){
        let {items} = this.state.reco;
        return items.map((item) => {
            return this.renderRecoForm(item)
        })
    }

    submitData(){
        axios.post(`${ROOT_URL}/api/crm/reco`,{ ...this.state.reco }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response);
            }).catch((error) => {
            console.log(error);
        })
    }

    renderRecoForm(item){
        let value=0;
        let index = item.index;
        return <Grid.Column key={item.index} floated='left' width={5}>
                <Segment padded size='small'>
                <Label attached='top'><Header as='h3'>№ {item.index+1}</Header></Label>
                    <Form className='recoGrid'>
                        <Form.Input label="ФИО супруг" placeholder="ФИО супруг"
                                    onChange={(e, {value}) => this.handleItemChange(value, 'clientName',index)} />
                        <Form.Input label="Район" placeholder="Район"
                                    onChange={(e, {value}) => this.handleItemChange(value, 'districtName',index)} />
                        <Form.Input label="Профессия" placeholder="Профессия"
                                    onChange={(e, {value}) => this.handleItemChange(value, 'professionName',index)} />
                        <Form.Input label="Род. отношение" placeholder="Род. отношение"
                                    onChange={(e, {value}) => this.handleItemChange(value, 'relativeName',index)} />
                        <Form.Dropdown fluid selection label="Дата время звонка" placeholder='Выберите дилера'
                                       options={switchDateOptions}
                                       onChange={(e, {value}) => this.handleItemChange(value, 'switchDate',index)}  />
                        <Form.Dropdown defaultValue="0" fluid selection label="Звонить будет" placeholder='Звонить будет' options={callerOptions}
                                       onChange={(e, {value}) => this.handleItemChange(value, 'callerIsDealer',index)}  />
                        <Form.TextArea label="Примечание" placeholder="Примечание"
                                       onChange={(e, {value}) => this.handleItemChange(value, 'note',index)}  />
                        <Form.Field>
                            <label>Тел. номер</label>
                            <MaskedInput mask={['9','(999)', '999', '99', '99']} />
                            <input onChange={(e, {value}) => this.handleItemChange(value, 'phoneNumber1',index)}  />
                        </Form.Field>

                        <Form.Field>
                            <label>Тел. номер</label>
                            <input  onChange={(e, {value}) => this.handleItemChange(value, 'phoneNumber2',index)} />
                        </Form.Field>
                        <Form.Group inline>
                            <Form.Field control={Checkbox} label='Ребенок' value='1'
                                        onChange={(e, v) => this.handleItemChange(v.checked, 'hasChild',index)}  />
                            <Form.Field control={Checkbox} label='Дом. жив.' value='1'
                                        onChange={(e, {value}) => this.handleItemChange(value, 'hasAnimal',index)}  />
                        </Form.Group>
                        <Form.Group inline>
                            <Form.Field control={Checkbox} label='Аллергия' value='1'
                                        onChange={(e, {value}) => this.handleItemChange(value, 'hasAllergy',index)} />
                            <Form.Field control={Checkbox} label='Астма' value='1'
                                        onChange={(e, {value}) => this.handleItemChange(value, 'hasAsthma',index)} />
                        </Form.Group>

                        <label>Категория клиента</label>
                        <Form.Group inline>
                            <Form.Field control={Radio} label='1-я категория' value='1' checked={item.categoryId === '1'}
                                        onChange={(e, {value}) => this.handleItemChange(value, 'categoryId',index)} />
                            <Form.Field control={Radio} label='2-я категория' value='2' checked={item.categoryId === '2'}
                                        onChange={(e, {value}) => this.handleItemChange(value, 'categoryId',index)} />
                            <Form.Field control={Radio} label='3-я категория' value='3' checked={item.categoryId === '3'}
                                        onChange={(e, {value}) => this.handleItemChange(value, 'categoryId',index)} />
                        </Form.Group>

                    </Form>
            </Segment>
        </Grid.Column>
    }

    renderHeaderForm(){
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Дилер</label>
                        <Dropdown placeholder='Выберите дилера' fluid selection
                                  options={this.state.dealerOptions}
                                  onChange={(e, {value}) => this.inputChange(value, 'selectedCompany')} />
                    </Form.Field>

                    <Form.Input label="ФИО рекомендателя" />
                    <Form.TextArea label="Доп. данные рекомендателя" />
                </Form.Group>
                <Button icon labelPosition='left' onClick={this.addReco}>
                    <Icon name="plus"/>
                    Добавить
                </Button>

                <Button onClick={this.submitData} primary floated='right'>Сохранить</Button>
            </Form>
        )
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment padded size='small'>
                    <Label attached='top'><Header as='h3'>Добавление рекомендации</Header></Label>
                    {this.renderHeaderForm()}
                    <Divider/>
                    <Grid className='recoGrid'>
                    {this.renderRecoForms()}
                    </Grid>
                </Segment>

            </Container>
        )
    }
}

function mapStateToProps(state)
{
    return { };
}

export default connect(mapStateToProps,{ notify }) (RecoCreatePage);