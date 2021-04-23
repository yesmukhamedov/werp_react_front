import React from 'react';
import { Table, Card, Header } from 'semantic-ui-react';
import Phone from './Phone';
import { formatDMY } from '../../../../utils/helpers';

/**
 * Компонент для рендеринга Таблицу одного Рекоменда
 */

export default function RecoViewTable(props) {
  // Single Reco
  const { reco, messages, demoPriceOptions } = props;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{messages['Crm.BasicInfo']}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Table celled striped>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages.bukrs}</Header>
              </Table.Cell>
              <Table.Cell>{reco.bukrsName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages.brnch}</Header>
              </Table.Cell>
              <Table.Cell>{reco.branchName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Table.ResponsibleStaff']}</Header>
              </Table.Cell>
              <Table.Cell>{reco.responsibleName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Table.Date']}</Header>
              </Table.Cell>
              <Table.Cell>{formatDMY(reco.docDate)}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Table.ClientFullName']}</Header>
              </Table.Cell>
              <Table.Cell>{reco.clientName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Form.Reco.District']}</Header>
              </Table.Cell>
              <Table.Cell>{reco.district}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Form.Reco.PhoneNumber']}</Header>
              </Table.Cell>
              <Table.Cell>
                {
                  <div>
                    {reco.phones
                      ? reco.phones.map(p => (
                          <Phone
                            demoPriceOptions={demoPriceOptions || []}
                            clientName={reco.clientName}
                            key={p.id}
                            phoneNumber={p.phoneNumber}
                            phoneId={p.id}
                            recoId={reco.id}
                          />
                        ))
                      : ''}
                  </div>
                }
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Form.RecommenderFullName']}</Header>
              </Table.Cell>
              <Table.Cell>{reco.recommenderName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Crm.Owner']}</Header>
              </Table.Cell>
              <Table.Cell>{reco.ownerName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Crm.OwnerBranch']}</Header>
              </Table.Cell>
              <Table.Cell>{reco.ownerBranchName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Form.Reco.Relative']}</Header>
              </Table.Cell>
              <Table.Cell>{reco.relative}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Form.Reco.CallerIs']}</Header>
              </Table.Cell>
              <Table.Cell>
                {reco.callerIsDealer === 1 ? 'ДИЛЕР' : 'СЕКРЕТАРЬ'}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Form.Reco.Note']}</Header>
              </Table.Cell>
              <Table.Cell>{reco.note}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Crm.AddInfo']}</Header>
              </Table.Cell>
              <Table.Cell>{''}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Form.Category']}</Header>
              </Table.Cell>
              <Table.Cell>{reco.categoryName}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Header as="h4">{messages['Form.Status']}</Header>
              </Table.Cell>
              <Table.Cell>{reco.statusName}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
}
