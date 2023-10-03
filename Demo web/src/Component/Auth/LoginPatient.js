import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin, postLoginPatient } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/useAction';
import { IMSpinner10 } from "react-icons/im"
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const navige = useNavigate()
    const dispatch = useDispatch();
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Missing username or password');
            return;
        }
        try {
            let response = await postLoginPatient(email, password);
            const userData = response.userData
            if (userData.errCode === 0) {
                dispatch(doLogin(userData))
                toast.success('Login successful');
                navige('/patients')
            }
            else {
                toast.error(userData.errMessage);
            }
        } catch (error) {
            toast.error('Login failed');
        }
        // console.log(">>check respond", data)
    }
    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't you have account yet ?</span>
                <button
                    onClick={() => { navige('/register') }}
                >Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Booking care
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello,who is this
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>username</label>
                    <input
                        type={'username'}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                </div>
                <span className='forgot-password'>Forgot password</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}
                    >Login to booking care</button>
                </div>
                <div className='text-center'>
                    <span className='back'
                        onClick={() => { navige('/') }}
                    >	&#60;&#60;Go to home page</span>
                </div>
            </div>
        </div>
    )
}
export default Login