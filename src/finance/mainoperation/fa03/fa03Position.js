

import React, { PureComponent } from 'react';
import { Popup, Segment, Label, Input } from 'semantic-ui-react';
import {moneyFormat} from '../../../utils/helpers';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';


const PopupHkontInfo = (hkont,hkontName) => (
    <Popup trigger={<span>{hkont}</span>} flowing hoverable>
        <Segment inverted> {hkontName}</Segment>
    </Popup>
)  

class Fa03Position extends PureComponent{
    
    constructor(props){
        super(props);
    }

    render(){
        if (!this.props.bseg){
            return '';
        }

        const {formatMessage} = this.props.intl;
        
        let readOnlyValue=true;
        if (this.props.trans==="FA02")
        {
            readOnlyValue = false;
        }

        let columns = [];
        
        let col01 = {Header:({value}) => <b>{formatMessage(messages.buzei)}</b>,accessor: "buzei", width: 40};
        let col02 = {Header:({value}) => <b>{formatMessage(messages.bschl)}</b>,accessor: "bschl", width: 40};
        let col03 = {Header:({value}) => <b>{formatMessage(messages.hkont)}</b>,accessor: "hkontName"
            ,Cell: (obj) => (<span>{PopupHkontInfo(obj.original.hkont,obj.original.hkontName)}</span>), width: 100};
        let col04 = {Header:({value}) => <b>{formatMessage(messages.amount)} {formatMessage(messages.inLocalCurrency)}</b>,accessor: "dmbtr"
            ,Cell: ({value}) => <span> {moneyFormat(value)} {"USD"} </span> , width: 240};
        let col05 = {Header:({value}) => <b>{formatMessage(messages.amount)} {formatMessage(messages.inDocumentCurrency)}</b>,accessor: "wrbtr"
            ,Cell: ({value}) => <span> {moneyFormat(value)} {this.props.bkpf.waers}</span>, width: 240};
        let col06 = {Header:({value}) => <b>{formatMessage(messages.shkzg)}</b>,accessor: "shkzg", width: 40};
        let col07 = {Header:({value}) => <b>{formatMessage(messages.matnr)}</b>,accessor: "matnrName", width: 200};
        let col08 = {Header:({value}) => <b>{formatMessage(messages.werks)}</b>,accessor: "werksName", width: 150};
        let col09 = {Header:({value}) => <b>{formatMessage(messages.menge)}</b>,accessor: "menge", width: 80};
        let col10 = {Header:({value}) => <b>{formatMessage(messages.meins)}</b>,accessor: "meins", width: 100};
        let col11 = {Header:({value}) => <b>{formatMessage(messages.customer)}</b>,accessor: "lifnrName", width: 160};
        let col12 = {Header:({value}) => <b>{formatMessage(messages.bktxt)}</b>,accessor: "sgtxt", 
        // Cell: (obj) =>  <input onChange={(e, { value }) => this.props.onInputChangeData(value,'bktxt','') />,
       
        Cell: (obj) => (<span>
            <Input value={obj.original.sgtxt}  maxLength='45' readOnly={readOnlyValue} onChange={(e, { value }) => this.props.onInputChangeData(value,'sgtxt',obj.index)}/>
            </span>)
        ,width: 200};
        
       
        columns.push(col01);            
        columns.push(col02);
        columns.push(col03);
        columns.push(col04);
        columns.push(col05);
        columns.push(col06);
        columns.push(col07);
        columns.push(col08);
        columns.push(col09);
        columns.push(col10);
        columns.push(col11);
        columns.push(col12);

       
        return (

            <Segment padded size="small">                
                <Label color="green" ribbon>
                    {formatMessage(messages.buzeiFullText)}
                </Label>
                <br />
                <br />
                <ReactTable
                    data={this.props.bseg}
                    columns={columns}
                    showPagination={this.props.bseg.length>10?true:false}
                    loadingText= 'Loading...'
                    className="-striped -highlight"
                    defaultPageSize={this.props.bseg.length<11?this.props.bseg.length:10}
                        
                    noDataText= 'Нет записей'
                    previousText={'Пред.'}
                    nextText={'След.'}
                    rowsText={'строк'}
                    pageText={'Страница'}
                    ofText={'из'}
                    />           
            </Segment>
            
        )     
    }

}


export default (injectIntl(Fa03Position))