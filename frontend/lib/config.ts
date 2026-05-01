export const Methods = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const JsonHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const FormDataHeader = {
  "Content-Type": "multipart/form-data",
};

export class EndPoint {
  // Default Main Backend URL
  static DEFAULT_URL = process.env.NEXT_PUBLIC_API_URL || "";

  // User Section
  static CREATE_NEW_USER = "api/users";
  static GET_ALL_USER = "api/users";
  static LOGIN_USER = "api/users/login";
  static GET_SINGLE_USER = "api/users";
  static UPDATE_SINGLE_USER = "api/users";
  static DELETE_SINGLE_USER = "api/users";

  // Product Section
  static CREATE_NEW_PRODUCT = "api/product";
  static GET_ALL_PRODUCT = "api/product";
  static GET_SINGLE_PRODUCT = "api/product";
  static UPDATE_PRODUCT = "api/product";
  static DELETE_PRODUCT = "api/product";
}
