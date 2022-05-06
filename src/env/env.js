const environment = {
  title: "Title",
  company: "Company Name",
  address: "Address Street, City, Country",
  mobile: "+1 (111) 111 1111",
  copyright: "© 2016-2020",
  storage: "storage",
  production: process.env.NODE_ENV === "production",
  app: process.env.APP || "josephine",
  url: process.env.URL || "http://127.0.0.1:3000",
  mapbox: process.env.MAPBOX_KEY || ""
};

module.exports = environment;
