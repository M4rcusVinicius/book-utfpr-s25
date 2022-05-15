import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import styled from "styled-components";

import { Github } from "@styled-icons/boxicons-logos/Github";
import { LinkedinSquare } from "@styled-icons/boxicons-logos/LinkedinSquare";

import { NavLink } from ".";
import { userService } from "services";

export { Nav };

const Navbar = styled.div`
  margin-right: ${props => props.mg && '71vh'};
`;

const Links = styled.div`
  margin-left: auto;
`;
const Link = styled.a`
  height: 28px;
  width: 28px;
  color: white;
  margin-left: 10px;
  display: inline-block;
  transition: 200ms;
  &:hover {
    color: #82beff;
  }
`;

function Nav() {
  const [user, setUser] = useState(null);
  const router = useRouter()

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  if (!user) return null;

  

  return (
    <Navbar mg={router.pathname === '/'}>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <div className='navbar-nav'>
          <NavLink href='/' exact className='nav-item nav-link'>
            Dashboard
          </NavLink>
          <a onClick={logout} className='nav-item nav-link'>
            Logout
          </a>
        </div>
        <Links>
          <Link href='https://www.linkedin.com/in/m4rcusvinicius/'>
            <LinkedinSquare />
          </Link>
          <Link href='https://github.com/M4rcusVinicius/'>
            <Github />
          </Link>
        </Links>
      </nav>
    </Navbar>
  );
}
