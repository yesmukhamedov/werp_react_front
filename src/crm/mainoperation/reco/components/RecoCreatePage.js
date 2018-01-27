import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Header,Container,Label,Icon,Form,Grid,Segment,Dropdown,Button,Divider,Checkbox,Radio,Input,List } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import recoStyles from '../css/recoStyles.css'
import { notify } from '../../../../general/notification/notification_action';
import DatePicker from "react-datepicker";
import moment from 'moment';
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

class RecoCreatePage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            dealerOptions:[],
            reco:{
                context:this.props.params.context || 'aa',
                contextId:this.props.params.contextId || 0,
                tempRecommender:'',
                recommenderInfo:'',
                responsibleId:0,
                items:[]
            },
            itemPhones:[]
        }

        this.renderHeaderForm = this.renderHeaderForm.bind(this);
        this.addReco = this.addReco.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.validateAndSendData = this.validateAndSendData.bind(this);
        this.removeReco = this.removeReco.bind(this);
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}/api/crm/reco/create?context=` + (this.props.params.context||'aa') + `&contextId=` + (this.props.params.contextId||0) ,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            this.setState({
                ...this.state,
                reco:res.data
            })
        }).catch((e) => {
            console.log(e);
        })

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
            loaded.unshift({
                key:0,
                text:'Не выбрано',
                value:0
            });
            this.setState({
                ...this.state,
                dealerOptions:loaded
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    handleChange(p1,p2){
        const {name,value} = p2;
        let {reco,itemPhones} = this.state;

        let tempIndex = name.indexOf('[');
        if(tempIndex > -1){
            const originalName = name.substring(0,tempIndex);
            const itemIndex = name.substring(tempIndex+1,name.indexOf(']'));
            let item = reco['items'][itemIndex];
            switch (originalName){
                case 'clientName':
                case 'districtName':
                case 'professionName':
                case 'relativeName':
                case 'note':
                case 'categoryId':
                case 'switchDate':
                case 'callerIsDealer':
                    item[originalName] = value;
                    break

                case 'callDate':
                    console.log(value);
                    break

                case 'hasAnimal':
                case 'hasChild':
                case 'hasAsthma':
                case 'hasAllergy':
                    if(p2.checked){
                        item[originalName] = 1;
                    }else{
                        item[originalName] = 0;
                    }
                break;

                case 'phoneNumber1':
                case 'phoneNumber2':

                    let v = value.replace(/[^0-9\.]+/g, '');
                    if(v.length === 0){
                        itemPhones[itemIndex][originalName] = '';
                        item[originalName] = '';
                    }else{
                        let v1 = v;
                        if(v.length > 8){
                             v1 = v.substring(0,3) + '-' + v.substring(3,6) + '-' + v.substring(6,8) + '-' + v.substring(8,10);
                        }else if(v.length > 6){
                            v1 = v.substring(0,3) + '-' + v.substring(3,6) + '-' + v.substring(6,8);
                        }else if(v.length > 3){
                            v1 = v.substring(0,3) + '-' + v.substring(3);
                        }

                        itemPhones[itemIndex][originalName] = v1;
                        item[originalName] = v.substring(0,10);
                    }
                    // console.log(v);
                    // console.log(isNaN(v));
                    break
            }

            reco['items'][itemIndex] = item;
        }else{
            reco[name] = value;
        }

        this.setState({
            ...this.state,
            reco:reco
        });
    }

    handleChangeDate(m,index){
        let {reco} = this.state;
        let item = reco['items'][index];
        if(m){
            console.log(m.utc().unix());
            item['callDate'] = m.valueOf();
        }else{
            item['callDate'] = null;
        }

        reco['items'][index] = item;
        this.setState({
            ...this.state,
            reco:reco
        });
    }

    addReco(){
        let {reco,itemPhones} = this.state;
        let itemIndex = reco.items.length;
            let form = {
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
            categoryId:0,
            switchDate:0
        };

        reco['items'][itemIndex] = form;
        itemPhones[itemIndex] = {
            phoneNumber1:'',
            phoneNumber2:''
        };
        this.setState({
            ...this.state,
            reco:reco,
            itemPhones:itemPhones
        })
    }

    renderRecoForms(){
        let {items} = this.state.reco;
        return items.map((item,index) => {
            return this.renderRecoForm(item,index)
        })
    }

    validateAndSendData(){
        let {reco} = this.state;
        let error = [];
        if(reco.responsibleId === 0){
            error.push("Выберите дилера");
        }

        if(!reco.tempRecommender || reco.tempRecommender.length === 0){
            error.push("Введите ФИО рекомендателя");
        }

        let items = reco.items.map((item,idx) => {
            let index = idx+1;
            if(item.phoneNumber1.length === 0 && item.phoneNumber2.length === 0){
                error.push("Введите хотя бы 1 Тел. номер в рекомендации №" + index);
            }else{
                if(item.phoneNumber1.length > 0 && item.phoneNumber1.length < 10){
                    error.push("Не правильно введен Тел. номер в рекомендации №" + index);
                }

                if(item.phoneNumber2.length > 0 && item.phoneNumber2.length < 10){
                    error.push("Не правильно введен Тел. номер в рекомендации №" + index);
                }
            }

            if(item.clientName.length === 0){
                error.push("Введите ФИО супруг в рекомендации №" + index);
            }

            if(item.categoryId === 0){
                error.push("Выберите категорию в рекомендации №" + index);
            }
        });

        this.setState({
            ...this.state,
            hasError:true
        });

        if(error.length > 0){
            this.props.notify('error',this.renderError(error),'Ошибка');
        }else{
            this.submitData();
        }
    }

    renderError(error){
        return <List items={error}></List>
    }

    submitData(){
        axios.post(`${ROOT_URL}/api/crm/reco/create`,{ ...this.state.reco }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                //this.context.router.push('/crm/reco/current');
                //window.location.href="/crm/reco/current";
            }).catch((error) => {
            switch (error.response.status){
                case 400:
                case 500:
                    this.props.notify('error',error.response.data.message,'Ошибка');
                    break;
            }
        })
    }

    getItemName(name,index){
        return name + '[' + index + ']';
    }

    renderCallDate(show,index){
        if(show){
            return <DatePicker
                label=""
                placeholderText={'Дата-время звонка'}
                showMonthDropdown showYearDropdown showTimeSelect dropdownMode="select"
                dateFormat="DD.MM.YYYY HH:mm"
                selected={this.state.reco.items[index].callDate?moment(this.state.reco.items[index].callDate):null}
                onChange={(v) => this.handleChangeDate(v,index)}
            />
        }

        return '';
    }

    removeReco(index){
        if(!window.confirm('Вы действительно хотите удалить рекомендацию №' + (index+1))){
            return false;
        }

        let {reco,itemPhones,itemIndex} = this.state;
        if(reco['items'][index]){
            let counter = 0;
            reco.items.splice(index,1);
            itemPhones.splice(index,1);


            // delete reco.items[index];
            // delete itemPhones[index];

            this.setState({
                ...this.state,
                reco:reco,
                itemPhones:itemPhones,
                itemIndex:reco.items.length
            })
        }
    }

    renderRecoForm(item,index){
        return <Grid.Column key={index} floated='left' width={5}>
                <Segment padded size='small'>
                <Label attached='top'>
                    <Header as='h3' floated='left'>№ {index+1}</Header>
                    <Button icon='delete' className='right floated' onClick={(e) => this.removeReco(index)}/>
                </Label>
                    <Form className='recoGrid'>
                        <Form.Input name={this.getItemName('clientName',index)}
                                    label="ФИО супруг" placeholder="ФИО супруг"
                                    onChange={this.handleChange} />
                        <Form.Input name={this.getItemName('districtName',index)} label="Район" placeholder="Район"
                                    onChange={this.handleChange} />
                        <Form.Input name={this.getItemName('professionName',index)} label="Профессия" placeholder="Профессия"
                                    onChange={this.handleChange} />
                        <Form.Input name={this.getItemName('relativeName',index)} label="Род. отношение" placeholder="Род. отношение"
                                    onChange={this.handleChange} />
                        <Form.Dropdown name={this.getItemName('switchDate',index)}
                                       fluid selection label="Дата время звонка"
                                       placeholder='Дата время звонка'
                                       options={switchDateOptions}
                                       onChange={this.handleChange}  />
                        {this.renderCallDate(item.switchDate === 1,index)}
                        <Form.Dropdown name={this.getItemName('callerIsDealer',index)} defaultValue="0" fluid selection label="Звонить будет"
                                       placeholder='Звонить будет' options={callerOptions}
                                       onChange={this.handleChange}  />
                        <Form.TextArea name={this.getItemName('note',index)} label="Примечание" placeholder="Примечание"
                                       onChange={this.handleChange}  />
                        <Form.Field>
                            <label>Тел. номер</label>
                        <Input label={{ basic:true,content:'+7'}} placeholder='705-224-26-45'
                               name={this.getItemName('phoneNumber1',index)} onChange={this.handleChange}
                               value={this.state.itemPhones[index]['phoneNumber1']} />
                        </Form.Field>

                        <Form.Field>
                            <label>Тел. номер</label>
                            <Input label={{ basic:true,content:'+7'}} placeholder='705-224-26-45'
                                   name={this.getItemName('phoneNumber2',index)}
                                   onChange={this.handleChange} value={this.state.itemPhones[index]['phoneNumber2']} />
                        </Form.Field>

                        <Form.Group inline>
                            <Form.Field name={this.getItemName('hasChild',index)} control={Checkbox} label='Ребенок' value='1'
                                        onChange={this.handleChange}  />
                            <Form.Field name={this.getItemName('hasAnimal',index)} control={Checkbox} label='Дом. жив.' value='1'
                                        onChange={this.handleChange}  />
                        </Form.Group>
                        <Form.Group inline>
                            <Form.Field name={this.getItemName('hasAllergy',index)} control={Checkbox} label='Аллергия' value='1'
                                        onChange={this.handleChange} />
                            <Form.Field name={this.getItemName('hasAsthma',index)} control={Checkbox} label='Астма' value='1'
                                        onChange={this.handleChange} />
                        </Form.Group>

                        <label>Категория клиента</label>
                        <Form.Group inline>
                            <Form.Field name={this.getItemName('categoryId',index)} control={Radio} label='1-я категория' value='1' checked={item.categoryId === '1'}
                                        onChange={this.handleChange} />
                            <Form.Field name={this.getItemName('categoryId',index)} control={Radio} label='2-я категория' value='2' checked={item.categoryId === '2'}
                                        onChange={this.handleChange} />
                            <Form.Field name={this.getItemName('categoryId',index)} control={Radio} label='3-я категория' value='3' checked={item.categoryId === '3'}
                                        onChange={this.handleChange} />
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
                        <Dropdown name="responsibleId"
                                  placeholder='Выберите дилера'
                                  fluid selection search
                                  value={this.state.reco.responsibleId}
                                  selectOnBlur={false}
                                  options={this.state.dealerOptions}
                                  onChange={this.handleChange} />
                    </Form.Field>

                    <Form.Input
                        name="tempRecommender"
                        value={this.state.reco.tempRecommender || ''}
                        readOnly={this.state.reco.contextId > 0}
                        onChange={this.handleChange} label="ФИО рекомендателя" />
                    {this.state.reco.contextId > 0?'':<Form.TextArea name="recommenderInfo" onChange={this.handleChange} label="Доп. данные рекомендателя" />}
                </Form.Group>
                <Button icon labelPosition='left' onClick={this.addReco}>
                    <Icon name="plus"/>
                    Добавить
                </Button>

                <Button onClick={this.validateAndSendData} primary floated='right'>Сохранить</Button>
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

const mapStateToProps = (state) => {
    return { state};
};

export default connect(mapStateToProps,{ notify }) (RecoCreatePage);