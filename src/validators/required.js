export function RequiredValidator(field, addError) {
    if (!field.empty())
        return true;

    addError('%field% is a required field.');
    return false;
}