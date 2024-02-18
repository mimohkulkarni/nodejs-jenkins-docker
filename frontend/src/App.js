import "./App.css";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [wheather, setWheather] = useState(null);

  const getCityWheather = () => {
    if (city === "") return;
    fetch(`/predict-wheather?city=${city}`)
      .then((response) => response.json())
      .then((data) => {
        setWheather(data);
      });
  };

  const updatedWheather = {};

  if (wheather && wheather.list) {
    wheather.list.forEach((item) => {
      const date = new Date(item.dt_txt);
      const dateString = date.toLocaleDateString("en-GB");
      if (!updatedWheather[dateString]) updatedWheather[dateString] = [];
      updatedWheather[dateString].push({
        dt: item.dt,
        date,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        temp: item.main.temp,
        weather: item.weather[0].main,
        speed: item.wind.speed,
      });
    });
  }

  return (
    <div className="App">
      <h4>
        Welcome to Weather Prediction App. Swagger Documentation is available{" "}
        <a href="./api-docs/">here</a>.
      </h4>
      <label htmlFor="city">Enter city name</label>
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        name="city"
      />
      <input type="button" onClick={() => getCityWheather()} value="Submit" />
      {updatedWheather ? (
        <div>
          {Object.keys(updatedWheather).map((item) => (
            <div>
              <h3 style={{ textAlign: "center" }}>Date: {item}</h3>
              <div className="wheather">
                {updatedWheather[item].map((item) => (
                  <div key={item.dt}>
                    <p>
                      <strong>Time:</strong> {item.date.getHours()}:
                      {item.date.getMinutes()}
                    </p>
                    <p>
                      <strong>Weather:</strong> {item.weather}
                    </p>
                    <p>
                      <strong>Temperature:</strong> {item.temp}
                    </p>
                    <p>
                      <strong>Humidity:</strong> {item.humidity}
                    </p>
                    <p>
                      <strong>Pressure:</strong> {item.pressure}
                    </p>
                    <p>
                      <strong>Wind Speed:</strong> {item.speed}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {wheather?.list
            ?.slice(0, 3)
            ?.some((item) => item.weather?.[0]?.main === "Rain") ? (
            <h3>Advice: Carry umbrella</h3>
          ) : null}
          {wheather?.list
            ?.slice(0, 3)
            ?.some((item) => item?.main?.temp > 40) ? (
            <h3>Advice: Use sunscreen lotion</h3>
          ) : null}
          {wheather?.list
            ?.slice(0, 3)
            ?.some((item) => item.weather?.[0]?.main === "Thunderstorms") ? (
            <h3>Don't step out! A Storm is brewing!</h3>
          ) : null}
          {wheather?.list
            ?.slice(0, 3)
            ?.some((item) => item?.wind?.speed > 10) ? (
            <h3>It's too windy, watch out!</h3>
          ) : null}
          {wheather?.list?.map((item) => (
            <div>
              <p>{item.dt_txt}</p>
              <p>{item.main.temp}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default App;
