import { Base } from './base.entity';
export class User extends Base {
  public name: string;
  public email: string;
  public phone: string;
  public profileType: string;
  public cpfCnpj: string;
  public govbrId: string;
  public lastAccess: Date;

  constructor(
    name: string,
    email: string,
    phone: string,
    profileType: string,
    cpfCnpj: string,
    govbrId: string,
    lastAccess: Date,
  ) {
    super();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.profileType = profileType;
    this.cpfCnpj = cpfCnpj;
    this.govbrId = govbrId;
    this.lastAccess = lastAccess;
  }
}
