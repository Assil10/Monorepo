import { Decorator } from '@storybook/react';
import { 
  createMemoryHistory, 
  createRootRoute, 
  createRoute, 
  createRouter, 
  RouterProvider 
} from '@tanstack/react-router';

// Create a simple memory history
const createTestHistory = () => createMemoryHistory({ initialEntries: ['/'] });

// Create a root route
const rootRoute = createRootRoute();

// Create some basic routes
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: () => <div>Settings Page</div>,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Home Page</div>,
});

// Create a simple router for testing
const createTestRouter = () => {
  const routeTree = rootRoute.addChildren([indexRoute, settingsRoute]);
  
  return createRouter({ 
    routeTree,
    history: createTestHistory(),
  });
};

// Create the TanStack Router decorator
export const ReactRouterDecorator: Decorator = (Story) => {
  const router = createTestRouter();
  
  return (
    <RouterProvider router={router}>
      <Story />
    </RouterProvider>
  );
}; 