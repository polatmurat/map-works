export const ShowError = (errors, name) => {
    if (Array.isArray(errors)) {
      const exist = errors.find((err) => err.path === name);
      if (exist) {
        return exist.msg;
      }
    }
    return false;
  };