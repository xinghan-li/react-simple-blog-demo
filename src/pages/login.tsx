import { auth, provider } from "../config/firebase"; // Google OAuth
import { signInWithPopup } from "firebase/auth"; // popup sign in for Google OAuth
import { useNavigate } from "react-router-dom"; // redirect to the home page

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
        navigate("/"); // Redirect to the home page
    };

    return (
        <div>
            <p> Sign In With Google To Continue</p>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    );
};
