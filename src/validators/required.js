export default function required(field, addError) {
    if (field.isActive() && field.empty()) {
        addError('This field is required.');
        return false;
    }

    return true;
}