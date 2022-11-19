import type { IronSessionOptions } from "iron-session";
import { GetServerSideProps } from "next";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE as string,
  cookieName: "meetandhack",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}

type User = {
  id: number;
};

export const protectedHandler: GetServerSideProps = async (context) => {
  const user = context.req.session.user;
  console.log(user);
  if (!user) {
    // If not logged in, redirect to login page
    context.res.setHeader("location", "/login");
    context.res.statusCode = 302;
    context.res.end();
    return {
      props: {},
    };
  }
  return {
    props: {},
  };
};

export const loginHandler: GetServerSideProps = async (context) => {
  const user = context.req.session.user;
  console.log(user);
  if (user) {
    // If logged in, redirect to home page
    context.res.setHeader("location", "/");
    context.res.statusCode = 302;
    context.res.end();
    return {
      props: {},
    };
  }
  return {
    props: {},
  };
};

