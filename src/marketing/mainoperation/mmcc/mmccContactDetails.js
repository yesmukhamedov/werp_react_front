//Contract contact details
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import AddressF4Modal from '../../../reference/f4/address/addressF4WithCreationPage';

import { Table, Icon } from 'semantic-ui-react';

import {
  f4FetchPhoneType,
  f4FetchPhone,
  f4FetchBranchesByBukrs,
} from '../../../reference/f4/f4_action';

const MmccContactDetails = props => {
  const [addressF4ModalOpen, setAddressF4ModalOpen] = useState(false);
  const [addressF4ModalType, setAddressF4ModalType] = useState('');

  const [countryId, setCountryId] = useState({});

  const {
    addrHome = {},
    addrWork = {},
    addrService = {},
    contract: { bukrs, customerId, customerName, branchId } = {},
    intl: { messages },
    language,
    phoneTypeList = [],
    bukrsBranches = [],
    phoneList = [],
  } = props;

  //componentDidMount
  useEffect(() => {
    props.f4FetchPhoneType();
    //unmount
    return () => {};
  }, []);

  useEffect(() => {
    if (bukrsBranches && branchId && bukrsBranches.length > 0 && branchId > 0) {
      const branch = bukrsBranches.find(item => item.branch_id === branchId);
      setCountryId(branch.country_id);
    }
  }, [bukrsBranches, branchId]);

  useEffect(() => {
    if (customerId && customerId > 0) {
      props.f4FetchPhone({
        search: `customerId==${customerId}`,
      });
    }
  }, [customerId]);

  useEffect(() => {
    if (bukrs) {
      props.f4FetchBranchesByBukrs(bukrs);
    }
  }, [bukrs]);

  const findPhoneType = id => {
    return phoneTypeList.find(element => element.id === id);
  };

  return (
    // <Segment padded size="small">
    //       <Label color="orange" ribbon>
    //         {messages['contactDetails']}
    //       </Label>
    <div>
      <AddressF4Modal
        open={addressF4ModalOpen}
        customerId={customerId}
        customerName={customerName}
        onCloseAddressF4={bool => {
          setAddressF4ModalOpen(bool);
          if (!bool && customerId && customerId > 0) {
            props.f4FetchPhone({
              search: `customerId==${customerId}`,
            });
          }
        }}
        onAddressSelect={item =>
          props.onConDetInputChange(item, addressF4ModalType)
        }
        countryId={countryId}
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
            <Table.Cell>
              <span>
                <Icon
                  name="clone"
                  size="large"
                  className="clickableIcon"
                  onClick={() => {
                    setAddressF4ModalOpen(true);
                    setAddressF4ModalType('addrHomeId');
                  }}
                />
                <Icon
                  name="remove"
                  size="large"
                  className="clickableIcon"
                  color="red"
                  onClick={event =>
                    props.onConDetInputChange('remove', 'addrHomeIdRemove')
                  }
                />
              </span>
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
            <Table.Cell>
              <span>
                <Icon
                  name="clone"
                  size="large"
                  className="clickableIcon"
                  onClick={() => {
                    setAddressF4ModalOpen(true);
                    setAddressF4ModalType('addrWorkId');
                  }}
                />
                <Icon
                  name="remove"
                  size="large"
                  className="clickableIcon"
                  color="red"
                  onClick={event =>
                    props.onConDetInputChange('remove', 'addrWorkIdRemove')
                  }
                />
              </span>
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
            <Table.Cell>
              <span>
                <Icon
                  name="clone"
                  size="large"
                  className="clickableIcon"
                  onClick={() => {
                    setAddressF4ModalOpen(true);
                    setAddressF4ModalType('addrServiceId');
                  }}
                />
                <Icon
                  name="remove"
                  size="large"
                  className="clickableIcon"
                  color="red"
                  onClick={event =>
                    props.onConDetInputChange('remove', 'addrServiceIdRemove')
                  }
                />
              </span>
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
  // console.log(state, 'state');
  return {
    language: state.locales.lang,
    phoneTypeList: state.f4.phoneType.data,
    bukrsBranches: state.f4.bukrsBranches,
    phoneList: state.f4.phoneList.data,
  };
}

export default connect(mapStateToProps, {
  f4FetchPhone,
  f4FetchPhoneType,
  f4FetchBranchesByBukrs,
})(injectIntl(MmccContactDetails));
