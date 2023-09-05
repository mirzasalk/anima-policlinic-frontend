import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";
import api from "../api";

function PublicRoute(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await api.post(
        "/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") }, //ovo ubrzava obradu??
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        dispatch(setUser(null));
        console.log("obicni korisnik");
      }
    } catch (error) {
      dispatch(setUser(null));
      console.log("mirza");
      console.log(error);
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      getUser();
    }
  }, [user]);
  return props.children;
}
export default PublicRoute;
