import { gql } from 'apollo-boost';

export const resolvers = {
  Mutation: {
    toggleTodo: (_root: any, variables: any, { cache, getCacheKey }: any) => {
      const id = getCacheKey({ __typename: 'TodoItem', id: variables.id });
      const fragment = gql`
        fragment completeTodo on TodoItem {
          completed
        }
      `;
      const todo = cache.readFragment({ fragment, id });
      const data = { ...todo, completed: !todo.completed };
      cache.writeData({ id, data });
      return null;
    },
  },
};
