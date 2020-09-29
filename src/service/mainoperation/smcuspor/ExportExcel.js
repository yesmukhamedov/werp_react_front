import React from 'react';
import ReactExport from 'react-export-excel';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = props => {
  const {
    intl: { messages },
    tabs,
    crmHistoryAll = [],
    crmHistoryCall = [],
    crmHistoryServ = [],
    crmHistoryApp = [],
    initValue = [],
  } = props;

  if (tabs === 'all') {
    return (
      <ExcelFile
        element={
          <Button fluid color="purple" basic>
            {messages['export']}
          </Button>
        }
        filename={messages['all']}
      >
        <ExcelSheet data={crmHistoryAll ? crmHistoryAll : initValue} name="All">
          <ExcelColumn label="Id" value="id" />
          <ExcelColumn label={messages['date']} value="crmHistoryDate" />
          <ExcelColumn
            label={messages['typeOfService']}
            value="serviceTypeName"
          />
          <ExcelColumn
            label={messages['call_type']}
            value="callDirectionName"
          />
          <ExcelColumn label={messages['call_description']} value="info" />
          <ExcelColumn label={messages['amount']} value="servicePrice" />
          <ExcelColumn label={messages['master']} value="masterFIO" />
          <ExcelColumn label={messages['Operator']} value="operatorFIO" />
          <ExcelColumn label={messages['service']} value="serviceId" />
        </ExcelSheet>
      </ExcelFile>
    );
  } else if (tabs === 'services') {
    return (
      <ExcelFile
        element={
          <Button fluid color="purple" basic>
            {messages['export']}
          </Button>
        }
        filename={messages['services']}
      >
        <ExcelSheet data={crmHistoryServ ? crmHistoryServ : []} name="Service">
          <ExcelColumn label="Id" value="id" />
          <ExcelColumn label={messages['date']} value="crmHistoryDate" />
          <ExcelColumn
            label={messages['typeOfService']}
            value="serviceTypeName"
          />
          <ExcelColumn label={messages['amount']} value="servicePrice" />
          <ExcelColumn label={messages['master']} value="masterFIO" />
          <ExcelColumn label={messages['service']} value="serviceId" />
        </ExcelSheet>
      </ExcelFile>
    );
  } else if (tabs === 'calls') {
    return (
      <ExcelFile
        element={
          <Button fluid color="purple" basic>
            {messages['export']}
          </Button>
        }
        filename={messages['Crm.Calls']}
      >
        <ExcelSheet data={crmHistoryCall ? crmHistoryCall : []} name="Calls">
          <ExcelColumn label="Id" value="id" />
          <ExcelColumn label={messages['date']} value="crmHistoryDate" />
          <ExcelColumn
            label={messages['call_type']}
            value="callDirectionName"
          />
          <ExcelColumn label={messages['call_description']} value="info" />
          <ExcelColumn label={messages['Operator']} value="operatorFIO" />
        </ExcelSheet>
      </ExcelFile>
    );
  } else if (tabs === 'requests') {
    return (
      <ExcelFile
        element={
          <Button fluid color="purple" basic>
            {messages['export']}
          </Button>
        }
        filename={messages['Applications']}
      >
        <ExcelSheet data={crmHistoryApp ? crmHistoryApp : []} name="Requests">
          <ExcelColumn label="Id" value="id" />
          <ExcelColumn label={messages['date']} value="crmHistoryDate" />
          <ExcelColumn
            label={messages['application_status']}
            value="applicationStatusName"
          />
          <ExcelColumn
            label={messages['type_of_application']}
            value="applicationTypeName"
          />
          <ExcelColumn label={messages['Operator']} value="operatorFIO" />
          <ExcelColumn
            label={messages['request_number']}
            value="applicationId"
          />
        </ExcelSheet>
      </ExcelFile>
    );
  }
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(injectIntl(ExportExcel));
