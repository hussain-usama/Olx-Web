import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfcdqCKpIj3zyxxae4mo2fpQgX7DXnILk",
  authDomain: "ms22-advance.firebaseapp.com",
  projectId: "ms22-advance",
  storageBucket: "ms22-advance.appspot.com",
  messagingSenderId: "210278591144",
  appId: "1:210278591144:web:eee7e01a0227c1cd84f09d",
  measurementId: "G-HXDHCQLJCB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const register=async(userInfo)=>{
  try {
      const {email, password}=userInfo
      await createUserWithEmailAndPassword(auth, email, password)
      alert(' Register Successfully')
      return true
  } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage)
      return false
  }
}

export const loginUser=async(userInfo)=>{
  try {
      const {email, password}=userInfo
      await signInWithEmailAndPassword(auth, email, password)
      alert(' login Successfully')
      return true
  } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage)
      return false
  }
}

export const logoutUser=()=>{
  signOut(auth).then(() => {
      alert('logout Successfull')
  }).catch((error) => {
      alert('logout failed')
  });
}