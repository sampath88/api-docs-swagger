const express = require("express");

const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileUpload = require("express-fileupload");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

const PORT = 4000;

let courses = [
  {
    id: "11",
    name: "Learn Reactjs",
    price: 299,
  },
  {
    id: "22",
    name: "Learn Angular",
    price: 399,
  },
  {
    id: "33",
    name: "Learn Django",
    price: 499,
  },
];

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello world</h1>");
});

app.get("/api/v1/lco", (req, res) => {
  res.status(200).send("<h1>Hello from lco docs</h1>");
});

app.get("/api/v1/lcoobject", (req, res) => {
  res.status(200).json({ id: "55", name: "Learn Backend", price: 999 });
});

app.get("/api/v1/courses", (req, res) => {
  res.status(200).json(courses);
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
  const myCourse = courses.find((course) => course.id === req.params.courseId);
  res.status(200).json(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
  console.log(req.body);
  courses.push(req.body);
  res.status(200).send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;
  res.send({ location, device });
});

app.post("/api/v1/courseupload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";
  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
