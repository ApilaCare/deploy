var mongoose = require('mongoose');

var calendarSchema = new mongoose.Schema({
    appointments: [String], // _id of appointments
    residentCarePlanReview: [String], // _id of residents
    issueDueDate: [String], // _id of issues
});

mongoose.model('Calendar', calendarSchema);
