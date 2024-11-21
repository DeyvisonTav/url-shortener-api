import * as crypto from 'crypto';

export class UrlShortenerUtil {
  static generateShortId(): string {
    return crypto.randomBytes(4).toString('hex');
  }

  static calculateExpirationDate(hours: number): Date {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + hours);
    return expirationDate;
  }

  static isExpired(expirationDate: string): boolean {
    return new Date() > new Date(expirationDate);
  }
}
