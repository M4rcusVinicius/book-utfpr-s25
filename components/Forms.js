import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Image from "next/image";
import { userService, alertService } from "services";
import { Preview } from "./Preview";

export { Forms };

const Textarea = styled.textarea`
  min-height: 5rem;
  resize: vertical;
`;

function Forms(props) {
  const [user, setUser] = useState(props?.user);
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    gender: Yup.string(),
    birth: Yup.string(),
    birthplace: Yup.string(),
    hobby: Yup.string(),
    links: Yup.string(),
    impact: Yup.string(),
    about: Yup.string(),
    why: Yup.string(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // set default form values
  formOptions.defaultValues = props.user;

  // get functions to build form with useForm() hook
  const { register, watch, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return updateUser(props.user.id, data);
  }

  function updateUser(id, data) {
    return userService
      .update(id, data)
      .then(() => {
        router.push("..");
      })
      .catch(alertService.error);
  }

  watch((data, { name, type }) => setUser(data));

  function getUpdateDate(date) {
    const nd = new Date(date);
    const time = nd.toLocaleTimeString("pt-br");
    const dmy = nd.toLocaleDateString("pt-br");
    return dmy + " " + time;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label>Noem</label>
          <input name='name' type='text' {...register("name")} className={`form-control ${errors.name ? "is-invalid" : ""}`} />
          <div className='invalid-feedback'>{errors.name?.message}</div>
        </div>
        <div className='form-group'>
          <label>Gênero</label>
          <input name='gender' type='text' {...register("gender")} className={`form-control ${errors.gender ? "is-invalid" : ""}`} />
          <div className='invalid-feedback'>{errors.gender?.message}</div>
        </div>
        <div className='form-group'>
          <label>Data de nascimento</label>
          <input name='birth' type='text' {...register("birth")} className={`form-control ${errors.birth ? "is-invalid" : ""}`} />
          <div className='invalid-feedback'>{errors.birth?.message}</div>
        </div>
        <div className='form-group'>
          <label>Local de Origem</label>
          <input name='birthplace' type='text' {...register("birthplace")} className={`form-control ${errors.birthplace ? "is-invalid" : ""}`} />
          <div className='invalid-feedback'>{errors.birthplace?.message}</div>
        </div>
        <div className='form-group'>
          <label>Hobbies</label>
          <input name='hobby' type='text' {...register("hobby")} className={`form-control ${errors.hobby ? "is-invalid" : ""}`} />
          <div className='invalid-feedback'>{errors.hobby?.message}</div>
        </div>
        <div className='form-group'>
          <label>Links</label>
          <Textarea name='links' type='text' {...register("links")} className={`form-control ${errors.links ? "is-invalid" : ""}`} />
          <div className='invalid-feedback'>{errors.links?.message}</div>
        </div>
        <div className='form-group'>
          <label>Uma frase impactante</label>
          <Textarea name='impact' type='text' {...register("impact")} className={`form-control ${errors.impact ? "is-invalid" : ""}`} />
          <div className='invalid-feedback'>{errors.impact?.message}</div>
        </div>
        <div className='form-group'>
          <label>Sobre você, sonhos, ambições</label>
          <Textarea name='about' type='text' {...register("about")} className={`form-control ${errors.about ? "is-invalid" : ""}`} />
          <div className='invalid-feedback'>{errors.about?.message}</div>
        </div>

        <div className='form-group'>
          <label>Porque você escolheu essa engenharia</label>
          <Textarea name='why' type='text' {...register("why")} className={`form-control ${errors.why ? "is-invalid" : ""}`} />
          <div className='invalid-feedback'>{errors.why?.message}</div>
        </div>
        <div className='form-group'>
          <button type='submit' disabled={formState.isSubmitting} className='btn btn-primary mr-2'>
            {formState.isSubmitting && <span className='spinner-border spinner-border-sm mr-1'></span>}
            Salvar
          </button>
          <button onClick={() => reset(formOptions.defaultValues)} type='button' disabled={formState.isSubmitting} className='btn btn-secondary'>
            Restaurar
          </button>
        </div>
        <div className='form-group'>
          <label>Última atualização registrada: {getUpdateDate(user.dateUpdated)}</label>
        </div>
        <div className="row g-0 bg-light position-relative mt-5 mb-5 ml-2 mr-2">
          <div className="col-md-6 mb-md-0 p-md-4">
            <Image src="/code.png" alt="Imágem do código" layout="fill" />
          </div>
          <div className="col-md-6 p-4 ps-md-0">
            <h5 className="mt-0">Código Open-Source</h5>
            <p>
              Todo o código fonte da página está disponível no Github, acesse a aba inssues para reportar erros, baixar o código, ou adcionar novas funcionalidades. 
            </p>
            <a href="https://github.com/M4rcusVinicius/book-utfpr-s21/" className="stretched-link">
              Acessar o código fonte
            </a>
          </div>
        </div>
      </form>

      <Preview user={user} />
    </>
  );
}
