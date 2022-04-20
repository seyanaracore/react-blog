import { useNavigate, useParams } from "react-router-dom";

const usePostsPagesNavigate = () => {
   const navigate = useNavigate();
   const params = useParams();
	if (!params.page) navigate("1");

};
