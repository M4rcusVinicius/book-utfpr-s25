import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Link, Spinner } from "components";
import { Layout } from "components/users";
import { userService } from "services";

const Timer = () => {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(1799);

  const [users, setUsers] = useState(null);

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

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      if (counter <= 0) {
        console.log('Download file')
        downloadFile()
        setCounter(1799)
      }
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        let computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
        let computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;
        setSecond(computedSecond);
        setMinute(computedMinute);
        setCounter((counter) => counter - 1);
      }, 1000);
    } else {
      setCounter(1800);
      setSecond("00");
      setMinute("30");
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  const Box = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 0.5rem;
    background-color: #f7f7f7;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: auto;
  `;
  const TimerDisplay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    height: 100%;
    margin: auto 1rem;
  `;
  const TimerInfoDisplay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    height: 100%;
    margin: auto .5rem;
  `;

  return (
    <Layout>
      <h1>Backup</h1>
      <div className='d-flex align-items-center mb-3 mt-4'>
        <Box>
          <TimerInfoDisplay>
            <div>Auto-backup</div>
          </TimerInfoDisplay>
          <TimerDisplay>
            <div>{minute}</div>
            <div>:</div>
            <div>{second}</div>
          </TimerDisplay>
          <div>
            <button onClick={() => setIsActive(!isActive)} className='btn btn-success'>
              {isActive ? "Pause" : "Start"}
            </button>
          </div>
        </Box>

        <button type='button' className='btn btn-bg btn-outline-primary ml-3' onClick={downloadFile}>
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
};

export default Timer;
