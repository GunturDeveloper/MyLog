import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCjKjfNp6Jg6LlR2gyzneDov8ZhRBg8DOM",
    authDomain: "compas-59487.firebaseapp.com",
    projectId: "compas-59487",
    storageBucket: "compas-59487.appspot.com",
    messagingSenderId: "103208223226",
    appId: "1:103208223226:web:0b023a3e239ac00a632443",
    measurementId: "G-ZF26B64MVD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login berhasil!");
        window.location.href = "home.html"; 
        
    } catch (error) {
        alert("Login gagal: " + error.message);
    }
});
