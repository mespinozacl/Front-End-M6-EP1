interface ISecureData {
    id: number;
    info: string;
    getId(): number;
    getInfo(): string;
  }

export class SecureData implements ISecureData {
  id: number;
  info: string;

  constructor(secureData: ISecureData) {
    this.id = secureData.id;
    this.info = secureData.info;
  }
/*
  constructor(id: number, info: string) {
    this.id = id;
    this.info = info;
  }
*/
  getId(): number {
    return this.id;
  }
 
  getInfo(): string {
    return this.info;
  }
}