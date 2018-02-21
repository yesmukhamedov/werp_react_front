import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/NewIssueAction';
import {Container,  Dimmer, Loader, Header, Segment, Table, Menu, Message, Divider, Grid} from 'semantic-ui-react';

class NewIssuePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            testData: {}
        }
    }

    render(){   
        const {id} = this.props.params   
        console.log("SNcontract", id)  
        return (
            // <Dimmer active>
            //     <Loader indeterminate>NewIssuePage for {id}</Loader>
            // </Dimmer>
            <Container style={{ padding: '2em 0em' }} text>
                <Grid columns={2}>
                <Grid.Column >
                    <Header as='h2'>New Issue</Header>

                    <Header as='h4' attached='top' block>Top Block Header</Header>
                    <Segment attached>Segment</Segment>

                    <Divider section />

                </Grid.Column >
                <Grid.Column >            
                    <Header as='h4' attached='top' block>Top Block Header</Header>
                    <Segment attached>Segment</Segment>

                    <Divider section />
                </Grid.Column >
                </Grid>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        directories: state.contractList.directories
    };
}

export default connect(mapStateToProps, actions) (NewIssuePage);