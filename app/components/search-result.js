import Component from '@ember/component';

export default Component.extend({
    strTranslatedWeather: "",
    arrTranslations: [
        { Drizzle: "lloviznando 🌧️" },
        { Rain: "lloviendo ⛈️" },
        { Sunny: "soleado ☀️" },
        { Clouds: "nuboso ☁️" },
        { Fog: "con niebla 🌫️" },
        { Mist: "con neblina 🌁" },
        { Haze: "con neblina ligera 🌁" },
        { Clear: "despejado ️️️☀️🌈" }
    ],
    didUpdateAttrs() {
        this.set("strTranslatedWeather", "");
        const arrTranslated = this.get("arrTranslations").filter(translation => {
            const arrKey = Object.keys(translation);
            return arrKey[0] === this.currentWeather;
        });
        if (arrTranslated[0] != null && arrTranslated[0] != undefined) {
            const strTranslation = Object.values(arrTranslated[0])[0];
            this.set("strTranslatedWeather", strTranslation);
        }
    }
});
