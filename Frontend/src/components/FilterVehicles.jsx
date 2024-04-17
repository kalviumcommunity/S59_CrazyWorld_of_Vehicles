import { useState, useEffect } from 'react'

const FilterVehicles = () => {
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("all")
    const [filteredData, setFilterData] = useState([])
    const fetchData = () => {
        fetch("http://localhost:8081/api/user-vehicle/")
            .then(resp => resp.json())
            .then(result => {
                setData(result)
                setFilterData(result)
            })
            .catch((err) => console.log(err))
    }

    const fetchUsers = () => {
        fetch("http://localhost:8081/api/users")
            .then(resp => resp.json())
            .then(result => {
                setUsers(result)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (filter === 'All') {
            setFilterData(data);
        } else {
            let data2 = data.filter(element => {
                return element.userName === filter;
            });
            setFilterData(data2);
        }
    }, [filter]);


    useEffect(() => {
            fetchData()
            fetchUsers()
    }, [])

    useEffect(() => {
        console.log(data)
        console.log(users)
    }, [data])

    return (
        <>
            < div className="py-24">
                <p className='text-center font-md m-5 mb-10 font-semibold'>Buy the glorius Products of our store down below:</p>
                 <div className='ml-[45vw] mt-[10vw]'></div>

                <select className="ml-10 bg-blue-500 py-1.5 px-3 rounded text-white" onChange={(e) => setFilter(e.target.value)}>
                    <option>All</option>
                    {users.map(user => (
                        <option>{user.userName}</option>
                    ))}
                </select>

                <div className='p-10 flex flex-wrap m-auto w-[90vw] rounded-2xl justify-center'>
                    {data && filteredData.map(ele => (
                        <div className='m-5 shadow-xl p-8 rounded-xl bg-white'>
                            <img src={ele.imgURL} alt={ele.name} className='w-64 h-56 object-contain' />
                            <div>
                                <h2 className='font-bold text-xl mt-5 w-64 text-left'>{ele.name}</h2>
                                <p className='text-slate-500 text-md'>{ele.category}</p>
                                <p className='text-slate-500 text-md'>Contributed By : {ele.userName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default FilterVehicles