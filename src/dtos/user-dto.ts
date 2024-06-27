import { IUser } from "../models/user-model";


class UserDto {

    id: string;
    name: string;
    email: string;
    is_staff?: boolean;
    is_admin?: boolean;

    constructor(data: IUser) {
        this.id = data._id;
        this.name = data.name;
        this.email = data.email;
        this.is_staff = data.is_staff == true ? true : undefined;
        this.is_admin = data.is_admin == true ? true : undefined;
    }

}

export default UserDto