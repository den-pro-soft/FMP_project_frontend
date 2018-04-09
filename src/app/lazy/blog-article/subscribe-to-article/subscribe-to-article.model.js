import { ValidationErrors } from '../../../core/validators/validators.model';
var SubscribeToArticleErrors = (function () {
    function SubscribeToArticleErrors() {
        this.formErrors = {
            email: ''
        };
        this.validationMessages = {
            email: {
                required: ValidationErrors.email.required,
                pattern: ValidationErrors.email.pattern
            }
        };
    }
    return SubscribeToArticleErrors;
}());
export { SubscribeToArticleErrors };
//# sourceMappingURL=subscribe-to-article.model.js.map