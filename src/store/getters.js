const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  users: state => state.users.users,
  userTotal: state => state.users.userTotal,
  providers: state => state.config.providers,
  staffs: state => state.config.staffs,
  fees: state => state.config.fees,
  contracts: state => state.config.contracts,
  roles: state => state.permission.roles,
  permissions: state => state.permission.permissions,
  total: state => state.total
}
export default getters
