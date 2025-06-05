import confg from "../config/config";
import { Client, Databases, Query } from "appwrite";


export class Database {
    client = new Client;
    Databases;

    constructor() {
        this.client
            .setEndpoint(confg.appWriteUrl)
            .setProject(confg.appWriteProjectId);

        this.Databases = new Databases(this.client);

    }







    async createPost({ title, slug, featuredImage, content, userId, status }) {
        try {
            const createdPost = await this.Databases.createDocument
                (confg.appWriteDatabaseId, confg.appWriteCollectionId, slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId,
                    })

            return createdPost;


        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", typeof(error) === 'object' ? error.message : error);
        }

    }








    async updatePost(slug, { title, featuredImage, content, status }) {
        try {

            const updatedPost = await this.Databases
                .updateDocument(confg.appWriteDatabaseId, confg.appWriteCollectionId, slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,

                    }
                )

            return updatedPost;

        }

        catch (error) {
            console.log("Appwrite serive :: updatePost :: error", typeof(error) === 'object' ? error.message : error);
        }








    }
    async deletePost(slug) {
        try {

            await this.Databases
                .deleteDocument(confg.appWriteDatabaseId, confg.appWriteCollectionId, slug);

            return true;

        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", typeof(error) === 'object' ? error.message : error);
            return false
        }



    }




    async getPost(slug) {
        try {

            const post = await this.Databases
                .getDocument(confg.appWriteDatabaseId, confg.appWriteCollectionId, slug);

             return post || null

        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", typeof(error) === 'object' ? error.message : error);
        }

    }









    async loadPosts (queries = [Query.equal("status","active")]) {
     try {
           const loadedPosts = await this.Databases
               .listDocuments(confg.appWriteDatabaseId, confg.appWriteCollectionId, queries,);

               return loadedPosts || null
   

     } catch (error) {
        console.log("ApdatabaseInstancepwrite serive :: loadPosts :: error", typeof(error) === 'object' ? error.message : error);
     }


    }




}
const databaseInstance = new Database();

export default databaseInstance;