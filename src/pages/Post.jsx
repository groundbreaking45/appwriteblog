import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import databaseInstance from "../appwrite/database"
import parse from "html-react-parser"
import { Button, Container } from "../Components"
import ImageStorageInstance from "../appwrite/imagesStorage"
import { Link } from "react-router-dom"


const Post = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();
    const userData = useSelector(state => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;




    useEffect(() => {

        if (slug) {
            databaseInstance.getPost(slug).then((gotPost) => {
                if (gotPost) setPost(gotPost);
                else navigate('/');
            })
        }
        else navigate('/');

    }, [slug, navigate])



    useEffect(() => {
    if (post?.featuredImage) {
        async function fetchImage() {
            const url = await ImageStorageInstance.getFilePreview(post.featuredImage);
            setImageUrl(url);
        }

        fetchImage();
    }
}, [post]);


    const deletePost = async () => {
        const status = await databaseInstance.deletePost(post.$id);
        if (status) await ImageStorageInstance.deleteFile(post.featuredImage);

        navigate('/')
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={imageUrl}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post