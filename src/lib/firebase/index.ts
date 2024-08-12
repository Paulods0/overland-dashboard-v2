import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { toast } from "react-toastify"
import { renameImageName } from "../utils"
import { storage } from "../../config/firebase.config"

export type firebaseFolder =
  | "posts"
  | "classified-posts"
  | "products"
  | "profile"
  | "schedule-posts"
  | "posts-content"
  | "tips"
  | "partners"

  export function getImagePathFromFirebaseURL(
    imageURL: string,
    folder: firebaseFolder
  ): string {
    const imagePathArray = imageURL.split(`/o/${folder}%2F`)
    const imageName = imagePathArray[1].split("?alt=")[0]

    return imageName
  }

  export async function deleteFromFirebase(
    image: string,
    firebaseFolder: firebaseFolder
  ) {
    const imageName = getImagePathFromFirebaseURL(image, firebaseFolder)

    const imageRef = ref(storage, `${firebaseFolder}/${imageName}`)
    await deleteObject(imageRef)
  }

  export async function uploadToFirebase(
    image: File,
    firbaseImageFolderPath: firebaseFolder
  ) {
    const filename = renameImageName(image?.name)
    const imageRef = ref(storage, `${firbaseImageFolderPath}/` + filename)
    const uploadTask = uploadBytesResumable(imageRef, image)
    
    await new Promise((resolve: (value?: unknown) => void, reject) => {
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          toast.error(error.message, {
            autoClose: 1000,
            hideProgressBar: true,
          })
          reject()
        },
        () => {
          resolve()
        }
      )
    })
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
    return downloadURL
  }