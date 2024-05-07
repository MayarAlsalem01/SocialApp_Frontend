import RegisterForm from "./RegisterForm";

const Register = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950">
                <div className="flex flex-col bg-zinc-900 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-200">Create new account ^.^</div>
                    <div className="mt-10">
                        
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Register