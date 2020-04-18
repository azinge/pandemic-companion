import { gql } from 'apollo-boost';

export const GET_GENERAL_INFO = gql`
  query GET_GENERAL_INFO {
    gameState @client {
      boardState {
        resourceStockpiles {
          id
          resource {
            name
            stockCount
          }
          count
        }
        tags {
          id
          name
          description
        }
      }
    }
  }
`;

export const CREATE_RESOURCE_STOCKPILE = gql`
  mutation CREATE_RESOURCE_STOCKPILE {
    createResourceStockpile @client
  }
`;

export const UPDATE_RESOURCE_STOCKPILE = gql`
  mutation UPDATE_RESOURCE_STOCKPILE(
    $id: ID
    $data: ResourcePile
    $resourceData: Resource
  ) {
    updateResourceStockpile(id: $id, data: $data, resourceData: $resourceData)
      @client
  }
`;

export const DELETE_RESOURCE_STOCKPILE = gql`
  mutation DELETE_RESOURCE_STOCKPILE($id: ID) {
    deleteResourceStockpile(id: $id) @client
  }
`;

export const CREATE_GLOBAL_TAG = gql`
  mutation CREATE_GLOBAL_TAG {
    createGlobalTag @client
  }
`;

export const UPDATE_GLOBAL_TAG = gql`
  mutation UPDATE_GLOBAL_TAG($id: ID, $data: Tag) {
    updateGlobalTag(id: $id, data: $data) @client
  }
`;

export const DELETE_GLOBAL_TAG = gql`
  mutation DELETE_GLOBAL_TAG($id: ID) {
    deleteGlobalTag(id: $id) @client
  }
`;
