import { useParams } from "react-router-dom"

export const Products = () => {
  const { id } = useParams(); // read from the url /products/:id

  return (
    <div>Products {id}</div>
  )
}
