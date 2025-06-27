import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  route('login', 'routes/login.tsx'),
  route('register', 'routes/register.tsx'),
  route('/', 'routes/guard.tsx', [route('', 'routes/tasks/list.tsx')]),
  route('*', 'routes/notfound.tsx'),
] satisfies RouteConfig
