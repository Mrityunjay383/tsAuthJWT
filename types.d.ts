declare namespace Express {
  export interface Request {
    userData: any;
  }
}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      SECRET_KEY: string;
      // Add more variables as needed
    }
  }
}
