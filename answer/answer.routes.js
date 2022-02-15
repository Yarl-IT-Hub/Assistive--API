module.exports = app => {
    const answer = require("./answer.controller.js");
    const authorize = require('_middleware/authorize');
    const multer = require("multer");
    const path = require("path");

    const subUrl = "answers";

    //image upload function
    const storage = multer.diskStorage({
      destination: './upload/images',
      filename: (req, file, cb) => {
          return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
      }
    })
    
    const upload = multer({
      storage: storage,
      limits: {
          fileSize: 1000000
      }
    })

    // Create a new answer
    app.post(`/${subUrl}`, upload.single('image'), answer.create);
  
    // Retrieve all answer
    app.get(`/${subUrl}`, answer.findAll);
  
    // Retrieve a single answer with answerId
    app.get(`/${subUrl}/:answerId`, answer.findOne);

    // Retrieve a multiple answers with questionId
    app.get(`/getAnswersByQuestionId/:questionId`, answer.findByQuestionId);
  
    // Update a answer with answerId
    app.put(`/${subUrl}/:answerId`, upload.single('image'), answer.update);
  
    // Delete a answer with answerId
    app.delete(`/${subUrl}/:answerId`, answer.delete);
  
  };