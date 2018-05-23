import React,{Component} from 'react'
import { connect } from 'react-redux'
import {REP_894,REP_914,REP_934,REP_935,REP_740} from '../../crmRepUtil'
import { Modal,Form,TextArea,Button } from 'semantic-ui-react'
import {RepTable894,RepTable914,RepTable740} from './RepTables'
import {toggleRepModal,updateDirectorNote} from '../../actions/crmReportAction'


class RepTable extends Component{

    constructor(props){
        super(props)

        this.state = {
            demoId: null,
            directorNote: ''
        }

        this.renderRep740Modal = this.renderRep740Modal.bind(this)
    }

    handleChange = (e,d) => {
        const {name,value} = d
        if(name === 'directorNote'){
            this.setState({
                ...this.state,
                directorNote: value
            })
        }

    }

    renderRep740Modal (){
        let {demoId,directorNote} = this.state
        return <Modal size={'small'} open={this.props.repModalOpened}>
                    <Modal.Header>Добавление/Редактирование примечании</Modal.Header>
                    <Modal.Content>
                        <Form>
                        <Form.Field control={TextArea} onChange={this.handleChange}
                                    name='directorNote'  label='Примечание'
                                    value={directorNote || ''}
                                    placeholder='Примечание директора...' />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => this.props.toggleRepModal(false)}>Отмена</Button>
                        <Button positive icon='checkmark' onClick={() => this.props.updateDirectorNote(demoId,directorNote)}
                                labelPosition='right' content='Сохранить' />
                    </Modal.Actions>
            </Modal>
    }

    openModal = (id,note) => {
        this.props.toggleRepModal(true)
        this.setState({
            demoId: id,
            directorNote: note
        })
    }

    render(){
        const {id} = this.props.meta
        switch (id){
            case REP_894:
            case REP_934:
            case REP_935:
                return <RepTable894 transactionId={id} items={this.props.items} />

            case REP_740:
                return <div>
                        <RepTable740
                            openModal={this.openModal}
                            transactionId={id}
                            items={this.props.items} />
                        {this.renderRep740Modal()}
                    </div>

            case REP_914:
                return <RepTable914 items={this.props.items} />

            default:
                return <h2>Report Table Not Found!</h2>
        }
    }
}

function mapStateToProps (state) {
    return {
        items: state.crmReportReducer.items,
        meta: state.crmReportReducer.meta,
        repModalOpened: state.crmReportReducer.repModalOpened
    }
}

export default connect(mapStateToProps, {
    toggleRepModal,updateDirectorNote
})(RepTable)