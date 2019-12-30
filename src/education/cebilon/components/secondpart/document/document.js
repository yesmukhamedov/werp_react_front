import React from 'react';
import { Container } from 'semantic-ui-react';

import './document.css';

export default function Document() {
  return (
    <div className="document">
      <Container>
        <h1 className="document__name">5) Құжаттармен танысу және толтыру.</h1>
        <p className="document__content">
          &nbsp; Келісім шарт, кепілдік талоны, тауарды тапсыру - қабылдау
          актілерімен таныстырады және қалай толтыратындығын үйретеді.
        </p>
      </Container>
    </div>
  );
}
