import React, { useContext, useState } from "react";
//import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const [form, setForm] = useState({ email: "", password: "", nombre: "" });
  const { register } = useContext(AuthContext);

  const todoOK = () => {
    return form.email.trim() !== "" && form.password.trim() !== "" &&
      form.nombre.trim() !== "" ? false : true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    //console.log(form)
    //form.rememberme ? localStorage.setItem('email', form.email) : localStorage.removeItem('email');

    //TODO: llamar backend
    const resp = await register(form.nombre, form.email, form.password);
    if (!resp.ok) {
      Swal.fire("Error", resp.errors.password?.msg || resp.errors.email.msg, "error");
    }
  };
  return (
    <section>
      <form
        onSubmit={submitForm}
        className="login100-form validate-form flex-sb flex-w"
      >
        <span className="login100-form-title mb-3">Chat - Registro</span>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="row mb-3">
          <div className="col text-right">
            <Link to="/auth/login" className="txt1">
              Ya tienes cuenta?
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button disabled={todoOK()} className="login100-form-btn">
            Crear cuenta
          </button>
        </div>
      </form>
    </section>
  );
};

RegisterPage.propTypes = {};

export default RegisterPage;
