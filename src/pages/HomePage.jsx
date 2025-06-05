import { useEffect,useState } from "react";
import databaseInstance from "../appwrite/database"
import {Postcard,Container }from "../Components"


const HomePage = () => {
const [posts, setPosts ]  = useState(null);

useEffect(() => {
    databaseInstance.loadPosts().then((homePost) => {
        if (homePost) setPosts(homePost.documents);
        else setPosts([]);
          
         
    })
},[])


if (posts === null) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-semibold">Loading posts...</h1>
                </Container>
            </div>
        );
    }



if (posts.length == 0) {
 return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    
}

else  return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

}
export default HomePage