import Controller from '@ember/controller';
import axios from "npm:axios";

export default Controller.extend({
    strLocation: "",
    strWeather: "",
    strKeyWeather: "0b064246645089d67497e504ae480f50",
    strEndpointWeather: "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=",
    strUrlGif: "",
    strKeyGif: "JAO0qgUKKSVSJrdrOHmMifK4Eqv1fV6g",
    strEndpointGif: "https://cors-anywhere.herokuapp.com/http://api.giphy.com/v1/gifs/search?q=",
    strActiveClass: "",
    actions: {
        resetInfo() {
            this.set("strActiveClass", "");
            this.set("strWeather", "");
            const timeout = setTimeout(() => {
                this.set("strUrlGif", "");
                clearTimeout(timeout);
            }, 500);
        },
        updateLocation(strNewLocation) {
            this.set("strLocation", strNewLocation);
            this.send("resetInfo");
        },
        fetchData() {
            axios.get(`${this.get("strEndpointWeather")}${this.get("strLocation")}&APPID=${this.get("strKeyWeather")}`)
            .then(res => {
                const strCurrentWeather = res.data.weather[0].main;
                this.set("strWeather", strCurrentWeather);
                console.log(strCurrentWeather);
                
                axios.get(`${this.get("strEndpointGif")}${this.get("strWeather")}&api_key=${this.get("strKeyGif")}`)
                .then(res => {
                    const arrImgs = res.data.data;
                    const arrIds = arrImgs.map(img => {
                        return img.id;
                    });
                    const strId = arrIds[Math.floor(Math.random() * arrIds.length)];
                    const strFormattedUrl = `https://media.giphy.com/media/${strId}/giphy.gif`;
                    this.set("strUrlGif", strFormattedUrl);
                    const timeout = setTimeout(() => {
                        this.set("strActiveClass", "search--active");
                        clearTimeout(timeout);
                    }, 1000);
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
                this.set("strActiveClass", "search--error shake");
            });
        }
    }
});
