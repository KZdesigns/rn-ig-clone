import React, { useEffect, useState } from "react";
import { SignInStack, SignedOutStack } from "./screens/navigation";
import { auth } from "./firebase";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) => {
    user ? setCurrentUser(user) : setCurrentUser(null);
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => userHandler(user));
  }, []);
  return <>{currentUser ? <SignInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
