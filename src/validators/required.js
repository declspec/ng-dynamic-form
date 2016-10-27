export default function required(field, addError) {
    if (!field.empty())
        return true;

    addError('This field is required');
    return false;
}