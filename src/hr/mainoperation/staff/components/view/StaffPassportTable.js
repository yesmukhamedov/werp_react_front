import React from 'react';
import { Grid } from 'semantic-ui-react';
import { formatTimestamptToDate } from '../../../../../utils/helpers';

export default function StaffPassportTable(props) {
  const { staff } = props;

  return (
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column width={8}>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={5} textAlign="right">
                Номер уд. личности
              </Grid.Column>
              <Grid.Column width={7}>{staff.passportId}</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={5} textAlign="right">
                Кем выдан
              </Grid.Column>
              <Grid.Column width={7}>{staff.passportGivenBy}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5} textAlign="right">
                Дата выдачи
              </Grid.Column>
              <Grid.Column width={7}>
                {formatTimestamptToDate(staff.passportGivenDate)}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5} textAlign="right">
                Срок действия уд.
              </Grid.Column>
              <Grid.Column width={7}>
                {formatTimestamptToDate(staff.passportValidity)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>

        <Grid.Column width={8}>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={5} textAlign="right">
                Номер паспорта
              </Grid.Column>
              <Grid.Column width={7}>{staff.passportId2}</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={5} textAlign="right">
                Кем выдан (паспорт)
              </Grid.Column>
              <Grid.Column width={7}>{staff.passportGivenBy2}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5} textAlign="right">
                Дата выдачи (паспорт)
              </Grid.Column>
              <Grid.Column width={7}>
                {formatTimestamptToDate(staff.passportGivenDate2)}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5} textAlign="right">
                Срок действия (паспорт)
              </Grid.Column>
              <Grid.Column width={7}>
                {formatTimestamptToDate(staff.passportValidity2)}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
