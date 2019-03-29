module.exports.absolute = function(value){
    if(value>0) return value;
    if(value<0) return -value;
    return 0;
}
module.exports.greeting = function(name){
    return "hello"+name;
}