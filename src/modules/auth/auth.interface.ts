export interface ILoginPayload {
  email: string;
  password: string;
}
export interface ISignUpPayload extends ILoginPayload {
  name: string;
}
