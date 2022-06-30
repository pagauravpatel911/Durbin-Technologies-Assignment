const resumeModel = require("../model/resumeSchema")

const validator = require('../Validation/validator');


// Post /register
const createResume = async function(req,res) {
    try {
        const body = req.body;
        
        const query = req.query;
        if(validator.isValidBody(query)) {
            return res.status(400).send({ status: false, msg: "Invalid parameters"});
        }

        let {title,name,phone,email,address,education,skills,experience} = body;

        //Validate body
        if (!validator.isValidBody(body)) {
            return res.status(400).send({ status: false, msg: "Resume resume body should not be empty" });
        }

        //Validate title
        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, msg: "resume resume title is required" });
        }

        // Validation of title
        if(!validator.isValidTitle(title)) {
            return res.status(400).send({ status: false, msg: "Invalid title"});
        }

        //Validate name
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, msg: "resume name is required" });
        }

        // Validate phone
        if(!validator.isValid(phone)) {
            return res.status(400).send({ status: false, msg: "resume phone number is required"});
        }

        // Validation of phone number
        if(!validator.isValidNumber(phone)) {
            return res.status(400).send({ status: false, msg: "Invalid phone number"});
        }

        //Validate email
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, msg: "resume email is required" });
        }
        
        // Validation of email
        if(!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, msg: "Invalid email Id"});
        }
        if (!validator.isValid(address)){
            return res.status(400).send({ status: false, message: "Please Provide address" })
        }

         if (!validator.isValid(education)){
            return res.status(400).send({ status: false, message: "Please Provide education" })
        }


        if (!validator.isValid(skills)){
            return res.status(400).send({ status: false, message: "Please Provide skills" })
        }

        if(!validator.isValid(experience)){
            experience = ["No Exprience till Now"]
        }
        //console.log(experience)

        // Cheking duplicate Entry Of resume 
        let duplicateEntries = await resumeModel.find();
        let duplicateLength = duplicateEntries.length

        if (duplicateLength != 0) {
         
           

           // Checking duplicate phone
           const duplicatePhone = await resumeModel.findOne({ phone: phone });
           if (duplicatePhone) {
               return res.status(409).send({status: false, msg: "resume phone number already exists" });
            }
            
            // Checking duplicate email
           const duplicateEmail = await resumeModel.findOne({ email: email });
           if (duplicateEmail) {
               return res.status(409).send({status: false, msg: "resume emailId already exists" });
            }
            
          

        }

        let data = {
            title:title,
            name:name,
            phone:phone,
            email:email,
            address:address,
            education:education,
            skills:skills,
            experience:experience
        } 
        // Finally the registration of resume is successful
        const resumeData = await resumeModel.create(data)
        res.status(201).send({status: true, msg: resumeData})

    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


/// parsing Api and filter Api 


const getParseResume = async function (req, res) {
    try{
        let data = {
          
        }
      
        
        const query = req.query;
        if(validator.isValidBody(query)) {
            return res.status(400).send({ status: false, msg: "Invalid parameters"});
        }

      
   
         let name = req.body.name;
        if (name) {
            if (!validator.isValid(name)) {
                return res.status(400).send({status: false, message:"plz enter a valid name"})
            }
            data["name"] = name
        }
        let education = req.body.education;
        if (education) {
            if (!validator.isValid(education)) {
                return res.status(400).send({status: false, message:"plz enter a valid education"})
            }
            data["education"] = education
        }
        let address = req.body.address;
        if (address) {
            if (!validator.isValid(address)) {
                return res.status(400).send({status: false, message:"plz enter a valid adress"})
            }
            data["address"] = address
        }
         let skills = req.body.skills;

         if (skills) {
            if (!validator.isValid(skills)) {
                return res.status(400).send({status: false, message:"plz enter a valid Skills"})
            }
            data["skills"] = skills
        }

        let filerResume = await resumeModel.find(data)
        if (filerResume.length === 0) {
            return res.status(400).send({
                status: true,
                message: "No Ressume Found"
            })
        }
        return res.status(200).send({
            statu: true,
            message: "ressume you want",
            data: filerResume
        })
    }catch(error){
        return res.status(500).send ({status:false, message: error.message})
    }
}





module.exports.createResume = createResume;
module.exports.getParseResume = getParseResume;