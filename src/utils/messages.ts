
class Messages{

    static DB = {
       INVALID_ID : 'Invalid Id'
    }
 
     static SERVER = {
         NOT_FOUND: "Oops..! It's 404",
         FORBIDDEN: "Oops..! It's 403",
         BAD_REQUEST: "Bad Request",
         SERVER_ERROR: "Oops..! Something went wrong",
         UNAUTORIZED_ACCESS: "Unautorized Access"
      }
 
      static AUTH = {
         PASSWORD_INVALID : 'Invalid Password',
         AUTH_FOUND : 'Found',
         AUTH_SUCCESS : 'Succesfully Authenticated',
         REGISTER_FAILED : 'Oops..! Failed to Register You',
         REGISTER_SUCCESS : 'Successfully Registered',
         LOGIN_FAILED : 'Oops..! Failed to Authenticate You',
         LOGIN_SUCCESS : 'Logged In',
         TOKEN_EXPIRED : 'Oops..! Seems your access been expired.'
 
      }
      
      static USER = {
         NOT_FOUND : 'User Not Found',
         FOUND : 'User Found',
      }

 }
 
 export default Messages