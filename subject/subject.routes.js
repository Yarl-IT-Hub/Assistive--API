module.exports = app => {
    const subject = require("./subject.controller.js");
    const authorize = require('_middleware/authorize');
    const multer = require("multer");
    const path = require("path");

    const subUrl = "subjects";

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

    // Create a new subject
    app.post(`/${subUrl}`, upload.single('image'),subject.create);
  
    // Retrieve all subject
    app.get(`/${subUrl}`, subject.findAll);
  
    // Retrieve a single subject with subjectId
    app.get(`/${subUrl}/:subjectId`, subject.findOne);
  
    // Update a subject with subjectId
    app.put(`/${subUrl}/:subjectId`, upload.single('image'), subject.update);
  
    // Delete a subject with subjectId
    app.delete(`/${subUrl}/:subjectId`, subject.delete);

    
  
  };