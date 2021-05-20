import React, { useState, useEffect } from 'react'
import coffeeService from '../../services/coffee'
import adminService from '../../services/admin'
import { DataGrid } from '@material-ui/data-grid';
import FullPageSpinner, { ButtonSpinner } from '../../shared/components/Spinner';
import Toast from '../../shared/components/Toast'
import { Box, Button } from '@material-ui/core';

const Admin = () => {
  const [coffeeList, setCoffeeList] = useState([])
  const [selectionModel, setSelectionModel] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)

  const getCoffees = async (coffeeId = null) => {
    const coffees = await coffeeService.getAll(coffeeId)
    setCoffeeList(coffeeList.concat(coffees))
  }

  const handleLoadMoreClick = async () => {
    setLoadMoreLoading(true)
    await getCoffees(coffeeList[coffeeList.length - 1].id)
    setLoadMoreLoading(false)
  }

  const updateCoffees = async () => {
    const coffeesToUpdate = coffeeList.filter(val => selectionModel.indexOf(val.id) === -1 ? null : val)
    coffeesToUpdate.map(async coffee => {
      const response = await adminService.updateCoffee(coffee)
      if (response) {
        setOpen(true)
        setSelectionModel([])
      }
    })
  }

  useEffect(() => {
    setLoading(true)
    const getInitialCoffees = async () => {
      const coffees = await coffeeService.getAll()
      setCoffeeList(coffees)
      setLoading(false)
    }
    getInitialCoffees()
  }, [])

  const columns = [
    { field: 'coffeeName', headerName: 'Coffee Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 150, editable: true },
    { field: 'roastType', headerName: 'Roast Type', width: 200, editable: true },
    { field: 'countries', headerName: 'Countries', width: 200 },
    { field: 'roaster', headerName: 'Roaster', width: 200, valueGetter: (params) => params.value.name},
    { field: 'imageUrl', headerName: 'Image URL', width: 200},
    { field: 'imagePath', headerName: 'Image Path', width: 200},
    { field: 'notes', headerName: 'Notes', width: 200 }
  ]

  if (loading || !coffeeList) {
    return <FullPageSpinner size={50} />
  }

  const editCoffee = async (params) => {
    setCoffeeList(coffeeList.map(val => val.id === params.id ? {...val, [params.field]: params.props.value} : val))
  }

  return (
    <div style={{ padding: `0 2rem` }}>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={coffeeList}
          columns={columns}
          pageSize={20}
          checkboxSelection
          onEditCellChangeCommitted={params => editCoffee(params)}
          selectionModel={selectionModel}
          onSelectionModelChange={({ selectionModel }) => setSelectionModel(selectionModel)}
          disableSelectionOnClick={true}
        />
      </div>
      <Box py={1}>
        <Button onClick={updateCoffees} color="primary" variant="contained" disabled={selectionModel.length === 0} fullWidth>Update Selected Coffees</Button>
      </Box>
      <Box py={1}>
          { loadMoreLoading 
            ? <Button variant="outlined" fullWidth><ButtonSpinner size="20" /></Button>
            : <Button variant="outlined" fullWidth onClick={handleLoadMoreClick}>Load More</Button>
          }
      </Box>
      <Toast open={open} setOpen={setOpen} severity="success" message="Coffees have been successfully updated" />
    </div>
  )
}

export default Admin