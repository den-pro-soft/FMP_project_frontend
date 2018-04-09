import { ValidationErrors } from '../../core/validators/validators.model';
var ResetPasswordErrors = (function () {
    function ResetPasswordErrors() {
        this.formErrors = {
            email: '',
            password: '',
            confirm_password: ''
        };
        this.validationMessages = {
            email: {
                required: ValidationErrors.email.required,
                pattern: ValidationErrors.email.pattern
            },
            password: {
                required: ValidationErrors.password.required,
                minLength: ValidationErrors.password.minLength,
                passwordShouldContainSymbol: ValidationErrors.password.format
            },
            confirm_password: {
                required: ValidationErrors.confPassword.required,
                passwordsNotMatch: ValidationErrors.confPassword.passwordsNotMatch
            }
        };
    }
    return ResetPasswordErrors;
}());
export { ResetPasswordErrors };
//# sourceMappingURL=password-reset.model.js.map