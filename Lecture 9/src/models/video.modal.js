const mongoose  = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbNail: {
        type: String, //cloudinary file
        required: true,

    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String, //cloudinary file
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    }
}, {
    timestamps: true
});

mySchema.plugin(aggregatePaginate); 



const videoModel = mongoose.model('videoModel',videoSchema);