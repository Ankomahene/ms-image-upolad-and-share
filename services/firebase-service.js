import { database } from "../config/firebase";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  updateDoc,
  Query,
  DocumentData,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getExpiryDate } from "../functions/get-expiry-date";

const collectionName = "images";
const collectionRef = collection(database, collectionName);

export const addNewUrls = (images, expireDate) => {
  return addDoc(collectionRef, {
    images,
    expiresAt: Timestamp.fromDate(getExpiryDate(expireDate)),
    createdAt: serverTimestamp(),
  });
};

export const getImages = async (documentId) => {
  const docRef = doc(database, collectionName, documentId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { exist: true, data: docSnap.data() };
  } else {
    return { exist: false, data: "No such document!" };
  }
};

// import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// const washingtonRef = doc(db, "cities", "DC");

// // Atomically add a new region to the "regions" array field.
// await updateDoc(washingtonRef, {
//   regions: arrayUnion("greater_virginia"),
// });

// // Atomically remove a region from the "regions" array field.
// await updateDoc(washingtonRef, {
//   regions: arrayRemove("east_coast"),
// });
