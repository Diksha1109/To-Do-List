import React, { useEffect, useState } from 'react';
import './../../component/ToDoApp/ToDoApp.css';

export default function ToDoApp() {
    const [formData,setForm] = useState({
        id:1,
        title:'',
        completed:false
    })
    const [submission,setSubmission] = useState([])
    const [displayedTasks, setDisplayedTasks] = useState([]);
    const [active,setFilter]=useState('all')
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const setData= (e)=>{
        e.preventDefault()
        console.log(formData)
        let lastID = formData.id
        setSubmission(prev => [...prev, formData]);
        setForm({
            id:lastID+1,
            title:'',
            completed:false
        })
    }

    const toggleChange = (id)=>{
        let updated = submission.map((item)=>
            item.id === id ? {...item,completed:true}:item
        )
        setSubmission(updated)
    }

    const handleDelete = (id) => {
        let updated = submission.filter((item)=>
            item.id !== id)
        let reIndex = updated.map((item,index)=>({
            ...item,id:index+1
        }))
        setSubmission(reIndex)
        setForm({
            id:reIndex.length+1,
            title:'',
            completed:false
        })
    }
    const setSelectedFilter=(filter)=>{
        setFilter(filter)
        if (filter === 'all') {
            setDisplayedTasks(submission);
        } else if (filter === 'active') {
            const active = submission.filter((item) => item.completed !== true);
            setDisplayedTasks(active);
        } else if (filter === 'completed') {
            const completed = submission.filter((item) => item.completed === true);
            setDisplayedTasks(completed);
        }
    }

    useEffect(()=>{
        setSelectedFilter(active);
        localStorage.setItem('submissionData',JSON.stringify(submission))
        console.log(submission)
    }, [submission,active])

    useEffect(() => {
    const storedData = localStorage.getItem('submissionData');
    if (storedData) {
        const parsed = JSON.parse(storedData);
        setSubmission(parsed);
        const lastId = parsed.length > 0
        ? Math.max(...parsed.map(item => item.id))
        : 0;
        setForm(prev => ({
            ...prev,
            id: lastId + 1
            }));
        }
    }, []);
    return (
        <>
            <div className='container mt-3'>
                <h2>TO DO LIST</h2>

                <form>
                    <div className="input-group input-group-sm mb-3">
                        <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange}/>
                        <button className="btn btn-primary" onClick={setData}>Add</button>
                    </div>
                </form>
            </div>
            <div className='container mt-3'>
                {displayedTasks.map((item,index)=>{
                    return(
                        <div className='items' key={index}>
                            <div className="form-check d-flex justify-content-between show">
                                <div>
                                    <input className="form-check-input" type="checkbox" checked={item.completed === true} 
                                        onChange={()=>toggleChange(item.id)}
                                    value={item.completed} id={`boxId-${index}`}/>
                                    <label className="form-check-label" htmlFor={`boxId-${index}`}>
                                        {item.title}
                                    </label>
                                </div>
                                {!item.completed && (
                                    <button className="showBtn btn btn-danger" onClick={()=>handleDelete(item.id)}>Delete</button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="container mt-5">
                <div className="d-flex justify-container-left filter">
                    <p className='showFilter'>Show:</p>
                    <p className={`all ${active === 'all' ? 'active-filter' : ''}`}
                    onClick={() => setSelectedFilter('all')}>All</p> |
                    <p className={`active ${active === 'active' ? 'active-filter' : ''}`}
                    onClick={() => setSelectedFilter('active')}>Active</p> |
                    <p className={`completed ${active === 'completed' ? 'active-filter' : ''}`}
                    onClick={() => setSelectedFilter('completed')}>Completed</p>
                </div>
            </div>
        </>
    )
}
