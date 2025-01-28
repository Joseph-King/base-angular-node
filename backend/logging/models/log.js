module.exports = function(status, path, params, user){
    this.status = status;
    this.path   = path;
    this.params = params;
    this.user   = user;
}