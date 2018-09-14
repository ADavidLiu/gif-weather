import Component from '@ember/component';

export default Component.extend({
    actions: {
        inputHandler() {
            const strLocation = this.get("location");
            this.updateLocation(strLocation);
        },
        enterHandler() {
            this.fetchData();
        }
    }
});
