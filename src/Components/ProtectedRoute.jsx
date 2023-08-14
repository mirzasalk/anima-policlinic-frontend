import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function ProtectedRoute(props) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/user/get-user-info-by-id",
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
        localStorage.clear();
        navigate("/prijava");
      }
    } catch (error) {
      dispatch(setUser(null));
      localStorage.clear();
      navigate("/prijava");
    }
  };

  useEffect(() => {
    console.log(user?.isAdmin);

    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    dispatch(hideLoading());
    return <Navigate to="/prijava" />;
  }
}

export default ProtectedRoute;
