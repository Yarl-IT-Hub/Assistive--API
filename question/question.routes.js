module.exports = app => {
    const question = require("./question.controller.js");
    const authorize = require('_middleware/authorize');
    const multer = require("multer");
    const path = require("path");

    const subUrl = "questions";

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

    // Create a new question
    app.post(`/${subUrl}`, upload.single('image'), question.create);
  
    // Retrieve all question
    app.get(`/${subUrl}`, question.findAll);
  
    // Retrieve a single question with questionId
    app.get(`/${subUrl}/:questionId`, question.findOne);

    // Retrieve a multiple questions with questionId
    app.get(`/questionsByGradeId/:gradeId/:level`, question.findByGradeId);
  
    // Update a question with questionId
    app.put(`/${subUrl}/:questionId`, upload.single('image'), question.update);
  
    // Delete a question with questionId
    app.delete(`/${subUrl}/:questionId`, question.delete);
  
  };