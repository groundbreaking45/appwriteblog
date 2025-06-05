import { useState, useEffect } from "react"
import databaseInstance from "../appwrite/database"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Postform } from "../Components"


const EditPost = () => {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        databaseInstance.getPost(slug).then((gotPost) => {
            if (gotPost) {
                setPost(gotPost);

            }
            else {
                navigate('/');
            }
        })
    }, [slug, navigate]);


    return post ? (
        <div className="py-8">
            <Container>
                <Postform post={post} />
            </Container>
        </div>

    ) : null
}

export default EditPost;