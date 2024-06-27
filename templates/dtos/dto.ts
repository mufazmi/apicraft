class BaseDto {

  id;

  constructor(data: any) {
    this.id = data._id;
  }

}

export default BaseDto