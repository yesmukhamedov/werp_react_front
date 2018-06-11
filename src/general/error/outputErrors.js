import React from 'react';
import { Segment, List, Label  } from 'semantic-ui-react';

const OutputErrors = (props) => {
    const {errors} = props;
    if (errors===null || errors===undefined || errors.length===0){
        return '';
    }
    return (
        <Segment padded size="small">
            <List>
                {errors.map((item,idx)=>{
                    return (                        
                        <List.Item key={idx}> 
                            <List.Content verticalAlign='middle'>
                                <Label basic color='red' >
                                    {item}
                                </Label>
                            </List.Content>
                        </List.Item>
                    )
                })}
            </List>
        </Segment>

    )

}
export default OutputErrors;  