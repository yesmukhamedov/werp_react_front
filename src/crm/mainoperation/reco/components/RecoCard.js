import React from 'react';
import {
  Label,
  Form,
  Grid,
  Segment,
  Button,
  Input,
  Popup,
  Icon,
} from 'semantic-ui-react';
import '../css/recoCard.css';
import {
  getCallerOptionsByLanguage,
  getRecoCategoriesOptionsByLanguage,
} from '../../../crmUtil';
import moment from 'moment';
import DatePicker from 'react-datepicker';

/**
 * Используется в создании рекомендации
 */
const errorBlockCss = {
  display: 'block',
  color: 'red',
  marginTop: '-10px',
};
export default function RecoCard(props) {
  // Single Card
  const {
    item,
    index,
    phoneErrors,
    loadingPhones,
    phonePattern,
    recoErrors,
    messages,
    locale,
    errors,
  } = props;
  const patternLength = phonePattern.replace(/[^0-9]+/g, '').length;
  const errorKey = `items[${index}].`;
  const phoneHasError = name => {
    const name2 = name === 'phoneNumber1' ? 'phoneNumber2' : 'phoneNumber1';
    if (!item[name]) {
      if (!item[name2] || item[name2].length === 0) {
        return true;
      }
      return false;
    }

    if (item[name].length < patternLength) {
      return true;
    }

    if (!phoneErrors[item[name]]) {
      return false;
    }

    return phoneErrors[item[name]] > 0;
  };

  const isPhoneLoading = name => {
    if (!item[name]) {
      return false;
    }

    return loadingPhones[item[name]];
  };

  const renderCallDate = (item, index) => {
    if (item.switchDate === 1) {
      return (
        <DatePicker
          locale={locale}
          label=""
          autoComplete="off"
          placeholderText={messages['Crm.CallDateTime']}
          showMonthDropdown
          showYearDropdown
          showTimeSelect
          dropdownMode="select"
          dateFormat="DD.MM.YYYY HH:mm"
          selected={item.callDate ? moment(item.callDate) : null}
          onChange={v => props.handleChangeDate(v, index)}
        />
      );
    }

    return '';
  };

  return (
    <Grid.Column color={'grey'} key={item.id} floated="left" width={4}>
      <Segment padded size="small" className="card-segment">
        <Label as="a" color={'teal'} ribbon>
          №{index + 1}
        </Label>
        <Button
          size={'mini'}
          color={'red'}
          icon="delete"
          className="right floated"
          onClick={e => props.removeReco(index, item.id, messages)}
        />

        <Form className="recoGrid">
          <Form.Input
            error={!item['clientName'] || item['clientName'].length === 0}
            label={messages['Form.Reco.RecoName']}
            placeholder={messages['Form.Reco.RecoName']}
            onChange={(e, d) =>
              props.handleChange('clientName', index, d.value)
            }
            value={item.clientName || ''}
          />
          <div style={errorBlockCss}>{errors[errorKey + 'clientName']}</div>
          <br />

          <Form.Dropdown
            value={item.categoryId || 0}
            error={!item.categoryId || item.categoryId === 0}
            fluid
            selection
            label={messages['Form.Reco.Category']}
            placeholder={messages['Form.Reco.Category']}
            options={getRecoCategoriesOptionsByLanguage(locale)}
            onChange={(e, d) =>
              props.handleChange('categoryId', index, d.value)
            }
          />
          <div style={errorBlockCss}>{errors[errorKey + 'categoryId']}</div>
          <br />

          <Form.Input
            label={messages['Form.Reco.District']}
            placeholder={messages['Form.Reco.District']}
            onChange={(e, d) =>
              props.handleChange('districtName', index, d.value)
            }
            value={item.districtName || ''}
          />
          <div style={errorBlockCss}>{errors[errorKey + 'districtName']}</div>
          <br />

          <Form.Input
            value={item.relativeName || ''}
            label={messages['Form.Reco.Relative']}
            placeholder={messages['Form.Reco.Relative']}
            onChange={(e, d) =>
              props.handleChange('relativeName', index, d.value)
            }
          />
          <div style={errorBlockCss}>{errors[errorKey + 'relativeName']}</div>
          <br />

          <Form.Dropdown
            defaultValue={0}
            fluid
            selection
            label={messages['Form.Reco.CallerIs']}
            placeholder={messages['Form.Reco.CallerIs']}
            options={getCallerOptionsByLanguage(locale)}
            onChange={(e, d) =>
              props.handleChange('callerIsDealer', index, d.value)
            }
          />
          <div style={errorBlockCss}>{errors[errorKey + 'callerIsDealer']}</div>
          <br />

          <Form.TextArea
            value={item.note || ''}
            rows={1}
            label={messages['Form.Reco.Note']}
            placeholder={messages['Form.Reco.Note']}
            onChange={(e, d) => props.handleChange('note', index, d.value)}
          />
          <div style={errorBlockCss}>{errors[errorKey + 'note']}</div>
          <br />

          <Form.Field error={phoneHasError('phoneNumber1')}>
            <label>{messages['Form.Reco.PhoneNumber']}</label>
            <Input
              label={{ basic: true, content: props.phoneCode }}
              placeholder={phonePattern}
              onChange={(e, d) =>
                props.handleChange('phoneNumber1', index, d.value)
              }
              value={item.displayPhone1 || ''}
              loading={isPhoneLoading('phoneNumber1')}
            />
          </Form.Field>
          <div style={errorBlockCss}>{errors[errorKey + 'phoneNumber1']}</div>
          <br />

          <Form.Field error={phoneHasError('phoneNumber2')}>
            <label>{messages['Form.Reco.PhoneNumber']}</label>
            <Input
              label={{ basic: true, content: props.phoneCode }}
              placeholder={phonePattern}
              onChange={(e, d) =>
                props.handleChange('phoneNumber2', index, d.value)
              }
              value={item.displayPhone2 || ''}
              loading={isPhoneLoading('phoneNumber2')}
            />
          </Form.Field>
          <div style={errorBlockCss}>{errors[errorKey + 'phoneNumber2']}</div>
          <br />
        </Form>
      </Segment>
    </Grid.Column>
  );
}
