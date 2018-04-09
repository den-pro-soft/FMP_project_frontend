var JobAddErrors = (function () {
    function JobAddErrors() {
        this.formErrors = {
            link: '',
            company: '',
            position: '',
            isExistJob: false
        };
        this.validationMessages = {
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
        };
    }
    return JobAddErrors;
}());
export { JobAddErrors };
//# sourceMappingURL=job-add-modal-errors.model.js.map