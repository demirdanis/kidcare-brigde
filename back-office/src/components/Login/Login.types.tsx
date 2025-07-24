export interface ILogin {
  onLogin?: (userName: string, pass: string) => Promise<boolean>;
}
