export const indicator = () => {
  return {
    pass: () => {
      return {
        type: 'pass',
        transactionKey: 'route-validation-pass',
        message: 'Validation Pass',
      };
    },

    warning: () => {
      return {
        type: 'warn',
        transactionKey: 'route-validation-warn',
        message: 'Validation Warn',
      };
    },

    noti: () => {
      return {
        type: 'noti',
        transactionKey: 'route-validation-noti',
        message: 'Validation Noti',
      };
    },

    error: () => {
      return {
        type: 'error',
        transactionKey: 'route-validation-error',
        message: 'Validation Error',
      };
    },
  };
};
