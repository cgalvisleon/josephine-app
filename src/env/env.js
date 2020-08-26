const environment = {
  title: "Dploy",
  company: "Dploy SAS",
  address: "Calle 3 # 12B - 41, San Gil, Colombia",
  mobile: "+57 (301) 621 9802",
  copyright: "© 2016-2020",
  storage: "dploy-user",
  production: process.env.NODE_ENV === "production",
  app: process.env.APP || "josephine",
  url: process.env.URL || "http://192.168.0.3:3000",
  mapbox: process.env.MAPBOX_KEY || "pk.eyJ1Ijoic2VydmljaW9zIiwiYSI6ImNpdzFjZmcyazA4YmIybm8ycXR0dWxiY3EifQ.78sqPHHt3mYQ8TymakHetA"
};

module.exports = environment;
