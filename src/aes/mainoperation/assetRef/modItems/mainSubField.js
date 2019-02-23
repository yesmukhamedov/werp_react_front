import React from 'react';
import { Modal, Button, Segment, Grid, Table } from 'semantic-ui-react';
import AddOsName from './addItem/addOsName';
import AddType1 from './addItem/addType1';
import AddType2 from './addItem/addType2';
import AddType3 from './addItem/addType3';
import AddOsDetail from './addItem/addOsDetail';
import AddRoomNum from './addItem/addRoomNum';
import AddStatus from './addItem/addStatus';
import AddCompBr from './addItem/addCompBr';

import DisableOs from './disableItem/Os';
import DisableType1 from './disableItem/Tyepe1';
import DisableType2 from './disableItem/Type2';
import DisableType3 from './disableItem/Type3';
import DisableDetail from './disableItem/Detail';

export default function MainSubField(props) {
  const { open, dimmer } = props;
  const { messages } = props;
  const isEnabledType1 =
    props.queryParams.os_id === undefined || props.queryParams.os_id === null;
  const isEnabledType2 =
    props.queryParams.type1_id === undefined ||
    props.queryParams.type1_id === null;
  const isEnabledType3 =
    props.queryParams.type2_id === undefined ||
    props.queryParams.type2_id === null;
  const isEnabledDet =
    props.queryParams.type3_id === undefined ||
    props.queryParams.type3_id === null;
  return (
    <div>
      <br />
      <Segment padded size="small" color={'grey'}>
        <Grid columns={8}>
          <Grid.Row>
            <Grid.Column>
              <Button color="teal" onClick={props.show('comp_br')}>
                {messages['add_compbr_code']}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button color="teal" onClick={props.show('room_num')}>
                {messages['add_room']}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button color="teal" onClick={props.show('os_name')}>
                {messages['add_os']}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                color="teal"
                disabled={isEnabledType1}
                onClick={props.show('type1')}
              >
                {messages['add_type1']}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                color="teal"
                disabled={isEnabledType2}
                onClick={props.show('type2')}
              >
                {messages['add_type2']}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                color="teal"
                disabled={isEnabledType3}
                onClick={props.show('type3')}
              >
                {messages['add_type3']}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                color="teal"
                disabled={isEnabledDet}
                onClick={props.show('os_detail')}
              >
                {messages['add_det']}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button color="teal" onClick={props.show('status')}>
                {messages['add_cond']}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/********************************************************************** DISABLE TABLE */}
        <br />
        <br />
        <Table size="small" color={'grey'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{'Удалить OS'}</Table.HeaderCell>
              <Table.HeaderCell>{'Удалить Тип 1'}</Table.HeaderCell>
              <Table.HeaderCell>{'Удалить Тип 2'}</Table.HeaderCell>
              <Table.HeaderCell>{'Удалить Тип 3'}</Table.HeaderCell>
              <Table.HeaderCell>{'Удалить ОS деталь'}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3}>
                <span>
                  <Button icon="external" onClick={props.show('disableOs')} />
                </span>
              </Table.Cell>
              <Table.Cell width={3}>
                <span>
                  <Button
                    icon="external"
                    disabled={isEnabledType1}
                    onClick={props.show('disableType1')}
                  />
                </span>
              </Table.Cell>
              <Table.Cell width={3}>
                <span>
                  <Button
                    icon="external"
                    disabled={isEnabledType2}
                    onClick={props.show('disableType2')}
                  />
                </span>
              </Table.Cell>
              <Table.Cell width={3}>
                <span>
                  <Button
                    icon="external"
                    disabled={isEnabledType3}
                    onClick={props.show('disableType3')}
                  />
                </span>
              </Table.Cell>
              <Table.Cell width={2}>
                <span>
                  <Button
                    icon="external"
                    disabled={isEnabledDet}
                    onClick={props.show('disableDetail')}
                  />
                </span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
      <Modal open={open} onClose={props.close}>
        <Modal.Header>
          {(props.comp == 'os_name' && messages['add_os']) ||
            (props.comp == 'type1' && messages['add_type1']) ||
            (props.comp == 'type2' && messages['add_type2']) ||
            (props.comp == 'type3' && messages['add_type3']) ||
            (props.comp == 'os_detail' && messages['add_det']) ||
            (props.comp == 'room_num' && messages['add_room']) ||
            (props.comp == 'status' && messages['add_cond']) ||
            (props.comp == 'comp_br' && messages['add_compbr_code']) ||
            (props.comp == 'disableOs' && 'udalit os') ||
            (props.comp == 'disableType1' && 'udalit Type1') ||
            (props.comp == 'disableType2' && 'udalit Type2') ||
            (props.comp == 'disableType3' && 'udalit Type3') ||
            "messages['add_compbr_code']"}
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            {(props.comp == 'os_name' && (
              <AddOsName
                messages={messages}
                handleClose={props.close}
                newOs={props.newOs}
              />
            )) ||
              (props.comp == 'type1' && (
                <AddType1
                  messages={messages}
                  handleClose={props.close}
                  newType1={props.newType1}
                  {...props.queryParams}
                />
              )) ||
              (props.comp == 'type2' && (
                <AddType2
                  messages={messages}
                  handleClose={props.close}
                  newType2={props.newType2}
                  {...props.queryParams}
                />
              )) ||
              (props.comp == 'type3' && (
                <AddType3
                  messages={messages}
                  handleClose={props.close}
                  newType3={props.newType3}
                  {...props.queryParams}
                />
              )) ||
              (props.comp == 'os_detail' && (
                <AddOsDetail
                  messages={messages}
                  handleClose={props.close}
                  newDetail={props.newDetail}
                  {...props.queryParams}
                />
              )) ||
              (props.comp == 'room_num' && (
                <AddRoomNum
                  messages={messages}
                  handleClose={props.close}
                  newRnum={props.newRnum}
                />
              )) ||
              (props.comp == 'status' && (
                <AddStatus
                  messages={messages}
                  handleClose={props.close}
                  newStatus={props.newStatus}
                />
              )) ||
              (props.comp == 'comp_br' && (
                <AddCompBr
                  messages={messages}
                  handleClose={props.close}
                  newCompBr={props.newCompBr}
                  bukrs={props.queryParams.bukrs}
                  branch_id={props.queryParams.branch_id}
                />
              )) ||
              (props.comp == 'disableOs' && (
                <DisableOs
                  osList={props.osList}
                  messages={messages}
                  selOs={props.selOs}
                  handleClose={props.close}
                />
              )) ||
              (props.comp == 'disableType1' && (
                <DisableType1
                  listType1={props.listType1}
                  messages={messages}
                  selType1={props.selType1}
                  handleClose={props.close}
                />
              )) ||
              (props.comp == 'disableType2' && (
                <DisableType2
                  listType2={props.listType2}
                  messages={messages}
                  selType2={props.selType2}
                  handleClose={props.close}
                />
              )) ||
              (props.comp == 'disableType3' && (
                <DisableType3
                  listType3={props.listType3}
                  messages={messages}
                  selType3={props.selType3}
                  handleClose={props.close}
                />
              )) ||
              (props.comp == 'disableDetail' && (
                <DisableDetail
                  listDetail={props.listDetail}
                  messages={messages}
                  selDetail={props.selDetail}
                  handleClose={props.close}
                />
              ))}
          </Modal.Description>
        </Modal.Content>
      </Modal>
      {/**************************************************** DISABDLE */}
    </div>
  );
}
