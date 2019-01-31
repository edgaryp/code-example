import * as getterTypes from './getter-types';

const getters = {
  [getterTypes.GROSS_INCOME](state) {
    /**
     * Pre requirement:
     * gross income = annual salary / 12 months
     */
    return Math.round(state.employeeInfo.annualSalary / 12);
  },
  [getterTypes.INCOME_TAX](state) {
    /**
     * Pre requirement:
     * income tax = based on the tax table provided below
     * $0 - $18,200 -> null
     * $37,001 - $87,000 -> $3,572 plus 32.5c for each $1 over $37,000
     * $87,001 - $180,000 -> $19,822 plus 37c for each $1 over $87,000
     * $180,001 and over -> $54,232 plus 45c for each $1 over $180,000
     */
    const { annualSalary } = state.employeeInfo;
    const { base, min, multiplier, description } = state.taxableIncomeRange.filter(obj => annualSalary >= obj.min && annualSalary <= obj.max)[0];
    if (min >= 0) {
      return {
        result: Math.round((base + (annualSalary - (min - 1)) * multiplier) / 12),
        description,
      };
    }
    return 0;
  },
  [getterTypes.NET_INCOME](state, getters) {
    /**
     * Pre requirement:
     * net income = gross income - income tax
     */
    return getters.GROSS_INCOME - getters.INCOME_TAX.result;
  },
  [getterTypes.SUPER](state, getters) {
    /**
     * Pre requirement:
     * super = gross income x super rate
     */
    return Math.round(getters.GROSS_INCOME * (state.employeeInfo.superannuationRate / 100));
  },
  [getterTypes.PAY](state, getters) {
    return Math.round(getters.GROSS_INCOME - getters.SUPER);
  },
  [getterTypes.PAY_DATE]() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const lastDayOfCurrentMonth = new Date(year, date.getMonth(), 0).getDate();
    return `${lastDayOfCurrentMonth} ${month} ${year}`;
  },
  [getterTypes.TABEL_DATA](state, getters) {
    const { firstName, lastName, annualSalary, superannuationRate } = state.employeeInfo;
    if (firstName && lastName && annualSalary && superannuationRate) {
      return [
        {
          item: 'Employee',
          'Employee Details': `${state.employeeInfo.firstName} ${state.employeeInfo.lastName}`,
          description: null,
        },
        {
          item: 'Pay Date',
          'Employee Details': getters.PAY_DATE,
          description: null,
        },
        {
          item: 'Pay Frequency',
          'Employee Details': 'Monthly',
          description: null,
        },
        {
          item: 'Annual Income',
          'Employee Details': state.employeeInfo.annualSalary.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }),
          description: null,
        },
        {
          item: 'Gross Income',
          'Employee Details': getters.GROSS_INCOME.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }),
          description: 'Formular: Annual salary / 12 months',
        },
        {
          item: 'Income Tax',
          'Employee Details': getters.INCOME_TAX.result.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }),
          description: `Formular: ${getters.INCOME_TAX.description}`,
        },
        {
          item: 'Net Income',
          'Employee Details': getters.NET_INCOME.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }),
          description: 'Formular: Gross income - income tax',
        },
        {
          item: 'Super',
          'Employee Details': getters.SUPER.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }),
          description: 'Formular: Gross income - income tax',
        },
        {
          item: 'Pay',
          'Employee Details': getters.PAY.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }),
          description: 'Formular: Gross income - income tax',
        },
      ];
    }
    return null;
  },
};

export default getters;
