// import { EmployeeIdData } from '@/app/types/definitions';
// import axios, { AxiosError } from 'axios';
// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import { CheckInSuccessToast } from '@/app/new/SuccessCard/CheckInSuccessToast';
// const useHandleSubmit = (data: EmployeeIdData) => {
//   const [loading, setLoading] = useState(false);

//   try {
//     setLoading(true);
//     const response = await axios.post('/api/attendances/', data);

//     if (response.status === 201) {
//       if (response.data.attendance.first_name) {
//         setLoading(false);
//         // reset();
//         toast.success(
//           <CheckInSuccessToast attendance={response.data.attendance} />
//         );
//       }
//     }
//   } catch (error: unknown) {
//     setLoading(false);

//     if (error instanceof AxiosError) {
//       if (error.response?.status === 409) {
//         try {
//           const patchResponse = await axios.patch(
//             `/api/attendances/${data.employee_id}`,
//             data
//           );
//           toast.success(
//             <CheckOutSuccessToast attendance={patchResponse.data.attendance} />
//           );
//         } catch (error: unknown) {
//           if (error instanceof AxiosError) {
//             if (error.response?.status === 400) {
//               toast.error(error.response.data.message);
//             }
//           }
//         }
//       }
//       if (error.response?.status === 400) {
//         toast.error(error.response.data.message);
//         console.log(error.response.data.message);
//       }
//     }
//   }
// };
