import { useEffect, useState } from 'react'
import { Postcard, Container, } from '../Components'
import databaseInstance from '../appwrite/database'


const Allposts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        databaseInstance.loadPosts().then((allActivePosts) => {
            if (allActivePosts) setPosts(allActivePosts.documents);
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <Postcard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Allposts