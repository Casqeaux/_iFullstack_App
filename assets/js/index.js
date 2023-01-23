$("#add_user").submit(function(event){
    alert("User successfully created!");
})

if(window.location.pathname == "/"){
	$ondelete = $(".content-section__table tbody td a.delete");
	$ondelete.click(function(){
			var id = $(this).attr("data-id")

			var request = {
					"url" : `http://localhost:3000/api/users/${id}`,
					"method" : "DELETE"
			}

			if(confirm("Do you really want to delete this record?")){
					$.ajax(request).done(function(response){
							alert("User Data Deleted Successfully!");
							location.reload();
					})
			}

	})
}