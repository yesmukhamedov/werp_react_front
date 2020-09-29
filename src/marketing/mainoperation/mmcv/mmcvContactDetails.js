//Contract contact details
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Table } from 'semantic-ui-react';
import { LinkToMmcecd } from '../../../utils/outlink';

import { f4FetchPhoneType } from '../../../reference/f4/f4_action';

const MmcvContactDetails = props => {
  const {
    contract,
    addrHome = {},
    addrWork = {},
    addrService = {},
    intl: { messages },
    phoneList = [],
    phoneTypeList = [],
    language,
  } = props;

  useEffect(() => {
    props.f4FetchPhoneType();

    //unmount
    return () => {};
  }, []);

  const findPhoneType = id => {
    return phoneTypeList.find(element => element.id === id);
  };

  return (
    <div>
      <LinkToMmcecd
        text={messages['toEdit']}
        contractNumber={contract.contractNumber}
      />
      <Table collapsing className="borderLess">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{messages['addrType']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['address']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['telDom']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['telMob1']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['telMob2']}</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{messages['addressHome']}</Table.Cell>
            <Table.Cell>
              <span>{addrHome.address}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrHome.telDom}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrHome.telMob1}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrHome.telMob2}</span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['addressWork']}</Table.Cell>
            <Table.Cell>
              <span>{addrWork.address}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrWork.telDom}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrWork.telMob1}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrWork.telMob2}</span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['addressService']}</Table.Cell>
            <Table.Cell>
              <span>{addrService.address}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrService.telDom}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrService.telMob1}</span>
            </Table.Cell>
            <Table.Cell>
              <span>{addrService.telMob2}</span>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{messages['phone_type']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.PhoneNumber']}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {phoneList.map((phone, key) => {
            const phontType = findPhoneType(phone.typeId);
            return (
              <Table.Row key={key}>
                <Table.Cell>
                  <label>
                    {
                      phontType[
                        `name${language.charAt(0).toUpperCase() +
                          language.slice(1)}`
                      ]
                    }
                  </label>
                </Table.Cell>
                <Table.Cell>
                  <label>{phone.phone}</label>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
    // </Segment>
  );
};

function mapStateToProps(state) {
  // console.log(state,'state')
  return {
    language: state.locales.lang,
    phoneTypeList: state.f4.phoneType.data,
  };
}

export default connect(mapStateToProps, {
  f4FetchPhoneType,
})(injectIntl(MmcvContactDetails));
