var Userdb = require('../model/model');

// Create and save new user
exports.create = (req,res)=>{
    // New user
			const user = new Userdb({
				photo_url : req.body.photo_url,
				first_name : req.body.first_name,
				last_name: req.body.last_name,
				email : req.body.email,
				hobbies : req.body.hobbies,
				country : req.body.country,
    })

    // Save user in the database
    user
        .save(user)
        .then(data => {
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Error a create operation"
            });
        });
}

// Show all users
exports.find = (req, res)=>{

	if(req.query.id){
			const id = req.query.id;
			Userdb.findById(id)
					.then(data =>{
							if(!data){
									res.status(404).send({ message : "Not found user with id "+ id})
							}else{
									res.send(data)
							}
					})
					.catch(err =>{
							res.status(500).send({ message: "Error user with id " + id})
					})
	}else{
			Userdb.find()
					.then(user => {
							res.send(user)
					})
					.catch(err => {
							res.status(500).send({ message : err.message || "Error" })
					})
	}
}

// User Info with ID
exports.full_info = (req, res)=>{
	const id = req.params.id;
	Userdb.findById(id, req.body, { useFindAndModify: false})
			.then(data => {
						res.send(data)
			})
			.catch(err =>{
					res.status(500).send({ message : "Error get user information"})
			})
}

// Delete a user with ID
exports.delete = (req, res)=>{
	const id = req.params.id;

	Userdb.findByIdAndDelete(id)
			.then(data => {
					if(!data){
							res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
					}else{
							res.send({
									message : "User was deleted successfully!"
							})
					}
			})
			.catch(err =>{
					res.status(500).send({
							message: "Could not delete User with id=" + id
					});
			});
}