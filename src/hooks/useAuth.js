import { useSelector } from "react-redux"


// hook to get the state of current user
export const useAuth = () => {
    return useSelector(state => state.auth)
}