import { createSelector } from 'reselect';

export const generateNotifySelector = (
  inputSelectors = [],
  successHeader = 'Success!',
  successSeverity = 'OK',
  errorHeader = "Something's not quite right.",
  errorSeverity = 'ERROR'
) => {
  return createSelector(inputSelectors, a => {
    if (!a.data && !a.error) return null;
    if (a.data) {
      return {
        header: successHeader,
        content: a.data.message,
        severity: successSeverity,
        ...a.data
      };
    } else if (a.error) {
      return {
        header: errorHeader,
        content: a.error.message,
        severity: errorSeverity,
        ...a.error
      };
    }
    return null;
  });
};

const getCreditPurchase = state => state.creditPurchase;

export const checkoutSelector = createSelector([getCreditPurchase], a => {
  return {
    ...a
  };
});

//export const checkoutSelector = createSelector(getCreditPurchase, transformCreditPurchase);

/*const notifySelector = createSelector(
  [ checkoutSelector ],
  (data = null) => {
     if (data) return {...data};
     return null;
  }
)*/
