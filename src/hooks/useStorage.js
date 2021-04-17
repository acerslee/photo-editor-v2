import { useState, useEffect } from 'react';
import { fireStorage, fireStore, timestamp } from '../firebase.js';

const useStorage = file => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = fireStorage.ref(file.name);
    const collectionRef = fireStore.collection('images');

    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err)
    }, async () => {
      //the url is to be saved to a document and will eventually be saved in the firebase database
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      collectionRef.add({ url, createdAt });
      setUrl(url)
    })
  },[file]);

  return { progress, url, error };
};

export default useStorage;