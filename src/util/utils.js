import axios from "axios";
export let UploadImage = async (url) => {
    try {
        let form = new FormData();
        form.append('cloud_name','du9pkirsy')
        form.append('upload_preset','cart_preset')
        form.append('file',url)
        let { data } = await axios.post(`https://api.cloudinary.com/v1_1/du9pkirsy/image/upload`,form)
        return data.secure_url 
    } catch (error) {
        console.error(error)
    }
}
export let UploadProfile = async (url) => {
    try {
        let form = new FormData();
        form.append('cloud_name','du9pkirsy')
        form.append('upload_preset','user_profile')
        form.append('file',url)
        let { data } = await axios.post(`https://api.cloudinary.com/v1_1/du9pkirsy/image/upload`,form)
        return data.secure_url 
    } catch (error) {
        console.error(error)
    }
}
export let Axios = axios.create({
    baseURL : 'https://cart-x3vv.onrender.com/api',
    withCredentials : true
})
//
//http://localhost:5000/api