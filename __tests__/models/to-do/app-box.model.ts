export interface UserWithRoles {
  name?: string;
  roles?: string[];
}

export interface Room {
  name?: string;
  users: UserWithRoles[];
}
