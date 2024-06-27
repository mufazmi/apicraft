import CompanyDto from "./company-dto";

class RoleDto {

    id: string;
    type: string;
    user_id: string;
    company: any; 
    company_id:any;

    constructor(data: any) {
        this.id = data._id;
        this.type = data.type;
        this.user_id = data.user;
        this.user_id = data.user;
        
        if (typeof data.company === 'object') {
            this.company = new CompanyDto(data.company);
            this.company_id = data.company.id;
        } else {
            this.company_id = data.company;
        }
    }

}

export default RoleDto;