export default function required(field) {
    return field.isActive() && field.empty()
        ? 'This field is required.'
        : true;
}