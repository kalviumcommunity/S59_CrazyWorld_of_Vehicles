import { useState, useEffect } from 'react';

const FilterVehicles = () => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('All');
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = () => {
        fetch('http://localhost:8081/api/user-vehicle/')
            .then((response) => response.json())
            .then((result) => {
                console.log('Fetched data:', result);
                setData(result);
                setFilteredData(result);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    };

    const fetchUsers = () => {
        fetch('http://localhost:8081/api/users')
            .then((response) => response.json())
            .then((result) => {
                console.log('Fetched users:', result);
                setUsers(result);
            })
            .catch((err) => {
                console.error('Error fetching users:', err);
            });
    };

    useEffect(() => {
        if (filter === 'All') {
            setFilteredData(data);
        } else {
            const filtered = data.filter((element) => element.userName === filter);
            console.log('Filtered data:', filtered);
            setFilteredData(filtered);
        }
    }, [filter, data]);

    useEffect(() => {
        fetchData();
        fetchUsers();
    }, []);

    return (
        <>
            <div className="py-24">
                <div className="ml-[45vw] mt-[10vw]"></div>
                <select
                    className="ml-10 bg-blue-500 py-1.5 px-3 rounded text-white"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    {users.map((user, index) => (
                        <option key={index} value={user}>
                            {user}
                        </option>
                    ))}
                </select>
                <div className="p-10 flex flex-wrap m-auto w-[90vw] rounded-2xl justify-center">
                    {filteredData.map((ele, index) => (
                        <div key={index} className="m-5 shadow-xl p-8 rounded-xl bg-white">
                            <img src={ele.imgURL} alt={ele.name} className="w-64 h-56 object-contain" />
                            <div>
                                <h2 className="font-bold text-xl mt-5 w-64 text-left">{ele.name}</h2>
                                <p className="text-slate-500 text-md">{ele.category}</p>
                                <p className="text-slate-500 text-md">Contributed By: {ele.userName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FilterVehicles;
