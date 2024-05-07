import { ReactNode, createContext,  useState } from "react";
import { User } from "../../types/User";
import { AuthModel } from "../../types/AuthModel";


interface Props{

}
export const  AuthContext = createContext<AuthContextType|undefined>(undefined);
interface AuthContextType {
    
    setAuthModel :React.Dispatch<React.SetStateAction<AuthModel|undefined>>;
    authModel:AuthModel|undefined;
}
interface Props{
    children:ReactNode;
}
export const AuthProvider = (props: Props) => {

    const [authModel, setAuthModel] = useState<AuthModel|undefined>(undefined);
    
    
    return <AuthContext.Provider value={{authModel,setAuthModel}}>{props.children}</AuthContext.Provider>
}