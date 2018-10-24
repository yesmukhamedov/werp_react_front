import React, { Component } from 'react'; 
import { connect } from 'react-redux'
import { Header, Icon, Form, Segment,  Button, Input, Container, Grid,Modal } from 'semantic-ui-react';
import ListTable from './listTable';
import ListTableCreate from './listTableCreate';
import {fetchCurrentTransactions, createTransaction, updateTransaction} from '../actions/transactionAction';

class List extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false
        } 
        this.handleClose = this.handleClose.bind(this);
        this.createTransaction = this.createTransaction.bind(this);
        this.newTransaction = this.newTransaction.bind(this);
    }

    
    componentWillMount () {
        this.props.fetchCurrentTransactions();
    }
    
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose(){
        this.setState({ modalOpen: false })
    }

    createTransaction(localTransaction){
        this.props.createTransaction(localTransaction);
    }

    newTransaction(updateTransaction){
        this.props.updateTransaction(updateTransaction);
    }


    render() {
        return (
            <div>
                <div id="transaction">
                    <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                        <Segment clearing>
                            <Header as='h2' floated='left'>
                                Список транзакции
                            </Header>
                            <Modal size='fullscreen' 
                                trigger={<Button floated='right' onClick={this.handleOpen} color='blue'><Icon name='plus' />Добавить</Button>}
                                open={this.state.modalOpen}
                                onClose={this.handleClose}
                                >
                                <Modal.Header>Добавление нового транзакции</Modal.Header>
                                <Modal.Content>
                                    <ListTableCreate 
                                        createTransaction={this.createTransaction}
                                        handleClose={this.handleClose}
                                    />
                                </Modal.Content>
                                <Modal.Actions>
                                </Modal.Actions>
                            </Modal>
                        </Segment>
                    </Container>
                    <div className="ui grid">
                        <div className="two wide column">
                        </div>

                        <div className="twelve wide column">
                           <ListTable transactions={this.props.currentTransactions}   newTransaction={this.newTransaction} />
                        </div>
                        <div className="two wide column">
                        </div>
                    </div> 
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        currentTransactions: state.transactionReducer
    }
}

export default connect(mapStateToProps, { fetchCurrentTransactions, createTransaction, updateTransaction })(List);
