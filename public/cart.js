import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection,updateDoc,arrayUnion,setDoc,addDoc,deleteField } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";



$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {           //chack if user connected , if not sends him to login page, if yes show him bill of the user
        if (user) {
                bill();
            
        } else {
            window.location.href="./index.html";
          // No user is signed in.
        }
      });

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



        async function bill(){                            //get the oreder from database of the user and show him the bill
        var sum=0;
        let email=firebase.auth().currentUser.email;                      
        const washingtonRef = doc(db, "orders",email);
        var data = await getDoc(washingtonRef);

        var items=[]
        var i = data.data().items;
        i.forEach((item)=>{items.push(item);});
        
        var prices=[];
        var p = data.data().price;
        p.forEach((price)=>{prices.push(price);sum=parseFloat(sum)+parseFloat(price);});
        sum=sum.toFixed(2);

        for(i=0;i<items.length;i++)
        {
            if(i==0)
            {
                $('#result').append("<br><br><br><br>");
            }
            $('#result').append("<h5>"+items[i]+" =  $"+prices[i]+"</h5><br>");

        }
        $('#result').append("<h5>"+"__________"+"</h5><br>");
        $('#result').append("<h5>"+"TOTAL AMOUNT: $"+sum+"</h5><br>");

        }

        








        $("#logout").on('click',async()=>{                  //logout handler
          const us= await firebase.auth().signOut().then(function() {
              console.log('Signed Out');
              window.location.href="./index.html";
            }, function(error) {
              window.location.href="./404.html";
            });
          
      
      
          });



        $("#reset").on("click",async()=>{                             //reset btn , clear the orders data of the user

          let email=firebase.auth().currentUser.email;                      
          const washingtonRef = doc(db, "orders",email);
          await updateDoc(washingtonRef, {
            items: deleteField(),
            price: deleteField()
          });
          $('#result').html("<br><h5 style='color: red;'>CART WAS RESETTED &#128532;</h5><br><br>");
        });



        $("#pay").on("click",async()=>{                   //pay btn, clear the orders data of the user , the order was payed

          let email=firebase.auth().currentUser.email;                      
          const washingtonRef = doc(db, "orders",email);
          await updateDoc(washingtonRef, {
            items: deleteField(),
            price: deleteField()
          });
          $('#result').html("<br><h5 style='color: green;'>CHECK OUT SECCESSFULLY &#128512;</h5><br><h5 style='color: green;'>THANK YOU , HOPE TO SEE YOU SOON</h5><br>");
        });




    });