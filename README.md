<img src="https://res.cloudinary.com/dbjrx698c/image/upload/v1704611347/logo_w4vxp0.png" width="100" height="100" style="display: block; margin: 0 auto;">

# Next Fetcher
`next-fetcher` is a powerful, TypeScript-friendly utility for seamless data fetching in Next.js app router. It leverages Axios for HTTP requests, supports customizable request configurations, and provides robust error handling with optional `.throwOnError()` chaining. Simplify your client and server-side data fetching workflows with `next-fetcher.`

** This utility only for nextjs app router. Page router do not support this package.


<a href="https://www.buymeacoffee.com/siamahnaf" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

- Small in Size
- All functionality
- Zero config
- Properly Maintained

# Installation

```bash
$ npm i next-fetcher
```

## Server Components

```bash
import { createServerFetcher } from "next-fetcher";

const Page = async () => {
    const fetcher = createServerFetcher({ next: true, sessionName: "token" });
    //It can be called outside of component. 
    //On that case you can import fetcher for use it in your component.

    const data = await fetcher.get("/api");

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
};

export default Page;
```

## API (Server Components)
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Default </th>
    <th> Description </th>
  </tr>
  <tr>
    <td> next </td>
    <td> Boolean (Required) </td>
    <td> </td>
    <td> Give `true` if you are using nextjs api. If you are using non-nextjs api then give this value as `false`. </td>
  </tr>
   <tr>
    <td> baseURL </td>
    <td> string (Required if `next` is `false`) </td>
    <td> </td>
    <td> Give the base url if you are not using nextjs api. </td>
  </tr>
   <tr>
    <td> sessionName </td>
    <td> string (Required if you do not provide `cookie`) </td>
    <td> </td>
    <td> The cookie name which one need to be sent for authorization </td>
  </tr>
   <tr>
    <td> cookie </td>
    <td> string (Required if you do not provide `sessionName`) </td>
    <td>  </td>
    <td> If you want to you can directly provide the cookie value </td>
  </tr>
   <tr>
    <td> sessionOptions </td>
    <td> Options (Optional) </td>
    <td>  </td>
    <td> Cookie options </td>
  </tr>
</table>

## Client Components

```bash
import { createClientFetcher, Fetcher } from "next-fetcher";
import { useQuery } from "@tanstack/react-query";

const GET_BOOKS = async(fetcher: Fetcher)=> {
  return fetcher.get("/api")
}

const Page = () => {
  const fetcher = createClientFetcher({ next: true, sessionName: "token" });
  //It can be called outside of component. 
  //On that case you can import fetcher for use it in your component.

  //Using tanstack/react-query
  const { data } = useQuery({ queryKey: ["books"], queryFn: () => GET_BOOKS(fetcher) })

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
};

export default Page;
```

## API (Client Components)
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Types </th>
    <th> Default </th>
    <th> Description </th>
  </tr>
  <tr>
    <td> next </td>
    <td> Boolean (Required) </td>
    <td> </td>
    <td> Give `true` if you are using nextjs api. If you are using non-nextjs api then give this value as `false`. </td>
  </tr>
   <tr>
    <td> baseURL </td>
    <td> string (Required if `next` is `false`) </td>
    <td> </td>
    <td> Give the base url if you are not using nextjs api. </td>
  </tr>
   <tr>
    <td> sessionName </td>
    <td> string (Required if you do not provide `cookie`) </td>
    <td> </td>
    <td> The cookie name which one need to be sent for authorization </td>
  </tr>
   <tr>
    <td> cookie </td>
    <td> string (Required if you do not provide `sessionName`) </td>
    <td>  </td>
    <td> If you want to you can directly provide the cookie value </td>
  </tr>
   <tr>
    <td> sessionOptions </td>
    <td> Options (Optional) </td>
    <td>  </td>
    <td> Cookie options </td>
  </tr>
</table>


# Error Handling
`next-fetcher` do not throwing any error during data fetching. But if you want to throw error you can use `throwOnError()` chaining method.

-Example-

```bash
fetcher.get("/api").throwOnError();
fetcher.post("/api").throwOnError();
fetcher.put("/api").throwOnError();
fetcher.delete("/api").throwOnError();
```

# Typescript Usage
`next-fetcher` is typescript friendly. You can declare your response type like-

```bash
fetcher.get<data:any>("/api").throwOnError();
fetcher.post<{message:string}>("/api").throwOnError();
fetcher.put<{message:string}>("/api").throwOnError();
fetcher.delete<{message:string}>("/api").throwOnError();
```

# Cookie Management(Session)
`next-fetcher` support cookie management system. You can add cookie or delete cookie using `next-fetcher` utility function.

```bash
import { addSession, deleteSession } from "next-fetcher";

//Add session (Adding cookie)
addSession('key', 'value', options);

//Delete Session (Removing cookie)
deleteSession('key', options);
```

NOTE! When deleting a cookie and you're not relying on the default attributes, you must pass the exact same path and domain attributes that were used to set the cookie:

```bash
deleteSession('key', { path: '/path', domain: '.yourdomain.com' });
```

## API (Cookie Management)
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Description </th>
  </tr>
  <tr>
    <td> key </td>
    <td> Cookie's name </td>
  </tr>
   <tr>
    <td> value </td>
    <td> Cookie's value </td>
  </tr>
  <tr>
    <td> options </td>
    <td> Cookie's options like- `req`, `res`, `cookies`, `domain`, `encode`, `expires`, `httpOnly`,  `maxAge`,  and `path` </td>
  </tr>
</table>

# Stay in touch

- Author - [Siam Ahnaf](https://www.siamahnaf.com/)
- Website - [https://www.siamahnaf.com/](https://www.siamahnaf.com/)
- Twitter - [https://twitter.com/siamahnaf198](https://twitter.com/siamahnaf198)
- Github - [https://github.com/siamahnaf](https://github.com/siamahnaf)
