const testConnection = async function(){
    return new Promise((resolve) => {
        resolve(`N/A. AUTH: none, no test required`)
    })
}

const authenticate = function(authHeader){
    return new Promise((resolve) => {
        resolve({res: true, user: undefined});
    })
}

module.exports = { testConnection, authenticate }