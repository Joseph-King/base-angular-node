module.exports = function(status, message, path, params, user){
    this.status     = status;
    this.message    = message;
    this.path       = path;
    this.params     = params;
    this.user       = user;
}