var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

 var multiparty = require('connect-multiparty');
 var multipartyMiddleware = multiparty({uploadDir: "./upload_storage"});

var auth = jwt({
    // set secret using same environment variable as before
    secret: process.env.JWT_SECRET,
    // define property on req to be payload
    userProperty: 'payload'
});

// control variables
// issues
var ctrlIssues = require('../controllers/issues/issues');
var ctrlIssueComments = require('../controllers/issues/issueComments');
var ctrlIssueChecklists = require('../controllers/issues/issueChecklists');
var ctrlIssueLabels = require('../controllers/issues/issueLabels');
var ctrlIssueAttachments = require('../controllers/issues/issueAttachments');

// residents
var ctrlResidents = require('../controllers/residents/residents');

// users
var ctrlUsers = require('../controllers/users/users');

// appointments
var ctrlAppointments = require('../controllers/appointments/appointments');
var ctrlAppointmentComments = require('../controllers/appointments/appointmentComments');

// users
var ctrlAuth = require('../controllers/authentication');


// routes
// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// issues
router.get('/issues/list/:status', ctrlIssues.issuesList);
router.get('/issues/:username/s/:status', ctrlIssues.issuesListByUsername);
router.get('/issues/count/:username', ctrlIssues.issuesOpenCount);
router.post('/issues/new', ctrlIssues.issuesCreate);
router.get('/issues/:issueid', ctrlIssues.issuesReadOne);
router.put('/issues/:issueid', ctrlIssues.issuesUpdateOne);
router.delete('/issues/:issueid', ctrlIssues.issuesDeleteOne);

// issue comments
router.post('/issues/:issueid/comments/new', ctrlIssueComments.issueCommentsCreate);
router.get('/issues/:issueid/comments/:commentid', ctrlIssueComments.issueCommentsReadOne);
router.put('/issues/:issueid/comments/:commentid', ctrlIssueComments.issueCommentsUpdateOne);
router.delete('/issues/:issueid/comments/:commentid', ctrlIssueComments.issueCommentsDeleteOne);

// issue checklists
router.post('/issues/:issueid/checklists/new', ctrlIssueChecklists.issueChecklistsCreate);
router.get('/issues/:issueid/checklists/:checklistid', ctrlIssueChecklists.issueChecklistsReadOne);
router.put('/issues/:issueid/checklists/newitem/:listid', ctrlIssueChecklists.issueChecklistAddItem);
router.put('/issues/:issueid/checklists/:checklistid', ctrlIssueChecklists.issueChecklistsUpdateOne);
router.delete('/issues/:issueid/checklists/:checklistid', ctrlIssueChecklists.issueChecklistsDeleteOne);

// issue labels
router.post('/issues/:issueid/labels/new', ctrlIssueLabels.issueLabelsCreate);
router.get('/issues/:issueid/labels/:labelid', ctrlIssueLabels.issueLabelsReadOne);
router.put('/issues/:issueid/labels/:labelid', ctrlIssueLabels.issueLabelsUpdateOne);
router.delete('/issues/:issueid/labels/:labelid', ctrlIssueLabels.issueLabelsDeleteOne);

// issue attachments
//router.post('/issues/:issueid/attachments/upload', auth, multipartyMiddleware, ctrlIssueAttachments.issueAttachmentsUpload);
router.post('/issues/:issueid/attachments/new', multipartyMiddleware, ctrlIssueAttachments.issueAttachmentsCreate);
router.get('/issues/:issueid/attachments/:attachmentid', ctrlIssueAttachments.issueAttachmentsReadOne);
router.put('/issues/:issueid/attachments/:attachmentid', ctrlIssueAttachments.issueAttachmentsUpdateOne);
router.delete('/issues/:issueid/attachments/:attachmentid', ctrlIssueAttachments.issueAttachmentsDeleteOne);

// appointments
router.get('/appointments', ctrlAppointments.appointmentsList);
router.get('/appointments/:month', ctrlAppointments.appointmentsListByMonth);
router.get('/appointments/:appointmentid', ctrlAppointments.appointmentsReadOne);
router.put('/appointments/update/:appointmentid', ctrlAppointments.appointmentsUpdateOne);
router.delete('/appointments/:appointmentid', ctrlAppointments.appointmentsDeleteOne);
router.post('/appointments/new', ctrlAppointments.appointmentsCreate);

// appointment comments
router.post('/appointments/:appointmentid/comments', ctrlAppointmentComments.appointmentCommentsCreate);
router.get('/appointments/:appointmentid/comments/:commentid', ctrlAppointmentComments.appointmentCommentsReadOne);
router.put('/appointments/:appointmentid/comments/:commentid', ctrlAppointmentComments.appointmentCommentsUpdateOne);
router.delete('/appointments/:appointmentid/comments/:commentid', ctrlAppointmentComments.appointmentCommentsDeleteOne);

router.get('/testCall', ctrlAppointments.testCall);

// users
router.get('/users', ctrlUsers.usersList);

// residents
router.get('/residents', ctrlResidents.residentsList);
router.get('/residents/:residentid', ctrlResidents.residentById);
router.put('/residents/update/:residentid', ctrlResidents.residentsUpdateOne);
router.delete('/residents/:residentid', ctrlResidents.residentsDeleteOne);
router.post('/residents/new', ctrlResidents.residentsCreate);

module.exports = router;
