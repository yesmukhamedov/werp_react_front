import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import {Icon} from 'semantic-ui-react';
import {onDeleteRow,onAddRow} from './hrb02_action';
import ReactTable from 'react-table';
import "react-table/react-table.css";


 
class Hrb02OutputTable extends PureComponent {

    bonusCategoryName=(category_id)=>{                                        
        if (category_id===1){
            return 'От продажи';
        }
        if (category_id===2){
            return 'От работы';
        }
        if (category_id===3){
            return 'Аксессуары';
        }
        if (category_id===4){
            return 'От общей суммы';
        }
    }

    displayIconStatus=(rowStatus)=>{
        if (rowStatus==="new") return <Icon name='checkmark'  size='large' color="green"/>;
        if (rowStatus==="del") return <Icon name='minus circle'  size='large' color="red"/>;
        if (rowStatus==="mod") return <Icon name='options'  size='large' color="orange"/>;        
    }


    fillTableColumns=()=>{                                        
        let t1columns = [];

        let t1r1c1 = {Header:({value}) => <b>Материал</b>,accessor: "matnrName"};
        let t1r1c2 = {Header:({value}) => <b>Тип бонуса</b>,accessor: "bonusTypeName", width: 200};
        let t1r1c3 = {Header:({value}) => <b>Категория</b>,accessor: "category_id",Cell: ({value}) => this.bonusCategoryName(value), width: 200};
        let t1r1c4 = {Header:({value}) => <b>Должность</b>,accessor: "positionName"};
        let t1r1c5 = {Header:({value}) => <b>Продожа от</b>,accessor: "from_num", width: 100};
        let t1r1c6 = {Header:({value}) => <b>Продажа по</b>,accessor: "to_num", width: 100};
        let t1r1c7 = {Header:({value}) => <b>Сумма</b>,accessor: "coef", width: 200};
        let t1r1c8 = {Header:({value}) => <b>Валюта</b>,accessor: "waers", width: 100};
        let t1r1c9 = {Header:({value}) => <b>Депозит</b>,accessor: "deposit", width: 100};
        let t1r1c10 = {Header:({value}) => <b>Min</b>,accessor: "req_value", width: 100};
        let t1r1c11 = {Header:({value}) => <b></b>,accessor: "rowStatus",Cell: ({value}) => this.displayIconStatus(value), width: 40};
        let t1r1c12 = {Header:({value}) => <b></b>,id:"rowEdit",Cell:obj=><span> 
            <Icon name='edit'  size='large'  className="clickableIcon" onClick={(event)=> this.props.bonusEditModalOpenHandler(obj.index,obj.original)} />
            <Icon name='remove'  size='large'  className="clickableIcon" color="red" onClick={()=>this.props.onDeleteRow(obj.index)}/>
            </span>, width: 80,
            Footer: (
                <span>
                    <Icon name='add'  size='large'  className="clickableIcon" color="green" onClick={()=>this.props.onAddRow()}/>
                </span>
              )
        };
        
        let t1r1c13 = {Header:({value}) => <b>Срок</b>,accessor: "term_in_month", width: 40};

        //adding columns
        if (this.props.current)
        {
            t1columns.push(t1r1c11); 
        } 
                
        if(this.props.tovarCategory===1 || this.props.tovarCategory===2) {t1columns.push(t1r1c1);}
        t1columns.push(t1r1c2);        
        if(this.props.tovarCategory===5) {t1columns.push(t1r1c3);}        
        t1columns.push(t1r1c4);
        t1columns.push(t1r1c5);
        t1columns.push(t1r1c6);
        t1columns.push(t1r1c7);
        t1columns.push(t1r1c8);

        if(this.props.tovarCategory===1 || this.props.tovarCategory===2) {
            t1columns.push(t1r1c9);
            t1columns.push(t1r1c10);
            t1columns.push(t1r1c13);
            
        }
        if (this.props.current)
        {
            t1columns.push(t1r1c12);
        } 
        return t1columns;
    }



    render(){
        // console.log('render')
       
        // if (this.props.table && this.props.table.length===0) return "";
        let t1columns = this.fillTableColumns();

        

        

        return (
            <ReactTable
                        data={this.props.table}
                        columns={t1columns}
                        // pageSize={this.props.table?this.props.table.length:5}
                        
                        showPagination={true}
                        loadingText= 'Loading...'
                        className="-striped -highlight"
                        defaultPageSize={20}
                        
                        noDataText= 'Нет записей'
                        previousText={'Пред.'}
                        nextText={'След.'}
                        rowsText={'строк'}
                        pageText={'Страница'}
                        ofText={'из'}
                        />
                        
        );
        
        
    }

    
    
};




function mapStateToProps(state)
{
    // console.log(state)
    return {  };
}

export default connect(mapStateToProps,{onDeleteRow,onAddRow }) (Hrb02OutputTable);
