const ROUTES = [
  {
    url: "/free",
    proxy: {
      target: "https://www.google.com",
      changeOrigin: true,
      pathRewrite: {
        [`^/free`]: "",
      },
    },
  },
  {
    url: "/premium",
    auth: true,
    // creditCheck: true,
    rateLimited: true,
    fileSizeAndNoLimited: true,
    proxy: {
      target: "https://www.google.com",
      changeOrigin: true,
      pathRewrite: {
        [`^/premium`]: "",
      },
    },
  },
  {
    url: "/signup",
    proxy: {
      target: "http://localhost:4000/users",
      changeOrigin: false,
    },
  },
  {
    url: "/signin",
    proxy: {
      target: "http://localhost:4000/users",
      changeOrigin: false,
    },
  },
  {
    url: "/user",
    auth: true,
    // creditCheck: true,
    secure: false,
    proxy: {
      target: "http://localhost:4000/users",
      changeOrigin: false,
      pathRewrite: {
        [`^/user`]: "",
      },
    },
  },
  {
    url: "/team",
    proxy: {
      target: "http://localhost:4000/teams/create",
      changeOrigin: false,
      pathRewrite: {
        [`^/team`]: "",
      },
    },
  },
  {
    url: "/fileUpload",
    auth: true,
    // creditCheck: true,
    rateLimited: true,
    fileSizeAndNoLimited: true,
    buffer: true,
    proxy: {
      target: "http://localhost:4000/uploadFiles",
      changeOrigin: true,
      pathRewrite: {
        [`^/fileUpload`]: "",
      },
      // onProxyReq: async function (proxyReq, req, res) {
      //   let user = { ...req.user };
      //   let files = { ...req.files };
      //   // let body = { ...req.body };
      //   if (req.body) delete req.body;
      //   let body = new Object();
      //   // console.log("FILES", files, body);
      //   body.files = files;
      //   body.user = user;
      //   // console.log("\nBODY\n", body);
      //   body = Object.keys(body)
      //     .map(function (key) {
      //       return (
      //         encodeURIComponent(key) + "=" + encodeURIComponent(body[key])
      //       );
      //     })
      //     .join("&");
      //   console.log("\nBODY AFTER STREAM\n", "\n", req.request_id, "\n", body);
      //   proxyReq.write(body);
      //   proxyReq.end();
      // },
    },
  },
];

exports.ROUTES = ROUTES;
