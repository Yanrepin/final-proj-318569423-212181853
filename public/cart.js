$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            
        } else {
            window.location.href="https://project-318569423-212181853.web.app/index.html";
          // No user is signed in.
        }
      });

      const logout=async()=>{
        const us= await firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            window.location.href="./index.html";
          }, function(error) {
            window.location.href="./404.html";
          });
        
    
    
        };

        $("#logout").on('click',logout);

    });