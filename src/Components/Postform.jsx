import { useCallback, useEffect, useState } from "react"
import { Button, RTE, Input, Select, } from "./index"
import { useForm } from "react-hook-form"
import databaseInstance from "../appwrite/database"
import ImageStorageInstance from "../appwrite/imagesStorage"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"




const Postform = ({ post }) => {


    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileChange = async (e) => {
        if (e.target.files.length > 0) {
            const file = await ImageStorageInstance.uploadFile(e.target.files[0]);
            setUploadedFile(file);
        }
    };






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







                if (uploadedFile && post.featuredImage) {
                    await ImageStorageInstance.deleteFile(post.featuredImage);
                }

                const dbpost = await databaseInstance.updatePost(post.$id, {
                    ...data,
                    featuredImage: uploadedFile ? uploadedFile.$id : post.featuredImage,
                });





                if (dbpost)
                    navigate(`/post/${dbpost.$id}`);

            }

            else {
                if (!uploadedFile) {
                    alert("Please upload an image before submitting.");
                    setIsSubmitting(false);
                    return;
                }

                const dbpost = await databaseInstance.createPost({
                    ...data,
                    featuredImage: uploadedFile.$id,
                    userId: userData.$id,
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

        console.log(`hello ye hain post ${post}`)




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
                    onChange={handleFileChange}
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