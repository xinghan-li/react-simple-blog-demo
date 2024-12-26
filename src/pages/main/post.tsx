import { Post as InterfacePost } from "./main";
import { db, auth } from "../../config/firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    query,
    where,
    doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useState } from "react";

interface Props {
    post: InterfacePost;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like[] | null>(null);
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(
            data.docs.map((doc) => ({
                userId: doc.data().userId,
                likeId: doc.id,
            }))
        );
    };
    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id,
            });
            if (user) {
                setLikes((prev) =>
                    prev
                        ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
                        : [{ userId: user?.uid, likeId: newDoc.id }]
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            );

            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes(
                    (prev) =>
                        prev && prev.filter((like) => like.likeId !== likeId)
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, []);
    return (
        <div>
            <div className='title'>
                <h1>{post.title}</h1>
            </div>
            <div className='body'>
                <p>{post.description}</p>
            </div>
            <div className='footer'>
                <p className='username'>@{post.username}</p>

                <button
                    className='like-button'
                    onClick={hasUserLiked ? removeLike : addLike}
                >
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                {likes && <p className='like-count'> Likes: {likes.length} </p>}
            </div>
        </div>
    );
};
