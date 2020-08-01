import { http } from "../components/http";
import { isOnLine, ShowOffLine } from "../components/utilities";

export const Api = {
  signIn: async function(username, password) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      const params = {
        username: username,
        password: password,
        app: "keepweb"
      };
      return await http("POST", `signin`, params)
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  validUser: async function(username) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      return await http("GET", `valid/${username}`)
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  signup: async function(username, password, confirmation, caption, project, module_id, city_id, code) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      const params = {
        username: username,
        password: password,
        confirmation: confirmation,
        caption: caption,
        project: project,
        module_id: module_id,
        city_id: city_id,
        code: code,
        app: "keepweb"
      };
      return await http("POST", `signup`, params)
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  forgot: async function(username, password, confirmation, code) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      const params = {
        username: username,
        password: password,
        confirmation: confirmation,
        code: code,
        app: "keepweb"
      };
      return await http("POST", `forgot`, params)
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  issues: async function(username, access, use) {
    if (!isOnLine) {
      return ShowOffLine();
    } else {
      const params = {
        username: username,
        access: access,
        use: use
      };
      return await http("POST", `issues`, params)
        .then(result => {
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
