import { ValidationErrors } from '../../core/validators/validators.model';
var SignInErrors = (function () {
    function SignInErrors() {
        this.formErrors = {
            email: '',
            password: '',
            rememberUser: ''
        };
        this.validationMessages = {
            email: {
                required: ValidationErrors.email.required,
                pattern: ValidationErrors.email.pattern
            },
            password: {
                required: ValidationErrors.password.required
            },
            rememberUser: {}
        };
    }
    return SignInErrors;
}());
export { SignInErrors };
//# sourceMappingURL=signin.model.js.map