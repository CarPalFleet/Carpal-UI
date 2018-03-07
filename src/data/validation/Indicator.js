export const indicator = () => {
  return {
    pass: () => {
      return {
        type: 'pass',
        transactionKey: 'route-validation-pass',
        message: 'Validation Pass', // Update message later
      };
    },

    warning: () => {
      return {
        type: 'warn',
        transactionKey: 'route-validation-warn',
        message: 'Validation Warn', // Update message later
      };
    },

    noti: () => {
      return {
        type: 'noti',
        transactionKey: 'route-validation-noti',
        message: 'Validation Noti', // Update message later
      };
    },

    error: () => {
      return {
        type: 'error',
        transactionKey: 'route-validation-error',
        message: 'Validation Error', // Update message later
      };
    },
  };
};
