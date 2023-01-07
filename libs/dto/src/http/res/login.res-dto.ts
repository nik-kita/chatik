export class LoginResDto {
  user_id: string;
  jwt: {
    access: string;
    refresh: string;
  }
}
