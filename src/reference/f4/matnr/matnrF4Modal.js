import React, { PureComponent } from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {f4FetchMatnrList, f4ClearMatnrList} from '../f4_action'
import matchSorter from 'match-sorter';
// import './notification.css'

// const arrayList= ;
class MatnrF4Modal extends PureComponent{
    
    componentWillMount() {
        this.props.f4FetchMatnrList(this.props.trans);
    }
  
    componentWillUnmount(){
        this.props.f4ClearMatnrList();
    }


    close = () => {
        this.props.closeModal(false);
    }



    render () {
        let trans = this.props.trans;
        let t1columns = [];

        if (trans==='hrb02')
        {
            let t1r1c1 = {Header:({value}) => <b>ID</b>,accessor: "matnr",width: 100,className:'clickableItem'};
            let t1r1c2 = {Header:({value}) => <b>Code</b>,accessor: "code",width: 150,className:'clickableItem'};
            let t1r1c3 = {Header:({value}) => <b>Название</b>
            //,accessor: "text45"
            ,id: "text45",
            accessor: d => d.text45,
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["text45"] }),
            filterAll: true,className:'clickableItem'};
    
    
            
            t1columns.push(t1r1c1);
            t1columns.push(t1r1c2);
            t1columns.push(t1r1c3);
        }
        



        return (

            <Modal open={this.props.open} onClose={this.close}  dimmer={"inverted"} size='small' >
                <Modal.Header>
                    <Icon name='filter' size='big' />
                    Материалы
                </Modal.Header>
                <Modal.Content>
                    {trans &&
                        <ReactTable
                            filterable
                            data={this.props.table}
                            columns={t1columns}
                            defaultPageSize={10}
                            showPagination={true}
                            // style={{ height: '400px' }}
                            loadingText= 'Loading...'
                            noDataText= 'Нет записей'
                            className="-striped -highlight"
                            previousText={'Пред.'}
                            nextText={'След.'}
                            rowsText={'строк'}
                            pageText={'Страница'}
                            ofText={'из'}
                            showPageSizeOptions= {false}
                            getTrProps={(state, rowInfo, column) => {
                                return {
                                  
                                  onClick: (e, handleOriginal) => {
                                    this.props.selectItem(rowInfo.original);
                                    this.props.closeModal(false);
                                  },
                                };
                              }}
                            
                            />
                        
            
                    }
                </Modal.Content>
            </Modal>


        )
    }
};
// export default Notification;
function mapStateToProps (state) {
  return { table: state.f4.matnrList }
}

export default connect(mapStateToProps, {f4FetchMatnrList, f4ClearMatnrList })(MatnrF4Modal)
