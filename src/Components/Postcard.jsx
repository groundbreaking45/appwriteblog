import ImageStorageInstance from "../appwrite/imagesStorage"
import { Link } from "react-router-dom"
import { useState ,useEffect} from "react"

function Postcard({ $id, title, featuredImage }) {
  const imageUrl = featuredImage
    ? ImageStorageInstance.getFilePreview(featuredImage)
    : null;

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="rounded-xl"
            />
          )}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>
    </Link>
  );
}


export default Postcard
