import React from 'react';

export default RepTable894 = () => {
  let { items, transactionId } = props;
  if (!items) {
    items = [];
  }
  const currentMonth = parseInt(moment().format('M'), 10);
  let date;
  // to skip August
  if (currentMonth >= 8 && currentMonth < 12) {
    date = moment().subtract(4, 'month');
  } else {
    date = moment().subtract(3, 'month');
  }
  const prevMonth = parseInt(date.format('M'), 10);
  const months = [];
  for (let k = prevMonth; k <= currentMonth; k++) {
    if (k === 8) {
      continue;
    }
    months.push(k);
  }
  const renderMonthDataForSale = monthData => {
    monthData = monthData || {};
    return months.map(m => {
      const md = monthData[m];

      return [
        <Table.Cell
          key={m}
          width={1}
          className={md ? md.demoSaleLevelClass : ''}
        >
          {md ? `${md.demoCount}/${md.saleCount}` : ''}
        </Table.Cell>,
        <Table.Cell
          key={`${m}avg`}
          width={1}
          className={md ? md.demoSaleLevelClass : ''}
        >
          {md ? md.demoSaleAvg : ''}
        </Table.Cell>,
        <Table.Cell key={`${m}d`} className={md ? md.demoSaleLevelClass : ''}>
          {md ? `${md.demoSaleLevel}-уровень` : 'Нет данных'}
        </Table.Cell>,
      ];
    });
  };

  const renderMonthDataForReco = monthData => {
    monthData = monthData || {};
    return months.map(m => {
      const md = monthData[m];

      return [
        <Table.Cell
          key={m}
          width={1}
          className={md ? md.demoRecoLevelClass : ''}
        >
          {md ? `${md.demoCount}/${md.recoCount}` : ''}
        </Table.Cell>,
        <Table.Cell
          key={`${m}avg`}
          width={1}
          className={md ? md.demoRecoLevelClass : ''}
        >
          {md ? md.recoSaleAvg : ''}
        </Table.Cell>,
        <Table.Cell key={`${m}d`} className={md ? md.demoRecoLevelClass : ''}>
          {md ? `${md.demoRecoLevel}-уровень` : 'Нет данных'}
        </Table.Cell>,
      ];
    });
  };

  const renderMonthDataForDemo = monthData => {
    monthData = monthData || {};
    return months.map(m => {
      const md = monthData[m];
      return [
        <Table.Cell key={m} width={1} className={md ? md.demoLevelClass : ''}>
          {md ? md.demoCount : ''}
        </Table.Cell>,
        <Table.Cell key={`${m}d`} className={md ? md.demoLevelClass : ''}>
          {md ? `${md.demoLevel}-уровень` : 'Нет данных'}
        </Table.Cell>,
      ];
    });
  };

  const colSpan = transactionId === REP_935 ? 2 : 3;

  return (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ФИО</Table.HeaderCell>
          {months.map(m => (
            <Table.HeaderCell colSpan={colSpan} key={m}>
              {MONTH_OPTIONS[m - 1] ? MONTH_OPTIONS[m - 1].text : ''}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.map(item => (
          <Table.Row key={item.staffId}>
            <Table.Cell>{item.staffName}</Table.Cell>
            {transactionId === REP_894
              ? renderMonthDataForSale(item.monthData)
              : transactionId === REP_934
              ? renderMonthDataForReco(item.monthData)
              : renderMonthDataForDemo(item.monthData)}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
