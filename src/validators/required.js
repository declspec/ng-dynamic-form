export function RequiredValidator(field, addError, args) {
    if (!field.empty())
        return true;

    addError(args && args.message ? args.message : '%field% is a required field.');
    return false;
}