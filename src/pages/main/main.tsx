import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface Post {
    id: string;
    title: string;
    description: string;
    username: string;
    userId: string;
}

export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
        ); // Cast to Post[] type manually in advance
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className='posts-container'>
            {postsList?.map((post) => (
                <div className='post-box' key={post.id}>
                    <Post post={post} />
                </div>
            ))}
        </div>
    );
};
