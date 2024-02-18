import APIError from "./api-error";
const https = require("https");

const { WEATHER_API_KEY, WEATHER_API_BASEURL } = process.env;
function onRequestComplete<T>(resolve: Function, reject: Function) {
  return (res: any) => {
    const success = res.statusCode < 300;
    let str = "";
    res.on("data", (chunk: string) => {
      str += chunk;
    });

    // eslint-disable-next-line consistent-return
    res.on("end", () => {
      if (success) {
        return resolve(JSON.parse(str) as T);
      }

      return reject(new APIError(str));
    });
  };
}

export async function get<T>(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
    };
    const req = https.request(
      url,
      options,
      onRequestComplete<T>(resolve, reject)
    );
    req.on("error", (error: Error) => {
      console.log(error);
      reject(new Error(error.message));
    });
    req.end();
  });
}

export const preditWheather = async (city: string) => {
  console.log(WEATHER_API_BASEURL);
  try {
    const response = await get(
      `${WEATHER_API_BASEURL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&cnt=24`
    );
    // const data = await response.json();
    if (!response) {
      throw new APIError(
        "Wheather prediction failed",
        "WHEATHER_PREDICTION_FAILED",
        400
      );
    }
    return response;
  } catch (error) {
    throw new APIError(
      "Wheather prediction failed",
      "WHEATHER_PREDICTION_FAILED",
      500
    );
  }
};
