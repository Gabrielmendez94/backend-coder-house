class UserDTO {
    constructor(user) {
      this.id = user._id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.user_role = user.user_role;
      this.birthDate = user.birthDate;
    }
  }
  
  export default UserDTO;  