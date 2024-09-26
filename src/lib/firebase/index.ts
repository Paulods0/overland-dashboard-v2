import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"
import { renameImageName } from "../utils"
import { storage } from "../../config/firebase.config"

export type FirebaseFolder =
  | "posts"
  | "classified-posts"
  | "products"
  | "profile"
  | "schedule-posts"
  | "posts-content"
  | "tips"
  | "partners"

/**
 * Extracts the image path from the Firebase URL.
 *
 * @param imageURL - The full URL of the image stored in Firebase.
 * @param folder - The folder in Firebase where the image is stored.
 * @returns The name of the image.
 */

export function getImagePathFromFirebaseURL(
  imageURL: string,
  folder: FirebaseFolder
): string {
  const [_, imagePath] = imageURL.split(`/o/${folder}%2F`)
  const imageName = imagePath.split("?alt=")[0]
  return imageName
}

/**
 * Deletes an image from Firebase storage.
 *
 * @param image - The full URL of the image to be deleted.
 * @param firebaseFolder - The folder in Firebase where the image is stored.
 */

export async function deleteFromFirebase(
  image: string,
  firebaseFolder: FirebaseFolder
): Promise<void> {
  try {
    const imageName = getImagePathFromFirebaseURL(image, firebaseFolder)
    const imageRef = ref(storage, `${firebaseFolder}/${imageName}`)
    await deleteObject(imageRef)
  } catch (error: any) {
    if (error.code === "storage/object-not-found") {
      console.error("Imagem não encontrada no Firebase, continuando a remoção.")
    } else {
      throw new error("Error ao remover a imagem no firebase")
    }
  }
}

/**
 * Subir uma imagem no Firebase storage.
 *
 * @param image - A imagem a ser salva.
 * @param firebaseFolderPath - A pasta no Firebase onde a imagem será salva/armazenada.
 * @returns A downloadURL da imagem que foi salva no firebase.
 */

export async function uploadToFirebase(
  image: File,
  firbaseFolderPath: FirebaseFolder
) {
  try {
    const filename = renameImageName(image!.name)
    const imageRef = ref(storage, `${firbaseFolderPath}/` + filename)
    const uploadTask = uploadBytesResumable(imageRef, image)

    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => reject(error),
        () => resolve()
      )
    })
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
    return downloadURL
  } catch (error) {
    console.log(error)
  }
}
