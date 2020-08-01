import { http } from "../components/http";
import { isOnLine, ShowAlert, getValue } from "../components/utilities";
import { MSG001 } from "../components/msg";

export const Api = {
  prints: async function(project_id, _class, single) {
    if (!isOnLine) {
      ShowAlert(MSG001);
    } else {
      return await http("GET", `prints/${project_id}?_class=${_class}&single=${single}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  attachments: async function(project_id, id, object_id, group_tp, _class, main_id, caption, description, user_id, filepath) {
    if (!isOnLine) {
      ShowAlert(MSG001);
    } else {
      return await http("POST", `attachments/${project_id}`, {
        id,
        object_id,
        group_tp,
        _class,
        main_id,
        caption,
        description,
        user_id,
        filepath
      })
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  attachmentsBase64: async function(
    project_id,
    id,
    object_id,
    group_tp,
    _class,
    main_id,
    caption,
    description,
    name,
    ext,
    size,
    user_id,
    base64
  ) {
    if (!isOnLine) {
      ShowAlert(MSG001);
    } else {
      return await http("POST", `attachments/base64/${project_id}`, {
        id,
        object_id,
        group_tp,
        _class,
        main_id,
        caption,
        description,
        name,
        ext,
        size,
        user_id,
        base64
      })
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  attachmentsDel: async function(object_id, main_id) {
    if (!isOnLine) {
      ShowAlert(MSG001);
    } else {
      return await http("DELETE", `attachments/${object_id}`, { main_id })
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  files: async function(id, _class, state, search, page, rows) {
    if (!isOnLine) {
      ShowAlert(MSG001);
    } else {
      return await http("GET", `attachments/${id}?_class=${_class}&state=${state}&search=${search}&page=${page}&rows${rows}`)
        .then(result => {
          const msg = getValue(result, "msg", "");
          if (msg !== "") {
            ShowAlert(result.message);
          }
          return result;
        })
        .catch(err => {
          throw err;
        });
    }
  },
  secret: async function(id, group) {
    if (!isOnLine) {
      ShowAlert(MSG001);
    } else {
      return await http("GET", `users/secret/${id}?group=${group}`)
        .then(result => {
          return getValue(result.data, "token", "-1");
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
