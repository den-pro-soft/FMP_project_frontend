export class JobAddErrors {
  public formErrors = {
    link: '',
    company: '',
    position: '',
    isExistJob: false,
    rate: ''
  };

  public validationMessages = {
    link: {
      required: 'Job Link required',
      pattern: 'Job Link is not valid'
    },
    company: {
      required: 'Company Name required'
    },
    position: {
      required: 'Job Title required'
    }
    ,
    rate: {
      required: 'Rate is required',
      min: 'Rate is required'
    }
  };
}
