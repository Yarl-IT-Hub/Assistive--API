module.exports = app => {
    const grade = require("./grade.controller.js");
    const authorize = require('_middleware/authorize');
    const multer = require("multer");
    const path = require("path");

    const subUrl = "grades";

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

    // Create a new grade
    app.post(`/${subUrl}`, upload.single('image'), grade.create);
  
    // Retrieve all grade
    app.get(`/${subUrl}`, grade.findAll);
  
    // Retrieve a single grade with gradeId
    app.get(`/${subUrl}/:gradeId`, grade.findOne);

    // Retrieve a multi grades with subjectId
    app.get(`/getGradeBySubjectId/:subject_id`, grade.findBySubjectId);
  
    // Update a grade with gradeId
    app.put(`/${subUrl}/:gradeId`, upload.single('image'), grade.update);
  
    // Delete a grade with gradeId
    app.delete(`/${subUrl}/:gradeId`, grade.delete);
  
  };