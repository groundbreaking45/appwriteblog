import { useCallback, useEffect, useState } from "react"
import { Button, RTE, Input, Select, } from "./index"
import { useForm } from "react-hook-form"
import databaseInstance from "../appwrite/database"
import ImageStorageInstance from "../appwrite/imagesStorage"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"




const Postform = ({ post }) => {









    const { register, control, watch, setValue, getValues, handleSubmit } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });



    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {

        if (isSubmitting) return;
        setIsSubmitting(true);


        try {


            if (post) {

                let featuredImage = post?.featuredImage || null;

                if (data.image && data.image.length > 0) {
                    const file = await ImageStorageInstance.uploadFile(data.image[0])
                    if (file) featuredImage = file.$id;
                }

                const dbpost = await databaseInstance.updatePost(post.$id, {
                    ...data,
                    featuredImage,

                });
                if (dbpost) navigate(`/post/${dbpost.$id}`);







            }

            else {
                const file = data.image?.[0] ? await ImageStorageInstance.uploadFile(data.image[0]) : null;

                const dbpost = await databaseInstance.createPost({
                    ...data,
                    featuredImage: file?.$id || null,
                    userId: userData?.$id,
                });

                if (dbpost) navigate(`/post/${dbpost.$id}`);
            }


        }
        catch (error) {
            console.log(error.message)

        }
        finally {
            setIsSubmitting(false);
        }


    }


    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value.trim()
                .toLowerCase()
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/[^\w\-]+/g, '') // Remove all non-word chars
                .replace(/\-\-+/g, '-') // Replace multiple hyphens with single one
                .replace(/^-+|-+$/g, ''); // Trim hyphens from start/end

        return "";
    }, [])

    useEffect(() => {

        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }

        });

        return () => subscription.unsubscribe();

    }, [watch, setValue, slugTransform])


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: false })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={ImageStorageInstance.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (post ? "Updating..." : "Submitting...") : (post ? "Update" : "Submit")}
                </Button>

            </div>
        </form>
    )
}

export default Postform




// import { useCallback, useEffect, useState } from "react";
// import { Button, RTE, Input, Select } from "./index";
// import { useForm } from "react-hook-form";
// import databaseInstance from "../appwrite/database";
// import ImageStorageInstance from "../appwrite/imagesStorage";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const Postform = ({ post }) => {
//     const {
//         register,
//         control,
//         watch,
//         setValue,
//         getValues,
//         handleSubmit,
//     } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     const slugTransform = useCallback((value) => {
//         return value && typeof value === "string"
//             ? value
//                   .trim()
//                   .toLowerCase()
//                   .replace(/\s+/g, "-")
//                   .replace(/[^\w\-]+/g, "")
//                   .replace(/\-\-+/g, "-")
//                   .replace(/^-+|-+$/g, "")
//             : "";
//     }, []);

//     useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), {
//                     shouldValidate: true,
//                 });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, setValue, slugTransform]);

//     const handleImageUpload = async (imageFileList) => {
//         if (imageFileList && imageFileList.length > 0) {
//             const file = await ImageStorageInstance.uploadFile(imageFileList[0]);
//             return file?.$id || null;
//         }
//         return null;
//     };

//     const submit = async (data) => {
//         if (isSubmitting) return;
//         setIsSubmitting(true);

//         try {
//             const uploadedImageId = await handleImageUpload(data.image);

//             if (post) {
//                 const updatedPost = await databaseInstance.updatePost(post.$id, {
//                     ...data,
//                     featuredImage: uploadedImageId || post.featuredImage || null,
//                 });

//                 if (updatedPost) {
//                     navigate(`/post/${updatedPost.$id}`);
//                 }
//             } else {
//                 if (!uploadedImageId) {
//                     throw new Error("Image is required to create a post.");
//                 }

//                 const newPost = await databaseInstance.createPost({
//                     ...data,
//                     featuredImage: uploadedImageId,
//                     userId: userData.$id,
//                 });

//                 if (newPost) {
//                     navigate(`/post/${newPost.$id}`);
//                 }
//             }
//         } catch (error) {
//             console.error("Post submission failed:", error.message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-full md:w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) =>
//                         setValue("slug", slugTransform(e.currentTarget.value), {
//                             shouldValidate: true,
//                         })
//                     }
//                 />
//                 <RTE
//                     label="Content :"
//                     name="content"
//                     control={control}
//                     defaultValue={getValues("content")}
//                 />
//             </div>

//             <div className="w-full md:w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image")}
//                 />

//                 {post?.featuredImage && (
//                     <div className="mb-4">
//                         <img
//                             src={ImageStorageInstance.getFilePreview(post.featuredImage)}
//                             alt="Post Preview"
//                             className="rounded-md w-full h-auto"
//                         />
//                     </div>
//                 )}

//                 <Select
//                     label="Status :"
//                     className="mb-4"
//                     options={[
//                         { label: "Active", value: "active" },
//                         { label: "Inactive", value: "inactive" },
//                     ]}
//                     {...register("status", { required: true })}
//                 />

//                 <Button type="submit" disabled={isSubmitting} className="w-full">
//                     {isSubmitting
//                         ? post
//                             ? "Updating..."
//                             : "Submitting..."
//                         : post
//                         ? "Update Post"
//                         : "Create Post"}
//                 </Button>
//             </div>
//         </form>
//     );
// };

// export default Postform;
