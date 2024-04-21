
Description: 
This app features a user authentication system using Next'14 and Next-Auth library. It covers almost all the features described in this [assignment](https://lakshmikanthb.notion.site/Assignment-Building-a-User-Management-Application-with-Next-js-and-NextAuth-js-e6926fe1f669436fa5b4be17b65907f2).


Features:
- Next Authentication
- Manual and Auth Provider signin/signup
- Roles: User, Admin
- Protected Routes
- Delete User(s)
- Forgot Password
- Email Verification


### Install packages

```shell
yarn
```

### Setup .env file


```shell
cp .env.sample .env.local

```

### Setup Prisma
```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
yarn dev
```

### Live Link
[auth-sys.vercel.app](https://auth-sys.vercel.app)