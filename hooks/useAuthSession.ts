import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth, setToken } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import { getProtectedData } from "@/helpers/auth";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (!localToken) {
      dispatch(clearAuth());
      return;
    }

    async function getUser(token: string) {
      const data = await getProtectedData(token).catch((err) => {
        localStorage.removeItem("token");
        console.log(err);
      });

      dispatch(setUser({ username: data.user }));
      dispatch(setToken(token));
    }

    getUser(localToken);
  }, []);

  return user;
};

export default useAuthSession;
