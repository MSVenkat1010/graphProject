import express from "express";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";
import path from "path";
import servicesLoader from './services/services';
import db from './database';
const utils = {
db,
};
const app = express();
const services = servicesLoader(utils);
//Helmet is a tool that allows you to set various HTTP headers to secure your application.
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "*.amazonaws.com"],
    },
  })
);
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
//Enabling compression for Express.js saves you and your user bandwidth
app.use(compress());
app.use(cors());

const serviceNames = Object.keys(services);

for (let i = 0; i < serviceNames.length; i += 1) {
  const name = serviceNames[i];
  if (name === "graphql") {
    (async () => {
      await services[name].start();
      services[name].applyMiddleware({ app });
    })();
  } else {
    app.use("/${name}", services[name]);
  }
}
app.listen(8000, () => console.log("Listening on port 8000!"));
