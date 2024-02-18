export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      WEATHER_API_BASEURL: string;
      WEATHER_API_KEY: string;
    }
  }
}
