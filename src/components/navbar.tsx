import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Navbar: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    const [photoURL, setPhotoURL] = useState<string>("");

    useEffect(() => {
        setPhotoURL(user?.photoURL || "/default-image.jpg");
    }, [user]);

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    if (error) {
        return <div className='error'>Error loading user information</div>;
    }

    const signUserOut = async () => {
        await auth.signOut();
    };

    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <h1 className='website-title'>Simple Blog Demo</h1>
            </div>
            <div className='navbar-right'>
                <Link to='/'>Home</Link>
                {!user ? (
                    <Link to='/login'>Login</Link>
                ) : (
                    <Link to='/createpost'>Create Post</Link>
                )}
                {user && user.displayName && (
                    <p className='username'>{user.displayName}</p>
                )}
                {user && (
                    <img
                        className='user-profile-img'
                        src={photoURL || "/default-image.jpg"}
                        alt={`${user.displayName}'s Profile`}
                        onError={(e) =>
                            ((e.target as HTMLImageElement).src =
                                "/default-image.jpg")
                        }
                    />
                )}
                {user && (
                    <button className='logout-button' onClick={signUserOut}>
                        Sign Out
                    </button>
                )}
            </div>
        </nav>
    );
};
