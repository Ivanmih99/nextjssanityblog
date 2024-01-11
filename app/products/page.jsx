'use client'
import '@/styles/global.css'
import Header from '../../components/Header'
import ThemeProviders from '../(user)/ThemeProviders'
import { useState, useEffect } from 'react'

export default function Page() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: 0,
    image: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://659e8d2b47ae28b0bd36245e.mockapi.io/api/products'
      )
      const data = await response.json()
      setData(data)
      filterAndSortData(data, searchTerm, sortOrder)
    }

    fetchData()
  }, [searchTerm, sortOrder])

  const filterAndSortData = (data, term, order) => {
    let filtered = data.filter(item =>
      item.title.toLowerCase().includes(term.toLowerCase())
    )

    if (order === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (order === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price)
    }

    setFilteredData(filtered)
  }

  const handleCreate = async () => {
    const response = await fetch(
      'https://659e8d2b47ae28b0bd36245e.mockapi.io/api/products',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      }
    )
    const createdProduct = await response.json()
    setData([...data, createdProduct])
    setNewProduct({ title: '', price: 0, image: '' })
    filterAndSortData([...data, createdProduct], searchTerm, sortOrder)
  }

  const handleEdit = id => {
    setEditingId(id)
    const productToEdit = data.find(item => item.id === id)
    setNewProduct({ ...productToEdit })
  }

  const handleUpdate = async () => {
    const response = await fetch(
      `https://659e8d2b47ae28b0bd36245e.mockapi.io/api/products/${editingId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      }
    )
    const updatedProduct = await response.json()
    const updatedData = data.map(item =>
      item.id === updatedProduct.id ? updatedProduct : item
    )
    setData(updatedData)
    setEditingId(null)
    setNewProduct({ title: '', price: 0, image: '' })
    filterAndSortData(updatedData, searchTerm, sortOrder)
  }

  const handleDelete = async id => {
    await fetch(
      `https://659e8d2b47ae28b0bd36245e.mockapi.io/api/products/${id}`,
      {
        method: 'DELETE',
      }
    )
    const updatedData = data.filter(item => item.id !== id)
    setData(updatedData)
    filterAndSortData(updatedData, searchTerm, sortOrder)
  }

  const handleSearch = e => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = e => {
    setSortOrder(e.target.value)
  }

  return (
    <body className="mx-auto max-w-7xl bg-zinc-100">
      <ThemeProviders>
        <Header></Header>
        <div className="container mx-auto p-4">
          <div className="mt-4 flex items-center justify-between space-x-4">
            <div>
              <label
                htmlFor="search"
                className="px-1 text-lg font-semibold"
              >
                Search:
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={handleSearch}
                className="rounded-full p-2 outline-blue-600"
              />
            </div>
            <div>
              <label
                htmlFor="sort"
                className="px-1 text-lg font-semibold hover:outline-none"
              >
                Sort by Price:
              </label>
              <select
                id="sort"
                value={sortOrder}
                onChange={handleSortChange}
                className="overflow-hidden rounded-full p-2 hover:outline-none"
              >
                <option value="asc">Lowest to Highest</option>
                <option value="desc">Highest to Lowest</option>
              </select>
            </div>
          </div>
          <h2 className="mb-2 mt-4 text-2xl font-bold">
            Create/Update Product
          </h2>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Product Title"
              value={newProduct.title}
              onChange={e =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className="mb-2 rounded-l-full border p-2"
            />
            <input
              type="number"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={e =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="mb-2 rounded border p-2"
            />
            <input
              type="text"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={e =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="mb-2 border p-2"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={e =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="mb-2 mr-2 rounded-r-full border p-2"
            />
            {editingId ? (
              <button
                className="bg-gray-500 hover:bg-gray-100 shadow-md hover:text-black hover:shadow-lg hover:scale-105 duration-75 rounded-full px-4 py-2 text-white"
                onClick={handleUpdate}
              >
                Update
              </button>
            ) : (
              <button
                className="bg-gray-500 hover:bg-gray-100 shadow-md hover:text-black hover:shadow-lg hover:scale-105 duration-75 rounded-full px-4 py-2 text-white"
                onClick={handleCreate}
              >
                Create
              </button>
            )}
          </div>
          <h1 className="mb-4 mt-6 text-4xl font-bold">Product List</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredData.map(item => (
              <div
                key={item.id}
                className="rounded-md bg-white p-4 shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="mb-4 h-40 w-full rounded object-cover"
                />
                <h2 className="text-xl font-bold">{item.title}</h2>
                <h1 className="my-2">{item.description}</h1>
                <p className="mb-2 text-gray-500">${item.price}</p>
                <div className="flex justify-end ">
                  <button
                    className="bg-gray-400 text-white hover:bg-gray-100 shadow-md hover:text-black hover:shadow-lg hover:scale-105 duration-75 rounded-md px-2 py-1"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-100 shadow-md hover:text-black hover:shadow-lg hover:scale-105 duration-75 ml-2 rounded-md px-2 py-1 text-white"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> 
      </ThemeProviders>
    </body>
  )
}
