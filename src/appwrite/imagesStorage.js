import confg from "../config/config";
import { Client, Storage, ID, } from "appwrite";



export class imageStorage {
    client = new Client
    Bucket;


    constructor() {
        this.client
            .setEndpoint(confg.appWriteUrl)
            .setProject(confg.appWriteProjectId);

        this.Bucket = new Storage(this.client);
    }





    async uploadFile(file) {
        if (!file) return false;

        try {
            return await this.Bucket.createFile(confg.appWriteBucketID, ID.unique(), file)

        } catch (error) {
            console.log("Appwrite serive :: uploadfile :: error", typeof(error) === 'object' ? error.message : error);
            return false;
        }

    }



    async deleteFile(fileId) {
        try {
            await this.Bucket.deleteFile(confg.appWriteBucketID, fileId)
            return true;

        }
        catch (error) {
            console.log("Appwrite serive :: deletefile :: error", typeof(error) === 'object' ? error.message : error);
            return false;

        }

    }






  async getFilePreview(fileId) {
        try {
            const filePreview =  await this.Bucket.getFileView(confg.appWriteBucketID, fileId);

            return filePreview || null;

        } catch (error) {
            console.log("Appwrite serive :: deletefile :: error", typeof(error) === 'object' ? error.message : error);
            return null;

        }

    }



}

const ImageStorageInstance = new imageStorage;
export default ImageStorageInstance;


// PointerEvent.pointerType