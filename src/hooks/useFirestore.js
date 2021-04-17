import { useState, useEffect } from 'react';
import { fireStore } from '../firebase.js';

const useFirestore = collection => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsub = fireStore.collection(collection)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .onSnapshot(snap => {
        let files = [];
        snap.forEach(file => {
          files.push({...file.data(), id: file.id})
        });
        setImages(files);
      })
    return () => unsub();

  }, [collection])

  return { images };
};

export default useFirestore;