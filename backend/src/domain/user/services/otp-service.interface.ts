export interface IOtpService{
    generateOtp(): string;
    generateExpiryTime():Date;
}