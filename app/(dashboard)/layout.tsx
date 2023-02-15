"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { publicRoutes } from "../constants/routes";
import styled from "styled-components";
import { Navigation } from "../modules/navigation";

const SWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  background: ${({ theme }) => theme.color.spaceCadet};
  color: ${({ theme }) => theme.color.white};
`;

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const { replace } = useRouter();
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setAuthenticated(true);
      if (publicRoutes.includes(window.location.href)) {
        replace("/");
      }
    } else {
      replace("/signin");
    }
  }, []);

  if (authenticated) {
    return (
      <SWrapper>
        <Navigation />
        {children}
      </SWrapper>
    );
  }
};

export default DashboardLayout;
