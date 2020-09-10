const Meeting = require("./meeting");
const File = require("../file/file");
const fs = require("fs");

module.exports.getMeetings = async (req, res, next) => {
    try {
        const meetings = await Meeting.find({}).exec();

        res.status(200).json(meetings);
    } catch (err) {
        next(err);
    }
};

module.exports.getMeetingById = async (req, res, next) => {
    try {
        const meeting = await Meeting.findById(req.params.id).exec();

        if (meeting) {
            res.status(200).json(meeting);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};

module.exports.createMeeting = async (req, res, next) => {
    try {
        const newMeeting = new Meeting(req.body);

        if (req.files) {
            if (req.files['poster']) {
                const posterUrl = await File.fromRequestFile(req.files['poster'], 'public/posters');
                newMeeting.posterUrl = posterUrl.path(true);
            } 
            
            if (req.files['presentation']) {
                const presentationUrl = await File.fromRequestFile(req.files['presentation'], 'public/presentations');
                newMeeting.presentationUrl = presentationUrl.path(true);
            }

            if (req.files['image']) {
                await File.fromRequestFile(req.files['image'], 'public/meetings');
            }
        }

        await newMeeting.save();
        res.status(201).json(newMeeting);
    } catch (err) {
        next(err);
    }
};

module.exports.updateMeeting = async (req, res, next) => {
    try {
        const meeting = await Meeting.findById(req.params.id).exec();

        if (meeting) {
            const newMeeting = new Meeting(req.body);
            
            if (req.files){
                if (req.files['poster']) {
                    // delete old poster image
                    deleteFile(meeting.posterUrl);
    
                    // save new poster image
                    const posterUrl = await File.fromRequestFile(req.files['poster'], 'public/posters');
                    newMeeting.posterUrl = posterUrl.path(true);
                }
    
                if (req.files['presentation']) {
                    // delete old presentation
                    deleteFile(meeting.presentationUrl);
    
                    // save new presentation
                    const presentationUrl = await File.fromRequestFile(req.files['presentation'], 'public/presentations');
                    newMeeting.presentationUrl = presentationUrl.path(true);
                }

                if (req.files['image']) {
                    await File.fromRequestFile(req.files['image'], 'public/meetings');
                }
            }

            const updatedMeeting = await Meeting.findByIdAndUpdate(req.params.id, newMeeting, {new: true}).exec();
            if (updatedMeeting) {
                res.status(200).json(updatedMeeting);
            } else {
                res.status(404).json({
                    message: `Updating meeting with id: ${req.params.id} failed`
                })
            }
        } else {
          res.status(404).json({
              message: `Meeting with id: ${req.params.id} not found`
          });
        }
    } catch (err) {
        next(err);
    }
};

module.exports.deleteMeeting = async (req, res, next) => {
    try {
        const meeting = await Meeting.findById(req.params.id).exec();

        if (meeting) {
            // delete media
            if (meeting.posterUrl) {
                deleteFile(meeting.posterUrl);
            }

            if (meeting.presentationUrl) {
                deleteFile(meeting.presentationUrl);
            }

            await Meeting.findByIdAndDelete(req.params.id).exec();

            res.status(200).send();
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};

async function deleteFile(fileUrl) {
    const url = new URL(fileUrl);

    const pathParts = url.pathname.split("/");
    const fileSystemPath = pathParts.slice(2).join("/");
    const filename = pathParts.pop();

    const filenameTokens = filename.split(".");

    let id, type;
    [id, type] = filenameTokens;

    await File.deleteOne({_id: id, type: type}).exec();
    fs.unlinkSync(fileSystemPath);
}