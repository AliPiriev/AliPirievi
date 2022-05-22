import {
   ApolloClient,
   InMemoryCache,
   gql
} from "@apollo/client";

const defaultOptions = {
   watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
   },
   query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
   },
}

const client = new ApolloClient({
   uri: 'http://localhost:4000/',
   cache: new InMemoryCache(),
   defaultOptions: defaultOptions,
});


const getCategoriesQuery = () => {
   return client.query({
      query: gql`
      query {
          categories {
              name
          }
      }
     `}).then(result => {
         return result.data.categories
      }).catch(e => {
         console.log(e)
      });
}

const getProductQuery = (id) => {
   const query = gql`
      query ($id: String!) {
            product(id: $id){
               id
               name
               inStock
               gallery
               description
               category
               attributes{
                  id
                  name
                  type
                  items{
                        displayValue
                        value
                        id
                  }
               }
               prices{
                  currency{
                        label
                        symbol
                  }
                  amount
               }
               brand
            }
      }
   `;
   return client.query({
      query: query,
      variables: {
         id
      }
   }).then(result => {
      return result
   }).catch(e => {
      console.log(e)
   });
}

const getProductsQuery = (id) => {
   const query = gql`
      query ($name: CategoryInput) {
          category(input: $name){
              name
              products {
                  id
                  name
                  inStock
                  gallery
                  description
                  category
                  attributes{
                     id
                     name
                     type
                     items{
                        displayValue
                        value
                        id
                     }
                  }
                  prices{
                     currency{
                        label
                        symbol
                     }
                     amount
                  }
                  brand
              }
          }
      }
  `;
   return client.query({
      query: query,
      variables: {
         name: { title: id }
      }
   }).then(result => {
      return result;
   }).catch(e => {
      console.log(e)
   });
}

export { getCategoriesQuery, getProductQuery, getProductsQuery };



