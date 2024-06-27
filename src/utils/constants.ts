
class Constants {

    static COMPANY_NAME = 'Your Company Name';
    static COMPANY_EMAIL = 'mufazmi@yourcompany.com';
    static COMPANY_WEBSITE = 'yourcompany.com';
    static TZ = process.env.TZ || 'Asia/Kolkata';
 
    static DEFAULT_EXPIRING_MONTH_DURATION = 5;

    static URL_API = process.env.NODE_ENV == 'debug' ? 'http://172.16.1.220:3031/' : 'https://dev.api.yourcompany.com/';
    static URL_MEDIA = process.env.NODE_ENV == 'debug' ? 'http://172.16.1.220:3031/' : 'https://dev.api.yourcompany.com/';
 
 
    static STATUS_CODE = {
       SUCCESS: 200,
       UNAUTORIZED: 401,
       NOT_FOUND: 404,
       FORBIDDEN: 403,
       BAD_REQUEST: 400,
       SERVER_ERROR: 500,
    }
 
    static AUTH = {
       SALT_FACTOR: 2
    }
 
    static USER = {
       TYPE_SUPER_ADMIN: "super_admin",
       TYPE_SUB_ADMIN: "sub_admin",
       TYPE_ADMIN: "admin",
       TYPE_EMPLOYEE: "employee",
    }
 
 
    static OTP_TYPE = {
       EMAIL_VERIFICATION: 'email_verification',
       MOBILE_VERIFICATION: 'mobile_verification',
       FORGOT_PASSWORD: 'forgot_password'
    }
 
    static FOLDER = {
       IMAGE_COMPANY: "public/storage/images/company/",
       IMAGE_FILES: "public/storage/files/",
 
       THUMBNAIL_COMPANY: "public/storage/images/company/thumbnails/",
       THUMBNAIL_USER: "public/storage/images/user/thumbnails/",
 
    }
 
 }
 
 export default Constants