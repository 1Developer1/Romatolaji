import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  message: string;
  timeout?: number;
  exception?: Error;
};

const Successful = ({ message, timeout }: Props) => {
  let t = 5000;

  if (timeout) t = timeout;

  toast.success(message, {
    position: "top-right",
    autoClose: t,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const Warningful = ({ message, timeout }: Props) => {
  let t = 5000;

  if (timeout) t = timeout;

  toast.warning(message, {
    position: "top-right",
    autoClose: t,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const Errorful = ({ message, timeout, exception }: Props) => {
  let t = 5000;

  if (timeout) t = timeout;

  let ex;

  if (exception) ex = exception;
  else {
    let msg = "Error: " + message;
    ex = new Error(msg);
  }

  toast.error(message, {
    position: "top-right",
    autoClose: t,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export { Successful, Warningful, Errorful };
