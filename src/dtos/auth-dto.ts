import tokenService from "../services/token-service";
import RoleDto from "./role-dto";
import UserDto from "./user-dto";

class AuthDto {
  user: any;
  role: any;
  access_token:string;
  refresh_token : string;
  has_company : boolean;
  has_company_address : boolean;

  constructor(user: any, role: any) {
    this.user = new UserDto(user);
    this.role = role ? new RoleDto(role) : {};
    this.has_company = role != null;
    this.has_company_address = true;
    const { access_token, refresh_token } = tokenService.generateToken({...this.user,role:this.role});
    this.access_token = access_token,
    this.refresh_token = refresh_token
  }

  getRole = () => {this.user,this.role}

  getAuthData = () => {this.user,this.role}
   
}

export default AuthDto;