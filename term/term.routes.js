module.exports = app => {
    const term = require("./term.controller.js");
    const authorize = require('_middleware/authorize');
    const multer = require("multer");
    const path = require("path");

    const subUrl = "terms";

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

    // Create a new term
    app.post(`/${subUrl}`, upload.single('image'), term.create);
  
    // Retrieve all term
    app.get(`/${subUrl}`, term.findAll);
  
    // Retrieve a single term with termId
    app.get(`/${subUrl}/:termId`, term.findOne);

    // Retrieve a multi terms with termId
    app.get(`/getTermByGradeId/:gradeId`, term.findByGradeId);
  
    // Update a term with termId
    app.put(`/${subUrl}/:termId`, upload.single('image'), term.update);
  
    // Delete a term with termId
    app.delete(`/${subUrl}/:termId`, term.delete);
  
  };