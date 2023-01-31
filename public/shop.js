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
    firebase.auth().onAuthStateChanged(function(user) {         //check if user connected , if not sends him to login page
        if (user) {
            
        } else {
            window.location.href="./index.html";
          // No user is signed in.
        }
      });

      const logout=async()=>{                                       //logout listener, and changing user state
        const us= await firebase.auth().signOut().then(function() {
            console.log('Signed Out');
            window.location.href="./index.html";
          }, function(error) {
            window.location.href="./404.html";
          });
        };

      $("#logout").on('click',logout);

      
      
             
      $('.btn').on('click',(e)=>{                               //all add btn listeners
        let x=$(e.target).attr("id");
        let y="#price"+x;
        let price=$(y).html();
        let z="#item"+x;
        let item=$(z).html();
        console.log(""+price+" "+item);
        let email=firebase.auth().currentUser.email;
        console.log(""+email);
        var washingtonRef = doc(db, "orders", email);
        
        updateDoc(washingtonRef,{
                items:arrayUnion(item),
                price:arrayUnion(price),      
        });
        
        let pop="#pop"+$(e.target).attr("id");
        console.log(pop);
        $(pop).css("visibility", "visible");
        setTimeout(()=>{$(pop).css("visibility", "hidden");},500)
      });


      




    });