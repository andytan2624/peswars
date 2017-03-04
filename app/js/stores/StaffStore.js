var Reflux = require('reflux');
var StaffActions = require('../actions/StaffActions');
var Api = require('../utils/Api');

var StaffStore = Reflux.createStore({

    listenables: [StaffActions],

    fetchStaff() {
        return Api.get('staff')
            .then( (staff) => {
                this.staff = staff;
                this.triggerChange();
            })
    },

    triggerChange() {
        this.trigger('change',this.staff);
    }

});

module.exports = StaffStore;
