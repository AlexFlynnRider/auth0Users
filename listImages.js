// listImages.js

import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig"; // Certifique-se de que o caminho esteja correto

async function getImagesFromFolder(folderName) {
  const folderRef = ref(storage, folderName);
  const images = [];

  try {
    // Listar todos os arquivos na pasta especificada
    const result = await listAll(folderRef);
    for (const itemRef of result.items) {
      // Obter a URL de download de cada arquivo
      const url = await getDownloadURL(itemRef);
      images.push(url);
    }
  } catch (error) {
    console.error("Error fetching images: ", error);
  }

  return images;
}

// Exemplo de uso
getImagesFromFolder("NomeDaPasta").then((urls) => {
  console.log("Image URLs: ", urls);
});
