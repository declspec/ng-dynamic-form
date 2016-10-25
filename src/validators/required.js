/*
export default function required(field, addError) {
    return true;
}
*/
required.async = true;
export default required;

function required(field, addError) {
    var callback;

    setTimeout(function() {
        if (!field.isActive() || !field.empty()) 
            return callback(true);

        addError('This field is required.');
        return callback(false); 
    }, 3000);

    return {
        then: function(fn) {
            callback = fn;
        }
    };
}