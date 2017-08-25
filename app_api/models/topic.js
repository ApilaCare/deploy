const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({

    items: [itemSchema],

    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdOn: {type: Date, default: Date.now}
});

//this should be a generalized item that can be text/image/checklist/attachments
const itemSchema = new mongoose.Schema({
    itemType: {type: String},
    text: {type: String},
    createdOn: {type: Date, default: Date.now}
});

mongoose.model('TopicSchema', topicSchema);
