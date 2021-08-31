import React, { Component } from 'react';
import { doGet } from '../../../utils/apiActions';
import { Form } from 'semantic-ui-react';

class PositionF4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selected: '',
        };
    }

    componentWillMount() {
        doGet(`core/reference/positions`)
            .then(res => {
                const loaded = res.data.map(p => ({
                    key: p.position_id,
                    text: p.text,
                    value: p.position_id,
                }));

                loaded.unshift({
                    key: 0,
                    text: 'Не выбрано',
                    value: 0,
                });

                this.setState({
                    ...this.state,
                    options: loaded,
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <Form.Select
                value={this.props.value || null}
                name="position"
                multiple={this.props.multiple || false}
                search={this.props.search}
                selection
                label="Должность"
                selectOnBlur={false}
                options={this.state.options}
                placeholder="Должность"
                onChange={this.props.handleChange}
            />
        );
    }
}

export default PositionF4;
