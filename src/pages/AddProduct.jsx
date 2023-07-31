import React, { useEffect, useState } from 'react'
import { Axios, UploadImage } from '../util/utils';
import {BiSolidError} from 'react-icons/bi' 
import { ClipLoader } from 'react-spinners';
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom';
export const AddProduct = () => {
    let [files,setFiles] = useState([]);
    let [proName,setProName] = useState('')
    let [option,setOption] = useState([])
    let [price,setPrice] = useState('')
    let [desc,setDesc] = useState('')
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    let [error,setError] = useState('')
    // let [url,setUrl] = useState(false)
    // let [button,setButton] = useState(false)
    // let [agg,setAgg] = useState([])
    let arr = [];
    // let Collections = []
    // let InputAdder = () => {
    //     let InputHolder = document.querySelector('.InputHolder');
    //     let newInput = document.createElement('input')
    //     newInput.classList.add('inputUrl')
    //     newInput.placeholder = 'E.g. https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?cs=srgb&dl=pexels-dom-j-45982.jpg&fm=jpg'
    //     InputHolder.appendChild(newInput)
    //     let InputElementCount = InputHolder.childElementCount - 1
    //     let AllChildrens =  InputElementCount > 1 ? document.querySelectorAll('.InputHolder .inputUrl') : document.querySelector('.InputHolder .inputUrl')
    //     if(InputElementCount > 1){
    //         AllChildrens.forEach((child) => child.addEventListener('input', function(e){setAgg(e.target.value)}))
    //     }else{
    //         AllChildrens.addEventListener('input', function(e){setAgg(e.target.value)})
    //     }
    // }
    let navigate = useNavigate();
    let handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            for(let i = 0; i < files.length; i++){
                let data = await UploadImage(files[i]);
                arr.push(data)
            }
            if(files.length > 0){
                if(arr){
                    let res = await Axios.post('/product/add',{
                        Pname : proName,
                        type : option,
                        images : arr,
                        desc : desc,
                        price : price,
                    })
                    res.data && setLoading(false)
                    setFiles('')
                    setProName('')
                    setOption('')
                    setPrice('')
                    setDesc('') 
                    navigate('/')
                }else{
                    setError('Error while uploading Product Image')
                    ErrorResetter()
                }
            }else{
                setError('Upload Product Image')
                ErrorResetter()
            }
        } catch (error) {
            setError(error.response.data)
            ErrorResetter()
        }
    }
    let ErrorResetter = () => {
        setTimeout(() => {
            setError('')
            setLoading(false)
        },3000)
    }
  return (
    <div className='font-Poppins font-light flex items-start justify-center'>
        <div className='flex items-start justify-start flex-col w-5/12 pt-10'>
            {error && <h1 className='my-2 text-red-700 font-bold flex items-center justify-start'><BiSolidError className='mr-2' />{error}</h1>}
            {loading && <Alert className='absolute top-20 right-10 scale-100 origin-top transition_cubic' severity="success">Product Added Successfully !</Alert>}
            <h1 className='text-5xl mb-6'>ADD PRODUCT</h1>
            <form action="" className='flex items-start justify-start flex-col w-full' onSubmit={handleSubmit}>
                {/* <div className='w-full mr-4'> */}
                    <div className='flex items-start justify-start flex-col w-full my-2'>
                        <label className='font-extralight mb-2' htmlFor="ProName">Product-Name</label>
                        <input required value={proName} onChange={(e) => setProName(e.target.value)} className='w-full cursor-pointer p-3 bg-transparent outline-none border-solid border-b-[1px] border-zinc-400' type="text" placeholder='E.g. Adidas' />
                    </div>
                    <div className='flex items-start justify-start flex-col w-full my-2'>
                        <label className='font-extralight mb-2' htmlFor="Type">Type</label>
                        <input required value={option} onChange={(e) => setOption(e.target.value)} className='w-full cursor-pointer p-3 bg-transparent outline-none border-solid border-b-[1px] border-zinc-400' type="text" id="Type" />
                    </div>
                    <div className='flex items-start justify-start flex-col w-full my-2'>
                        <label onClick={() => setButton(true)} className='font-extralight mb-2 p-2 tracking-widest cursor-pointer border-solid border-black/90 border-[1px] w-full' htmlFor="ProductImage">Upload images from machine</label>
                        <input multiple onChange={(e) => setFiles(e.target.files)} className='machine hidden w-full cursor-pointer p-3 bg-transparent outline-none border-solid border-b-[1px] border-zinc-400' type="file" id="ProductImage" />
                    </div>
                    <div>
                        <label className='font-extralight mb-2' htmlFor="price">Description</label>
                        <textarea cols={50} rows={3} value={desc} onChange={(e) => {setDesc(e.target.value)}} className='w-full cursor-pointer resize-none bg-transparent outline-none border-solid border-b-[1px] border-zinc-400' type="text"></textarea>
                    </div>
                    <div className='flex items-start justify-start flex-col w-full my-2'>
                        <label className='font-extralight mb-2' htmlFor="price">Price</label>
                        <input required value={price} onChange={(e) => {setPrice(e.target.value)}} className='w-full cursor-pointer p-3 bg-transparent outline-none border-solid border-b-[1px] border-zinc-400' type="text" />
                    </div>
                    <button disabled={loading} className='p-3 bg-black/80 hover:bg-black text-white flex items-center justify-center w-11/12 mx-auto mt-5'>{loading ? <ClipLoader color={color} loading={loading} size={21} aria-label="Loading Spinner" data-testid="loader" />  : 'Add Product'}</button>
                {/* </div> */}
                {/* <div className='w-full ml-4 font-Poppins InputHolder flex items-start justify-start flex-col'>
                    <div className='flex items-center mb-5 w-full justify-between'>
                        <label className='text-xl font-extralight' htmlFor="">Use the ' + ' sign to create URL Link</label>
                        <label onClick={() => {setUrl(true); InputAdder()}} className='flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-black/40 bg-black/20 text-xl'>+</label>
                    </div>
                    <input disabled={button} className='' type="text" placeholder='' />
                </div> */}
            </form>
        </div>
    </div>
  )
}