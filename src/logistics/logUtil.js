export const WERKS_REQUEST_STATUS_NEW = 1;
export const WERKS_REQUEST_STATUS_CLOSED = 4;

export const Doctype = {
  LGI_POSTING_TRADE_IN: 'LGI_POSTING_TRADE_IN',
};

export const getUriByDoctype = doctype => {
  switch (doctype) {
    case Doctype.LGI_POSTING_TRADE_IN:
      return 'postings-trade-in';

    default:
      return '';
  }
};

export const getDoctypeByUri = uri => {
  switch (uri) {
    case 'postings-trade-in':
      return Doctype.LGI_POSTING_TRADE_IN;

    default:
      return '';
  }
};
