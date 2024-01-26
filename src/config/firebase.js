import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { getFirestore, getDocs } from "firebase/firestore";

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
export const db = getFirestore(app);
const storage = getStorage();
/* Authentications */
export const register=async(userInfo)=>{
  try {
      const {email, password}=userInfo
      await createUserWithEmailAndPassword(auth, email, password)
      await addDoc(collection(db, "users"), userInfo);
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

/* Data Storage */
export const updateProfileToDb=async(profileInfo)=>{
  try {
    const { email, name, age, profileImage, info } = profileInfo
    const storageRef = ref(storage, `profile/${profileImage.name}`);
    await uploadBytes(storageRef, profileImage)
    let url = await getDownloadURL(storageRef)
    await addDoc(collection(db, "userProfile"), {
      email,
      name,
      age,
      info,
      imageUrl : url,
    });
    alert('Profile Updated Successfully!')
  } catch (error) {
    alert(error.message)
  }
}

export const addProductToDb=async(productInfo)=>{
  try {
    const {  title, descr, price, adImage} = productInfo
    console.log(productInfo,'productInfo')
    const storageRef = ref(storage, `ads/${adImage.name}`);
    await uploadBytes(storageRef, adImage)
    let url = await getDownloadURL(storageRef)
    await addDoc(collection(db, "products"), {
      title, 
      descr, 
      price,
      imageUrl : url,
    });
    alert('Product Added Successfully!')
  } catch (error) {
    alert(error.message)
  }
}

/* Get Stored Data */

export const getProducts=async()=>{
  let querySnapshot = await getDocs(collection(db, "products"));
  let products=[]
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    products.push(doc.data())
  });
  return products
}