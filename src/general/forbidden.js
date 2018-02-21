import React, { Component } from 'react'
import {Container, Header, Icon, Image} from 'semantic-ui-react'

class ForbiddenPage extends Component {
  render () {
    return (

      <Container style={{ marginTop: '1em' }}>
        <Header as='h1' icon textAlign='center'>
          <Image src='../assets/images/forbidden.png' size='medium' />
                    У вас нет доступа
        </Header>
      </Container>

    )
  }
};

export default ForbiddenPage

// import React from 'react';

// const ForbiddenPage = () =>{
//     return ("zzzzzzzzzzzzzzzzzzz");
// };

// export default ForbiddenPage;
