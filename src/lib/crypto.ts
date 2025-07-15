// Client-side encryption utilities for LOVABLE Archive
import CryptoJS from 'crypto-js';

export class ArchiveCrypto {
  private static ENCRYPTION_KEY_PREFIX = 'archive_key_';

  /**
   * Generate a unique encryption key for a user
   */
  static generateUserKey(userId: string): string {
    const timestamp = Date.now().toString();
    const combined = `${userId}_${timestamp}_${Math.random()}`;
    return CryptoJS.SHA256(combined).toString();
  }

  /**
   * Encrypt content using AES encryption
   */
  static encrypt(content: string, password: string): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(content, password).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw new Error('Failed to encrypt content');
    }
  }

  /**
   * Decrypt content using AES decryption
   */
  static decrypt(encryptedContent: string, password: string): string {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedContent, password);
      const originalText = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!originalText) {
        throw new Error('Invalid password or corrupted data');
      }
      
      return originalText;
    } catch (error) {
      console.error('Decryption failed:', error);
      throw new Error('Failed to decrypt content');
    }
  }

  /**
   * Generate a secure random password
   */
  static generateSecurePassword(length: number = 32): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    return password;
  }

  /**
   * Store encryption key securely in localStorage
   */
  static storeKey(secretId: string, key: string): void {
    const keyName = `${this.ENCRYPTION_KEY_PREFIX}${secretId}`;
    localStorage.setItem(keyName, key);
  }

  /**
   * Retrieve encryption key from localStorage
   */
  static getKey(secretId: string): string | null {
    const keyName = `${this.ENCRYPTION_KEY_PREFIX}${secretId}`;
    return localStorage.getItem(keyName);
  }

  /**
   * Remove encryption key from localStorage
   */
  static removeKey(secretId: string): void {
    const keyName = `${this.ENCRYPTION_KEY_PREFIX}${secretId}`;
    localStorage.removeItem(keyName);
  }

  /**
   * Hash content for verification without decryption
   */
  static hashContent(content: string): string {
    return CryptoJS.SHA256(content).toString();
  }

  /**
   * Validate if encrypted content can be decrypted with given password
   */
  static validatePassword(encryptedContent: string, password: string): boolean {
    try {
      const decrypted = this.decrypt(encryptedContent, password);
      return decrypted.length > 0;
    } catch {
      return false;
    }
  }
}

// Security utilities
export const SecurityUtils = {
  /**
   * Sanitize user input to prevent XSS
   */
  sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  },

  /**
   * Rate limiting check (client-side basic implementation)
   */
  checkRateLimit(action: string, limit: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const key = `rateLimit_${action}`;
    const attempts = JSON.parse(localStorage.getItem(key) || '[]');
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter((timestamp: number) => 
      now - timestamp < windowMs
    );
    
    if (validAttempts.length >= limit) {
      return false; // Rate limit exceeded
    }
    
    // Add current attempt
    validAttempts.push(now);
    localStorage.setItem(key, JSON.stringify(validAttempts));
    
    return true; // Action allowed
  },

  /**
   * Generate secure session token
   */
  generateSessionToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
};