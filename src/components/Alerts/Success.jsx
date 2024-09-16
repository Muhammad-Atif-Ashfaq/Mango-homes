import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Success = (title) => {
  MySwal.fire({
    position: "center",
    icon: "success",
    title: title,
    showConfirmButton: true,
    showCancelButton: false,
    confirmButtonText: "Okay",
  }).then((result) => {
    if (result.isConfirmed) {
      MySwal.close();
    }
  });
};
