export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      HOSTNAME: string;
      FRONTEND_HOST: string;
    }
  }
}
