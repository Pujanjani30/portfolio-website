import Swal from 'sweetalert2';

const confirmAlert = async (message = 'Are you sure?') => {
  return await Swal.fire({
    title: 'Confirm',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  });
};

const successAlert = (message = 'Action was successful!') => {
  Swal.fire({
    title: 'Success',
    text: message,
    icon: 'success',
    timer: 2000,
  });
};

const errorAlert = (message = 'An error occurred!') => {
  Swal.fire({
    title: 'Error',
    text: message,
    icon: 'error',
    timer: 2000,
  });
};

export { confirmAlert, successAlert, errorAlert };
