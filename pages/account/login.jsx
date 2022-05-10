import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Login;

function Login() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        ra: Yup.number().required().positive().integer()
            .required('O RA é obrigatório'),
        password: Yup.string().required('A senha é obrigatória')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ ra, password }) {
        return userService.login(ra, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>RA</label>
                            <input name="ra" type="text" {...register('ra')} className={`form-control ${errors.ra ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.ra?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Entrar
                        </button>
                        <Link href="/account/register" className="btn btn-link">Registrar</Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
