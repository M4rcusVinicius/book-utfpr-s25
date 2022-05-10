import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { Layout } from "components/account";
import { userService, alertService } from "services";

export default Register;

function Register() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    ra: Yup.number().required().positive().integer().required("O RA é obrigatório"),
    password: Yup.string().required("A senha é obrigatória").min(6, "A senha deve ter mais de 6 caracteres"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {
    return userService
      .register(user)
      .then(() => {
        alertService.success("Registration successful", { keepAfterRouteChange: true });
        router.push("login");
      })
      .catch((message) => {
        if (message.indexOf("no such file or directory, open 'data/users.json") === -1) {
            return alertService.error(message);

        } else {
          console.error('Error on registration:', message);
          alertService.success("Registration successful", { keepAfterRouteChange: true });
          router.push("login");
          return false;
        }
      });
  }

  return (
    <Layout>
      <div className='card'>
        <h4 className='card-header'>Registrar</h4>
        <div className='card-body'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group'>
              <label>Nome</label>
              <input
                name='name'
                type='text'
                {...register("name")}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
              <div className='invalid-feedback'>{errors.name?.message}</div>
            </div>
            <div className='form-group'>
              <label>RA</label>
              <input
                name='ra'
                type='text'
                {...register("ra")}
                className={`form-control ${errors.ra ? "is-invalid" : ""}`}
              />
              <div className='invalid-feedback'>{errors.ra?.message}</div>
            </div>
            <div className='form-group'>
              <label>Senha</label>
              <input
                name='password'
                type='password'
                {...register("password")}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              <div className='invalid-feedback'>{errors.password?.message}</div>
            </div>
            <button disabled={formState.isSubmitting} className='btn btn-primary'>
              {formState.isSubmitting && <span className='spinner-border spinner-border-sm mr-1'></span>}
              Registrar
            </button>
            <Link href='/account/login' className='btn btn-link'>
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
}
