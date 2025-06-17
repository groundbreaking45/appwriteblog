import ImageStorageInstance from "../appwrite/imagesStorage"
import { Link } from "react-router-dom"
import { useState ,useEffect} from "react"

function Postcard({ $id, title, featuredImage }) {
    const [imageUrl,setImageUrl] = useState(null);

useEffect(
    () => {
        async function fetchImage ()  {
         const url = await ImageStorageInstance.getFilePreview(featuredImage);
         setImageUrl(url);

        }

        if(featuredImage)
        {
            fetchImage();
        }
    },[imageUrl]
)


    return (
        <Link to={`/post/${$id}`}>

            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={imageUrl} alt={title} className="rounded-xl" />

                    <h2 className='text-xl font-bold'>{title}</h2>

                </div>
            </div>




        </Link>
    )
}

export default Postcard