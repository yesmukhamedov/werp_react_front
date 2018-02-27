import React, { PureComponent } from 'react';
import { Modal, Message, Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {f4FetchPositionList, f4ClearPositionList} from '../f4_action'
import matchSorter from 'match-sorter';
// import './notification.css'

// const arrayList= ;
class PositionF4Modal extends PureComponent{
    constructor (props) {
        super(props)
    }
    componentWillMount() {
        this.props.f4FetchPositionList(this.props.trans);
    }
  
    componentWillUnmount(){
        this.props.f4ClearPositionList();
    }


    close = () => {
        this.props.closeModal(false);
    }



    render () {
        let trans = this.props.trans;
        let t1columns = [];

        if (trans==='hrb02')
        {
            let t1r1c1 = {Header:({value}) => <b>ID</b>,accessor: "position_id",width: 100,className:'clickableItem'};
            let t1r1c2 = {Header:({value}) => <b>Название</b>
            ,id: "text",
            accessor: d => d.text,
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["text"] }),
            filterAll: true,className:'clickableItem'};
    
    
            
            t1columns.push(t1r1c1);
            t1columns.push(t1r1c2);
        }
        



        return (

            <Modal open={this.props.open} onClose={this.close}  dimmer={"inverted"} size='small' >
                <Modal.Header>
                    <Icon name='filter' size='big' />
                    Должности
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
  return { table: state.f4.positionList }
}

export default connect(mapStateToProps, {f4FetchPositionList, f4ClearPositionList })(PositionF4Modal)
