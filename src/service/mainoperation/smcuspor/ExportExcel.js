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
    data = [],
  } = props;
  return (
    <ExcelFile
      element={
        <Button fluid color="purple" basic>
          {messages['export']}
        </Button>
      }
    >
      <ExcelSheet data={data} name="Smcuspor">
        <ExcelColumn label="Id" value="id" />
        <ExcelColumn label={messages['date']} value="crmHistoryDate" />
        <ExcelColumn
          label={messages['typeOfService']}
          value="serviceTypeName"
        />
        <ExcelColumn label={messages['call_type']} value="callDirectionName" />
        <ExcelColumn label={messages['call_description']} value="info" />
        <ExcelColumn label={messages['amount']} value="servicePrice" />
        <ExcelColumn label={messages['master']} value="masterFIO" />
        <ExcelColumn label={messages['Operator']} value="operatorFIO" />
        <ExcelColumn label={messages['service']} value="serviceId" />
      </ExcelSheet>
    </ExcelFile>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(injectIntl(ExportExcel));
