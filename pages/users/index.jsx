import { useState, useEffect } from "react";
import styled from 'styled-components'

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";

export default Index;

function Index() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    userService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
    });
  }
  const downloadFile = async () => {
    const myData = users;
    const fileName = "bookFormsDB";
    const json = JSON.stringify(myData);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <h1>Estudantes</h1>
      <div className="d-flex align-items-center mb-3 mt-4">
        <Link href='/users/add' className='btn btn-sm btn-success'>
          Adcionar estudante
        </Link>

        <button type='button' className='btn btn-sm btn-outline-primary ml-3' onClick={downloadFile}>
          Baixar banco de dados
        </button>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>RA</th>
            <th style={{ width: "55%" }}>Nome</th>
            <th style={{ width: "15%" }}></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.ra}</td>
                <td>{user.name}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link href={`/users/edit/${user.id}`} className='btn btn-sm btn-primary mr-1'>
                    Editar
                  </Link>
                  <button onClick={() => deleteUser(user.id)} className='btn btn-sm btn-danger btn-delete-user' disabled={user.isDeleting}>
                    {user.isDeleting ? <span className='spinner-border spinner-border-sm'></span> : <span>Apagar</span>}
                  </button>
                </td>
              </tr>
            ))}
          {!users && (
            <tr>
              <td colSpan='4'>
                <Spinner />
              </td>
            </tr>
          )}
          {users && !users.length && (
            <tr>
              <td colSpan='4' className='text-center'>
                <div className='p-2'>Nenhum estudante registrado</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
