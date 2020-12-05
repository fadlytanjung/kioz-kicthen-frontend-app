import { isEmail, isPhone, isPassword } from '../../../utils/validation';

export default function validate(values) {
  const { email, fullname, phone, password } = values;

  return {
    email: !isEmail(email) ? 'Mohon cantumkan email yang benar' : '',
    phone: !isPhone(phone) ? 'Mohon cantumkan nomor ponsel yang aktif' : '',
    fullname: !fullname ? 'Mohon cantumkan nama lengkap Anda' : '',
    password: !isPassword(password) ? 'Minimal 6 karakter terdiri dari gabungan huruf dan angka' : '',
  };
}
