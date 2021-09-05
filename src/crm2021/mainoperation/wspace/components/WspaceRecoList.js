import React from 'react';
import { Card } from 'semantic-ui-react';
import WspaceRecoCard from './WspaceRecoCard';

export default function WspaceRecoList(props) {
    const { items, menu, messages } = props;
    console.log('ITEMS: ', menu);
    if (!items) {
        return <h3>Нет данных!</h3>;
    }

    return (
        <Card.Group>
            {items.map(item => (
                <WspaceRecoCard
                    messages={messages}
                    openRecoListModal={props.openRecoListModal}
                    type={menu}
                    key={item.id}
                    item={item}
                    recoCardMenuHandle={props.recoCardMenuHandle}
                />
            ))}
        </Card.Group>
    );
}
