import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [jwtToken, setJwtToken] = useState<string>("");
  const [ticking, setTicking] = useState<boolean>(false);
  const tickIntervalRef = useRef<number | undefined>(undefined);

  const toggleRefresh = useCallback((status: boolean) => {
    console.log("clicked");
    setTicking(status);

    if (ticking) {
      console.log("turning on ticking");
      const i = window.setInterval(() => {
        const requestOptions = {
          method: "GET",
          credentials: "include" as RequestCredentials
        };
        fetch("http://localhost:8080/refresh", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            console.log(data.access_token);
            if (data.access_token) {
              setJwtToken(data.access_token);
            }
          })
          .catch((error) => {
            console.log("user is not logged in", error);
          });
      }, 600000);

      tickIntervalRef.current = i;
      console.log("setting tick interval to", i);
    } else {
      console.log("turning off ticking");
      console.log("turning off interval", tickIntervalRef.current);
      if (tickIntervalRef.current !== undefined) {
        clearInterval(tickIntervalRef.current);
        tickIntervalRef.current = undefined;
      }
    }
  }, []);

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include" as RequestCredentials
      };
      fetch("http://localhost:8080/refresh", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(data.access_token);
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch((error) => {
          console.log("user is not logged in", error);
        });
    }
  }, [jwtToken, toggleRefresh]);

  return (
    <AuthContext.Provider value={{ jwtToken, setJwtToken, toggleRefresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
