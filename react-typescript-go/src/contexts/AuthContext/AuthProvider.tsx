import { ReactNode, useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const token = localStorage.getItem("jwt_token");

  const [jwtToken, setJwtToken] = useState<string>(token ? token : "");
  const [ticking, setTicking] = useState<boolean>(false);
  const [tickIntervalId, setTickIntervalId] = useState<number | null>(null);

  const toggleRefresh = useCallback(
    (status: boolean) => {
      console.log("clicked");
      setTicking(status);

      if (ticking) {
        console.log("turning on ticking");
        const intervalId = window.setInterval(() => {
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
                localStorage.setItem("jwt_token", data.access_token);
                setJwtToken(data.access_token);
              }
            })
            .catch((error) => {
              console.log("user is not logged in", error);
            });
        }, 600000);

        setTickIntervalId(intervalId);
        console.log("setting tick interval to", intervalId);
      } else {
        console.log("turning off ticking");
        if (tickIntervalId !== null) {
          console.log("clearing interval", tickIntervalId);
          clearInterval(tickIntervalId);
          setTickIntervalId(null);
        }
      }
    },
    [tickIntervalId]
  );

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include" as RequestCredentials
      };
      fetch("http://localhost:8080/refresh", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.access_token);
          if (data.access_token) {
            localStorage.setItem("jwt_token", data.access_token);

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
