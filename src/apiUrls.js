import axiosPrivate from "./interceptor";

const login = (data) => {
  return axiosPrivate.post('login/',data);
};

const register = (data) => {
  return axiosPrivate.post('register/',data);
};

const account_creation = (data) => {
  return axiosPrivate.post('createAccount/',data);
};

const account_view = () => {
  return axiosPrivate.post('displayAccount/');
};

const transactions_view = () => {
  return axiosPrivate.get('createTransaction/');
};

const perform_transactions = (data) => {
  return axiosPrivate.post('createTransaction/',data);
};

const download_transactions= () => {
  return axiosPrivate.post('downloadTransaction/');
};

const download_transactions_employee= (accno) => {
  return axiosPrivate.post(`downloadTransaction/${accno}/`);
};

const close_account = (data) => {
  return axiosPrivate.post('closeAccount/',data);
};

const view_customer_account = () => {
  return axiosPrivate.get('managerViewCustomers/');
};

const view_customer_transaction = (accno) => {
  return axiosPrivate.post(`viewCustomerTransaction/${accno}/`);
};

const view_users = (type) => {
  return axiosPrivate.get(`viewUsers/${type}/`);
};

const edit_users_details = (email,data) => {
  return axiosPrivate.patch(`updateUsers/${email}/`,data);
};

const staff_view_users = () => {
  return axiosPrivate.get('staffViewCustomers/');
};

const pending_account_view = () => {
  return axiosPrivate.post('displayPendingAccount/');
};

const account_approval = (accno,status) => {
  return axiosPrivate.post(`approve/${accno}/${status}/`);
};

const getDash = () => {
  return axiosPrivate.post('dashboard/');
};

const commonService = {
  login,
  download_transactions_employee,
  getDash,
};

const customerService = {
  register,
  account_creation,
  account_view,
  transactions_view,
  perform_transactions,
  close_account,
  download_transactions,
};

const managerService = {
  view_customer_account,
  view_customer_transaction,
  view_users,
  edit_users_details,
};

const staffService = {
  staff_view_users,
  account_approval,
  pending_account_view,
};


export { customerService, managerService, commonService, staffService};