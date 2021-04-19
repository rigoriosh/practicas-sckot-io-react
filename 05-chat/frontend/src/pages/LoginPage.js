import React, { useContext, useEffect, useState } from "react";
//import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {

  const [form, setForm] = useState({email: 'thiago@gmail.com', password: '123456', rememberme: false});
  
  const {login} = useContext(AuthContext);

  useEffect(() => {
    const emailLS = localStorage.getItem('email');
    if (emailLS) setForm((form) => ({
      ...form, email: emailLS
    }));
    return () => {console.log('limpiar')}
  }, [])

  const todoOK = () => {
    return (form.email.trim() !== '' && form.password.trim() !== '') ? false : true;
  }

  const submitForm = async(e) => {
    e.preventDefault();
    console.log(form)
    form.rememberme ? localStorage.setItem('email', form.email) : localStorage.removeItem('email');

    //TODO: llamar backend
    if(!(await login(form.email, form.password))){
      Swal.fire('Error','inconvenientes con su información', 'error')
    }

  }
  return (
    <section>
      <form onSubmit={submitForm} className="login100-form validate-form flex-sb flex-w">
        <span className="login100-form-title mb-3">Chat - Ingreso</span>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e)=>setForm({...form, email:e.target.value})}
            value={form.email}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e)=>{setForm({...form, password: e.target.value})}}
            value={form.password}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="row mb-3">
          <div className="col" onClick={()=>setForm({...form, rememberme: !form.rememberme})}>
            <input
              className="input-checkbox100"
              id="ckb1"
              type="checkbox"
              name="rememberme"              
              readOnly
              checked={form.rememberme}
            />
            <label className="label-checkbox100">Recordarme</label>
          </div>

          <div className="col text-right">
            <Link to="/auth/register" className="txt1">
              Nueva cuenta?
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button disabled={todoOK()} className="login100-form-btn">Ingresar</button>
        </div>
      </form>
    </section>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
