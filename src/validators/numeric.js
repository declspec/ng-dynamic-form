export function NumericValidator(field, addError) {
    let n = field.val();

    if (field.empty() || (!isNaN(parseFloat(n)) && isFinite(n)))
        return true;

    addError('%field% must be a valid number.');
    return false;
}