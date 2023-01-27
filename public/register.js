

$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.href="./shop.html";
        } else {
          // No user is signed in.
        }
      });

        const reg_handler=async()=>{
            const em=$('#email').val()
            const pass=$("#password").val();
            const name=$("#full_name").val();
            const tel=$("#tel").val();
            if(em=="" || pass=="" || name=="" ||tel=="")
            {
                $("#maybe_error").html("<h5 style='color:red;'>some input is empty</h5><br>back to <a href='./index.html'>login</a>")

            }
            else{
                $("#maybe_error").html('back to <a href="./index.html">login</a>');
                const us= await firebase.auth().createUserWithEmailAndPassword(em, pass)
                .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                })
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                });
              }
      };

      $("#register").on('click',reg_handler);

      




    });