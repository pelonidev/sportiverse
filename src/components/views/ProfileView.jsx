import React from "react";
import LoginForm from "../LoginForm";

const ProfileView = () => {
    return <div className="bg-white overflow-auto rounded-none w-full h-full shadow-none md:shadow-xl md:rounded-xl md:h-fit md:w-fit p-8 flex justify-center items-center">
        <LoginForm />
    </div>
}

export default ProfileView