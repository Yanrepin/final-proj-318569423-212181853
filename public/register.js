import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection,updateDoc,arrayUnion,setDoc,addDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
    const firebaseConfig = {
                    
            apiKey: "AIzaSyAqzWTtTwPjNY_0y-mFz_2Il0A6mHz5LZE",
            authDomain: "project-318569423-212181853.firebaseapp.com",
            projectId: "project-318569423-212181853",
            storageBucket: "project-318569423-212181853.appspot.com",
            messagingSenderId: "1073735543384",
            appId: "1:1073735543384:web:7fd9327244086ba547382d"
    };

    const app=initializeApp(firebaseConfig);
    const db = getFirestore(app);
     


  $(document).ready(function() {
      firebase.auth().onAuthStateChanged(function(user) {               //chack if user connected , if connect sends him to shop page
          if (user) {
              window.location.href="./shop.html";
          } else {
            // No user is signed in.
          }
        });

        function validateEmail(email){                        //email check
          return String(email).toLowerCase().match(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            );
        };
  
          const reg_handler=async()=>{                        //handler with reg form , check values ,create user
              const em=$('#email').val();
              const pass=$("#password").val();
              const name=$("#full_name").val();
              const tel=$("#tel").val();
              if(em=="" || pass=="" || name=="" ||tel=="")
              {
                  
                  $("#maybe_error").html("<h5 style='color:red;'>some input is empty!</h5><br>back to <a href='./index.html'>login</a>");
                  
              }
              if(validateEmail(em)==null)
              {
                console.log("false");
                $("#maybe_error").html("<h5 style='color:red;'>email is not currect!</h5><br>back to <a href='./index.html'>login</a>");
              }
              else{
                  var washingtonRef = doc(db, "orders",em);
                  console.log(em);
                  await setDoc(washingtonRef,{});

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
  
        $("#register").on('click',reg_handler);                     //form send action listener
  
        
  
  
  
  
      });